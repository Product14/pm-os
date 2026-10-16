# Evidence

### E1
- source: freshdesk:22370#2
- date: 2026-08-27
- side: spyne
- role: csm
- text: "For both calls, customer called back but ai did not have the context why ai called the client earlier, can we give the ai context so it does not look stupid on call" (private note; author inferred as the requesting CSM, who Arali lists as the rooftop's Vini CS owner)

### E2
- source: freshdesk:22370#0
- date: 2026-08-27
- side: system
- role: unknown
- text: Ticket fields: subject "VIN Details not mentioned in Outbound Calls"; pod Vini - Service Inbound; voc_l1 Vini Sales IB; platform Sales Inbound; product Integrations; tags Internal, L2 Sales, Product Sales. Raised internally, no dealer message in the thread.

### E3
- source: freshdesk:22370#7
- date: 2026-09-04
- side: spyne
- role: engineering
- text: "we did not get the data from tekion ... both the customer associated with that call does not have a intersted vehicle that got ingested to our system"

### E4
- source: freshdesk:22370#7
- date: 2026-09-04
- side: spyne
- role: engineering
- text: Two causes given: the lead is not mapped to any vehicle in Tekion, or the vehicle was attached to the lead after creation and Tekion sends no event for that. Engineering called it an integration data issue, not a Spyne bug.

### E5
- source: freshdesk:22370#9
- date: 2026-09-07
- side: spyne
- role: engineering
- text: "For this we would need webhooks per lead but in tekion we only get webhooks per deal."

### E6
- source: freshdesk:22370#8
- date: 2026-09-04
- side: spyne
- role: unknown
- text: PM asked whether a daily sync job could refresh the lead's vehicle data for Tekion. E5 is the only reply; the ticket has waited on product since 2026-09-10 (last update 2026-10-14).

### E7
- source: search:get-interaction-timeline:this rooftop since 2026-09-15
- date: 2026-10-15
- side: system
- role: unknown
- text: Arali company matched (stage Live). 0 interactions in the last 30 days; 0 interactions of any date under the name. Company-filtered transcript and ticket searches on this topic returned 0.

### E8
- source: bluebrain:conversational-ai-backend:src/call/dto/call-prompt-variables.dto.ts:59
- date: 2026-10-15
- side: system
- role: engineering
- text: Outbound call prompt variables carry vehicle of interest (make, model, year, trim, VIN at lines 59-79) plus customerActivityHistory (:171) and purposeOfCall. Each is optional; nothing forces a value. Read from local clone, branch release, commit of 2026-10-06.

### E9
- source: bluebrain:conversational-ai-backend:src/prompts/base-system-prompts/sales_new/context-data.xml:108
- date: 2026-10-15
- side: system
- role: engineering
- text: The sales_new prompt renders an InterestedVehicle block (year, make, model, trim, stock, VIN) and a CustomerActivityHistory line (:46). When the lead has no vehicle of interest the block renders empty.

### E10
- source: bluebrain:conversational-ai-backend:src/agents/agents-v2.service.ts:3440
- date: 2026-10-15
- side: system
- role: engineering
- text: For a call, the agent gets lead memory by lead id or caller phone: the last 3 conversation summaries, default window 3 days (:3425), filtered to department = the answering agent type.

### E11
- source: bluebrain:conversational-ai-backend:src/memory/lead-memory.service.ts:262
- date: 2026-10-15
- side: system
- role: engineering
- text: The memory query applies `department` as an exact filter. A summary stored under one department is not returned to an agent of another department (inferred from the filter; agentType values not verified).

### E12
- source: bluebrain:conversational-ai-backend:src/agents/agents-v2.service.ts:3433
- date: 2026-09-18
- side: system
- role: engineering
- text: Commit of 2026-09-18 added a local phone lookup fallback for lead memory when the CRM lead lookup returns nothing. Shipped three weeks after this ticket.

### E13
- source: bluebrain:integrations-backend:src/crm/tekion/tekion.controller.ts:262
- date: 2026-10-15
- side: system
- role: engineering
- text: integrations-backend exposes GET /tekion/leads/:leadId/vehicles (on-demand pull of a lead's vehicles). trace_handler returned no helper detail. No caller found in conversational-ai-backend speed-to-lead or leads code (local grep).

### E14
- source: jira:RETCONVAI-4742
- date: 2026-08-20
- side: system
- role: engineering
- text: "Expose existing outbound conversation summary in sales v2 prompt context". Status LIVE ON PROD.

### E15
- source: jira:RETCONVAI-4995
- date: 2026-09-15
- side: system
- role: engineering
- text: "Outbound Callback Call Missing the Context for Last Campaign" (LIVE ON PROD); QA bug RETCONVAI-5090 (2026-09-17, LIVE ON PROD): customer calling back to outbound agent has no context of the previous conversation.

### E16
- source: jira:RETCONVAI-4925
- date: 2026-09-04
- side: system
- role: engineering
- text: "service_v2 inbound callback cannot explain prior outbound contact" (Product Backlog); related RETCONVAI-4987 (2026-09-14, Product Backlog) on service inbound callback identity and outreach explanations.

### E17
- source: jira:RETCONVAI-4565
- date: 2026-08-11
- side: system
- role: engineering
- text: "Lead vehicle interest (fixes in migration script for crm data)" is In DEV; RETCONVAI-4663 "add lead vehicle interest api replace in IB and lambda" is LIVE ON PROD. Neither mentions refreshing vehicle of interest after lead creation.

### E18
- source: search:search-ticket-messages:customer called back but AI did not have context of earlier outbound call / vehicle of interest missing on outbound call
- date: 2026-10-15
- side: system
- role: unknown
- text: No company filter, 2026-07-17 to 2026-10-15: 0 other rooftops raised the same job. 1 adjacent rooftop (service inbound caller lookup returned nothing for a new customer; different job). A second search on vehicle of interest missing from Tekion leads found 0 (only inventory feed tickets).

### E19
- source: search:search-transcripts:customer returned our call and the AI did not know why it had called them or which vehicle
- date: 2026-10-15
- side: system
- role: unknown
- text: No company filter, 2026-07-17 to 2026-10-15: 0 calls or meetings where a dealer raised this job.

### E20
- source: pm:2026-10-15
- date: 2026-10-15
- side: pm
- role: unknown
- text: PM: if this does not work correctly today, the fix must go into both the Sales and the Service agents. The ticket names one, but a callback can land on either.

### E21
- source: freshdesk:22370#desc
- date: 2026-08-27
- side: spyne
- role: csm
- text: Spyne onboarding manager (ticket requester): the rooftop went live the day before with the "7-Day-Old Lead Follow-Up Outbound" campaign; leads come from Tekion and the integration is established and working.

### E22
- source: freshdesk:22370#desc
- date: 2026-08-27
- side: spyne
- role: csm
- text: "During outbound calls, the Agent is not mentioning the VIN/Vehicle of Interest associated with the lead." On callbacks after a missed call the agent "simply responds with 'How can I help you?'"

### E23
- source: freshdesk:22370#desc
- date: 2026-08-27
- side: spyne
- role: csm
- text: "This is creating confusion for customers, as they are calling back specifically in response to the missed outbound call." (Spyne's account of shopper reaction; no dealer staff quoted.)

### E24
- source: freshdesk:22370#desc
- date: 2026-08-27
- side: spyne
- role: csm
- text: "Please ensure the Agent retains and communicates the relevant lead context, including the Vehicle of Interest/VIN, during both outbound and inbound callback interactions." Callbacks should acknowledge the previous outreach first.

### E25
- source: freshdesk:22370#desc
- date: 2026-08-27
- side: spyne
- role: csm
- text: "Requesting this to be prioritised, as the account went live yesterday; this is a make-or-break situation for us."

### E26
- source: freshdesk:22370#11
- date: 2026-09-17
- side: spyne
- role: unknown
- text: Request to the Tekion partner contact: "Need a way to fetch updates on already created leads from Tekion either through webhook or API Integration"

### E27
- source: freshdesk:22370#16
- date: 2026-09-24
- side: spyne
- role: engineering
- text: "tekion was working on webhooks for lead which were to release these quarter they released it now, we now need to setup those webhooks in our system" and asked product to prioritise the task.

### E28
- source: freshdesk:22370#19
- date: 2026-09-29
- side: spyne
- role: unknown
- text: "We have to prioritize the integration of new webhooks that Tekion released. However, we notice that Tekion has probably rolled back the new webhooks that were released."

### E29
- source: freshdesk:22370#25
- date: 2026-09-30
- side: spyne
- role: unknown
- text: Raised with Tekion on 2026-09-30 (comment 23). Asked whether Tekion gave an ETA for the lead webhooks, the answer was "NO". A re-check was requested on 2026-10-05 (comment 26).

### E30
- source: freshdesk:22370#28
- date: 2026-10-05
- side: spyne
- role: unknown
- text: "can we explore a workaround here, as all of our Tekion clients might be impacted because of this." (Comment 27 also asked whether other Tekion rooftops are affected.)

### E31
- source: freshdesk:22370#29
- date: 2026-10-05
- side: spyne
- role: unknown
- text: "I have not seen any similar ticket, but i have not manually checked other rooftops to confirm if this does not exists in other rooftops."

### E32
- source: freshdesk:22370#33
- date: 2026-10-14
- side: spyne
- role: unknown
- text: After talking with integrations engineering: "since there is no context on webhook integration so, polling is the workaround for now." Last message on the ticket; no owner or date given.

### E33
- source: freshdesk:22370#33
- date: 2026-10-15
- side: system
- role: unknown
- text: Comments 11 to 33 (2026-09-17 to 2026-10-14) cover only the Tekion vehicle-of-interest half. None mentions the callback context, a re-test, or a fix verified on this rooftop. Support follow-ups (comments 18, 31) got no resolution.

### E34
- source: bluebrain:conversational-ai-backend:src/prompts/base-system-prompts/sales/outbound-campaign/journey-router.xml:8
- date: 2026-10-16
- side: system
- role: engineering
- text: The aged lead follow-up use case sends journeyName `Agedleadfollowup` (workflowTemplates/dto/configure-campaign-workflow.dto.ts:20), and `mapOutboundJourneyNameForPrompt` folds aliases like aged_lead_followup into it (call/call-prompt-variables.util.ts:51, called at call/outbound-call.service.ts:118), so the router picks aged-lead-followup.xml, not the default; the campaign display name "7-Day-Old Lead Follow-Up Outbound" would not match and would fall to default-outbound-sales.xml if sent as journeyName (stored value for this campaign not verified). Either way the InterestedVehicle data block comes from sales/runtime-context.xml:29, which sales_new.xml:43 includes for every non-SMS call regardless of journey, and both journey templates tell the agent to name the vehicle when it exists. Local clone, branch release, a2b8754c7.

### E35
- source: bluebrain:conversational-ai-backend:src/conversation/conversation.service.ts:476
- date: 2026-10-16
- side: system
- role: engineering
- text: A call writes lead memory only when the conversation has a leadId and a non-empty summary (`tryAddMemoryForConversation`); the summary is the post-call report's summary joined (vapi/call.service.ts:302), and the endedReason (no answer, voicemail) does not gate it, so a missed attempt leaves a record only if the post-call report produced a summary for it (not verified for no-answer calls). The record holds only summary text plus department (memory/lead-memory.service.ts:178-195; schema has no purposeOfCall or vehicle field). Local clone, branch release, a2b8754c7.

### E36
- source: bluebrain:conversational-ai-backend:src/agents/agents-v2.service.ts:3822
- date: 2026-10-16
- side: system
- role: engineering
- text: service_v2 (service_new) does not render the InterestedVehicle block; it builds one primaryVehicle (year, make, model, trim, VIN) from the call's customerDetails first and falls back to the same customer_interest_vehicle_* prompt variables, rendered as PrimaryVehicle (service_new/context-data.xml:35) and as the outbound journey vehicle (agents-v2.service.ts:3887). Memory department is the agent type's `agentType` lowercased (getAgentDepartment, agents-v2.service.ts:4405-4425; comment names Sales and Service, so "sales" and "service") on both write (lead-memory.service.ts:178) and read (agents-v2.service.ts:3458), an exact match, so a Sales callback cannot see a Service outreach summary or the reverse. Local clone, branch release, a2b8754c7.
