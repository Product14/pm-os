---
id: metric-definition--calls-have-no-separate-engaged-step
kind: metric-definition
area: vini-sales
status: stable
owner: yash.sharma
source: memory project_sms_funnel_dashboard.md (2026-08-14)
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: metric-definition--qualified
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Do not add an Engaged step to the call funnel. The `role='user'` check that defines connected is already the only signal that the customer spoke.

**Why:** For calls, engaged and connected come from the same signal. A separate Engaged row would repeat Connected and look like a funnel stage that does not exist.

**Instead:** Build the call view with three funnel rows, not the four used for SMS.
