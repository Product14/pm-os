---
id: metric-definition--transfer-reach-clean-series
kind: metric-definition
area: vini-service
status: candidate
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/ROADMAP-SERVICE-INBOUND.md; memory project_service_inbound_roadmap.md (2026-10-05), project_transfer_escalation_research.md (2026-10-06)
verified: 2026-10-06
confidence: medium
reject_reasons: reviewer rejected; C2: numerator 'answered by a human' has no field or method; the neighbor trap says answered_at is always null, so a PM cannot compute reach; C2: 'drop forwarded-back legs' gives no detection rule, though the cited roadmap has one (inbound from dialed number, same rooftop, ~150s); C6: clean series is narrower than the cited roadmap, which also drops AI whisper legs; PMs would compute different denominators; C8: no conflict; the neighbor data trap defers reach to this entry, so the definition has to be complete
fix_hint: Say how a human answer is determined (the scoring method or field used for the 42.5%/43.2%), add the forwarded-back detection rule, and match the roadmap's clean denominator (forwarded-back legs, AI whisper legs, 30+ call numbers), all cited to the roadmap.
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
