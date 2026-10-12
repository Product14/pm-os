---
id: system-fact--outbound-journey-routing
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: conversational-ai-backend journey-router.xml:11, campaign.utils.ts:89-99, workflowTemplates/dto/configure-campaign-workflow.dto.ts, src/call/dto/call-prompt-variables.dto.ts; memory project_outbound_demo_flow.md (2026-10-07)
verified: 2026-10-07
confidence: medium
reject_reasons: reviewer rejected; C1: bundles about six independent facts (journey fallback, service-journey collapse, SMS branch, field renames, prompt-variable whitelist, pre-approved and prefetch triggers); C1: the Instead line joins two unrelated actions: read the router, and pass only whitelisted variables; C4: enum membership and which journeys lack a prompt reflect in-flight outbound work, so they are likely to change within a month; C6: the memory and router support the claims; the router also matches 'Agedleadfollowup', not AGED_LEAD_FOLLOWUP, which the entry glosses over
fix_hint: Split this into single-rule entries, for example one saying unmatched journeyNames fall back to default-outbound-sales.xml (cite journey-router.xml) and another saying call/start rejects prompt variables outside call-prompt-variables.dto.ts. Drop the enum value lists that will change.
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
