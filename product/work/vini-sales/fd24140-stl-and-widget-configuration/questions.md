# Open questions

### Q1
- slot: how_it_works_today
- unknown: Can STL send a different first message by lead type today (per-type template or prompt variable), or is there one opener per rooftop?
- blocks: Gap; whether direction 2 is a build or a configuration
- who: engineering
- how: Ask the STL owner on the Vini Sales backend to point to where the STL first message is composed under conversational-ai-backend src/speed-to-lead, then send one test lead per external_type on a UAT team and compare the openers.
- status: open

### Q2
- slot: ask
- unknown: Will the dealer's forwarded email carry a lead-type field, and the appointment date, time and store for online appointments?
- blocks: Directions 1 and 2; nothing can route by type without it
- who: csm
- how: CSM asks the dealer's software development manager for one sample forwarded email per lead type (inquiry, online appointment, credit application) before go-live, and attaches them to the ticket.
- status: open

### Q3
- slot: how_it_works_today
- unknown: Does parseAdf keep a lead type or appointment time from the ADF and write it into the lead's external_type or notes?
- blocks: Direction 2 scope
- who: engineering
- how: Read ParsedEmailData in integrations-backend src/email-parsing/email-parser.service.ts (parseAdf at line 315), then run the dealer's sample emails from Q2 through the parser on UAT. Or query stored lead records for this team, as suggested internally (E30); the same question has been open in the ticket since 2026-10-07 (E29).
- status: open

### Q4
- slot: gap
- unknown: Was the smartview-config failure when calling was disabled fixed in code, or worked around for this team only?
- blocks: Whether the widget half needs a bug ticket
- who: engineering
- how: Ask the L2 Vini dev on the ticket whether a code change shipped. Then turn calling off and on for a UAT team through Vini Config and check that the widget script picks it up.
- status: open

### Q5
- slot: directions
- unknown: Will the dealer accept go-live with appointment and credit-app leads held out of STL until type-specific messages exist?
- blocks: Choosing direction 1 vs 3
- who: csm
- how: CSM puts direction 1 to the VP Marketing on the existing email thread as a phased start, and also corrects the "working on separate messaging" expectation.
- status: open

### Q6
- slot: context_30d
- unknown: Arali holds two records for this rooftop (one with all interactions, one added Sep 8 with the Vini CS role on it). Which is canonical?
- blocks: Future Arali pulls for this rooftop
- who: csm
- how: Vini CS confirms in Arali and asks ops to merge the duplicate company record.
- status: open

### Q7
- slot: directions
- unknown: Should an online appointment in the forwarded ADF also be created as a Spyne appointment (E29), or only confirmed by Ava as the dealer asked (E1, E5)?
- blocks: Direction 2 scope
- who: pm
- how: Decide at the PRD step; first ask the dealer's software development manager whether a Spyne-side copy helps or duplicates the appointment already in their in-house system (E12).
- status: open

### Q8
- slot: request
- unknown: What answer and ETA does product give the CSM on point 1 (STL by lead type), after 14 days with no product reply (E28, E31)?
- blocks: The expectation already set with the dealer (E10)
- who: pm
- how: PM replies on Freshdesk 24140 with the chosen direction and a date, or the phased start of direction 1, so the CSM can update the dealer thread.
- status: open

### Q9
- slot: agents_affected
- unknown: Do any service-department teams run STL? The STL gate has no department dimension (E36), so a per-type opener there would reach them too.
- blocks: Agents affected (Service outbound); scope of the opener change
- who: engineering
- how: Query STL settings for teams whose department is service, and ask the STL owner whether resolveStlGate (:422) is reached for service leads.
- status: open

### Q10
- slot: directions
- unknown: How do conversations and confirmed or booked appointments get written back to a dealer system with no API (E12): outbound webhook, ADF email back, or a pull API the dealer calls?
- blocks: Direction 3 (Full value) write-back scope
- who: engineering
- how: Integrations owner checks what integrations-backend or crm-core-service can already push to a dealer-built endpoint; CSM asks the dealer's software development manager which format they can ingest.
- status: open

### Q11
- slot: agents_affected
- unknown: Is ParsedEmailData (E35) also used for service or other leads, so that new lead-type and appointment fields change what other agents read from /leads/dealer (E38)?
- blocks: Direction 3 blast radius; Agents affected (Service inbound)
- who: engineering
- how: Read callers of parseAdf in integrations-backend and list which lead sources and departments go through it.
- status: open

