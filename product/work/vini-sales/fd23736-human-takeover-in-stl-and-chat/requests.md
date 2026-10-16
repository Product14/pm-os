# Requests

### R1
- question: In conversational-ai-backend, does `toggleHumanHandoverLocked` (src/sms/sms.service.ts) or the takeover task skip in src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:659 condition on agentType or department? Do chat-service handover sessions carry a service agent type?
- blocks: decide.md ladder rung 6 (Service SMS and Service web chat); Q10
- why: decides whether 5165's note and the delta must be designed for service conversations
- source: bluebrain
- status: answered (E31, E32, E33)

### R2
- question: Why does the sequence orchestrator (src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:659) deliberately not suppress CALL-channel tasks during human takeover? Look for a code comment, commit message or linked ticket.
- blocks: decide.md ladder rung 4 (out-to-every-channel wire); Inputs > Cost and risk; Q15
- why: the "AI paused" note is false while calls fire; the exclusion may be intentional
- source: bluebrain
- status: answered (E34)

### R3
- question: Count of Console SMS takeovers (humanTransferDetails.phase ever ACTIVE, or human-transfer claimed events) per rooftop in the last 30 days, for this rooftop and for all rooftops on DriveCentric.
- blocks: decide.md ladder rung 3; Inputs > Demand breadth (delta); Q1, Q12
- why: a takeover note does nothing where reps never press takeover
- source: clickhouse
- status: unanswerable

### R4
- question: Does the July 2026 crm-sync-enhancements stop-outbound requirements doc define manual per-lead pause or CRM rep activity as a reason to stop outbound, and what is its status?
- blocks: decide.md Inputs > Prior decisions; Q16
- why: the in-from-CRM wire may already be specified elsewhere
- source: context
- status: answered (E35, E36)

### R5
- question: Current assignee, sprint and status of RETCONVAI-5165 and RETCONVAI-5190, and whether 5190 covers suppressing call tasks on any takeover or only the reported lead.
- blocks: decide.md ladder rung 7 (when); As asked vs as solved row "Go live this week"; Q9
- why: the 5165 gap is scheduling; the call half depends on 5190
- source: jira
- status: answered (E37, E38)
