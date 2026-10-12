---
id: metric-definition--sms-qualified-allowlists
kind: metric-definition
area: vini-sales
status: stable
owner: yash.sharma
source: apps/vini-daily-calls/src/abr-trends/vini_sms_funnel_weekly.sql
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: metric-definition--qualified
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Score SMS qualified with separate sales and service outcome allowlists, and include `Vehicle Inquiry` and `General Engagement` in the sales list.

**Why:**
- Sales and service SMS outcome vocabularies do not overlap. If you use one allowlist, every service conversation scores 0% qualified, and that looks like a real collapse.
- The original sales allowlist left out `Vehicle Inquiry` and `General Engagement`, so about 58% of actual bookings fell outside qualified. Over Jun 1 to Aug 13 2026 (sales_inbound), `General Engagement` booked at 8.14% and `Vehicle Inquiry` at 7.37%. `Pricing Inquiry` booked at only 1.49%, and it was already in the list. Both were added on 2026-08-13.
- On service_outbound, `General Engagement` books at 7.12% and is that department's largest single booking source. `Vehicle Inquiry` does not occur in the service vocabulary at all.

**Instead:** Choose the `sales_qualified` or `service_qualified` array by `agent_service`, as in `vini_sms_funnel_weekly.sql`. Edit only those two arrays. Keep `booked_not_qualified_leads` on every row as the standing check that the lists are still complete.
