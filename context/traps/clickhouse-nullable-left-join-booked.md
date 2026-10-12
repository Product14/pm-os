---
id: data-trap--clickhouse-nullable-left-join-booked
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

**Rule:** Wrap columns that come from a ClickHouse LEFT JOIN in `ifNull` before comparing them.

**Why:** In the ABR trend queries, `cv.booked` is Nullable because it comes from a LEFT JOIN. Comparing NULL to a value matches nothing, so `booked=0` silently returns no rows instead of the unbooked conversations.

**Instead:** Write `ifNull(c.booked, 0) = 0`, not `booked = 0`.
