---
id: data-trap--sms-status-failed-is-delivery-failure
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: apps/vini-daily-calls/src/abr-trends/vini_sms_funnel_weekly.sql; memory project_sms_funnel_dashboard.md (2026-08-14)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--sms-status-failed-is-delivery-failure
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Do not drop `conversations.status='failed'` from SMS funnels; it is the failed-delivery population.

**Why:**
- July 2026: 97.6% of outbound messages in `status='failed'` conversations failed, and almost none of those conversations had anything delivered.
- Excluding them makes delivery rate read ~99% and hides a double-digit share of attempted volume, which is the volume-dilution signal an SMS funnel exists to catch.

**Instead:** Keep `status='failed'` conversations in the base and gate funnel stages on `delivered_out` (an outbound message with status `delivered` or `sent`), as `vini_sms_funnel_weekly.sql` does. Almost no `status='failed'` conversation has a delivered message, so `leads_texted` stays comparable to queries that use the status filter.
