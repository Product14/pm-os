# Decide: A customer returns our call and the agent cannot say why we called or which vehicle

Fixed intents (binding, decisions.md): any fix covers both the Sales and the Service agents; verify current behaviour after the September fixes first and build only what still fails [E20].

## Ladder
1. **Literal ask:** "Please ensure the Agent retains and communicates the relevant lead context, including the Vehicle of Interest/VIN, during both outbound and inbound callback interactions" [E24]. Two symptoms: the outbound call does not name the vehicle of interest, and a callback after a missed call gets only "How can I help you?" [E22]. Raised internally by Spyne onboarding and the CSM, not by dealer staff [E1, E2, E21].
2. **Job:** when a shopper re-engages on an aged lead, the store picks the conversation up where it left off instead of re-qualifying from zero. The campaign works 7-day-old leads [E21], so every returned call is a lead the store already paid for and has nearly lost; Spyne reports the shoppers calling back are confused [E23]. In P&L terms: BDC time spent recovering a lead the agent should have carried, and days added to the appointment on that lead (inferred; no dealer figure exists, Q9). Spyne staff called it make-or-break for a newly live account [E25]. Two halves:
   - (a) vehicle of interest missing on the outbound call [E2, E3, E22];
   - (b) the inbound callback has no context of our earlier outbound call [E1, E22].
3. **Who else has this job:** 1 rooftop (this one) in the last 90 days. 0 other rooftops raised the same job in tickets [E18] or in call and meeting transcripts [E19]. For half (a), Spyne staff suspect every Tekion rooftop is affected [E30] but nobody has checked [E31]; the count is unknown (Q6). For half (b), QA and engineering filed their own callback-context bugs in the same period [E15, E16], so the pattern is known internally even though no dealer has raised it.
4. **Smallest shared building block:** one lead-level "last outreach" context, written before every outbound dial and read by whichever agent answers the callback.
   - Write side: the outbound prefetch fills the existing optional vehicle-of-interest and purposeOfCall variables [E8] from a fresh read of the lead's vehicles in the CRM, using the on-demand Tekion endpoint that already exists but has no caller (`integrations-backend:src/crm/tekion/tekion.controller.ts:262`, E13). This is the polling workaround the thread agreed on 2026-10-14 [E32]; it replaces waiting for Tekion lead-level webhooks, which were released then likely rolled back with no ETA [E27, E28, E29]. The sales_new prompt already renders the block when it has data (`conversational-ai-backend:src/prompts/base-system-prompts/sales_new/context-data.xml:108`, E9); whether the 7-day-old campaign's journey actually uses that template is not confirmed (R1).
   - Read side: the lead memory query (`conversational-ai-backend:src/agents/agents-v2.service.ts:3440`, E10; `conversational-ai-backend:src/memory/lead-memory.service.ts:262`, E11) returns the last outreach to the answering agent regardless of department, for as long as the outreach is open, not only 3 days.
   - Gate (fixed intent): build the read side only for what still fails after the September fixes: phone fallback of 2026-09-18 [E12], outbound summary in the sales v2 prompt [E14], callback-context fixes live on prod [E15]. No re-test exists on this rooftop [E33] (Q4). Whether a missed (unanswered) outbound attempt writes any memory record at all is unknown (R2); if it does not, widening the query alone fixes nothing.
5. **What varies per store:**
   - CRM vehicle source: a per-CRM adapter setting for the pre-dial refresh (Tekion uses the lead-vehicles endpoint [E13]; other CRMs: unknown whether they already push vehicle updates). Never a branch for one rooftop.
   - Memory window: a per-campaign setting that spans the campaign's follow-up cadence (default 3 days today [E10]; a 7-day-old lead campaign [E21] may need longer).
   - Which line a callback lands on (sales or service number): routing configuration already per rooftop; the read side must work for both [E11, E20].
   - How the vehicle is spoken (year, make, model, trim; stock or VIN only if the shopper asks): a prompt template setting, same for all stores by default [E9].
