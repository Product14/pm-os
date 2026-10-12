---
id: system-fact--exclude-demo-bookings-is-demo-meeting
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: conversational-ai-backend src/external_crm_integrations/meeting.schema.ts:215-222; src/call/web-call.service.ts:172; src/service-metrics/appointment-metrics.service.ts:182 (RETCONVAI-4886, commit da16a3fa3)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: system-fact--demo-booking-flags
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Exclude demo bookings from appointment counts with `is_demo_meeting`.

**Why:** Bookings made by the console demo-flow agent land in the same Meeting collection as real customer appointments. Create-appointment writes `is_demo_meeting=true` when the call's `ToolContext.isDemoCall` is set, and the demo web call stamps `isDemoCall: true`. The flag is written once at create and never toggled. Without the filter, demo bookings inflate appointment metrics.

**Instead:** Filter on `is_demo_meeting: { $ne: true }`, as the service-metrics services do. The field is optional, so do not match on `== false`. Do not assume a booking path stamps `isDemoCall` until you have checked that path.
