---
id: data-trap--agent-self-report-fields
kind: data-trap
area: vini-sales
status: candidate
owner: yash.sharma
source: brainstorming-flows/projects/call-analysis/abr-deepdive/ABR-DEEPDIVE.md; memory project_abr_deepdive.md (2026-08-11), project_sales_lead_sync_gate.md (2026-08-25)
verified: 2026-08-25
confidence: high
---

**Rule:** Do not trust the agent's own qualified / transferred / intent fields; use deterministic tool evidence.

**Why:**
- `agent_qualified` / `agent_transferred` were 0% populated in the 10,180-call eval corpus (May-Aug 2026).
- `booking_tool_fired` (a real `sales_create_meeting` invocation) agrees with the LLM judge on 99.5% of calls.
- `callback_tool_fired` = 0.0% across all 10,180 calls while the agent promised callbacks: spoken callbacks have no tool backing.
- Free-text `primary_intent` has 49 distinct values, "No Intent" on 40% of rows (Aug 2026).

**Instead:** tool invocations (`sales_create_meeting`), `dealer_leads.meetings` rows, `callDetails_endedReason`; re-derive intent and qualification from transcripts.
