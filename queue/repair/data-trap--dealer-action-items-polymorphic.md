---
id: data-trap--dealer-action-items-polymorphic
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: apps/reporting-vini/vini_sms_drilldown.sql; memory project_sms_funnel_dashboard.md (2026-08-14), project_sales_inbound_lead_funnel.md (2026-08-26), project_abr_sep_refresh.md (2026-10-01)
verified: 2026-10-01
confidence: high
reject_reasons: reviewer rejected; C6: cited SQL path apps/reporting-vini/... does not exist in the repo, so the source is contradicted as written; C6: the substance checks out: the memory files and the SQL at its real path support every claim; C1-C5, C7, C8 pass: one normalisation rule, actionable Instead line, team-reusable warehouse trap, no neighbors to conflict with
fix_hint: Change the source path to apps/vini-daily-calls/src/abr-trends/vini_sms_drilldown.sql and resubmit. It should then merge at low risk.
---

**Rule:** Never count raw `dealerActionItems`; normalise shape and naming first.

**Why:**
- ~75% are objects with `intent`, ~25% bare strings (stable monthly, not legacy).
- Intent vocabulary mixes SCREAMING_SNAKE and CamelCase generations, not deduped.
- `SALES_LOST_LEAD` = 76% of structured items, first appears week of 2026-06-29, so raw counts are dominated by the agent giving up.
- Structured action items only exist from week of 2026-06-29: no earlier baseline.
- 66% of action items on Sales Inbound calls (Aug 2026) are auto-written `NO_MEANINGFUL_INTERACTION` on ghost calls.

**Instead:** parse both shapes, map both naming generations, and use the productive split (exclude `SALES_LOST_LEAD` / `NO_MEANINGFUL_INTERACTION`), as in `vini_sms_drilldown.sql`.
