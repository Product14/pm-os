---
id: data-trap--dealer-action-items-polymorphic
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: apps/vini-daily-calls/src/abr-trends/vini_sms_drilldown.sql; memory project_sms_funnel_dashboard.md (2026-08-14), project_sales_inbound_lead_funnel.md (2026-08-26), project_abr_sep_refresh.md (2026-10-01)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--dealer-action-items-polymorphic
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never count raw `dealerActionItems`; normalise shape and naming first.

**Why:**
- ~75% are objects with `intent`, ~25% bare strings (stable monthly, not legacy).
- Intent vocabulary mixes SCREAMING_SNAKE and CamelCase generations, not deduped.
- `SALES_LOST_LEAD` = 76% of structured items, first appears week of 2026-06-29, so raw counts are dominated by the agent giving up.
- Structured action items only exist from week of 2026-06-29: no earlier baseline.
- 66% of action items on Sales Inbound calls (Aug 2026) are auto-written `NO_MEANINGFUL_INTERACTION` on ghost calls.

**Instead:** parse both shapes, map both naming generations, and use the productive split (exclude `SALES_LOST_LEAD` / `NO_MEANINGFUL_INTERACTION`), as in `apps/vini-daily-calls/src/abr-trends/vini_sms_drilldown.sql`.
