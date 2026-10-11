---
id: data-trap--clickhouse-null-and-type-traps
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/abr-trends.sql; memory project_abr_sep_refresh.md (2026-10-01), project_inbound_performance_page.md (2026-08-14), project_sales_lead_sync_gate.md (2026-08-25)
verified: 2026-10-01
confidence: high
---

**Rule:** Guard Nullable joins, string-typed flags and `multiIf` timezones explicitly in ClickHouse.

**Why:**
- `cv.booked` in `abr-trends.sql` is Nullable from a LEFT JOIN: `booked=0` silently returns no rows.
- `conversationEval.outcomeAchievable` / `outcomeAchieved` are Nullable(String) (Appointment / Transfer / Query Resolved / Callback / Qualified Lead), not booleans; `outcomeGap` is UInt8. `argMax` picks an empty later row unless filtered.
- Eval exports carry outcome flags as strings `'0'`/`'1'`; naive truthiness matches everything.
- `multiIf` returns the timezone of its FIRST DateTime branch (root cause of `conversation_fact.after_hours` putting every rooftop in America/New_York).

**Instead:** `ifNull(c.booked,0)=0`; `argMaxIf(x, ts, x != '')`; compare flags to `'1'`; make every `multiIf` branch return an integer, e.g. `toHour(toTimeZone(ts, tz))`.
