# Evidence

### E1
- source: pm:2026-10-21
- date: 2026-10-21
- side: pm
- role: unknown
- text: "Get the agent demo flow plugged into agents which are already live; they live on the Settings tab, which has a Talk to agent CTA."

### E2
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/app/converse-ai/settings/page.tsx:217
- date: 2026-10-21
- side: system
- role: engineering
- text: "Settings renders the Agents sub-tab natively (AgentsSettingsTab); only Engagements and Policies iframe org-settings. Same page for sales, service and acquisition."

### E3
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/components/settings/agents/useAgentCallLauncher.ts:110
- date: 2026-10-21
- side: system
- role: engineering
- text: "Talk to agent opens TalkToAgentModal for outbound and inbound-sales agents (customer details, web or phone call), else starts the call; then routes to /converse-ai/agents/voip-call."

### E4
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/app/converse-ai/page.tsx:72
- date: 2026-10-21
- side: system
- role: engineering
- text: "On release the demo flow iframe shows only when the team has no conversationalAi product record for the department; uat-release limits it to SPYNE_OWNER and stage contracted."

### E5
- source: bluebrain:conversational-ai-backend:src/demo-flow/demo-flow.service.ts:1274
- date: 2026-10-21
- side: system
- role: engineering
- text: "resolveDemoAgent calls assertConversationalAiProductLineNotActive, which refuses teams whose department product line is live, onboarding, churned or contracted."

### E6
- source: bluebrain:conversational-ai-backend:src/demo-flow/demo-flow.service.ts:1316
- date: 2026-10-21
- side: system
- role: engineering
- text: "An existing real mapping for the team is marked isDemoAgent: true in place instead of creating a demo copy."

### E7
- source: bluebrain:conversational-ai-backend:src/call/web-call.service.ts:592
- date: 2026-10-21
- side: system
- role: engineering
- text: "Ordinary web calls resolve only mappings with isDemoAgent not true, so a flagged real agent returns not found."

### E8
- source: bluebrain:conversational-ai-backend:src/agents/agents-v2.service.ts:4864
- date: 2026-10-21
- side: system
- role: engineering
- text: "Demo-agent overrides force leasePolicy.offered and paymentEstimates.enabled on every conversation of a mapping flagged isDemoAgent."

### E9
- source: bluebrain:conversational-ai-backend:src/demo-flow/reception-test-flow.service.ts:99
- date: 2026-10-21
- side: system
- role: engineering
- text: "Reception test runs on the dealer's real receptionist mapping and writes the conversation with isTest and isDemo true, to keep it out of analytics."

### E10
- source: bluebrain:conversational-ai-backend:src/livekit/livekit-webhook.service.ts:253
- date: 2026-10-21
- side: system
- role: engineering
- text: "Demo calls skip post-processing (no EndCallReport or eval); the report is generated into DemoConversationReport at call end."

### E11
- source: bluebrain:conversational-ai-backend:src/console-reports/console-reports.service.ts:645
- date: 2026-10-21
- side: system
- role: engineering
- text: "Console reports and insights count conversations filtered only on isTest = 0; the ordinary demo conversation has isTest false, the reception test has it true."

### E12
- source: bluebrain:conversational-ai-backend:src/vini-overview/vini-overview.service.ts:816
- date: 2026-10-21
- side: system
- role: engineering
- text: "Vini overview Appointments block reads ClickHouse meetings, which has no demo column, so demo bookings cannot be filtered there."

### E13
- source: bluebrain:conversational-ai-backend:src/tools/definitions/communication/receptionist-create-follow-up.tool.ts:246
- date: 2026-10-21
- side: system
- role: engineering
- text: "The callback/follow-up tool creates a real action item with no demo or test check; action item lists have no demo filter."

### E14
- source: bluebrain:conversational-ai-backend:src/demo-flow/demo-flow.service.ts:441
- date: 2026-10-21
- side: system
- role: engineering
- text: "Starting a demo call creates or finds a CRM lead by the tester's mobile with no demo marker."

