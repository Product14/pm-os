---
id: data-trap--stl-notask-vs-skipped
kind: data-trap
area: vini-sales
status: stable
owner: yash.sharma
source: brainstorming-flows/projects/stl-audit/ATTRIBUTION-FINDINGS.md; memory project_stl_rooftop_dashboard.md (2026-09-21)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--stl-eligibility-and-coverage
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Treat `noTask` (no STL task was ever created) and `skipped` (a task was created and then declined) as separate defects.

**Why:** In the Sep 2026 attribution pass, 52% of eligible-but-unmessaged leads had no STL task and no `sequenceWorkflows` row at all. A rooftop at 100% `noTask` points to a problem upstream of the STL engine. The aggregate skip reasons explain only the leads that got a task.

**Instead:** Report `noTask` and `skipped` separately. Never read aggregate skip reasons as a per-lead explanation for unmessaged leads.
