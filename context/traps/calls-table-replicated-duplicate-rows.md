---
id: data-trap--calls-table-replicated-duplicate-rows
kind: data-trap
area: vini-service
status: stable
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/SYNTHESIS-NOTES.md (Extractor fixes, 5 Oct)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--service-inbound-extractor-traps
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Collapse replicated duplicate rows in `conversational_ai_pg.calls` before you sample or count Service Inbound calls.

**Why:** The table holds replicated duplicates of the same call, and one copy has empty messages. If you pick a row at random, calls go missing at random and weekly samples come up short.

**Instead:** When a call has duplicate rows, keep the row with the conversation (non-empty `messages`) and drop the empty one.