### E15
- source: bluebrain:agent-demo-flow:src/lib/api/knowledge.ts:23
- date: 2026-10-21
- side: system
- role: engineering
- text: "Demo flow edits save to the rooftop's real hours, finance/trade-in and service policies, and agent name/voice; standard hours are saved automatically before a test when none are on file."

### E16
- source: bluebrain:agent-demo-flow:src/components/AgentHeroCard.tsx:311
- date: 2026-10-21
- side: system
- role: engineering
- text: "Copy says 'Nothing goes live. Nobody but you gets called.' and the report says 'Your agent is not live'; a 'Get Vini on your lines' CTA files a sales request."

### E17
- source: search:github-code:delete-demo-data
- date: 2026-10-21
- side: system
- role: engineering
- text: "The only caller of delete-demo-data is user-management ProductLineStageService.notifySalesInboundOnboarding, when Sales Inbound enters Onboarding."

### E18
- source: bluebrain:conversational-ai-backend:src/demo-flow/demo-flow.service.ts:1836
- date: 2026-10-21
- side: system
- role: engineering
- text: "GET /demo-flow/reports lists a rooftop's demo conversations from DemoConversationReport, by department and direction, newest first."

### E20
- source: bluebrain:org-settings:services/index.ts:1751
- date: 2026-10-21
- side: system
- role: engineering
- text: "org-settings agent cards run on mock data with a tel: link; its Service agents tab is commented out."

### E21
- source: pm:2026-10-21
- date: 2026-10-21
- side: pm
- role: unknown
- text: "Locked: real config with transfers blocked and bookings demo-flagged; agent info read-only with links to Settings; replace the modal behind a flag; Spyne owners first; reuse what works with flags; keep tests out of reporting."

### E22
- source: bluebrain:conversational-ai-backend:uat/FD-24439-exclude-demo-from-console
- date: 2026-10-16
- side: system
- role: engineering
- text: "Unmerged branch adds an isDemo column to ClickHouse conversations and excludes demo conversations from every console-reports query."

### E23
- source: bluebrain:conversational-ai-backend:src/demo-flow/demo-flow.service.ts:628
- date: 2026-10-21
- side: system
- role: engineering
- text: "The demo flow has an outbound lane that rings the tester's phone from a shared demo caller ID, and a text test for inbound agents."

### E24
- source: pm:2026-10-21
- date: 2026-10-21
- side: pm
- role: unknown
- text: "Backend prototype (local branch, not pushed) covers live mode for calls only; no live mode for SMS."

### E30
- source: search:arali:search-transcripts,search-ticket-messages,search-thread-messages: "called our own agent to test it", "test call agent", "talk to agent test call live agent hear agent preview changes before customers", "test the agent, called our number, agent said wrong hours or policy"
- date: 2026-10-22
- side: system
- role: engineering
- text: "Arali searches NOT completed for window 2026-09-22 to 2026-10-22: all three search tools returned a server error on both attempts (request ids I3zu822yQOCpqbTtacI7Nw, ktY3wh72SCOHC-i-AQeqjw, hPXXO7F3R7-Erc4Cmrpb1w, then q49rK7TQQ--YiGEDacI7Nw, 9K7KkpGLSailYllSAXC71g, Z36AZr9gT8C6A-KeDcO5xA). This is a tool failure, not 0 results. No dealer or Spyne evidence gathered for context_30d, who_feels_this, job."

### E50
- source: search:arali:search-ticket-messages: "test call talk to agent", "test call to my live agent / talk to agent / hear the agent", "test lead from test call showing in reports or CRM", "test the agent", "demo call"
- date: 2026-10-22
- side: system
- role: engineering
- text: "Frequency NOT established for 2026-07-24 to 2026-10-22: Arali search-ticket-messages failed on 6 attempts (request ids uJMYcs7WSSOAkY-iDcO5xA, NhOuSzrnRIe2-D0Jmrpb1w, E6mMuxGZSaa694TsV7rehQ, lbHl6rzoTWmlnZd7acI7Nw, 1U8kHBq_QA6BwawhipRofQ, HALCHdalTqyKOXMU-8Y8hA). Tool failure, not zero results. Freshdesk filter search has no free-text operator (tag:'test call' returned 0 tickets, which proves nothing about content)."