6. **Every agent it lands on:**
   - Sales outbound: yes. The campaign in the ticket; vehicle variables prefetched and empty when the Tekion lead has none [E8, E9, E3, E4].
   - Sales inbound: yes. Callback memory is 3-day, same-department [E10, E11]; September fixes live but untested here [E12, E15] (Q4).
   - Sales STL: unknown. Not covered in case.md; STL fires at lead creation and may hit the same "vehicle attached later" gap (Q10).
   - Sales chat: unknown. Not covered in case.md; whether chat reads the same lead memory query is not known (Q10).
   - Service inbound: yes. Same memory query and department filter [E10, E11]; service_v2 callback cannot explain prior outbound contact (backlog) [E16].
   - Service outbound: unknown. Shared prompt variables carry vehicle fields [E8], but only sales_new was checked [E9]; a service outbound vehicle normally comes from the DMS; its summaries would not reach a sales inbound callback under the department filter [E11] (Q8, R3).
7. **Full value:** the agent always knows why the store called and which vehicle, in both agents. Keep the vehicle of interest current from Tekion by polling now [E13, E32] and by lead-level webhooks when Tekion re-releases them [E27, E28], written to the lead before each dial so the outbound prompt names it [E8, E9]; and give every inbound callback, Sales or Service, the prior outbound call's purpose, vehicle and summary regardless of department or the 3-day window [E10, E11, E16]. Scope: Tekion poller and webhook handler in integrations-backend, the lead memory query in conversational-ai-backend, the service_v2 callback block. Planned: not yet; polling has no owner or date [E32] (Q7), and the callback half waits on the Q4 re-test.

## As asked vs as solved
| Customer asked | We would build | Same, generalised, or different | Why |
|---|---|---|---|
| Name the VIN or vehicle of interest on outbound calls for this account [E22, E24] | Pre-dial refresh of the lead's vehicles from the CRM for every Tekion rooftop, feeding the existing vehicle variables [E8, E13] | Generalised | The cause is Tekion sending no event when a vehicle is attached after lead creation [E4, E5], which would hit any Tekion rooftop [E30] |
| Wait for, and prioritise, Tekion lead-level webhooks [E27, E28] | Poll the existing endpoint now; adopt webhooks when Tekion re-releases them [E13, E32] | Different | Webhooks were likely rolled back and Tekion gave no ETA [E28, E29] |
| Callback should acknowledge the previous outreach first [E24] | Re-test after the September fixes first [E12, E15, E33]; then build only the failing part: last outreach returned to any answering agent, window per campaign [E10, E11] | Generalised | Fixed intent: verify first [E20]; the 3-day window and department filter are shared code [E10, E11] |
| Fix the agent on the ticket (filed as Sales IB) [E2] | The same read side for Sales and Service inbound, and the service_v2 callback block [E16] | Generalised | A returned call can land on either agent [E20]; the department filter would drop cross-department context [E11] |
| Prioritise for one newly live account [E25] | One shared building block for every outbound-campaign rooftop | Generalised | 1 rooftop raised it [E18, E19]; internal bugs show the pattern elsewhere [E15, E16] |

## Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E18, E19, E30, E31, E15, E16] | 1 rooftop in 90 days. Tekion-wide exposure for the vehicle half suspected, unchecked (Q6). Callback half known internally only. |
| Dealer P&L impact | [E21, E23, E25] | unknown. Inferred: BDC time recovering aged leads the store already paid for, and days added to appointment on returned calls. No dealer-side figure or quote; no count of returned calls that ended without an appointment (Q9). |
| Strategic fit | org fact 4 and 5; [E13, E11] | Fits. Read access above the CRM and DMS, no write-back needed. Polling Tekion depends on the existing data agreement permitting per-lead calls (Q5); data access is a commercial question, not one to route around. The callback half is a sales-to-service handoff that nobody owns today [E11]. Justified in staff time and days to appointment, not volume (org fact 3). |
| Cost and risk to build | `integrations-backend:src/crm/tekion/tekion.controller.ts:262`; `conversational-ai-backend:src/agents/agents-v2.service.ts:3440`; `conversational-ai-backend:src/memory/lead-memory.service.ts:262`; `conversational-ai-backend:src/call/dto/call-prompt-variables.dto.ts:59` | M. Vehicle half S if the endpoint returns late-attached vehicles and is permitted per dial (Q5); callback half S to M, sized only after the Q4 re-test; service_v2 callback block in backlog [E16]. Main risks: Tekion rate limits or agreement (Q5); building against unverified post-September behaviour (Q4); unanswered outbound attempts may leave no memory to read (R2); the campaign may not route to the template that renders the vehicle (R1). |
| Cost of not solving | [E7, E25, E33] | No dealer churn or escalation signal: Arali has 0 interactions for this rooftop [E7]. Internal only: flagged make-or-break at go-live [E25]; ticket open seven weeks with no callback re-test [E33]. Dealer-side signal unknown (Q2, Q11). |
| Prior decisions | context/INDEX.md Decisions: none for this job | No ledger entry for vehicle refresh or callback memory; the only decision on record is STL verdict precedence, unrelated. |


