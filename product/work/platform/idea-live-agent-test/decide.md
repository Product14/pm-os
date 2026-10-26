# Decide: A rooftop whose Vini agent is already live cannot test that agent the way a prospect can try it in the demo

## Ladder
1. **Literal ask:** "Get the agent demo flow plugged into agents which are already live; they live on the Settings tab, which has a Talk to agent CTA." [E1]
2. **Job:** Let the GM, BDC manager or service manager hear what customers hear from the live agent and fix a wrong hours, policy or script in Settings without a CSM ticket. P&L angle: fewer mishandled calls reaching the BDC and service drive, fewer days a wrong policy stays live, less CSM time per change. This is an assumption, not shown by dealer evidence: Arali search failed [E30], no dealer wording gathered [E1 is PM only]. Cost removed is not measured.
3. **Who else has this job:** Unknown. 0 counted because Arali and Freshdesk searches failed with server errors, which is a tool failure, not zero [E50] [E30]. Today's Talk to agent already lets live rooftops test [E3] [E52] [E57], so the job has a workaround in use, but no count of rooftops using it exists. Question Q50 (open), Q54.
4. **Smallest shared building block:** A live-test mode on the existing demo flow: same screens and report, the rooftop's real agent read as is, calls flagged as test data the way the reception test already does [E9], agent info read-only with links to Settings [E21]. The backend prototype is local and unpushed, calls only [E61] [E24]. Console entry is the Talk to agent handler [E3], opened behind a flag [E21].
5. **What varies per store:** Configuration on the one block, never a code branch:
   - Flag on or off per team (Spyne owners first, then all) [E21].
   - Which department and direction lane shows: sales inbound, sales outbound, service, per the agents the rooftop has live [E2] [E23].
   - Which finance provider, policies and hours the real agent carries: read from the real mapping, not overridden [E21] [E6] [E8].
   - Tester phone number for the outbound lane [E23].
6. **Every agent it lands on:**
   - Sales inbound: yes [E2] [E3].
   - Sales outbound: yes; the outbound lane already dials the tester [E23] [E3].
   - Sales STL and chat: unknown; text test exists for inbound sales only and has no live mode [E23] [E24].
   - Service inbound: yes, same Agents tab [E2].
   - Service outbound: yes [E3] [E54].
   - Receptionist: unknown; it has its own test on the real agent [E9]. Design the test-data flag once so reception and live-test share it.
7. **Full value:** Direction 3 in case.md: the live test plus closing the remaining reporting leaks for both the live test and the reception test (ClickHouse meetings bookings [E12], callback action items [E13], CRM lead [E14]), and a "Tests" entry in Settings listing past test conversations (demo history already exists [E18]). Not yet planned or dated; it touches shared tools and CRM lead creation that other teams own, so it needs an owner and a date from the PM. The unmerged isDemo exclusion branch is a partial start on the reporting side [E22].

## As asked vs as solved
| Customer asked | We would build | Same, generalised, or different | Why |
|---|---|---|---|
| Plug the demo flow into live agents from Talk to agent [E1] | Live-test mode on the demo flow, behind a flag, opened from Talk to agent, real agent setup, transfers blocked, bookings demo-flagged, read-only agent info [E21] | Generalised | Lifting the block as is would mark the real agent a demo agent, fail real web calls and force lease and payment offers on every real conversation [E5] [E6] [E7] [E8], and demo edits would write production config [E15]. |
| Tests stay out of the rooftop's reports [E21] | First: test flag on live-test calls [E9] [E61]. Full value: close booking, action item and CRM lead leaks [E12] [E13] [E14] | Generalised | Today's Talk to agent tests already reach conversation reports and CRM: isTest stays false for dealer staff [E63], sales outbound creates a real CRM lead [E56]. Fixing the live test alone leaves the old modal's leak open, which is why the flag-off path matters. Q51 verifies this in ClickHouse. |
| Rooftop can find its tests later [E21] | Link the existing demo history from Settings [E18] | Same | The store and list route exist; only the Settings entry is missing. |

## Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E50] [E30] | Unknown. 0 counted, searches failed. Q50, Q54 |
| Dealer P&L impact | [E30] [E1] | Unknown. Named levers only: BDC and service drive calls handled wrong, days a wrong policy stays live, CSM time per change. Not measured, no dealer figure available. Q53 |
| Strategic fit | org fact [E2] [E9] | Sits above the DMS: console and conversation backend only, no DMS write. Serves fixed-ops and sales agents already live. Fits "cost removed" framing; does not touch inventory turn directly. |
| Cost and risk to build | [E61] [E5] [E6] [E8] [E14] | M for the live-test mode (backend prototype exists, calls only, local; console handler and flag are small). L if full value, because shared tools and CRM lead creation belong to other teams [E13] [E14]. Main risk: real agent flagged as demo [E6] [E7] [E8]. |
| Cost of not solving | [E30] [E59] [E63] | Unknown. No churn or escalation signal retrieved. What is known: live dealers already test via Talk to agent and those tests reach reports and CRM [E56] [E63]. Q52 |
| Prior decisions | none | No ledger match in case.md; INDEX decision lines cover only STL verdict precedence, unrelated. |

