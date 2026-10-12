---
id: metric-definition--sms-booking-requires-meeting-after-30s
kind: metric-definition
area: data-warehouse
status: stable
owner: yash.sharma
source: apps/vini-daily-calls/src/abr-trends/vini_sms_funnel_weekly.sql (lines 93-113, 515-521); memory project_sms_funnel_dashboard.md (2026-08-14)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--booked-appointment-attribution
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Count an SMS conversation as booked only if its `dealer_leads.meetings` row (strict `conversation_id` match, `source='spyne'`, `is_active=1`) was created more than 30 seconds after the conversation.

**Why:** A service-upsell / equity-mining campaign texts customers who already have an appointment and writes the meeting row the moment the conversation is created, with `source='spyne'`, so no source filter catches it. In Jun-Aug 2026 about one in five "booked" SMS conversations were these pre-existing appointments. The timing separates cleanly: real SMS bookings land at least 46s after the conversation (p1 93s), and pre-existing ones land at a median of 0s.

**Instead:** Require `dateDiff('second', conversation_ts, meeting_created_at) > 30` for SMS bookings. Track the <=30s set separately as pre-existing appointments, so a new variant of the pattern shows up instead of quietly inflating bookings.
