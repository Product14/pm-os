---
id: metric-definition--call-booking-window-plus-minus-7-days
kind: metric-definition
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_sms_funnel_dashboard.md (2026-08-14, item 7)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--booked-appointment-attribution
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Attribute a meeting to a Vini call when it was created within ±7 days of the call, and do not apply the SMS >30s rule.

**Why:** For a call, `conversations.createdAt` is when the call ENDED, so a meeting booked during the call is created before it (median -68s). The SMS >30s rule kept under 2% of call bookings. A ±1h window also dropped real bookings created 1-3h off. Very few bookings fall outside ±7 days.

**Instead:** For calls, match `meetings.conversation_id` with a symmetric ±7-day window around `conversations.createdAt`. Keep the >30s-after rule for SMS only.
