---
id: system-fact--service-policies-wire-contract
kind: system-fact
area: vini-service
status: stable
owner: yash.sharma
source: org-settings (branch aws-uat) lib/adapters/service-policies-adapter.ts; central-config /central-config/v1/vini-config/agent-config; memory project_service_policies_wire.md (2026-09-30)
verified: 2026-10-12
confidence: medium
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Read-modify-write the whole `entityConfig.service.policies` block; never partial-write it.

**Why:**
- GET returns lowercase `entityconfig`; POST takes `entityConfig`.
- 8 string arrays, all read by the agent builder (`agents-v2.service.ts`): `transportationOptions` (waiter, dropoff, shuttle, pickup = concierge, loaner), `supportedVehicles`, `availableServices`, `serviceRules`, `outboundServiceRules`, `expressServicesRules`, `diagnosticServicesRules`, `upsellingRules`.
- Partial-POST merge semantics are unverified. Wrong wire strings silently change what the live agent says ("pickup" means concierge, not shuttle).
- Everything else on the org-settings Service Policies tab is "Coming soon" and never saved.
- Source of truth is org-settings branch `aws-uat`, not `main`.

**Instead:** fresh GET, change, POST all 8 keys; map values through the adapter's `FACILITY_WIRE`.
