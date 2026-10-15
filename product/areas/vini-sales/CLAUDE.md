# Area: vini-sales

Owner: see `OWNERS.md`. Read this first in any triage or PRD research for a Vini Sales ticket.

Source: Spyne Blue Brain repo cards on branch `release`, read 2026-10-15. Blue Brain marks these cards as checked against the code: conversational-ai-backend scored 0.68 (7 of 14 sampled claims fully supported) and integrations-backend 0.56. Treat each line as a pointer to verify, not a fact. Re-check with `trace_handler` before a PRD cites it.

## What ships today (code entry points)

- **Agent types and prompts** (sales inbound, speed to lead, follow-up): `conversational-ai-backend:src/agent-types-crud/agent-types-crud.controller.ts:27`. Which prompt is live depends on routing code: see `context/facts/prompt-routing-decides-active-prompt.md`.
- **Speed to lead** (outbound first touch, silent hours, prefetch): `conversational-ai-backend:src/speed-to-lead/speed-to-lead.controller.ts:18`.
- **Rooftop config**: hours, call provider, transfer routing: `conversational-ai-backend:src/teamConfig/teamConfig.controller.ts:27`. Transfers are single-destination.
- **Action items and follow-up tasks** (intent-driven): `conversational-ai-backend:src/action-items/action-items.controller.ts:27`. Intent catalog: `src/action-items/intent-catalog/intent-catalog.controller.ts:18`.
- **External CRM message sync** (notes and summaries to the dealer's CRM): `conversational-ai-backend:src/external_crm_integrations/external_crm_integrations.controller.ts:12`. Failed syncs land in the FailedLead collection.
- **CRM provider integrations** (Tekion, VinSolutions, eLeads, DriveCentric; lead fetch and webhooks): `integrations-backend:src/crm/tekion/tekion.controller.ts:38`, `integrations-backend:src/crm/vinsolutions/vinsolutions.controller.ts:13`, `integrations-backend:src/webhook/webhook.controller.ts:166`.
- **Sales leads and appointments store**: `crm-core-service` (Blue Brain: "Sales lead lifecycle management", "Sales appointment scheduling").
- **Lead ingestion, calls and SMS**: `dealer-leads-backend`.
- **Dealer-facing analytics**: `ci-dashboard` (call funnel, appointment attribution).

## Known limits that shape PRDs

- Some CRMs only let their own system create appointments. Spyne can push notes and summaries without creating a duplicate lead, but cannot write the appointment. Changing that is a negotiation with the CRM provider, not an engineering task.
- Appointment and transfer behaviour are coupled in the prompt: `context/facts/appointment-transfer-coupled-in-prompt.md`.

## Before any metric claim

Read the vini-sales traps and metrics in `context/INDEX.md`. The most important ones:
- Don't trust the agent's own fields: `context/traps/agent-self-report-fields.md`.
- Never measure transfers from the agent's wording: `context/traps/transfer-from-agent-wording.md`.
- ABR breaks down as attempt times close: `context/metrics/abr-attempt-times-close.md`.

## Open PRDs and decisions

See `product/feature-index.yaml` and the decision lines in `context/INDEX.md`.
