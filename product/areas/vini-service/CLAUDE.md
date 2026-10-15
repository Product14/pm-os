# Area: vini-service

Owner: see `OWNERS.md` (vini-service has no owner yet). Read this first in any triage or PRD research for a Vini Service ticket.

Source: Spyne Blue Brain repo cards on branch `release`, read 2026-10-15. Blue Brain marks these cards as checked against the code: conversational-ai-backend scored 0.68 and integrations-backend 0.56. Treat each line as a pointer to verify. Re-check with `trace_handler` before a PRD cites it.

## What ships today (code entry points)

- **Service appointment lifecycle** (capabilities, open slots, create, reschedule, cancel, repair orders) through the dealer's scheduler or DMS: `integrations-backend:src/service-appointments/appointments.controller.ts:40`. Create is at `:181`. Xtime handler: `integrations-backend:src/service-appointments/handlers/xtime.handler.ts:67`. PBS, Dealertrack and Tekion handlers sit in the same folder. Booking events are logged in the `ServiceAppointmentLogs` collection.
- **Service policies per rooftop** (shuttle, loaner, wait rules): `entityConfig.service.policies`. Always read-modify-write it: `context/facts/service-policies-wire-contract.md`.
- **Rooftop config** (hours, call provider, transfer routing): `conversational-ai-backend:src/teamConfig/teamConfig.controller.ts:27`. Set timezone only through user-management: `context/facts/rooftop-timezone-write-path.md`.
- **Recall outreach (Recall Guardian)**: NHTSA campaigns, customer upload, opportunities, completion: `conversational-ai-backend:src/recall/recall-workspace.controller.ts:118`. Gated per rooftop by `team_config.recall_enabled`.
- **Customer list with vehicles and repair orders** (feeds outbound): `conversational-ai-backend:src/leads/leads.controller.ts:13`.
- **Retention bands to due services**: `context/facts/service-retention-bands-resolve-to-due-services.md`.
- **Webhooks from service systems** (for example MyKaarma): `integrations-backend:src/webhook/webhook.controller.ts:166`.

## Known limits that shape PRDs

- The booking tool's logged status can say success when the response body says it failed. Judge bookings from the response body: `context/traps/service-tool-status-vs-response-body.md`.
- Many transfers reach no human (forwarded back to the agent). Use the clean series: `context/metrics/transfer-reach-clean-series.md`.
- Do not assume our open slots equal the shop's capacity. Whether a provider handler reads per-slot capacity rules is unverified. That question goes to engineering in any booking PRD.

## Before any metric claim

Read the vini-service traps in `context/INDEX.md`, especially:
- `context/traps/calls-table-replicated-duplicate-rows.md`
- `context/traps/service-report-placeholder-overview-evalreport.md`

## Open PRDs and decisions

See `product/feature-index.yaml` and the decision lines in `context/INDEX.md`.
