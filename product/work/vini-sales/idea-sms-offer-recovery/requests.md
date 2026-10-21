# Context requests

### R1
- question: Across the 47 winnable SMS threads with an untaken offer and the 10 inventory-miss dead ends in the 21 Oct Sales Inbound weekly read (results/sms-b1..b4.json), how many distinct rooftops do they span, and how many threads per rooftop?
- blocks: decide.md Ladder rung 3 and Inputs > Demand breadth
- why: the measured frequency is high but could sit at one or two stores; rooftop spread is the demand count for an idea with 0 tickets
- source: context
- status: answered (E42)

### R2
- question: Which CRM integrations sync sales action items to the dealer's CRM (the job that sets external_crm_synced_timestamp, conversational-ai-backend:src/action-items/action-items.controller.ts:164), what object they write (task, note or activity), and do they carry a due time?
- blocks: decide.md Ladder rung 4 (sourcing intent), rung 7 (Full value CRM task), Inputs > Cost and risk
- why: decides whether a sourcing request with a visit time reaches the dealer's CRM on an existing path (S) or needs new write-back per CRM (L)
- source: bluebrain
- status: answered (E43..E53)

### R3
- question: For the 12 winnable SMS threads in the 21 Oct weekly read where an offered time was not taken and no follow-up was sent (results/sms-b1..b4.json, after_unaccepted_offer = no_follow_up), why did no wake-up go out: wake-ups disabled for the team, cap reached, a skip rule (meeting exists, non-scheduling action item, isConcluded, SOFT_DECLINE, CALLBACK_REQUESTED), or a failed send? Count per reason.
- blocks: one-pager Recommendation phase 1 (fix a setting or skip rule vs change the nudge) and the "Untaken offer with no next message" row; Q11
- why: phase 1 must not add a nudge if silence is a skip rule or a setting
- source: clickhouse
- status: answered (E59..E63)

### R4
- question: For SMS leads (Sales Inbound and STL) from 1 Sep to 20 Oct 2026, what is the median number of days from lead created to the booked visit's scheduled time, for visits set inside the first SMS thread vs visits set later (after the thread went idle)? Join meetings to the conversation directly, not by lead and time window.
- blocks: one-pager "What it removes" row "Days from lead to visit"; Q7
- why: days removed is the P&L claim and it is unmeasured
- source: clickhouse
- status: answered (E64, E65, E66)
