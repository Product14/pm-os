# Jira

Source: decide.md, Bug summary (outcome bug, accepted at the decide gate 2026-10-16). Not created. Waiting on the PM at the Jira step (`/pm-os:prd-to-jira`).

To confirm at the Jira step: project key (no default saved for vini-service in `pm-os.config.json`), issue type Bug, any required fields.

## Proposed

- **issue type:** Bug
- **project:** to confirm (jira.md section 1)
- **labels:** `pm-os`, `vini-service`, `vini-sales`
- **summary:** Outbound calls on Tekion leads skip the vehicle of interest attached after lead creation

**description (markdown):**

```markdown
## Problem
On outbound calls to Tekion leads, the agent does not name the vehicle of interest when it was attached to the lead after the lead was created: Tekion sends no per-lead event, so the vehicle never reaches the call prompt.
Shoppers returning a missed call then hear an agent that cannot say why the store called or which vehicle, on leads the store has already worked for 7 days.

## Fix
- In the outbound pre-dial prefetch, call the existing integrations-backend endpoint `GET /tekion/leads/:leadId/vehicles` (`integrations-backend:src/crm/tekion/tekion.controller.ts:262`, no caller today) and fill the existing `customer_interest_vehicle_*` prompt variables.
- Applies to Sales outbound and Service outbound alike (Sales renders InterestedVehicle; Service falls back to the same variables as PrimaryVehicle).
- **Gate (Q5):** do not ship until Tekion confirms the endpoint returns vehicles attached after lead creation and that one call per dial is allowed under the agreement and within rate limits. Data access is agreed with Tekion, not routed around.
- Callback context is out of scope here: it is re-tested first (see retest-plan.md) and any failure is filed against RETCONVAI-4995, -5090 or -4925.

## Acceptance criteria
- [ ] Q5 answered in writing by Tekion or integrations engineering before the change ships.
- [ ] Re-test results (retest-plan.md, Sales and Service lines) recorded in decisions.md before the change ships.
- [ ] Q6 count of affected Tekion rooftops recorded before the change ships.
- [ ] Sales outbound: a dial on a Tekion lead whose vehicle was attached after creation names that vehicle.
- [ ] Service outbound: the same lead on a Service outbound dial names that vehicle.
- [ ] Tekion returns no vehicle: the dial still goes out, the vehicle variables stay empty, the agent states why the store is calling without naming a vehicle, and never invents one.
- [ ] Tekion call errors or times out: the dial is not blocked; it uses whatever vehicle is already on the lead, and the failure is logged per lead.
- [ ] Non-Tekion CRMs: no change in behaviour.

## Links
- PRD: none (bug outcome, no PRD)
- PM OS work folder: `product/work/vini-service/fd22370-vin-details-on-outbound-calls` (decide.md, retest-plan.md)
- Freshdesk ticket 22370
- Related: RETCONVAI-4995, RETCONVAI-5090, RETCONVAI-4925
```