## Arguments
### For building (advocate)
**Building block.** A lead-level "outreach record" written at dial, whatever the outcome: purpose, campaign, vehicle. The vehicle comes from a pre-dial CRM refresh (a per-CRM adapter; Tekion via the existing, uncalled `integrations-backend:src/crm/tekion/tekion.controller.ts:262`, E13). Sales and Service both read it on any callback within a per-campaign window. Today memory is a post-call summary, written only when non-empty, with no purpose or vehicle field (E35). The department match is exact and the default window is 3 days (E10, E36). Widening the query alone fails on missed calls, the ticket's callbacks (E22).

**Why now.** One rooftop in 90 days (E18, E19). Tekion-wide exposure is suspected but unchecked (E30, E31). Engineering filed its own callback bugs (E15, E16). Dealer P&L impact is unquantified; I concede it. Inferred: BDC rework and days to appointment on aged leads the store already paid for (E21, E23). Spyne called the account make-or-break (E25).

**Fit.** Read-only above the CRM. It covers the sales-to-service handoff nobody owns (E36). One variable set feeds both agents: aged-lead journeys render InterestedVehicle and service_new falls back to the same variables (E34, E36), so the gap is data, not prompts.

**Cheapest credible version.** Run the Q4 re-test first, as decided (E20, E33). Then build only what still fails: Tekion pre-dial refresh, dial-time outreach record, cross-department read, first on this rooftop's aged-lead campaign.

**Honest weakness.** If E13 does not return vehicles attached after the lead was created, or Tekion does not permit a call on every dial (Q5), the vehicle half has no source (E4).

### Against building as asked (skeptic)
**1. Outcome:** bug.

**2. The case.** Both halves already exist in code.
- Vehicle half: every outbound sales call renders InterestedVehicle and the journey templates say to name it [E34]; service_v2 uses the same variables [E36]. The block was empty because Tekion never sent the late-attached vehicle [E3, E4, E5]. Fix: wire the existing, uncalled endpoint (`integrations-backend:src/crm/tekion/tekion.controller.ts:262`, E13) into the pre-dial prefetch, the agreed workaround [E32]. One fix covers both agents.
- Callback half: callback-context fixes are live on prod [E12, E14, E15] and nobody re-tested them on this rooftop [E33]. Re-test first (fixed intent, E20). Anything that still fails is a defect against E15, and E16 is already in the backlog.
- Widening across departments and past 3 days has no observed case: 1 rooftop [E18, E19], no dealer signal [E7].

**3. What we lose.** The department match is exact [E36], so a Sales outreach answered on the service line stays blind [E16]. Any outreach older than 3 days also drops out [E10]. If all Tekion rooftops are affected, an unknown number are dialing with an empty vehicle block [E30, E31]. The account was called make-or-break at go-live [E25].

**4. What would change my mind.**
- The re-test shows a missed attempt writes no memory record. That is possible because no summary means no record and the record has no purpose field [E35], and it would make the read side a real build.
- A callback fails across departments.
- A second rooftop reports the problem.