### E51
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/app/converse-ai/agents/voip-call/page.tsx:7
- date: 2026-10-22
- side: system
- role: engineering
- text: "origin/release: voip-call page only renders WorkforceAssistantContent; the call is started by the callContext, not by the page. The agents list page passes modal output to handleTalkToAgent (agents/page.tsx:426-429)."

### E52
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/contexts/callContext.tsx:276
- date: 2026-10-22
- side: system
- role: engineering
- text: "Web call: callContext calls startWebCall({teamAgentMappingId, promptVariables}) with no url option and no test flag; the request metadata is only source CONSOLE and sourceDevice DESKTOP (factory/livekit/fetch-livekit-token.ts:62-75)."

### E53
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/factory/livekit/fetch-livekit-token.ts:74
- date: 2026-10-22
- side: system
- role: engineering
- text: "Web call endpoint is POST {APP_BACKEND_BASEURL}/conversation/web/call (the production route). Only the reception test passes a different url."

### E54
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/components/agents/talk-to-agent-modal.tsx:805
- date: 2026-10-22
- side: system
- role: engineering
- text: "Outbound phone call: the modal dispatches triggerOutboundPhoneCall for sales outbound (line 805) and service (line 847). Before that, sales outbound also dispatches createOutboundSalesLead with source converse-ai (lines 770-781)."

### E55
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/store/saga/leads.saga.ts:643
- date: 2026-10-22
- side: system
- role: engineering
- text: "Outbound phone saga posts to /conversation/calls/outbound/trigger with metadata source CONSOLE and sourceDevice only (lines 643-657); no test flag, no demo flag."

### E56
- source: bluebrain:spyne-console-microfrontends:apps/converse-ai/store/saga/leads.saga.ts:465
- date: 2026-10-22
- side: system
- role: engineering
- text: "createOutboundSalesLead posts a real CRM lead to /crm-service/v1/sales/leads/conversational (or legacy /leads/dealer/v1/conversational/leads). Inbound Instant Response test posts /conversation/speed-to-lead/customer-data with flow_type Internal (talk-to-agent-modal.tsx:744-755)."

### E57
- source: bluebrain:conversational-ai-backend:src/call/call-web-call.controller.ts:16
- date: 2026-10-22
- side: system
- role: engineering
- text: "POST web/call -> WebCallService.startWebCall (ordinary path, no forceTestCall). Outbound: POST calls/outbound/trigger -> OutboundCallService.triggerOutboundCall, source defaults CONSOLE, no isTestCall unless recallTest (outbound-call.controller.ts:16, outbound-call.service.ts:186-190)."

### E58
- source: bluebrain:conversational-ai-backend:src/call/web-call.service.ts:336
- date: 2026-10-22
- side: system
- role: engineering
- text: "Ordinary web call: source comes from request metadata (CONSOLE here); isTestCall is stamped only when forceTestCall is true (line 362), which only demo-live, reception and preview paths set. Not set for today's Talk to agent."

### E59
- source: bluebrain:conversational-ai-backend:src/call/call-record.service.ts:354
- date: 2026-10-22
- side: system
- role: engineering
- text: "Any call whose metadata.source is CONSOLE gets isTestCall true on the calls-table record (buildIsTestCallPatch, lines 354-367). So today's Talk to agent calls are hidden from the calls list/analytics that read is_test_call (call.service.ts:674, analytics-queries.ts:239)."

