---
id: data-trap--service-tool-status-vs-response-body
kind: data-trap
area: vini-service
status: stable
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/RUNBOOK.md (Gotchas #7); brainstorming-flows/projects/service-inbound-analysis/SYNTHESIS-NOTES.md (Extractor fixes, 5 Oct)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--service-inbound-extractor-traps
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Judge every Service Inbound tool result, including the booking result, from its response body, never from the logged status.

**Why:** Status is wrong in both directions. In `conversational_ai_pg.tool_invocation_events`, bodies carrying a 400 or 429 are logged `success`, and a scheduled booking was seen logged `error`. The per-call store records every tool as `completed`. The first extraction marked calls "confirmed" whenever any create was logged success, and some calls were scored as booked with no successful create.

**Instead:** Parse the tool response body into an outcome (ok, FAILED with the error, or cancelled), as `extract.py` does with `body_outcome`, and derive the booking result from that. Use `tool_invocation_events` only for latency.
