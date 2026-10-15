---
id: fd22370-vin-details-on-outbound-calls
area: vini-service
stage: confirmed
freshdesk_ticket: 22370
ticket_updated_at: 2026-10-14T16:01:36Z
rooftop_slug: bill-wright-toyota
rooftop_name: Bill Wright Toyota
freshdesk_company_id:
arali_company: Bill Wright Toyota
feature:
outcome:
prd:
jira:
ledger_match:
fetched_freshdesk: 2026-10-15
fetched_arali: 2026-10-15
fetched_code: 2026-10-15
---

# A customer returns our call and the agent cannot say why we called or which vehicle

> Area conflict: filed under the Service Inbound pod, but the category is Vini Sales IB, the platform is Sales Inbound and the thread is about a Tekion sales lead's vehicle of interest (E2, E3). Kept in vini-service per the area-check rule; Q1 asks the PM to confirm the real agent.

## Ask
Raised internally by Spyne, not by the dealer (E2). The ticket description, from the rooftop's Spyne onboarding manager the day after go-live on the "7-Day-Old Lead Follow-Up Outbound" campaign with Tekion leads (E21), asks: "Please ensure the Agent retains and communicates the relevant lead context, including the Vehicle of Interest/VIN, during both outbound and inbound callback interactions" (E24). Two symptoms: the outbound call does not name the vehicle of interest, and a callback after a missed call gets only "How can I help you?" (E22). The CSM's follow-up: "can we give the ai context so it does not look stupid on call" (E1). Subject line: "VIN Details not mentioned in Outbound Calls" (E2). Flagged "make-or-break" for a new account (E25).


## Job
Inferred: when a customer returns an outbound call, the agent should know why the store called and which vehicle, so the lead is picked up where it left off instead of re-qualified from zero (E1, E24). The campaign works 7-day-old leads (E21), so every returned call is a lead the store already paid for and has nearly lost; Spyne reports shoppers calling back are confused when the agent cannot explain the missed call (E23). An agent that cannot explain the call costs BDC staff time to recover the lead and risks the appointment (inferred, no dealer evidence). Spyne also called it make-or-break for keeping a newly live account (E25). Two parts: the vehicle of interest missing from the outbound call itself (E2, E3, E22) and the callback agent missing the outbound context (E1, E22).


## Customer context (30 days)
None found in 30 days

## Who feels this
No dealer-side evidence. The voices in the thread are the Spyne onboarding manager and CSM (E1, E21). Spyne reports shoppers returning the missed call are confused (E23), but no dealer staff member is quoted. Inferred: the BDC manager or internet sales manager who works the returned leads.


## How it works today
- Outbound call prompts take vehicle of interest (make, model, year, trim, VIN) and a customer activity history as optional variables (`conversational-ai-backend:src/call/dto/call-prompt-variables.dto.ts:59`, E8). The sales_new prompt renders them into an InterestedVehicle block that is empty when the lead has no vehicle (`conversational-ai-backend:src/prompts/base-system-prompts/sales_new/context-data.xml:108`, E9).
- For the two reference calls, the lead had no vehicle of interest in Spyne. Engineering's account: either the lead has no vehicle in Tekion, or the vehicle was attached after the lead was created and Tekion sends no event for that, because Tekion webhooks are per deal, not per lead (E3, E4, E5).
- An on-demand Tekion endpoint for a lead's vehicles exists in integrations-backend (`integrations-backend:src/crm/tekion/tekion.controller.ts:262`, E13). No caller from the outbound prefetch was found.
- When a call comes in, the agent receives lead memory by lead id or caller phone: the last 3 summaries, default 3-day window, filtered to the answering agent's department (`conversational-ai-backend:src/agents/agents-v2.service.ts:3440`, E10; `conversational-ai-backend:src/memory/lead-memory.service.ts:262`, E11).
- Since the ticket: a phone-lookup fallback for lead memory shipped on 2026-09-18 (E12), and Jira shows callback-context fixes live on prod (E14, E15). Service-side callback bugs are still in backlog (E16). Whether these change the outcome for this rooftop is untested.

## Gap
1. Vehicle of interest: Spyne only learns a Tekion lead's vehicle when the lead is created. A vehicle attached later never arrives, so the outbound call and any callback have no vehicle to name (E4, E5). Tekion lead-level webhooks were reported released on 2026-09-24 (E27), then probably rolled back by 2026-09-29 (E28); Tekion gave no ETA (E29). On 2026-10-14 the thread settled on polling as the workaround, with no owner or date (E32). Whether polling uses the existing on-demand endpoint (E13) is not stated.
2. Callback context: memory reaches the answering agent only within 3 days and only for the same department (E10, E11). A callback after day 3, or answered by an agent of another department, gets no reason for the call. The September fixes (E12, E15) may close part of this, but the full thread never returns to the callback half: no re-test or verification on this rooftop through 2026-10-14 (E33).
3. Product was asked to prioritise the Tekion webhook work on 2026-09-24 (E27); the ticket is still open seven weeks after a make-or-break go-live (E25, E32).


## Candidate directions
1. Re-test and close (non-build): replay an outbound plus callback on this rooftop after the September fixes (E12, E15), since nobody has (E33); if the callback now explains the call, answer the onboarding manager and keep only the vehicle half open. Cost: one CSM hour, removes days of ticket age.
2. Refresh the vehicle of interest right before each outbound sales dial using the existing Tekion lead-vehicles endpoint (E13), which is the polling workaround the thread agreed on 2026-10-14 (E32), instead of waiting for Tekion lead webhooks that have no ETA (E28, E29). Cost removed: BDC re-work on returned calls; no new data agreement if the endpoint is already permitted.
3. Widen callback memory: match by phone across departments and beyond 3 days for leads with an open outbound attempt, and have the agent state the purpose of the call even when no vehicle is known (E10, E11, E24). Removes the re-qualify cost on every returned call. Or decline the Tekion part until a second rooftop reports it (E18, E31).


## Frequency
0 other rooftops raised the same job in the last 90 days (2026-07-17 to 2026-10-15) in tickets (E18) or call and meeting transcripts (E19). 1 adjacent rooftop had a different lookup problem. Inside the thread, Spyne staff flagged that all Tekion rooftops might be affected (E30), but nobody has checked other rooftops (E31). Internally, QA and engineering filed several callback-context bugs in the same period (E15, E16), so the pattern is known even though dealers have not raised it.


## Slot status

| Slot | Status | Bar |
|---|---|---|
| Ask | SUPPORTED | at least 1 E-id from freshdesk, arali or pm, in the customer's words |
| Job | SUPPORTED | at least 1 E-id behind the inferred job |
| Customer context (30 days) | EMPTY | at least 1 dealer-side arali E-id dated within 30 days of fetched_arali |
| Who feels this | THIN | at least 1 dealer-side E-id with a known role |
| How it works today | SUPPORTED | at least 1 bluebrain E-id or `repo:path:line` reference |
| Gap | SUPPORTED | at least 1 E-id or code reference |
| Candidate directions | SUPPORTED | 2 or more directions, with a P&L angle (days, cost, gross, absorption, hours per RO, retention, CSI) |
| Frequency | SUPPORTED | a count, backed by at least 1 E-id |

