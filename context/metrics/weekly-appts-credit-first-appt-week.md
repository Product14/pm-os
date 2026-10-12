---
id: metric-definition--weekly-appts-credit-first-appt-week
kind: metric-definition
area: data-warehouse
status: stable
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/features.sql (line 193, first_appt; weekly fix in commit b3c2fec); memory project_weekly_appt_double_count.md (2026-10-01)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--booked-appointment-attribution
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: medium
---

**Rule:** At weekly grain, credit a booking only to the week that contains the lead's `first_appt`.

**Why:** If you join appointments to weekly conversation rows without a date test, one booking is counted in every week the lead talked. Weekly appointments then overcount against the 30-day total. Leads land in two weeks easily because weeks bucket on UTC: a Pacific Sunday speed-to-lead (STL) contact and its follow-up cross UTC midnight into Monday.

**Instead:** Add a condition that `first_appt` falls inside the week. A few leads book in a week where they had no conversation, so no week credits them. That is accepted. With this condition, weekly appointments can be summed per rooftop. Weekly leads still cannot be summed, because a lead counts in every week it talked.
