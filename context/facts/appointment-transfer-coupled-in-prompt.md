---
id: system-fact--appointment-transfer-coupled-in-prompt
kind: system-fact
area: vini-sales
status: stable
owner: yash.sharma
source: conversational-ai-backend commits 59ae139c6, d715f30dd; memory project_prompt_lever_review.md (2026-10-01), project_prompt_metric_mapping.md (2026-10-01)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Expect any new guardrail or fallible pre-ask tool to raise transfers AND cut the appointment ask together.

**Why:**
- `GuardrailBoundaryRouting` sends any guardrail block, failed tool or unavailable verified data to the human path; `EscalationPosture` + `InboundEscalation` then forbid appointment pressure. Both metrics move with nobody editing a nudge or escalation rule.
- Held when measured: the channel that inherited the escalation apparatus lost appointments, not just gained handoffs. (Transfer predictions from the same review hit 5 of 6 overall.)
- Booking preconditions stacked Jun-Jul 2026 (phone, hours, stock, ZIP/rooftop, name+confirm, tool refusals), each defensible, never counted together. The first ask is gated behind a `dealership_check_hours` result (`59ae139c6`).
- Three levers are runtime config, not prompt text, so two rooftops on one build behave differently: `assertiveness` (at medium/high the two-nudge cap is gone; extended to inbound by `d715f30dd`, 2026-08-14), `available_transfer_departments`, `is_request_only_visit_flow` (replaces appointment conversion wholesale).

**Instead:** when appointment or transfer moves, check the coupling and per-rooftop config before hunting for a nudge-rule edit.
