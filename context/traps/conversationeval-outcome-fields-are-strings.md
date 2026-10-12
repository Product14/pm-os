---
id: data-trap--conversationeval-outcome-fields-are-strings
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_abr_sep_refresh.md (2026-10-01)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--clickhouse-null-and-type-traps
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Treat `conversationEval.outcomeAchievable` and `outcomeAchieved` as Nullable(String) categories, and filter out empty values before using `argMax`.

**Why:** These fields hold the values Appointment, Transfer, Query Resolved, Callback and Qualified Lead. They are not booleans. Only `outcomeGap` is numeric (UInt8). Unless you filter first, `argMax` over these fields picks an empty later row.

**Instead:** Compare to the category string, for example `outcomeAchievable = 'Appointment'`. Use `argMaxIf(x, ts, x != '')` in place of a bare `argMax(x, ts)`.
