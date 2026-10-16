# One-pager round 1: resolution

Document: `one-pager/v1.md` · Revised to: `one-pager/v2.md` · Date: 2026-10-16
Panel: gm, general-sales-manager, service-manager, backend-engineer, ceo

## Consolidation
- Issues raised: 48 (3 blocking, 32 major, 13 minor).
- Discarded (quote not found in v1.md, whitespace normalised): 0.
- Merged: 35 blocking and major issues fold into 23 rows below; ceo-r1-8 (minor) merged into the service-evidence row.
- Reviewer requests: 23, not yet run through the context-request flow; the blocking ones are carried as v2 Open questions 1 to 4.

## Blocking and major

| Issue | From | Decision | Reason |
|---|---|---|---|
| ceo-r1-1 (intent-challenge) | ceo | resolved by PM 2026-10-16: strategic, console is the product | PM answered the challenge [E42]; Decision now states the reason [PM]; override recorded in decisions.md |
| general-sales-manager-r1-1, service-manager-r1-4 | general-sales-manager, service-manager | accept | Fixed intent: "mine" is the CRM salesperson or scheduler/DMS advisor, read CRM/DMS-first [E43]; takeover claimant dropped; each provider read named with an owner. The asked exception "Spyne assignee where round-robin is the store's record" is not taken: the fixed intent says never round-robin |
| backend-engineer-r1-1, general-sales-manager-r1-2, service-manager-r1-3 | backend-engineer, general-sales-manager, service-manager | accept | Vini action items are no longer reassigned; "mine" joins them to the owner at read time, nothing written to action items or the CRM (`crm_integration.service.ts:693`) |
| ceo-r1-4 | ceo | accept | Per-provider read status table added (no code reads the CRM salesperson; VinSolutions push hardcodes "AI SPYNE", solution-context); "mine" ships only where a source is connected, else team view |
| gm-r1-4 | gm | accept | "Mine" appears only where the CRM/DMS source is connected, else team view [E43]. Console reassign not added: owners change in the CRM or scheduler under the fixed intent; mismatch cannot arise when the owner is read from there |
| backend-engineer-r1-4 | backend-engineer | accept | One owner field per rooftop, crm-core on or off; Q17 and Q21 are a gate before the engineering estimate; takeover claimant removed as an owner source |
| backend-engineer-r1-2, general-sales-manager-r1-3 | backend-engineer, general-sales-manager | accept | "Unanswered" defined per channel as a customer waiting on a person; what Vini fully answers stays out [E10, E31]; every channel writer stamps it, backfilled before launch (solution-context, Who else calls it) |
| general-sales-manager-r1-4, gm-r1-3, service-manager-r1-2 | general-sales-manager, gm, service-manager | accept | Clear rule: console reply or call, CRM activity only where read, else one-click "Handled elsewhere" or "No reply needed" with actor and time [E13] |
| backend-engineer-r1-3 | backend-engineer | accept | Same clear rule; the table row now reads "only an answer or handled" |
| gm-r1-1, general-sales-manager-r1-7 | gm, general-sales-manager | accept | Escalation added: past N minutes in store hours, moves to the team view and texts the named role [E6]; N is an open question |
| gm-r1-5 | gm | accept | Team view owned by a named role per department (sales or BDC manager; service manager or service BDC lead) |
| backend-engineer-r1-6 | backend-engineer | accept | Alerts: owner only where connected, one per episode, failures logged; detail (dedupe key, rate limit, retry) goes to the PRD |
| backend-engineer-r1-5 | backend-engineer | accept | Per-rooftop flag, default off |
| backend-engineer-r1-7, ceo-r1-6 | backend-engineer, ceo | accept | Baseline from reply events shipped before the UI; target per department set from it [Q15] |
| ceo-r1-2, gm-r1-6 | ceo, gm | accept | Cost line now cost removed: manager cross-checking time and hours a customer waits at the AI-to-salesperson handoff; "leads going cold" dropped (org fact 3) |
| general-sales-manager-r1-8 | general-sales-manager | accept | Appointments shown and ROs opened added as a check, not the claim; the claim stays hours removed (org fact 3) |
| service-manager-r1-5 | service-manager | accept | ROs opened on waiting conversations in the check line, unknown today [Q15] |
| ceo-r1-3, general-sales-manager-r1-5 | ceo, general-sales-manager | accept | TL;DR no longer claims the CRM step goes away [E10] |
| gm-r1-2 | gm | accept | Console replies posted to the CRM named as a dependency, status unknown; "After" column says CRM or scheduler/DMS stays until CRM-first |
| ceo-r1-7, general-sales-manager-r1-9, gm-r1-7 | ceo, general-sales-manager, gm | accept | CRM-first full-value path stated (tasks on the CRM salesperson, replies posted back), needs certified write-back per provider, planned after this read-only release [E16, E34] |
| ceo-r1-5 | ceo | accept | Size L, kept separate from Console v2 [E23]; what it displaces is Open question 6 (PM) |
| general-sales-manager-r1-6 | general-sales-manager | accept | Manager view: count and oldest wait per owner [E6] |
| service-manager-r1-1 (+ ceo-r1-8) | service-manager, ceo | accept | Service value and user marked unknown; Q10 is Open question 4, answered by a service manager at a live Vini Service rooftop |

## Minor (bulk)
Accepted, applied in short form: backend-engineer-r1-8 (estimate after Q17 to Q19), backend-engineer-r1-9 (service "none read [Q19]", not "no field"), backend-engineer-r1-10 (count reuses the list total), ceo-r1-9, ceo-r1-10 (Decision opens with what we build), gm-r1-8 (count gated on Q21, via Open question 2), gm-r1-9 (cross-department owner in Open question 5), service-manager-r1-6 (scheduler/DMS in "After"), service-manager-r1-7, service-manager-r1-8 (service user unknown), service-manager-r1-9 (who answers changed).
Skipped: gm-r1-10 per-agent coverage list, cut for length; it stays in decide.md rung 6.

## Escalated
None. The only intent-challenge (ceo-r1-1) was resolved by the PM on 2026-10-16.