### Q12
- slot: agents_affected
- unknown: After the STL first text, which agent handles the customer's reply, and does the lead type and appointment reach its context so it keeps confirming instead of pushing a new appointment?
- blocks: Agents affected (Sales inbound, Sales outbound follow-up); Direction 3 opener scope
- who: engineering
- how: Send one test lead per type on a UAT team, reply to the first text, and check the agent and prompt variables on the reply turn.
- status: open

### Q13
- slot: directions
- unknown: Where would per-rooftop, per-type opener templates live (STL settings via upsertSpeedToLeadSettings :47 or the console action, E34), and who edits them?
- blocks: Direction 3 configuration design
- who: engineering
- how: STL owner confirms the settings schema and whether ops can edit it in Admin Tool > Vini Config like the channel switches (E4).
- status: open

### Q14
- slot: request
- unknown: Does a lead-type-aware STL opener with CRM write-back sit on the Vini Sales area roadmap this quarter? product/areas/vini-sales/CLAUDE.md lists what ships today but no roadmap.
- blocks: decide.md Inputs, Strategic fit (area roadmap)
- who: pm
- how: PM checks the Vini Sales quarterly goals sheet and states whether this job maps to a committed goal or would displace one.
- status: open

### Q15
- slot: request
- unknown: How many after-hours website leads a week does this rooftop forward, split by inquiry, online appointment and credit application, and how many BDC hours go to next-day callbacks and confirmations?
- blocks: decide.md Inputs, Dealer P&L impact (sizing)
- who: csm
- how: CSM asks the VP Marketing for a typical week's after-hours website lead count by type and the BDC time spent on them; once forwarding is live, count leads on the team's forwarding inbox by parsed type.
- status: open

### Q16
- slot: request
- unknown: When is the full-value path (CRM-first, lead-type-aware STL first message with write-back) planned to ship, even if a first step ships before it?
- blocks: decide.md Ladder rung 7 (when)
- who: pm
- how: PM sets a target quarter after the engineering estimate (Q17) and records it in decisions.md.
- status: open

### Q17
- slot: request
- unknown: What is the engineering size of the full-value path (ADF lead-type fields, per-type opener on the STL lead-type entry, write-back channel) and of the opener-only step?
- blocks: decide.md Inputs, Cost and risk to build (S, M or L is a judgment today)
- who: engineering
- how: STL owner and integrations owner size the three pieces against parseAdf (integrations-backend :315), resolveStlGate and upsertSpeedToLeadSettings (conversational-ai-backend speed-to-lead-console-call.service.ts :422, :47), and the write-back options in Q10.
- status: open

### Q18
- slot: request
- unknown: Does parseAdf set a lead type, appointment date/time/store or credit-app flag inline, and which ParsedEmailData field becomes the lead's external_type and source? The graph lists no helper for any of these (helpers exist only for comments, phone, vehicle, address, subject source), and no writer of external_type was found.
- blocks: Step 1 (input to the opener); step 2 sizing
- who: engineering
- how: Integrations owner reads parseAdf (integrations-backend src/email-parsing/email-parser.service.ts:315 to :415) and the SQS consumer behind extractEmailData (email-parsing.service.ts:86), then posts the dealer's sample emails (Q2) to POST /email-parsing/test-parse. If appointments are dropped, reuse extractAdfAppointments / transformAdfAppointmentToMeetingInput from lambdas crm-integrations/webhook-processor/crm-clients/adf.js:156, :182.
- status: open

### Q19
- slot: request
- unknown: Do forwarded website email leads arrive with source SPEED_TO_LEAD and external_type website or spyne_console? If so, isAlwaysAllowStlLead (speed-to-lead-console-call.service.ts:406, env STL_ALWAYS_ALLOW_LEAD_TYPES) bypasses the per-type config, and no per-type template would ever be read.
- blocks: Step 2 design (where the template lookup sits relative to the bypass)
- who: engineering
- how: STL owner checks source and external_type on this team's email-forwarded leads, and the prod value of STL_ALWAYS_ALLOW_SOURCE / STL_ALWAYS_ALLOW_LEAD_TYPES.
- status: open

