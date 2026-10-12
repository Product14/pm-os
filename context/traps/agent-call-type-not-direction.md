---
id: data-trap--agent-call-type-not-direction
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_sales_inbound_lead_funnel.md (2026-08-26), project_customer_simulator.md (2026-10-08), project_inbound_performance_page.md (2026-08-14)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never derive SMS direction or motion from `agentTypes.agentCallType` or `smsFlowJourneySource`.

**Why:**
- All 24,918 "inbound" Sales SMS conversations (1-25 Aug 2026) carry a `followupId` and no `outboundTaskId`: every one is speed-to-lead outreach.
- Sales Inbound SMS is 99.6% replies to STL outreach (real-customer pull, Oct 2026).
- `smsFlowJourneySource` reads `'speed_to_lead'` on 96% of all SMS, so it discriminates nothing.
- The Sales Inbound agent type answers inbound calls AND runs STL / follow-up outreach AND places some outbound calls.

**Instead:** Derive motion from `followupId` (STL / follow-up) vs `outboundTaskId` (outbound task). For calls, filter to `inboundPhoneCall`.
