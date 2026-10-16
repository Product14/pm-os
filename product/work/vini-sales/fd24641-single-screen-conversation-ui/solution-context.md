# Solution context: department-aware "My unanswered" queue on Conversations (build-generalised, my-unanswered-queue)

Sources: 15 Blue Brain calls (cached in `.cache/vini-sales/fd24641/solution/`), plus a read-only grep of the local `conversational-ai-backend` clone at release a2b8754c7 (2026-10-06). The console frontend is barely indexed, so frontend claims are (low confidence).

## Entry points today
- Team list: `GET /customers/conversations/team` `conversational-ai-backend:src/customers/customers.controller.ts:16`. `getTeamConversations` selects lead ids from the local `leads` collection by `service_type` only (`conversational-ai-backend:src/customers/customers.service.ts:2452`), then matches `isUnread` (:2496) and `flowType` (:2500). It has no assignee input. It returns `pagination.total`, which a live count can reuse.
- Needs Attention is most likely `GET /leads/v2/get-customers-list?humanTransferPhase=PENDING,ACTIVE` (`conversational-ai-backend:src/leads/leads.controller.ts:103`). This lists SMS conversations by takeover phase (`conversational-ai-backend:src/leads/leads.service.ts:1628`) and returns an `unreadCount` facet (:1775). Inferred: the frontend query was not found [Q4].
- Opening a customer marks every conversation on that lead read, for every member: `getConversationsByCustomer` (`conversational-ai-backend:src/customers/customers.service.ts:209`) and V2 (:655) call `markAllConversationsAsReadForLeads` (:1092). That function mirrors `has_unread:false` to crm-core (:1117) or to local leads (:1122).
- Action Items: `GET /action-items` filters `assigned_to` (`conversational-ai-backend:src/action-items/action-items.service.ts:249`). Its value is a Spyne userId (:619).
- Console: `setServiceType` (`spyne-console-microfrontends:apps/converse-ai/contexts/mainContext.tsx:241`) defaults to sales (:236) and is kept in the URL (:219).

## What a change would touch
- An assignee filter on the team list: a new DTO field (`conversational-ai-backend:src/customers/dto/get-team-conversations.dto.ts:14`) plus `assigned_to` in the lead pre-query (`conversational-ai-backend:src/customers/customers.service.ts:2452`). The lead already declares `assigned_to` (`conversational-ai-backend:src/leads/schemas/lead.schema.ts:42`). Whether it is filled is unknown [Q17].
- **"Unread" is not "unanswered".** `isUnread` turns true when a conversation is created (`conversational-ai-backend:src/conversation/conversation.service.ts:520`), on every call update (:650) and on any email, dealer-sent included (:777). Lead `has_unread` turns true on AI outbound sends (`conversational-ai-backend:src/sms/sms.service.ts:753`) and on a rep's manual reply (:2691) through `updateCustomerActivity` (`conversational-ai-backend:src/leads/leads.service.ts:115`). A real "customer replied, nobody answered" state needs a new field written on the inbound path (`conversational-ai-backend:src/sms/sms.service.ts:1924`). `pendingAiReplyAt` only tracks a reply the AI owes, not a human one (`conversational-ai-backend:src/conversation/conversation.schema.ts:275`) [Q20].
- **Read state is shared by the team.** There is one `lastReadAt` per conversation (`conversational-ai-backend:src/conversation/conversation.schema.ts:183`). A manager opening a thread clears it from the rep's "mine" view. A per-member queue needs read state per user, or a state cleared by a reply rather than by a view [Q20].
- An existing per-conversation owner: `humanTransferDetails.claimedByUserId` is set on takeover (`conversational-ai-backend:src/conversation/conversation.schema.ts:253`).
- Alerts: the handover alert is not wired, and a TODO stands at the call site (`conversational-ai-backend:src/tools/human-transfer.service.ts:149`). Appointment alerts go to the whole team and are deliberately not split by department (`conversational-ai-backend:src/meetings/appointment-alert.service.ts:413`).

