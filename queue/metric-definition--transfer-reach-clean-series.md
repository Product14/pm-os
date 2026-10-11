---
id: metric-definition--transfer-reach-clean-series
kind: metric-definition
area: vini-service
status: candidate
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/ROADMAP-SERVICE-INBOUND.md; memory project_service_inbound_roadmap.md (2026-10-05), project_transfer_escalation_research.md (2026-10-06)
verified: 2026-10-06
confidence: medium
---

**Rule:** Report transfer reach (did a human answer) on the clean series, never raw eligible counts or `bridged`.

**Why:**
- Dealer lines ring out and forward to the Spyne number (~57s later in the service sample; rollover p50 26s in prod), our agent answers its own whisper, and the leg is logged `bridged`.
- 42.5% of Service Inbound transfers reached no human (scored sample, 6 Jul-4 Oct 2026); 43.2% of all dialed transfers (prod, 6 Sep-5 Oct 2026). Spyne internal figures.
- Top 10 rooftops produce 78% of the misses, so averages hide a concentrated problem.

**Instead:**
- Transfer happened: `callDetails_endedReason IN ('transferred','assistant-forwarded-call')`.
- Clean series: drop forwarded-back legs and numbers with 30+ calls in 14 days.
- Reach = transfers answered by a human / clean transfers. Report Sales and Service separately.