### E60
- source: bluebrain:conversational-ai-backend:src/database/clickhouse/analytics-queries.ts:83
- date: 2026-10-22
- side: system
- role: engineering
- text: "Conversation-based reports filter ifNull(c.isTest,0)=0. In the working tree the only place that sets conversation isTest for calls is the unpushed live-test demo-flow change (demo-flow.service.ts:506); no setter found for ordinary CONSOLE calls, so today's Talk to agent conversation likely counts in conversation reports. Not verified against ClickHouse."

### E61
- source: bluebrain:conversational-ai-backend:src/call/web-call.service.ts:164
- date: 2026-10-22
- side: system
- role: engineering
- text: "Working tree branch yash/demo-flow-live-test (commit f996cd4c8, Oct 21, unpushed per E24) adds startDemoWebCall liveTest and outbound liveTest (outbound-call.service.ts:128, 503-507, 557). That is the proposed build, not today's behaviour."

### E62
- source: bluebrain:conversational-ai-backend:src/call/web-call.service.ts:301
- date: 2026-10-22
- side: system
- role: engineering
- text: "Transcript/report: today's call is a normal call, so it follows ordinary post-call processing (the demo path is what skips it, per E10). Whether a dealer can open the transcript afterwards in console Conversations was not traced; the demo-flow report store is not used by Talk to agent."

### E63
- source: bluebrain:conversational-ai-backend:src/conversation/conversation.service.ts:606
- date: 2026-10-22
- side: system
- role: engineering
- text: "A conversation is marked isTest only when the lead's primary email is @spyne.ai, or when a call is manually tagged as test (vapi/call.service.ts:2553). A dealer staff test call stays isTest false and is counted. Corrects E60."

### E80
- source: bluebrain:conversational-ai-backend:src/tools/definitions/sales/sales-book-appointment.tool.ts:330
- date: 2026-10-22
- side: system
- role: engineering
- text: "Sales and service booking tools only stamp is_demo_meeting:true when context.isDemoCall or is_demo_call is true (sales-book-appointment.tool.ts:330-333,378-381; sales-create-meeting.tool.ts:561-565,624-628; service-integrations-client.ts:122, create endpoint only). They still make the booking call; blocking happens downstream. The flag comes from the demo flow, not from a dealer staff Talk to agent call (see E63 on isTest; whether such a call sets isDemoCall was not traced)."

### E81
- source: bluebrain:integrations-backend:src/service-appointments/services/main-orchestrator.service.ts:1200
- date: 2026-10-22
- side: system
- role: engineering
- text: "Service, DMS/scheduler: when isDemoMeeting is true the create path does NOT call the dealer's DMS or scheduling provider (Tekion/CDK/PBS/myKaarma/Evenflow) and returns a fake publisher 'demo' booking id demo-<timestamp> (lines 1192-1217, RETCONVAI-5230). The controller reads metadata.is_demo_meeting at appointments.controller.ts:228 and passes it at :256. Verified by reading code; not run. Xtime is not named in the comment, and was not separately traced. Only the create path carries the flag; cancel and reschedule on a demo meeting were not traced."

### E82
- source: bluebrain:integrations-backend:src/service-appointments/services/main-orchestrator.service.ts:1236
- date: 2026-10-22
- side: system
- role: engineering
- text: "Service, Spyne meeting record: a demo booking still writes a Spyne Meeting row (fire-and-forget createServiceMeetingFromAppointment, line 1236, with is_demo_meeting true forwarded at :603), so it appears in the demo dashboard but not as a DMS appointment. The crm-core mirror branch is skipped for demo and the legacy dealer-leads path is used (line 656)."

### E83
- source: bluebrain:dealer-leads-backend:api/helpers/crm-integrations/start-insertion-process.js:287
- date: 2026-10-22
- side: system
- role: engineering
- text: "Dealer's external CRM push (VinSolutions, eLead, DriveCentric): the insertion consumer runs shouldBlockDemoInsertion first (start-insertion-process.js:287-307) and drops a demo payload without redelivery. It identifies demo by any of conversations.isDemo, endCallReports.isDemoCall, meetings.is_demo_meeting (evaluate-demo.js:22-26, legs ~:280-296). Override is crmConfig.syncDemoData, default false (evaluate-demo.js:41-42), so a rooftop must opt in to receive demo leads. Per-provider adapters (VinSolutions/eLead/DriveCentric) were not individually read; the gate sits upstream of all of them in start-insertion-process, which is the assumption to confirm."

