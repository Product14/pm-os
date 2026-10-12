---
id: data-trap--aggregated-product-details-current-state
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: Vini-Success-Dashboard sales-outbound-roster.sql, call-hours-7d.sql; memory project_vini_enablement_tab.md (2026-08-27), project_vini_red_history.md (2026-09-11), project_inbound_performance_page.md (2026-08-14)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never treat `aggregated_product_details` (or `conversationNotifications`) as history; an as_of replay describes old days with today's roster.

**Why:**
- Keeps no history of stage or commercial columns. Queries that accept `{as_of}` still read the current roster (`sales-outbound-roster.sql`: "{as_of:Date} is ACCEPTED BUT UNUSED"). Replaying 2026-08-26 a day later gave different bands than the live run.
- `live_date` is bulk-backfilled (35 of 120 pairs land on 3 days); 155 of 265 live conversationalAi rows have NULL `live_date`; 797 off-roster rows have no `churn_date`.
- 82 inbound-sales rows are `stage='Churned'` with `is_active=True`.
- A rooftop re-created under a new `team_id` looks brand new: tenure and trend history reset.
- `dealer_leads.conversationNotifications` (enablement flags) is also current-state; reads are `readonly=1`, so it cannot be backfilled.
- Its commercial columns are confidential; keep them out of shared outputs.

**Instead:** require `stage='Live'` (never `is_active` alone); derive first-traffic from conversations, not `live_date`; for history use dated snapshots, e.g. git "Daily data refresh" commits of `prototype/data-enablement.json` in Vini-Success-Dashboard.
