---
id: metric-definition--transfer-reach-clean-series
kind: metric-definition
area: vini-service
status: stable
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/ROADMAP-SERVICE-INBOUND.md (thesis, section 1, NOW item 1, items 9-10); brainstorming-flows/projects/service-inbound-analysis/one-pagers/05-measurement.md; brainstorming-flows/projects/service-inbound-analysis/one-pagers/01-transfer-integrity.md; brainstorming-flows/projects/service-inbound-analysis/queries/roadmap-baseline.sql; brainstorming-flows/projects/service-inbound-analysis/queries/forwarded-back-transfers.sql; memory project_transfer_escalation_research.md (2026-10-06)
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: metric-definition--transfer-reach-clean-series
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Report Service Inbound transfer reach as human-reach on the clean series. Never use raw eligible counts or the `bridged` status.

**Why:**
- `bridged` means a leg answered, not that a person did. The dealer's department line rings out, and a median 57 s after our dial the dealer's phone system forwards the call to the Spyne agent number. Our own agent then answers either our warm-transfer whisper or the returning customer. The roadmap reports that 94% of these parent transfers are logged `bridged`.
- `call_transfer_attempts.answered_at` is always null, so it cannot tell you whether a human answered.
- Forwarded-back legs also inflate "eligible" calls. They were 10% to 21% of eligible calls in most weeks and 27% in w/c 28 Sep. Volume, transfer rate and booking rate all move with them.
- On this method, 42.5% of Service Inbound transfers reached no human (5-week clean baseline, w/c 31 Aug to w/c 28 Sep 2026; Spyne internal figure, `roadmap-baseline.sql`).

**Instead:**
- **Forwarded-back leg:** an inbound Spyne call from the same customer number, at the same rooftop (`team_id`), that starts within 150 s after a `call_transfer_attempts.dial_started_at` on an earlier call. The parent call of that dial is marked forwarded back.
- **Clean denominator:** for every Service Inbound metric, exclude:
  - forwarded-back legs. The 150 s rule catches both kinds: legs where our agent hears its own whisper (AI whisper legs) and legs where the customer comes back on the AI.
  - calls from numbers with 30+ calls in 14 days (store switchboards).
  - Show raw beside clean until the dashboards switch over.
- **Transfer:** `callDetails_endedReason IN ('transferred','assistant-forwarded-call')` on a clean call.
- **No human reached:** the transfer has any attempt status in `rejected`, `not_connected`, `failed` or `abandoned` (failed outright), or its parent is forwarded back.
- **Human reach** = transfers that are `bridged` with no forwarded-back leg within 150 s, divided by clean transfers. Once a human-speech signal on the transferred leg is available, require it as well.
- Report Sales and Service separately. Use `queries/roadmap-baseline.sql` and `queries/forwarded-back-transfers.sql` as the reference SQL.
