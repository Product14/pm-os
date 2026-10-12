---
id: metric-definition--unique-booked-phones-from-customer-mobile
kind: metric-definition
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_abr_distinct_phones.md (2026-10-01)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--booked-appointment-attribution
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Deduplicate booked leads by phone using `leads.customer_id -> customer.mobile_number`, normalized to the last 10 digits, never `conversations.number`.

**Why:** The customer mobile number covers essentially every booked lead (all but a handful), and `meetings.customer_id` matched the lead's customer on all of them. `conversations.number` covers only about 82% of booked leads, so deduping on it silently drops phones.

**Instead:** Join lead to customer on `customer_id`, take `right(mobile_number, 10)` so E.164 and 10-digit forms match, and count distinct numbers.
