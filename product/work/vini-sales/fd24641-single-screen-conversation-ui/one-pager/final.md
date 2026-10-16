# Salespeople and service staff cannot see which customers are waiting on them

**Author:** Senior PM, Vini Sales Agents · **Date:** 2026-10-16 · **Status:** Approved with changes (Gate 2, 2026-10-16) · **Ticket:** Freshdesk 24641 · **Area:** vini-sales
**Flywheel stage:** lead to appointment (sales); service customer to RO (service)

## Decision
Build an "Unanswered" queue on Conversations for sales and service (size L), because the console is the product [PM] [E37, E42].
Sales gets the team "Unanswered" view day one at every rooftop; service gets it after it is confirmed the rooftop runs Vini Service [PM] [Q10]. "Mine" turns on per rooftop as its owner source connects, and none is connected today [E43].
The L includes the VinSolutions salesperson read: the requesting rooftop gets "mine" first once the Integrations PM with the Partnerships team agree access, not engineering [PM] [ASSUMPTION: the VinSolutions read fits inside the L].
Ask: approve the L; provider-access owners: Integrations PM with the Partnerships team [PM].

## TL;DR
Nobody sees which customers wait on a person. We add an unanswered state only a human reply clears, a team view with escalation, and per-person queues where the owner is read, to cut hours to first human reply. The CRM still closes the record.

## Problem
The used car manager wants "to only stay in one screen" and "[my] unanswered, click on it"; adding two salespeople, he already has "trouble with them following up" [E5, E6, E7].
Cost: manager cross-checking and hours a customer waits at the AI-to-salesperson handoff, on about 600 leads a month (dealer-stated), unpaid and unmeasured; service RO value unknown [E10, E16, E37, Q15].

## Evidence
- The team list filters by department, unread and flow, never by owner `conversational-ai-backend:src/customers/customers.controller.ts:16`.
- Unread is not unanswered and has no owner: AI sends flip it, any reader clears it, Vini action items sit on SYSTEM `conversational-ai-backend:src/sms/sms.service.ts:753` `conversational-ai-backend:src/conversation/conversation.schema.ts:183` `conversational-ai-backend:src/crm_integration/crm_integration.service.ts:693`.

## Recommendation
One capability, both departments [PM]:
- **Mine:** the CRM salesperson or scheduler/DMS advisor, never Spyne's round-robin [PM] [E43]. Owners without a console seat fall to the team view (sales/BDC or service manager).
- **Unanswered:** a customer message after a Vini handoff or action item, or once a human is active, with no human reply since; missed calls optional [E31]. New fields; `isUnread` unchanged.
- **Cleared by** a console reply, CRM activity (sales) or a scheduler booking or RO (service) where read; else one click, shown per owner, not stopping the wait clock.
- **Escalation:** after N minutes in that department's hours, a copy to the team view, a text to the manager; the owner keeps it. Texts only where we see replies (CRM read, or console-only reps); failures counted. Owner texts where connected [E33].
- **Manager view:** count, oldest wait, clicks per owner [E6]; action items never reassigned. Flag per rooftop per department; service off until Open question 3.
- Not building: the two boards, removing Customers, console reassignment [E28, E30, E32].
- **Full value, CRM-first:** tasks on the CRM salesperson, replies posted back, after certified write-back per provider [E16, E34].

## What it removes
| Measure | Today | After | Source |
|---|---|---|---|
| Median hours to first human reply, per department | unknown; pre-UI baseline misses CRM-sent replies | cut set 2 weeks after baseline | [Q15] [ASSUMPTION: 2-week target, 30-day review] |

The 30-day wait review runs at 1-2 rooftops whose reps reply in the console; the requesting rooftop is measured once its VinSolutions activity read is live [PM]. If median wait does not fall, rollout stops. Checks: appointments shown, service bookings or ROs where read, click-clear share, Action Items use [E13, Q15].

## Risks and dependencies
- **Provider reads**, each a data-access agreement negotiated by the Integrations PM with the Partnerships team [PM], built by integrations-backend: VinSolutions salesperson, not read `conversational-ai-backend:src/external_crm_integrations/prepare_crm_data/vinsolutions.ts:191`; scheduler/DMS advisor, booking and RO, none read [Q19]; CRM activity, unknown [Q18].
- **Size:** L, apart from Console v2 (unscheduled backlog) [E23]; estimate after Q18 to Q21; handover alerts unwired `conversational-ai-backend:src/tools/human-transfer.service.ts:149`.
- **Displaces:** unknown until the PM answers Open question 4.

## Open questions
| # | Question | Who answers | Blocks |
|---|---|---|---|
| 1 | Which providers expose owner, booking and RO; how fresh; which console member? [Q18, Q19] | integrations-backend | Mine |
| 2 | Owner field with crm-core on and off; reply stamps, backfill; missed-call record? [Q20, Q21] | Vini backend | Unanswered |
| 3 | Which rooftops run Vini Service; which roles work it; will they click? [Q10] | Service manager, live rooftop | Service flag |
| 4 | What the L displaces this quarter; escalation N, hours, manager; write-back date? | PM | Roadmap |
