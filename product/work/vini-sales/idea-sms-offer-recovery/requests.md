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