## Outcome
**Outcome:** bug
**Feature slug:** none (bug outcome). The conditional build in step 3 below is reserved as `last-outreach-context` and comes back through decide only if its trigger fires.
**Why:** The product is meant to do both halves and does not: every outbound call renders the vehicle block and both journey templates tell the agent to name it, Service included through the same variables [E34, E36], and callback context is shipped work marked live on prod [E14, E15] with a Service defect already in backlog [E16]. Demand is 1 rooftop with Tekion-wide exposure unchecked and P&L impact unknown [Inputs: Demand breadth, Dealer P&L impact; Q6, Q9], so a new shared build does not clear the bar; the cheaper outcome wins. Which part is which, in order: (1) re-test first, not a build: the Q4 replay and test call, on both the Sales and Service lines, including a missed (no-answer) attempt, a callback after day 3 and a cross-department callback [E20, E33, E35]; (2) bug fix: wire the existing, uncalled Tekion lead-vehicles endpoint into the outbound pre-dial prefetch so the vehicle variables are filled for Sales and Service outbound alike [E13, E32, E36], after Q5 confirms Tekion permits the call per dial (a data-access question, not one to route around), with Q6 counting the affected Tekion rooftops; plus any callback failure from step 1 filed against RETCONVAI-4995 / -5090 / -4925 as defects [E15, E16]; (3) build, only if step 1 fails on missed attempts or across departments: the dial-time outreach record with purpose and vehicle, read by any answering agent in a per-campaign window [E10, E35, E36].
Rung 7 (Full value): named and partly planned. Steps 1 and 2 deliver the vehicle half for every Tekion rooftop and both agents now; Tekion lead webhooks replace polling when Tekion re-releases them [E27, E28]; the cross-department, outcome-independent outreach record is the full-value remainder, not planned until the step 1 result, then sized as build-generalised for Sales and Service together, never as a branch for this rooftop.
**Strongest point from the losing side:** "Today memory is a post-call summary, written only when non-empty, with no purpose or vehicle field (E35). The department match is exact and the default window is 3 days (E10, E36). Widening the query alone fails on missed calls, the ticket's callbacks (E22)."
**Why it did not carry:** Whether a no-answer call leaves a summary is unverified [E35], and the step 1 re-test answers it in days at no build cost; if it fails, that is the revisit trigger below, not a reason to build blind against post-September behaviour nobody has tested [E33].
**Revisit trigger:** Reopen as build-generalised (`last-outreach-context`) when any one holds: the step 1 re-test shows a missed outbound attempt writes no memory record, or a callback answered by the other department's agent has no context; or a second rooftop raises the same job; or Q6 shows the late-attached vehicle gap on 3 or more Tekion rooftops and Q5 rules out per-dial polling.
**Rubric scores:** Job, not request: 4 (both agents and every Tekion rooftop, not one store; the callback remainder waits on evidence) · Evidence weight: 3 (code paths cited; demand 1 rooftop, impact unknown [Q6, Q9]) · Five facts: 4 (read-only above the CRM, Tekion access named as a dependency [Q5], handoff between sales and service named; no days-removed figure) · Proportion: 5 (S fix plus a re-test against 1 rooftop and unsized impact) · Reversibility: 5 (pre-dial refresh and defect fixes are small and undoable; no store's process locked in)

## Bug summary
**Title:** Outbound calls on Tekion leads skip the vehicle of interest, and callbacks after a missed call get no context
**Agents:** Sales outbound, Sales inbound, Service outbound, Service inbound (fixed intent: both Sales and Service [E20]).
**Expected:** On an outbound call the agent names the lead's vehicle of interest when the CRM has one [E34, E36]. When the shopper calls back, whichever agent answers says why the store called and which vehicle [E14, E15, E16].
**Actual:** The vehicle block is empty when the vehicle was attached to the Tekion lead after creation, because Tekion sends no per-lead event [E4, E5]; the callback after a missed call gets only "How can I help you?" [E22]. The callback half has not been re-tested since the September fixes [E12, E15, E33].
**Fix, in order:**
1. Re-test (no code): replay lead memory for the reference callers against today's code, then one test outbound plus callback on a test lead, on both the Sales and Service lines, covering a no-answer attempt, a callback after day 3 and a cross-department callback [Q4, E10, E35, E36].
2. Vehicle fix: call `integrations-backend:src/crm/tekion/tekion.controller.ts:262` (GET /tekion/leads/:leadId/vehicles) in the outbound pre-dial prefetch and fill the existing customer_interest_vehicle_* variables for Sales and Service outbound [E8, E13, E32, E36]. Precondition: Q5 (endpoint returns late-attached vehicles; per-dial calls permitted under the Tekion agreement and within rate limits).
3. Callback fix: only what step 1 shows still failing, as defects against RETCONVAI-4995, -5090 and -4925 [E15, E16]. If the failure is a missing record for no-answer calls or the exact department match, stop: that is the `last-outreach-context` build, back through decide.
**Acceptance criteria:**
- [ ] Step 1 result recorded in `decisions.md` for each case (Sales and Service line; no-answer; after day 3; cross-department).
- [ ] An outbound dial on a Tekion lead whose vehicle was attached after creation names that vehicle, on Sales and Service outbound.
- [ ] A lead with no vehicle in Tekion still dials, with no invented vehicle.
- [ ] Q6 count of affected Tekion rooftops recorded before the fix ships.
- [ ] Every step 1 failure is fixed or moved to the conditional build with the trigger met.
**Links:** Freshdesk ticket 22370; work folder `product/work/vini-service/fd22370-vin-details-on-outbound-calls`.
