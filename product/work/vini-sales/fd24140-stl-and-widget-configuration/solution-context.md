# Solution context: lead-type-aware STL first message (build-generalised, steps 1-3)

Sources: 15 Blue Brain calls (cached in `.cache/vini-sales/fd24140/solution/`), plus a read-only grep of the local `conversational-ai-backend` clone at a2b8754c7 (2026-10-06). The integrations-backend repo card scores 0.556 on verification, so its card claims are marked (low confidence).

## Entry points today
- Forwarded email lead: `POST /email-parsing` `integrations-backend:src/email-parsing/email-parsing.controller.ts:16`, then `EmailParsingService.extractEmailData`, which hands off to SQS `integrations-backend:src/email-parsing/email-parsing.service.ts:86`, `:11`. A `POST /email-parsing/test-parse` route also exists `integrations-backend:src/email-parsing/email-parsing.controller.ts:26`.
- ADF parse: `parseAdf` `integrations-backend:src/email-parsing/email-parser.service.ts:315`. The file has 45 symbols, with helpers for comments (:444), phone (:508), vehicle (:514), address (:551) and lead source from the subject line (:415). **None of them is named for an appointment, a lead type or a credit application.** The fields set inline in `parseAdf` are not visible to the graph (low confidence).
- Prior art on a different path: the CRM webhook ADF client already extracts appointments, in `extractAdfAppointments` :156, `mapAppointmentTypeToIntent` :160 and `transformAdfAppointmentToMeetingInput` :182 (`lambdas:crm-integrations/webhook-processor/crm-clients/adf.js`). The email parser does not call it.
- STL gate at creation: `resolveStlAllowlistGate` (`conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:490`). At execution: `getStlExecutionGateSkip` calling `resolveStlGate` (`conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1937`).
- **The opener is not chosen in the gate file.** It is an LLM message built in `generate` (`conversational-ai-backend:src/sequence-workflows/services/sequence-task-message-generation.service.ts:159`) from one global prompt: either the latest active `FOLLOW_UP` row in `sequencePrompts` (:193) or the in-repo `FOLLOW_UP_PROMPT_TEMPLATE` (:199). For STL, the topic is only `INTERESTED_VEHICLE_FEATURES` or `GENERAL` (:389). `renderPrompt` (:441) passes no lead type, appointment or credit-app variable.

## What a change would touch
- Parser: `ParsedEmailData` gains lead type, appointment date, time and store, plus a credit-app flag `integrations-backend:src/email-parsing/email-parser.service.ts:14`. The graph found no code that writes `external_type` anywhere (search_columns, 0 hits), so the field mapping into the lead is unknown.
- Config entry: `speedToLeadByLeadType` is typed `{ isEnabled, mode, config }` only `conversational-ai-backend:src/notifications/conversation-notifications.schema.ts:466`, and is stored in `conversationNotifications`, one document per enterprise and team (:7, :662). An opener field needs to be added to `SpeedToLeadSourceConfigDto` `conversational-ai-backend:src/speed-to-lead/dto/speed-to-lead-settings.dto.ts:53`, because the global pipe sets `whitelist` and `forbidNonWhitelisted` `conversational-ai-backend:src/main.ts:128`.
- Message: one new prompt variable in `renderPrompt` (:441) and an STL branch in `decideTopic` (:389) `conversational-ai-backend:src/sequence-workflows/services/sequence-task-message-generation.service.ts`. The no-PII credit-app guardrail goes here as platform logic, next to `isBannedStlGoal` (:633).

