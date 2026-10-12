---
id: metric-definition--booked-appointment-attribution
kind: metric-definition
area: data-warehouse
status: candidate
owner: yash.sharma
source: apps/reporting-vini/vini_sms_funnel_weekly.sql; src/abr-trends/vini_funnel_base.sql; Vini-Success-Dashboard/products/sales-inbound/queries/features.sql (commit b3c2fec); memory project_sms_funnel_dashboard.md (2026-08-14), project_weekly_appt_double_count.md (2026-10-01), project_abr_sep_refresh.md (2026-10-01), project_abr_distinct_phones.md (2026-10-01), project_vini_red_history.md (2026-09-11)
verified: 2026-10-01
confidence: high
reject_reasons: reviewer rejected; C1: bundles independent rules: SMS window, call window, weekly crediting, reminder exclusion, phone dedupe, source-stamping note; C6: two cited SQL paths are wrong or missing in the repo (contradicted); C5: every number checks out against the cited memory files; C8: agrees with data-trap--conversation-fact-unreliable (meetings as the spine); no conflict
fix_hint: Split into separate entries (booking time window per channel; weekly crediting on first_appt; exclude appt_reminders; unique-phone source), and correct the source paths to files that exist (apps/vini-daily-calls/src/abr-trends/vini_sms_funnel_weekly.sql) or drop the missing vini_funnel_base.sql.
---

**Rule:** Count a booking from `dealer_leads.meetings` (strict `conversation_id` match, `source='spyne'`, `is_active=1`) with a channel-specific time window.

**Why:**
- SMS: a service-upsell / equity-mining campaign writes PRE-EXISTING appointments at conversation creation with `source='spyne'` (306 of 1,513 "booked" SMS conversations, Aug 2026). Genuine SMS bookings land >= 46s after the conversation.
- Calls: `conversations.createdAt` is the call END, so in-call bookings land before it (median -68s). The SMS rule kept 71 of 3,969 call bookings; +/-1h also drops real ones.
- Weekly grain: a lead talking in two weeks carried one booking into both (336 weekly credits for 286 booked leads, as_of 2026-09-30). UTC week buckets split Pacific Sunday STL across Monday.
- Appointment reminders go only to already-booked leads; counting them is circular.
- `meetings.source='spyne'` stamping jumped ~6x in Aug 2026 as null-source collapsed: recent counts are not understated.

**Instead:**
- SMS: meeting created > 30s after the conversation. Calls: +/-7 days symmetric.
- Weekly: credit the week containing `first_appt` (accepts a few bookings with no conversation that week). Weekly appts sum per rooftop; weekly leads do not.
- Exclude `appt_reminders`. `sales_outbound` reads low by design; treat as a floor.
- Unique phones: `leads.customer_id -> customer.mobile_number`, last 10 digits (covers 2,128 of 2,130 booked leads); `conversations.number` covers only 82%.
