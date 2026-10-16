# Overnight website leads get the same first text whether they booked, applied for credit or just asked

**Author:** Vini Sales PM · **Date:** 2026-10-16 · **Status:** Draft v3 · **Ticket:** Freshdesk 24140 · **Area:** vini-sales
**Flywheel stage:** lead to appointment; credit apps stay with the store until an F&I owner is named (Q28)

## Decision
Build-generalised: asked for three openers at one rooftop; building a per-type opener for any rooftop, with CRM-first write-back planned now as the resolution [E1, E22, E32, E36] [PM].
Ask: approve steps 0 and 1. Step 2 (M, judgment) is direction only until volume (Q15) and displacement (Q14) are known; it stands without write-back. Step 3 (L) is dated once channel and size are known (Q10, Q17).

## TL;DR
Every after-hours website lead gets one opener, so booked customers are pushed to rebook and credit applicants get a pitch. Inquiries first, then the first text by lead type; BDC callbacks and hand-keying come off only with step 3 write-back.

## Problem
- The BDC calls website leads next day and keys outcomes by hand; Ava should reach after-hours ones first [E8, E9, E13].
- The VP Marketing wants Ava to "confirm appointments when there are appointments" and avoid credit and PII [E5, E6].
- One shared prompt writes every STL opener; lead type is only an on/off switch [E36].

## Evidence
- STL off keys on external_type, unset types fall to DEFAULT, and the follow-up cadence keeps running [E41].
- Suppression cannot see dealer texts or BDC calls; opt-out honours only an exact "STOP"; no consent check [E42, E43].
- 3 other companies raised adjacent jobs on calls, 0 in tickets; write-back asked here only [E21, E22].

## Recommendation
- **Step 0, no build, inquiries only.** The dealer planned to forward applications too [E9]; the CSM confirms the forward excludes them and tests one of each (Q33).
- **Follow-up off:** first text only; silence nudge off, forwarding source excluded from the cadence, both existing settings [E43, E44].
- **Go-live checks:** test lead source and type (Q19), dealer texts paused (Q25), consent and STOP-only opt-out accepted in writing (Q24), first text before BDC open (Q22), a forwarded test lead receives its first text (the queue path can skip it, `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:193`; Q34). Dealer dates: this one and the step 1 answer [E10, E31].
- **Handoff:** today's STL email with each lead's status goes to the BDC manager (Q26), else Console until a step 2 morning list. The BDC manager calls any slipped appointment or credit-app lead; the CSM spot-checks week one.
- **Step 1:** prove lead type and appointment reach external_type (Q23) and the reply turn (Q12).
- **Step 2:** literal credit-app text; confirms carry date, time and store, or none. Both wait for Q12; then credit-app replies get a holding text and BDC task (Q31), reschedules a task or handoff line (Q27). Follow-up stays off; the BDC manager checks confirmed details before open; opt-out widens beyond STOP.
- **Step 3:** CRM read where we have access, write-back where certified (Q29), else ADF in, one no-API channel out (Q10) [E12].

Per rooftop: type mapping and opener, credit-app held out (default) or acknowledged, handoff recipient, write-back channel.
Not building: lead-type inference from free text, a Spyne appointment copy (Q7), service openers, widget changes (already SMS-only) [E4, E11].

## What it removes
| Measure | Today | After | Source |
|---|---|---|---|
| BDC next-day calls | every lead | called with status in hand; step 3: unresolved only | [E8, E12], Q15 |
| Time to first contact | next day | before BDC open, or no change | [ASSUMPTION: STL silent hours allow a first text before the BDC opens] |
| Online-appointment show rate | unknown | dealer-reported, CSM owns; our rebook-text count, target 0 | [E6], Q28 |
| Outcomes keyed by hand | every conversation | from the handoff; 0 after step 3 | [E12, E13] |

## Risks and dependencies
- Least sure: lead type reaching external_type (Q23); if not, step 2 waits on a parser port and is re-sized (Q18).
- No-API write-back is a new channel and a commercial agreement (Q21); we replace nothing.

## Open questions
| # | Who answers | Blocks |
|---|---|---|
| Q4, Q19, Q22, Q24 to Q26, Q33, Q34 | Engineering, CSM | Step 0 |
| Q11, Q12, Q14, Q15, Q23, Q27, Q28, Q31 | Engineering, CSM, PM | Steps 1 and 2 |
| Q10, Q17, Q21, Q29 | Engineering, CSM | Step 3 |
