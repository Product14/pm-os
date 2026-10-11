---
id: system-fact--outbound-journey-routing
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: conversational-ai-backend journey-router.xml:11, campaign.utils.ts:89-99, workflowTemplates/dto/configure-campaign-workflow.dto.ts, src/call/dto/call-prompt-variables.dto.ts; memory project_outbound_demo_flow.md (2026-10-07)
verified: 2026-10-07
confidence: medium
---

**Rule:** Check the journey router before assuming an outbound journey has its own prompt.

**Why:**
- Campaign enum: `CampaignWorkflowUseCase`. Demo `call/start` uses `OutboundJourneyName` (AGED_LEAD_FOLLOWUP, LEASE_EXPIRY, EQUITY_MINING, DUE_SERVICES, RECALL, DECLINED_SERVICES, ...; no PRE_APPROVED_OFFER).
- NO_SHOW_RECOVERY and INVENTORY_PRICE_DROP have no journey prompt and fall to `default-outbound-sales.xml`.
- OVERDUE_SERVICES, lapsing and winback all collapse to DUE_SERVICES.
- SMS uses the same journey XML via its `communication_medium=='sms'` branch.
- Field gotchas: prompt reads `lastVisitDate` but campaign upload requires `lastServiceDate`; `vehicleMake` etc. are renamed `customer_interest_vehicle_*`. Prompt variables outside `call-prompt-variables.dto.ts` are rejected.
- Pre-approved offer turns on when lender / approval amount / expiration / deal type is present. Service prefetch (needs VIN, mileage, journeyName) runs only on campaign and SMS paths.

**Instead:** read `journey-router.xml` and `campaign.utils.ts` first; pass only whitelisted prompt variables.
