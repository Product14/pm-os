---
id: data-trap--sms-status-failed-is-delivery-failure
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: apps/reporting-vini/vini_sms_funnel_weekly.sql; memory project_sms_funnel_dashboard.md (2026-08-14)
verified: 2026-08-14
confidence: high
reject_reasons: reviewer rejected; C6: the cited SQL path does not exist in the repo. The query has moved to the abr-trends folder under vini-daily-calls; C6: the Instead line says vini_capability_split.sql has a status filter, but the current file has none; The rule itself is backed by the moved SQL and the cited memory file. This is a source fix, not a content problem; C1-C5, C7, C8 pass. It does not conflict with the qualified-definition neighbor
fix_hint: Change the source to apps/vini-daily-calls/src/abr-trends/vini_sms_funnel_weekly.sql, then resubmit. Either remove the vini_capability_split.sql reference or point it at a query that really filters out status='failed'.
---

**Rule:** Do not drop `conversations.status='failed'` from SMS funnels; it is the failed-delivery population.

**Why:**
- July 2026: 27k failed conversations, 97.6% of their outbound messages failed, 394 had anything delivered.
- Most repo queries exclude them, hiding ~12% of attempted volume and making delivery rate read ~99%.

**Instead:** keep them and gate the funnel on `delivered_out`, as `vini_sms_funnel_weekly.sql` does. Do not "align" back to the status filter in `vini_capability_split.sql`.