## Arguments
### For building (advocate)
1. **Building block:** a per-team live-test mode on the existing demo flow. The rooftop's real agent is read as is, calls are flagged as test data like reception [E9], and agent info is read-only with links to Settings [E21]. A flag gates it, with sales inbound, sales outbound and service lanes [E2] [E23].

2. **Why now:** demand breadth is unknown. 0 counted, because searches failed [E50] [E30]. I concede that. Indirect evidence: live rooftops already test through Talk to agent [E3] [E52], and those tests reach reports and the CRM [E63] [E56]. The behaviour exists and its side effects are unmanaged. The P&L levers are named, not measured: fewer mishandled calls reaching the BDC and service drive, fewer days a wrong policy stays live, less CSM time per change [E1]. No dealer figure is available.

3. **Fit:** above the DMS. It touches only the console and conversation backend, with no DMS write [E2] [E9]. It is a cost-removed argument.

4. **Cheapest version:** calls only, Spyne owners first [E21]. The backend prototype exists, local and unpushed [E61] [E24]. Add the console flag on the Talk to agent handler [E3]. Defer SMS [E24] and the reporting leaks [E12] [E13] [E14].

5. **Honest weakness:** no dealer-side demand evidence exists [E30]. The job is the PM's assumption [E1]. If dealers are content with today's modal [E3], training (direction 1) wins. The cheap version also still leaks bookings, action items and CRM leads [E12] [E13] [E14].

### Against building as asked (skeptic)
**1. Outcome:** defer.

**2. Case:**
- Live rooftops already test: Talk to agent starts a web or phone call on the real agent (E3, E52, E57).
- Demand is unmeasured. Arali and ticket searches failed, so 0 is a tool failure, not evidence (E30, E50). The only ask is the PM's (E1, E21).
- Building is risky. Lifting the refusal flags the real agent as demo (E5, E6), breaking real web calls (E7) and forcing lease and payment offers (E8). Full value touches other teams' tools (E13, E14).
- Revisit trigger: searches recover and show at least 3 distinct live rooftops in 30 days asking to test their agent or reporting test pollution of reports or CRM.

**3. What we lose:**
- Tests still count in conversation reports (E63, E60).
- Sales outbound tests still create a real CRM lead (E56).
- CSMs keep checking live agents by hand.
- All three are unquantified; no churn or escalation signal was retrieved (E30).

**4. What would change my mind:**
- Dealer wording showing live rooftops cannot find or trust today's test.
- A count of rooftops already using Talk to agent.
- Confirmed bookings leakage in ClickHouse (E12).
- Cheaper first step: mark console conversations isTest, which the unmerged branch partly does (E22).

## Outcome
**Outcome:** defer
**Feature slug:** none (defer; job slug `live-agent-test`)
**Why:** Demand breadth and dealer P&L impact are both unknown: the Arali and ticket searches failed, so 0 is a tool failure, and no days or cost removed were measured [E30] [E50] [Q53]; the rubric says defer when both are unknown. The job already has a working path, since Talk to agent runs web and phone calls on the live agent today [E3] [E52] [E57], so an M build that lifts the demo block onto real agents [E5] [E6] [E7] [E8] is not proportionate yet. The real cost on the page is test pollution, not missing access: dealer tests count in conversation reports [E63] and sales outbound tests create real CRM leads [E56], while the calls table already hides console calls [E59] and the reception test shows the test flag works on a real agent [E9].
**Strongest point from the losing side:** "The behaviour exists and its side effects are unmanaged."
**Why it did not carry:** The unmanaged side effect is fixed more cheaply by stamping console Talk to agent conversations as test data, matching E59 and the reception precedent E9 (unmerged branch E22 is a partial start), with no live-test mode and no demo-flow risk; it proves pollution, not demand for the demo experience.
**Revisit trigger:** Any one of: (a) Q50/Q54 answered and show 3 or more distinct live rooftops in 90 days using Talk to agent or asking a CSM to test their live agent; (b) Q53 returns CSM-logged live-agent errors (hours, policy, script) with the days each stayed live, giving a cost or days figure; (c) the console isTest fix ships and a rooftop still asks for the transcript-led report or test history the modal lacks [E18].
**Rubric scores:** Job, not request: 4 · Evidence weight: 3 · Five facts: 4 · Proportion: 4 · Reversibility: 5

## PM decision
**Final outcome:** build-generalised (PM override of the judge's defer, 2026-10-22). **Feature slug:** live-agent-test. Logged in decisions.md > Overrides.
