---
id: data-trap--clickhouse-null-and-type-traps
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/abr-trends.sql; memory project_abr_sep_refresh.md (2026-10-01), project_inbound_performance_page.md (2026-08-14), project_sales_lead_sync_gate.md (2026-08-25)
verified: 2026-10-01
confidence: high
reject_reasons: reviewer rejected; C1: the Rule joins three unrelated traps with 'and' (Nullable LEFT JOIN, string flags, multiIf timezone), and each has its own fix; C1: the '0'/'1' flag trap comes from eval exports, not ClickHouse, so the shared 'in ClickHouse' scope does not fit all of them; C6: all four claims are confirmed in the cited memory files; C2-C5, C7, C8 pass; the conversation_fact neighbour only cross-references the multiIf trap and does not duplicate it
fix_hint: Split this into separate one-rule entries (the Nullable LEFT JOIN guard, the string-typed outcome and flag comparison, and the multiIf timezone branch), each with its own source line. The conversation_fact entry should then point to the multiIf entry.
---

**Rule:** Guard Nullable joins, string-typed flags and `multiIf` timezones explicitly in ClickHouse.

**Why:**
- `cv.booked` in `abr-trends.sql` is Nullable from a LEFT JOIN: `booked=0` silently returns no rows.
- `conversationEval.outcomeAchievable` / `outcomeAchieved` are Nullable(String) (Appointment / Transfer / Query Resolved / Callback / Qualified Lead), not booleans; `outcomeGap` is UInt8. `argMax` picks an empty later row unless filtered.
- Eval exports carry outcome flags as strings `'0'`/`'1'`; naive truthiness matches everything.
- `multiIf` returns the timezone of its FIRST DateTime branch (root cause of `conversation_fact.after_hours` putting every rooftop in America/New_York).

**Instead:** `ifNull(c.booked,0)=0`; `argMaxIf(x, ts, x != '')`; compare flags to `'1'`; make every `multiIf` branch return an integer, e.g. `toHour(toTimeZone(ts, tz))`.
