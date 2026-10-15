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