### E84
- source: bluebrain:dealer-leads-backend:api/utils/crm-demo-gate/evaluate-demo.js:42
- date: 2026-10-22
- side: system
- role: engineering
- text: "The CRM demo gate fails OPEN by design (evaluate-demo.js:44-49): if Mongo lookup fails, or the payload has no conversation_id or call_id, the insertion is pushed. The header says 5 of 46 UAT insertions were missed by the post-call legs; the meeting leg exists to cover those. Not verified: that production behaves like the UAT figures quoted in the comment. Also unverified: sales appointments writing to any dealer sales calendar or DMS, since no sales-side DMS write was found in the files read (sales meetings go to crm-core or dealer-leads Meetings.create only)."

### E100
- source: search:clickhouse:console test calls by distinct team, conversational_ai_pg.calls, 24 Jul to 22 Oct 2026
- date: 2026-10-22
- side: system
- role: engineering
- text: "Calls with metadata.source=CONSOLE, is_test_call true, no metadata.isDemoCall key (FINAL, _peerdb_is_deleted=0): 549 calls from 92 distinct teams (rooftops). Web (Talk to agent) 470 calls, 83 teams; outbound 79 calls, 22 teams (9 outbound calls, 2 teams carry a recallTest flag; those teams are also in the 92). Caveats: includes Spyne staff testing on customer rooftops and any internal teams (staff cannot be separated, isTest only keys on @spyne.ai lead email per E63); reception tests not identifiable; 35 web + 18 outbound CONSOLE calls with isDemoCall excluded."

### E101
- source: search:clickhouse:console test calls restricted to live inbound rooftops (aggregated_product_details predicate)
- date: 2026-10-22
- side: system
- role: engineering
- text: "Same calls, restricted to teams with a Live, active conversationalAi inboundSales or inboundService product row not churned as of 2026-10-22 (roster predicate without the test-account/enterprise_details join): 60 teams, 431 calls. Web 55 teams, outbound 15 teams. Sales vs service is by the team's live product, not per call (calls carry no agent type; only agent_mapping_id): web 44 sales-live and 38 service-live teams; outbound 14 sales-live and 13 service-live (a team with both counts in both). Of the 92 teams in E100, 32 are not on the live inbound roster (pilot, onboarding, internal or churned)."

### E102
- source: search:clickhouse:agent mapping replica search (list_tables like agent, mapping)
- date: 2026-10-22
- side: system
- role: engineering
- text: "No replica of team agent mappings (teamagentmappings or equivalent) exists in ClickHouse. conversational_ai_pg has no mapping table; only calls.agent_mapping_id. dealer_leads(_raw).agentTypes (15 rows) and agents (15 rows) are agent-type tables, with no isDemoAgent flag or team link. Count of live teams with isDemoAgent true is unanswerable from ClickHouse; needs the Mongo/Postgres source."

### E90
- source: bluebrain:conversational-ai-backend:src/tools/definitions/communication/communication-send-sms.tool.ts:197
- date: 2026-10-22
- side: system
- role: engineering
- text: "In-call SMS (communication_send_sms) has no isDemoCall or live-test check: execute() reads customerPhone from the tool args (E.164, schema line 28-31) and calls sendSMS(customerPhone, body, false) at line 197. The number is whatever the model passes; the description tells it to reuse a verified phone from context or ask the caller (lines 70-71). Searched the tool, sms.utils and the demo-flow code: no demo guard on SMS. So a test call sends a real text to the number the agent was given."

