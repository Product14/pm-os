# Evidence

### E1
- source: freshdesk:24140#8
- date: 2026-09-29
- side: spyne
- role: csm
- text: "The client wants to enable the STL for his website leads... Existing appointment: Confirm the appointment... No appointment: Work toward setting an appointment. Online credit application: Confirm receipt... Ava will not collect or discuss PII."

### E2
- source: freshdesk:24140#4
- date: 2026-09-29
- side: spyne
- role: unknown
- text: "this asking is for vdp widget."

### E3
- source: freshdesk:24140#5
- date: 2026-09-29
- side: spyne
- role: unknown
- text: "when we disabled the calling option, the \"smartview-config\" API was not processed."

### E4
- source: freshdesk:24140#7
- date: 2026-09-29
- side: spyne
- role: unknown
- text: "now the call option was disabled... Admin Tool. Converse AI -> Vini Script -> Vini Config. Search the enterprise and team and disable the call, chat, email or speed to lead as per the requirement."

### E5
- source: arali:a61bee09-ca85-4be9-8e05-67a607dc9c71
- date: 2026-09-24
- side: dealer
- role: vp-marketing
- text: "what I'd like Ava to do is drive appointments when there aren't appointments and confirm appointments when there are appointments. She's not gonna be taking credit applications. She's not gonna be talking about PII."

### E6
- source: arali:a61bee09-ca85-4be9-8e05-67a607dc9c71
- date: 2026-09-24
- side: dealer
- role: vp-marketing
- text: "I'd like to include the if the customer sets an online appointment... We get a lot of online appointments. Set via the website."

### E7
- source: arali:a61bee09-ca85-4be9-8e05-67a607dc9c71
- date: 2026-09-24
- side: dealer
- role: vp-marketing
- text: "is the widget configurable so that if I don't want it to be a call, but I do want it to, engage with SMS only... If someone was gonna call, I'd rather they reach a human during business hours"

### E8
- source: arali:a61bee09-ca85-4be9-8e05-67a607dc9c71
- date: 2026-09-24
- side: dealer
- role: vp-marketing
- text: "our BDC will take the lead, then we'll enter them, and they will call them... the real impact of what we're doing with you is... to follow-up on leads after hours."

### E9
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#6
- date: 2026-09-30
- side: dealer
- role: vp-marketing
- text: "we should ONLY send emails to Spyne outside of our business hours... These are leads received through our website (both inquiries and applications)."

### E10
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#3
- date: 2026-09-30
- side: spyne
- role: csm
- text: "For leads where an appointment has already been booked or where the customer has submitted an online credit application request, we're working on separate messaging so the appropriate text is sent instead of the standard new-lead flow."