## Who else calls it
- `resolveStlGate`: workflow creation `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:258`; execution `...sequence-task-execution-orchestrator.service.ts:1937`; new SMS conversations `conversational-ai-backend:src/sms/sms-v2.service.ts:1955`; the check endpoint `conversational-ai-backend:src/speed-to-lead/speed-to-lead.controller.ts:73`.
- `isAlwaysAllowStlLead` lets leads with source `SPEED_TO_LEAD` and type `website` or `spyne_console` (env default) skip the per-type config entirely `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:23`, `:406`; it is used at `...sequence-workflow-creation.service.ts:764`. If forwarded website leads land with that pair, no per-type template would ever be read.
- **There are two writers for the config.** One is `upsertSpeedToLeadSettings` (:47), which also syncs the workflow STL step (:76). The other is the console's `upsertStlFollowUpConfig` `conversational-ai-backend:src/notifications/conversation-notifications.service.ts:2408` (controller :278). `getStlFollowUpConfig` rewrites `DEFAULT` into per-type keys and keeps the other entry fields (:1992 to :2011). The template must survive both write paths.
- Service STL does not share the opener. Service leads are forced to `NOT_SUPPORTED_FOR_SERVICE` on the inline STL path `...sequence-workflow-creation.service.ts:479`, and service messages come from `service-task-message-generation.service.ts` (`...sequence-task-execution-orchestrator.service.ts:74`). The config map still has no department key (:466).
- Follow-up (`STL_FOLLOW_UP`) uses the same `generate` and topics (:389), so a type-aware opener followed by a generic follow-up remains possible (Q12).

## Where per-store configuration can live
- The per-type entry in `speedToLeadByLeadType` `conversational-ai-backend:src/notifications/conversation-notifications.schema.ts:466`, keyed by the `normalizeLeadTypeKey` output `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:396` and resolved by `resolveConfigFromMap` (:131), which falls back to `DEFAULT`.
- A precedent for carrying appointment context on a task: `sequenceTasks.metaData.appointmentId` and `appointmentStartTime` `conversational-ai-backend:src/sequence-workflows/schemas/sequence-task.schema.ts:47`, `:50`.

## Integration limits
- Write-back exists only for rooftops with a configured CRM. `triggerExternalCrmIntegration` `conversational-ai-backend:src/crm_integration/crm_integration.service.ts:594` goes through crm-core `pushToExternalCrm` `crm-core-service:src/crm-sync/external-crm-sync.service.ts:149`, or through `start-insertion-process` `dealer-leads-backend:config/routes.js:985`. That path loads per-dealer third-party integration config `dealer-leads-backend:api/helpers/crm-integrations/start-insertion-process.js:638`. The sales appointment push is `crm-core-service:src/appointments/ci-sales-appointment.service.ts:1039`.
- CRM read covers Tekion, VinSolutions, eLeads and DriveCentric `integrations-backend:src/crm/tekion/tekion.controller.ts:38` (low confidence). Browser automation pushes to DriveCentric, VinSolutions, eLead and vAuto (`browser-automation` repo card, low confidence).
- **Gap for this rooftop:** it has no API [E12], and the graph shows no outbound ADF-email or generic dealer-webhook writer. Write-back therefore needs a new channel, agreed with the dealer. That is a commercial dependency, not only engineering work (Q10).

## Where the outcome is logged
- `sequenceTasks`: `taskType`, `statusReason`, `goal`, `message`, `smsSentAt`, `taskTopic` `conversational-ai-backend:src/sequence-workflows/schemas/sequence-task.schema.ts:94`, `:100`, `:106`, `:109`, `:129`, `:152`. Skip reasons include `stl-disabled-for-lead-type` `conversational-ai-backend:src/speed-to-lead/stl-skip-reasons.ts:5`. Tasks carry no lead type, so type splits need a join on `leadId` to the lead's `external_type`.
- The `initial_sms` activity event `conversational-ai-backend:src/crm_integration/crm_integration.service.ts:757`.

## Unknowns
- Does `parseAdf` set any lead type, appointment or credit-app field inline, and which lead field does it map to `external_type` and `source`? (Q18)
- Do forwarded website leads hit the `SPEED_TO_LEAD`/`website` always-allow bypass? (Q19)
- Does the console write path keep a new template field, and who can edit it? (Q20)
- What write-back channel suits a dealer with no API? (Q10, Q21)