### E91
- source: bluebrain:conversational-ai-backend:src/utils/sms.utils.ts:61
- date: 2026-10-22
- side: system
- role: engineering
- text: "sendSMS posts to the Twilio Messages API (line 65) with From = process.env.TWILIO_FROM_NUMBER (line 61), one Spyne-level env number, not the dealer's own number. The body is built by communication_get_details for the team (dealer address, website, VDP, pre-qualify link). Not verified: the value of TWILIO_FROM_NUMBER in prod, or whether dealer-specific sender numbers exist on another path."

### E92
- source: bluebrain:conversational-ai-backend.consumer.ts:164
- date: 2026-10-22
- side: system
- role: engineering
- text: "Reminders: the consumer routes MEETING_BOOKED to handleMeetingBooked (consumer:164-165; service:744-757), which passes meetingId, leadId, enterpriseId, teamId, start time, intent and department to scheduleReminders. No is_demo_meeting or isDemoCall read anywhere in src/meetings (grep: only isTest, which is a team workflowConfig flag, service:1159, 2038, not a per-meeting flag). So if the event reaches this queue for a demo-flagged meeting, the reminder cadence is scheduled like a real one. The event type is MEETING_BOOKED here; source header names it MEETING_CREATED from dealer-leads-be (service:7)."

### E93
- source: bluebrain:dealer-leads-backend:api/utils/meeting-event-payloads.js:54
- date: 2026-10-22
- side: system
- role: engineering
- text: "Producer side: dealer-leads-backend builds the meeting-created event in buildMeetingCreatedEventDetail (meeting-event-payloads.js:54) and has a crm-demo-gate (api/utils/crm-demo-gate/evaluate-demo.js: isDemoMeeting line 193, shouldBlockDemoInsertion line 254, isDemoSyncEnabled line 76). Blue Brain returns signatures only and no local clone exists, so NOT VERIFIED whether the gate or the event emit skips events for is_demo_meeting, or only blocks the CRM insertion. This decides whether reminders fire (E92). Needs a read of dealer-leads-backend."

### E94
- source: bluebrain:conversational-ai-backendeate-follow-up.tool.ts:247
- date: 2026-10-22
- side: system
- role: engineering
- text: "Follow-up (receptionist_create_follow_up) and sales_schedule_callback (delegates to the same follow-up, sales-schedule-callback.tool.ts:79) have no demo check. A real CRM lead is created (createCRMLead, line 210, if the call has no lead and a phone exists) then a real action item intent receptionist_follow_up, priority MEDIUM, due at the team's next opening, via crm-core createCiActionItem (line 247-257) or local ActionItemsService with assignedTo SYSTEM (line 259-268). Description carries caller phone, name, reason (line 237-243). Visibility: crm-core path sets no assignee in the payload; which console role sees unassigned items was not traced. Not verified: whether crm-core filters on the conversation being a demo."

### E95
- source: bluebrain:conversational-ai-backendvice.ts:303
- date: 2026-10-22
- side: system
- role: engineering
- text: "Appointment alerts (cancel or reschedule by the customer) create an URGENT in-console action item assigned to meeting.assigned_to (line 315-330, SYSTEM fallback) and email opted-in team users if the team dealerEmail switch is on (line 372-410). No demo check in appointment-alert.service.ts. Only reachable after a booking exists and the customer then cancels or moves it."

### E96
- source: bluebrain:conversational-ai-backend:src/tools/definitions/sales/sales-book-appointment.tool.ts:330
- date: 2026-10-22
- side: system
- role: engineering
- text: "The only demo marker is on the booking: sales-book-appointment.tool.ts:330-333 and 378-381, sales-create-meeting.tool.ts:561-563, and service-integrations-client.ts:122 set is_demo_meeting true when isDemoCall. Transfers decline on demo calls (communication-transfer-call-v3.tool.ts:435-450) and transfer eligibility fails closed (check-transfer-eligibility:52). SMS, follow-up and callback have none. Live test calls are demo calls (demo-agent-overrides.ts:26-28)."
