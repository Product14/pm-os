---
id: data-trap--transfer-outcome-fields
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_transfer_escalation_research.md (2026-10-06), project_sales_inbound_lead_funnel.md (2026-08-26), project_service_inbound_roadmap.md (2026-10-05)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Do not read transfer success from `callTransferred`, `answered_at`, `callTransferEvents` or a `bridged` status.

**Why:**
- `endcallreports.callTransferred` reads 0 on all 4,484 real transfers (Aug 2026). Dead field.
- `conversational_ai_pg.call_transfer_attempts` (exists from 2026-06-29): `answered_at` is always null.
- Mongo `callTransferEvents`: one row per call, never updated with the outcome.
- Forwarded-back legs and voicemail are logged `bridged`, so they look connected and skip the action-item safety net.
- Open question: whether `endedReason='transferred'` means a human picked up or only that the leg bridged.

**Instead:**
- Transfer happened: `callDetails_endedReason IN ('transferred','assistant-forwarded-call')`.
- Destination: `dealer_leads.callTransferEvents.department` / `targetType` (department vs employee) / `contactName` (100% populated; `extension` ~4%). Use the LAST transfer by conversation time; an arbitrary tie-break moves leads between departments.
- Reach: see metric-definition--transfer-reach-clean-series.
