---
id: system-fact--demo-booking-flags
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: conversational-ai-backend commit da16a3fa3 (RETCONVAI-4886); web-call.service, demo-flow.service; memory project_service_demo_flow_gaps.md (2026-10-05), project_outbound_demo_flow.md (2026-10-07), project_abr_distinct_phones.md (2026-10-01)
verified: 2026-10-07
confidence: medium
---

**Rule:** Exclude demo bookings via `is_demo_meeting`, and assume outbound-path demo calls are NOT flagged.

**Why:**
- Since 2026-09-10 create-appointment sends `is_demo_meeting=true` (sales-book-appointment, sales-create-meeting, service-integrations create) when `ToolContext.isDemoCall`.
- `isDemoCall` is set only by the demo web call and demo chat; nothing in outbound-tasks sets it (uat-release, Oct 2026).
- Unverified: whether crm-core / service-integrations skip the DMS / CRM write for demo meetings.
- Phones that book at many rooftops (one booked at 13 rooftops, May-Sep 2026) are likely internal testers; if so they inflate appointments on every dashboard.

**Instead:** filter `is_demo_meeting`; check booked phones that span multiple rooftops before trusting appointment counts.