## Who else calls it
- `updateCustomerActivity` has at least 10 callers across SMS, SMS v2, calls, email, chat and the chat mirror (`conversational-ai-backend:src/conversation/conversation.service.ts:551`, `:660`, `:732`, `:783`; `conversational-ai-backend:src/sms/sms-v2.service.ts:3517`; `conversational-ai-backend:src/conversation/chat.service.ts:553`; `conversational-ai-backend:src/chat-v2/mirror/mirror.service.ts:508`). Changing what sets unread changes every one of these paths.
- `isUnread` also drives `GET /service-metrics/contact` (`conversational-ai-backend:src/service-metrics/contact-metrics.service.ts:1743`, `:1784`) and the Customers list `unreadCount` (`conversational-ai-backend:src/leads/leads.service.ts:844`). Redefining it moves those counts.
- Blue Brain lists only lambdas and screenshot-service as callers of conversational-ai-backend. The console is not indexed as a caller of the team list (who_calls, low confidence) [Q4].
- Vini-created action items carry `assigned_to: 'SYSTEM'` (`conversational-ai-backend:src/crm_integration/crm_integration.service.ts:693`, `:782`; `conversational-ai-backend:src/tools/definitions/communication/receptionist-create-follow-up.tool.ts:242`). Filtering by `assignedTo` today finds a rep's items only after a human reassigns them. This weakens E38 as proof that per-rep routing exists.

## Where per-store configuration can live
- Lead assignment rules by team and lead source: `createRule` and `getRuleNameBySource` (`dealer-leads-backend:services/Assignment.js:27`, `:188`), with round-robin (:278) and SDR availability (:309). crm-core has its own `assignLead(enterpriseId, teamId, source)` (`crm-core-service:src/assignment/assignment.service.ts:90`), which round-robins over team users (:131, :167).
- Per-user notification preferences with `departments`, `emailNotifications` and `smsNotifications`, read by `getUserEmailsAndContacts(enterpriseId, teamId, department?)` (`conversational-ai-backend:src/notifications/notifications.service.ts:156`). This fits the "alert assignee only or whole team" setting.
- The per-member landing view has no backend home. The department switch is URL and context state only (`spyne-console-microfrontends:apps/converse-ai/contexts/mainContext.tsx:241`) (low confidence).

## Integration limits
- **The sales assignee today is a Spyne round-robin pick, not the dealer CRM's salesperson.** Lead intake omits `assigned_to` so that crm-core round-robins (`conversational-ai-backend:src/crm_integration/crm_integration.service.ts:267`). The legacy path sends `''` (:318). The fallback is `SYSTEM` (`conversational-ai-backend:src/crm_integration/crm-core-service.client.ts:1108`).
- No code reads the dealer CRM's salesperson: `salesperson` has 0 hits org-wide (search_columns). On eLeads, `salesperson` is a fixed per-credential push option (`conversational-ai-backend:src/external_crm_integrations/prepare_crm_data/eleads.ts:240`). On VinSolutions, appointment push hardcodes `assignedTo: 'AI SPYNE'` (`conversational-ai-backend:src/external_crm_integrations/prepare_crm_data/vinsolutions.ts:191`). Matching the CRM owner needs a per-provider read we do not have [Q18].
- No service advisor source surfaced in integrations-backend or crm-core (find_prior_art, low confidence). Meetings carry `assigned_to` from an unknown writer (`conversational-ai-backend:src/meetings/appointment-alert.service.ts:160`). An advisor from the DMS or scheduler is a commercial dependency [Q19].
- With crm-core enabled, `has_unread` is written to crm-core only (`conversational-ai-backend:src/leads/leads.service.ts:135`). The team list, however, reads local `leads` (`conversational-ai-backend:src/customers/customers.service.ts:2452`) [Q21].

## Where the outcome is logged
- Mongo `conversations.isUnread` and `conversations.lastReadAt` (`conversational-ai-backend:src/conversation/conversation.schema.ts:180`, `:183`). `lastReadAt` is overwritten on each read, so it keeps no history.
- Kafka `HUMAN_TRANSFER_EVENTS_TOPIC` (claimed and released), consumed into ClickHouse (`conversational-ai-backend:src/sms/kafka/human-transfer-events.producer.ts:69`).
- Action item logs (`ASSIGN`, `MARK_COMPLETE`) (`conversational-ai-backend:src/action-items/action-items.service.ts:146`, `:1396`).
- No event records a member opening a conversation or the time to first human reply. That metric is unknown [Q15, Q20].

## Unknowns
- Whether local `leads.assigned_to` is populated and matches crm-core's assignee [Q17].
- Whether any CRM fetcher reads the dealer's assigned salesperson [Q18].
- Where a service advisor comes from [Q19].
- How "unanswered" should be defined, and whether read state becomes per user [Q20].
- Whether local unread goes stale when crm-core is on [Q21].
- The frontend query behind Needs Attention [Q4].
- Missed calls and alert behaviour [Q9].
