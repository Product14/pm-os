---
id: system-fact--demo-booking-flags
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: conversational-ai-backend commit da16a3fa3 (RETCONVAI-4886); web-call.service, demo-flow.service; memory project_service_demo_flow_gaps.md (2026-10-05), project_outbound_demo_flow.md (2026-10-07), project_abr_distinct_phones.md (2026-10-01)
verified: 2026-10-07
confidence: medium
reject_reasons: reviewer rejected; C1: two independent rules, the demo-flag filter and treating phones that book at several rooftops as testers; C4: the claim that outbound demos are not flagged was a uat-release snapshot. The same memory records a new outbound demo call/start path merged on Oct 7, and web-call.service stamps isDemoCall, so it is likely already stale; C5: the multi-rooftop phones as internal testers point is a guess ('likely', 'if so'), and the DMS write-skip point is marked unverified in the entry; C6: the code confirms isDemoCall is set in web-call.service:172 and demo-flow.service, and that the booking tools emit the flag. The memory supports the outbound-tasks gap as of Oct 5
fix_hint: Resubmit as one durable rule: 'Exclude demo bookings with is_demo_meeting'. Re-check whether the outbound call/start demo path stamps isDemoCall before making any claim about outbound. Move the multi-rooftop tester phones into a separate data-trap entry only once a query or an owner confirms it.
---

**Rule:** Exclude demo bookings via `is_demo_meeting`, and assume outbound-path demo calls are NOT flagged.

**Why:**
- Since 2026-09-10 create-appointment sends `is_demo_meeting=true` (sales-book-appointment, sales-create-meeting, service-integrations create) when `ToolContext.isDemoCall`.
- `isDemoCall` is set only by the demo web call and demo chat; nothing in outbound-tasks sets it (uat-release, Oct 2026).
- Unverified: whether crm-core / service-integrations skip the DMS / CRM write for demo meetings.
- Phones that book at many rooftops (one booked at 13 rooftops, May-Sep 2026) are likely internal testers; if so they inflate appointments on every dashboard.

**Instead:** filter `is_demo_meeting`; check booked phones that span multiple rooftops before trusting appointment counts.
