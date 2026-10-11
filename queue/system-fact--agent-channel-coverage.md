---
id: system-fact--agent-channel-coverage
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: memory project_inbound_performance_page.md (2026-08-14), project_gtm_followup_appt_docs.md (2026-07-27), project_sales_inbound_lead_funnel.md (2026-08-26)
verified: 2026-08-14
confidence: medium
---

**Rule:** Split every Vini metric by agent type and channel before comparing.

**Why:**
- Service Inbound runs no SMS at all (Aug 2026).
- Only ~10 of 67 live Sales Inbound rooftops ran STL (Aug 2026).
- Service produced ~1,115 of ~1,344 monthly appointments (Aug 2026, Spyne internal), so blended figures are service-dominated.
- The Sales Inbound agent type covers inbound calls plus STL / follow-up SMS outreach under one root.
- Follow-up sequences were SMS-only (Jul 2026).

**Instead:** report Sales and Service separately and channel by channel; re-check these counts before quoting, they age fast.
