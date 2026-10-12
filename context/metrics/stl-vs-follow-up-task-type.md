---
id: metric-definition--stl-vs-follow-up-task-type
kind: metric-definition
area: vini-sales
status: stable
owner: yash.sharma
source: memory project_inbound_performance_page.md (2026-08-14)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--stl-eligibility-and-coverage
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Split STL from follow-up activity by `sequenceTasks.taskType`: `STL` and `STL_FOLLOW_UP` count as STL, and `FOLLOW_UP` counts as follow-up sequences.

**Why:** The stakeholder gave this mapping directly for the inbound performance page. `STL_FOLLOW_UP` belongs to STL, not to follow-up sequences, and the name makes that easy to get wrong.

**Instead:** Bucket by `taskType` with this mapping. Do not classify by name prefix or by sequence membership.
