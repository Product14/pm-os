---
id: data-trap--clickhouse-multiif-first-branch-timezone
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_inbound_performance_page.md (2026-08-14)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--clickhouse-null-and-type-traps
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never return DateTime values from ClickHouse `multiIf` branches that use different timezones. Make every branch return an integer instead.

**Why:** `multiIf` returns the timezone of its first DateTime branch for every row. This is the root cause of `conversation_fact.after_hours` placing every rooftop in America/New_York.

**Instead:** Convert inside each branch, for example `toHour(toTimeZone(ts, tz))`, so `multiIf` returns an integer hour rather than a DateTime.