### E11
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#4
- date: 2026-09-30
- side: dealer
- role: vp-marketing
- text: "#4 - OK. Holding on this for now." (reply to Spyne's note that the website widget call option was disabled for an SMS-only experience, pending go-ahead)

### E12
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#28
- date: 2026-10-06
- side: dealer
- role: engineering
- text: "We don't currently have an API. We need to be able to ingest data from your platform so we know what has been said to a customer, and more importantly, if an appointment was made, we can load it into our system."

### E13
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#17
- date: 2026-10-01
- side: dealer
- role: engineering
- text: "I appreciate the reply, but I was hoping we could work out an automated solution." (reply to Spyne offering Console access and notification emails as the record of STL conversations)

### E14
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#8
- date: 2026-09-30
- side: spyne
- role: csm
- text: Spyne asked for forwarded website leads as ADF XML (else JSON, else plain text), one customer per email, with name, phone, vehicle of interest and notes; a per-team leads inbox address was issued in message #9.

### E15
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#2
- date: 2026-09-29
- side: dealer
- role: vp-marketing
- text: "should we consider pausing any automated messages we might already be sending out after hours so that customer doesn't get duplication?"

### E16
- source: arali:ddf14dfa-881a-4158-931e-318d38e7fdb1#31
- date: 2026-10-06
- side: dealer
- role: vp-marketing
- text: "she talks about vehicles but doesn't say where they are and it can cause some issues - that's why I want them to have location of each vehicle"

### E17
- source: bluebrain:conversational-ai-backend:src/call/call-web-call.controller.ts:65
- date: 2026-10-15
- side: system
- role: engineering
- text: Route PATCH /web/call/widget/smartview-config is declared here. trace_handler found no named helpers or datastore writes in the file, so what it updates when calling is disabled is not visible from the graph.

### E18
- source: bluebrain:conversational-ai-backend:src/speed-to-lead/speed-to-lead.controller.ts:18
- date: 2026-10-15
- side: system
- role: engineering
- text: STL endpoints cover silent-hours checks, customer data prefetch and outbound settings (repo card, verification score 0.68, 7 of 14 claims fully supported). trace_handler found no named helpers; no lead-type-specific opening message found in the graph.

### E19
- source: bluebrain:integrations-backend:src/email-parsing/email-parser.service.ts:315
- date: 2026-10-15
- side: system
- role: engineering
- text: parseAdf(emailBody, subject) returns ParsedEmailData; parseAdfPayloadFromEmailBody at line 224 extracts an ADF payload from an email body. This is the likely entry for forwarded email leads. Fields carried are not visible from the graph.

### E20
- source: pm:2026-10-12
- date: 2026-10-12
- side: pm
- role: unknown
- text: Per context/metrics/stl-coverage-eligible-by-type.md, STL eligibility resolves on upper(external_type), then source, then source DEFAULT, and each entry is only an isEnabled switch. Lead type can turn STL on or off; nothing in the entry selects a different message.

### E21
- source: search:search-ticket-messages:speed to lead outreach should change based on lead type, lead already has appointment booked or submitted credit application
- date: 2026-10-15
- side: system
- role: unknown
- text: 0 other companies' tickets asked for a lead-type-aware first touch, 2026-07-17 to 2026-10-15. Hits were about sold or lost leads still getting STL (a status gate, a different job).

### E22
- source: search:search-transcripts:dealer wants the first text to a new lead to confirm an existing appointment or credit application instead of pushing for a new appointment
- date: 2026-10-15
- side: system
- role: unknown
- text: 3 other companies raised an adjacent job on calls, 2026-07-17 to 2026-10-15: tailoring the first text by lead type or provider, keeping credit-application leads out of AI outreach, and a credit-app-first flow for subprime leads.

### E23
- source: search:search-ticket-messages:website VDP widget disable call button, chat or SMS only
- date: 2026-10-15
- side: system
- role: unknown
- text: 1 other company asked to control which widget channel appears (did not want web chat), 2026-07-17 to 2026-10-15. Other hits were VDP media-script layout issues.

### E24
- source: jira:RETCONVAI-4403
- date: 2026-07-29
- side: system
- role: engineering
- text: "<this rooftop> Call Flow" task, status LIVE ON PROD. A prior call flow built for this rooftop; not a duplicate of the lead-type STL ask.

### E25
- source: jira:RETCONVAI-5238
- date: 2026-09-29
- side: system
- role: engineering
- text: "Create a new lead (and send STL) when a returning customer sends a new CRM lead", Ready For Dev. Adjacent STL change; no Jira found for a lead-type-specific STL opener in the last 180 days.

### E26
- source: freshdesk:24140#desc
- date: 2026-09-28
- side: spyne
- role: csm
- text: "The client wants to enable the STL for his website leads... For existing appointments and credit applications, Ava will identify the lead type and adjust the conversation accordingly"

### E27
- source: freshdesk:24140#desc
- date: 2026-09-28
- side: spyne
- role: csm
- text: "the client wants to disable the call option to ensure the call flow is consistent during both working hours and after-hours. Please let us know how to enable SMS-only feature on the widget."

### E28
- source: freshdesk:24140#14
- date: 2026-10-07
- side: spyne
- role: unknown
- text: "its been 9 days since the ticket was raised and point 1 is still not picked up. Please update an ETA on this." (leadership copied)

### E29
- source: freshdesk:24140#15
- date: 2026-10-07
- side: spyne
- role: unknown
- text: "do our ADF email parsers also pick up appointment details when a lead books an appointment via the website form? If not, we'd like to read and process that info so the appointment gets created as well."

### E30
- source: freshdesk:24140#16
- date: 2026-10-08
- side: spyne
- role: unknown
- text: "can you not check that in our database?" (reply to E29; no answer on whether the parser keeps appointment details follows in the thread)

### E31
- source: freshdesk:24140#17
- date: 2026-10-12
- side: spyne
- role: unknown
- text: "Team, is this done?" (last message; no product-side reply anywhere in the 17-message thread)

### E32
- source: pm:2026-10-15
- date: 2026-10-15
- side: pm
- role: unknown
- text: "There should be a direction that expands on the third point, prioritises the CRM, and scopes the changes needed to build the lead-type-aware first message for STL (speed to lead)."

### E33
- source: pm:2026-10-15
- date: 2026-10-15
- side: pm
- role: unknown
- text: "That unlocks the full value for this dealership and maybe others. If we do not plan for it now, the ticket resolution is incomplete and it will never unlock the full go-live for this dealership."

### E34
- source: bluebrain:spyne-console-backend:api/controllers/speed-to-lead/create-speed-to-lead.js:29
- date: 2026-10-15
- side: system
- role: engineering
- text: Console action speed-to-lead/create-speed-to-lead is the only symbol matching "speed-to-lead" outside conversational-ai-backend; the likely console surface for per-team STL settings.

### E35
- source: bluebrain:integrations-backend:src/email-parsing/email-parser.service.ts:14
- date: 2026-10-15
- side: system
- role: engineering
- text: interface ParsedEmailData is declared here. trace_handler on the file found no named helpers and no datastore writes, so which ADF fields it keeps (lead type, appointment time, credit-app flag) is not visible from the graph.

### E36
- source: bluebrain:conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:13
- date: 2026-10-15
- side: system
- role: engineering
- text: StlConfigDimension = 'source' | 'lead-type' (:13). The file holds gates only: upsertSpeedToLeadSettings :47, isFollowUpEnabled :123, normalizeLeadTypeKey :396, isAlwaysAllowStlLead :406, resolveStlGate :422. All keyed on enterpriseId and teamId; no department dimension and no opener or template symbol.

### E37
- source: bluebrain:conversational-ai-backend:src/api-wrapper/cdk-connect/cdk-connect-api.service.ts:41
- date: 2026-10-15
- side: system
- role: engineering
- text: who_calls: conversational-ai-backend calls integrations-backend /appointments here, and reads INTEGRATIONS_BASE_URL in the STL console-call spec (:1237). The appointment write path is shared integration plumbing, not STL-only.

### E38
- source: bluebrain:integrations-backend:src/webhook/services/internal-api-loader.service.ts:134
- date: 2026-10-15
- side: system
- role: engineering
- text: who_calls: integrations-backend posts leads to dealer-leads-backend /leads/dealer here and depends on crm-core-service. Parsed email leads land in the shared lead store other agents read.