### Q20
- slot: request
- unknown: Will a new opener-template field on the speedToLeadByLeadType entry survive both writers (upsertSpeedToLeadSettings :47 via SpeedToLeadSourceConfigDto :53 under global whitelist/forbidNonWhitelisted, and the console's upsertStlFollowUpConfig conversation-notifications.service.ts:2408 merge at :2489), and does the console UI need a field so ops can edit it?
- blocks: Step 2 configuration surface (Q13)
- who: engineering
- how: STL owner reads the :2489 merge and the console STL settings form, then round-trips a test field on a UAT team through both endpoints.
- status: open

### Q21
- slot: request
- unknown: Can any existing outbound path write back to a dealer with no CRM API (ADF email back, generic webhook)? The graph shows write-back only through crm-core pushToExternalCrm and dealer-leads start-insertion-process, both driven by a configured third-party CRM integration.
- blocks: Step 3 (write-back) scope and whether it is a build or a configuration
- who: engineering
- how: Integrations owner checks crm-core-service src/crm-sync/external-crm-sync.service.ts:149 and dealer-leads-backend api/helpers/crm-integrations/start-insertion-process.js:638 for a non-API provider type; pair with the dealer ask in Q10.
- status: open

### Q22
- slot: assumption
- unknown: STL silent hours allow a first text before the BDC opens
- blocks: one-pager v1, What it removes (time to first contact)
- who: engineering
- how: STL owner reads this team's silent-hours setting and checks when a lead forwarded at 11 pm gets its first text on a UAT team.
- status: open

### Q23
- slot: request
- unknown: (R1, E39) Which field in buildAdfLeadInput (integrations-backend email-parsing-consumer.service.ts:409) sets the lead's external_type and source for a forwarded ADF email, and does it keep the ADF lead type or appointment time anywhere?
- blocks: Step 1 and Step 2; whether a per-type off switch or opener can key on this rooftop's types (E41)
- who: engineering
- how: Integrations owner reads buildAdfLeadInput :409 and createLeadFromAdfEmail :376, then sends the dealer's sample emails (Q2) to POST /email-parsing/test-parse and reads the stored lead's external_type, lead_type and source.
- status: open

### Q24
- slot: request
- unknown: (R4, E42) Do the dealer's website and credit-app forms capture SMS consent, and does the forwarded ADF carry it?
- blocks: Step 0 and Step 2 (contact compliance)
- who: csm
- how: CSM asks the dealer's software development manager for the form consent language and checks the sample ADF emails (Q2) for a consent field.
- status: open

### Q25
- slot: request
- unknown: (deferred D3) Has the dealer paused its own after-hours automated texts for leads it forwards to Spyne, and will it before STL starts? STL cannot see those texts (E43).
- blocks: Step 0 go-live (duplicate contact); gm-r1-7
- who: csm
- how: CSM answers the dealer's 2026-09-29 question (E15) on the email thread and gets a yes or no before go-live.
- status: open

### Q26
- slot: request
- unknown: (deferred D4) What does today's STL notification email contain (lead status, appointment time), who at the rooftop receives it, and when is it sent relative to BDC open?
- blocks: Interim morning handoff before step 3; hand-keying row
- who: engineering
- how: STL owner sends one UAT test lead and forwards the resulting notification email; CSM confirms the rooftop recipients.
- status: open

### Q27
- slot: request
- unknown: (deferred D5) Can the reply agent create an assigned callback task for the BDC after hours?
- blocks: Step 2 scope for appointment and credit-app types
- who: engineering
- how: Vini Sales backend owner checks the reply agent's tool list for an action-item or task tool and runs one after-hours UAT reply.
- status: open

### Q28
- slot: request
- unknown: (deferred D6) What is the show rate today on online-appointment website leads, and who follows up on credit applications (BDC or F&I) with what committed response time?
- blocks: Show-rate baseline; credit-app receiving role; gm-r1-4
- who: csm
- how: CSM asks the VP Marketing on the existing thread.
- status: open

### Q29
- slot: request
- unknown: (deferred D8) Which CRMs and DMS providers have certified write-back today for STL conversations and appointments, and how many active Vini Sales rooftops sit on each versus on no-API systems?
- blocks: ceo-r1-3 (whether step 3 is base leverage or a one-off)
- who: engineering
- how: Integrations owner lists providers behind crm-core-service pushToExternalCrm (external-crm-sync.service.ts:149); a count of active Vini Sales teams by configured CRM follows.
- status: open

### Q30
- slot: request
- unknown: (deferred D9) For each of the 3 companies in E22: is it the same per-type opener job, a credit-app hold-out or a credit-app-first flow, and did any ask for STL outcome write-back?
- blocks: ceo-r1-2
- who: pm
- how: PM rereads the Arali transcripts behind E22 and tags each company.
- status: open

### Q31
- slot: request
- unknown: (round 2, backend-engineer) Which tools does the Sales Inbound SMS reply agent have enabled for this team, in particular get_credit_applications and fetch_credit_score, and can they be disabled per lead or per lead type?
- blocks: Step 2 credit-app acknowledged option (reply turn on a credit-app lead)
- who: engineering
- how: Vini Sales backend owner lists the reply agent's tool definitions for this team (credit tools are on the redaction list at conversational-ai-backend src/utils/message.utils.ts:65) and checks whether a per-lead tool filter exists.
- status: open

### Q32
- slot: request
- unknown: (round 2, bdc-manager) Do Vini or the dealer's own system send appointment reminders for an appointment Ava confirms or sets on an STL lead?
- blocks: PRD show discipline for steps 0 and 2
- who: engineering
- how: Vini Sales backend owner checks whether reminders fire for STL-set or STL-confirmed appointments; CSM asks the VP Marketing how the store reminds online-appointment customers today.
- status: open

### Q33
- slot: request
- unknown: (round 2, gm) Can the dealer's website lead forward exclude online-appointment and credit-application leads, and by what rule (form type, ADF field, subject line)? The dealer planned to forward both inquiries and applications (E9).
- blocks: Step 0 go-live (forward rule)
- who: csm
- how: CSM confirms the rule with the dealer's software development manager, then one appointment and one credit-app test lead go through the real forward and are shown not to arrive.
- status: open

### Q34
- slot: request
- unknown: (Gate 2) Do forwarded email leads reach workflow creation through the SQS queue path (handleEvent, which records the STL step as SKIPPED with reason sqs-stl-deferred-to-api and sends no first text, sequence-workflow-creation.service.ts:193, :264) or the trigger-follow-up API path (createLeadFollowUpFromLead :395), and does the API path then send the first text for them?
- blocks: Step 0 go-live (a forwarded lead must receive its first text)
- who: engineering
- how: STL owner sends one forwarded test lead to this team's leads inbox on UAT, then reads its sequenceTasks rows (taskType STL, status, statusReason, smsSentAt) and the initial_sms activity event.
- status: open

### Q35
- slot: request
- unknown: (PRD r1, bdc-manager) Does the Sales Inbound SMS reply agent offer or execute a human transfer or callback for this team outside business hours, and where does it route?
- blocks: Step 0 go-live (R12, A17)
- who: engineering
- how: Vini Sales backend owner reads the reply agent's tool list and this team's hours config (SMS human transfer at sequence-task-execution-orchestrator.service.ts:657), then sends "can someone call me" to an after-hours UAT test lead and records what fires.
- status: open

### Q36
- slot: request
- unknown: (PRD r1, backend-engineer and gm) What source string does the email parser store for this dealer's forward, is it stable across test forwards, and does any other lead feed or STL source at this team write it or rely on the team silence nudge?
- blocks: Step 0 go-live (excludeSource blast radius, nudge off)
- who: engineering
- how: STL owner reads source on the Q34 test leads and on dealer_leads_raw.leads for this team (argMax per _id), grouped by source over 30 days.
- status: open

### Q37
- slot: request
- unknown: (PRD r1, bdc-manager and gm) Can ops set customer.optOut.sms for one customer today without a build (Console or admin tool), and how fast?
- blocks: Step 0 R4 (non-STOP opt-out mechanism)
- who: engineering
- how: Vini Sales backend owner names the existing write path for optOut.sms outside the inbound STOP handler (sms.service.ts:2349) and who can use it.
- status: open

### Q38
- slot: request
- unknown: (PRD r2, bdc-manager and gm) Which field, task or event sets each handoff status (replied, callback requested, appointment set) on the STL notification email or in Console, and does Console list after-hours STL leads filterable by callback requested and appointment set, with the appointment time and the customer's words?
- blocks: Step 0 go-live (R5, R12, A14, A17)
- who: engineering
- how: STL owner traces the notification email builder and the Console lead list, then runs the production Q34 test lead through one booking and one "can someone call me" reply and records what each surface shows.
- status: open

### Q39
- slot: request
- unknown: (PRD r2, bdc-manager, ceo and gm) What are this rooftop's BDC open and close times and closed days, who covers the BDC manager's days off (the backup handoff recipient), and what share of after-hours website inquiries arrive before versus after the STL window's end?
- blocks: Step 0 recipients (R5, A15, A16); the Removes line and the week-4 review (same-evening first contact)
- who: csm
- how: CSM asks the VP Marketing alongside Q15 and Q22; once forwarding is live, count forwarded leads by arrival hour against the window from the daily reconciliation.
- status: open
