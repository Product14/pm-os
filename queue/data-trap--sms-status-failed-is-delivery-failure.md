---
id: data-trap--sms-status-failed-is-delivery-failure
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: apps/reporting-vini/vini_sms_funnel_weekly.sql; memory project_sms_funnel_dashboard.md (2026-08-14)
verified: 2026-08-14
confidence: high
---

**Rule:** Do not drop `conversations.status='failed'` from SMS funnels; it is the failed-delivery population.

**Why:**
- July 2026: 27k failed conversations, 97.6% of their outbound messages failed, 394 had anything delivered.
- Most repo queries exclude them, hiding ~12% of attempted volume and making delivery rate read ~99%.

**Instead:** keep them and gate the funnel on `delivered_out`, as `vini_sms_funnel_weekly.sql` does. Do not "align" back to the status filter in `vini_capability_split.sql`.
