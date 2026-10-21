# Evidence

### E1
- source: pm:2026-10-21
- date: 2026-10-21
- side: pm
- role: unknown
- text: "both sms wins" (PM choosing the two SMS levers from the 21 Oct weekly review for one PRD)

### E2
- source: search:transcript-read:sales-inbound-weekly-2026-10-21 (results/sms-b1..b4.json, field after_unaccepted_offer)
- date: 2026-10-21
- side: system
- role: engineering
- text: Of 47 winnable SMS threads (14 to 20 Oct) where offered times were not taken: same pair repeated 20, no follow-up 12, different times 7, asked constraint 5, customer left 3. Blinded readers, rubric v1.0.

### E3
- source: search:transcript-read:sales-inbound-weekly-2026-10-21
- date: 2026-10-21
- side: system
- role: engineering
- text: Same time pair repeated within a thread on 28 of 100 SMS threads read (12 Oct read: 10 of 50).

### E4
- source: search:transcript-read:sales-inbound-weekly-2026-10-21
- date: 2026-10-21
- side: system
- role: engineering
- text: Agent proposed a visit clock time unprompted on 57 of 84 winnable SMS threads (68%, CI 57-77%), vs 72% on 12 Oct.

### E5
- source: search:clickhouse:abr-trends prelude, 11-day same-store window 10 to 20 Oct 2026 (abr-deepdive/weekly/2026-10-21/REFRESH.md)
- date: 2026-10-21
- side: system
- role: engineering
- text: 517 qualified SMS leads were offered two clock times; 99 booked (19%). SMS ABR 16.6% vs 14.0% prior window (p about 0.16).

### E6
- source: search:transcript-read:sales-inbound-weekly-2026-10-21
- date: 2026-10-21
- side: system
- role: engineering
- text: no_inventory_match_no_sourcing_offer on 10 of 84 winnable SMS threads; agent_notes_instead_of_acting ("I'll note that" as last act) on 10 of 84. Neither moved since the 12 Oct read.

### E7
- source: search:transcript-read:sales-inbound-weekly-2026-10-12 (results-discovery/DISCOVERY.md)
- date: 2026-10-12
- side: system
- role: engineering
- text: Times offered before the customer's constraint was known: in 5 threads with a constraint (out of state, wants today, works weekdays) the first offer failed and only 1 recovered.

### E8
- source: search:transcript-read:sales-inbound-weekly-2026-10-12 (REPORT.md)
- date: 2026-10-12
- side: system
- role: engineering
- text: SMS has no visit-ask gate, so nothing enforces "never repeat a declined pair" server-side. "10:30 AM" appeared in 16 of 43 post-release SMS threads at 8 rooftops (model convergence, not a prompt literal).

### E9
- source: search:transcript-read:sales-inbound-weekly-2026-10-21 (sms-b2, thread 01a1553f)
- date: 2026-10-21
- side: system
- role: engineering
- text: Agent, after the customer said they would reply with a time later: "That works. I'll be here when you're ready, and we can line up a time for the Civic and take a look at your Altima then." No follow-up sent.

### E10
- source: search:transcript-read:sales-inbound-weekly-2026-10-21 (sms-b1, thread 01a14fab; sms-b2, thread 01a15667)
- date: 2026-10-21
- side: system
- role: engineering
- text: Inventory miss endings: "I do not see a used SUV under $10,000 right now." and "Understood. We do not have that older Trailblazer here. I hope you find the right one soon."

### E11
- source: search:clickhouse:abr-trends prelude, calendar week of 12 Oct 2026
- date: 2026-10-21
- side: system
- role: engineering
- text: SMS week of 12 Oct: 3,372 leads received, 558 qualified, 103 appointments, ABR 18.5%, 21 rooftops, 4.9 appointments per rooftop. Close / attempt slid 1.73 to 1.43 over four weeks (unexplained).

### E12
- source: jira:RETCONVAI-5392
- date: 2026-10-21
- side: system
- role: engineering
- text: Voice regression filed separately: workflow_v2 voice proposes visit times on 8% of winnable calls vs 58% inline.

### E30
- source: arali:meeting:65fc1506-f9f8-4b63-a229-2d3dd1565714@00:09:26
- date: 2026-10-06
- side: dealer
- role: sales director
- text: "a customer was asked if they'd like to schedule a test drive... the customer said yes. And then Emily came back and said... Would you like the price for for this vehicle? And then it ruined the appointment." (Vini sales SMS on internet leads)

### E31
- source: arali:meeting:65fc1506-f9f8-4b63-a229-2d3dd1565714@00:10:55
- date: 2026-10-06
- side: dealer
- role: sales director
- text: "anytime someone agrees to an appointment, it needs to be, great. Does today or tomorrow work better for you? Instead of asking any other questions"

### E32
- source: arali:meeting:65fc1506-f9f8-4b63-a229-2d3dd1565714@00:05:31
- date: 2026-10-06
- side: dealer
- role: unknown
- text: "if there's a conversation happening, our salesperson sees it, and they wanna take over... they can press stop... Follow-up for the AI." Same store asks for the raw SMS thread pushed to their CRM, close to live (@00:03:53).

### E33
- source: arali:meeting:f3a073ba-44b1-4008-9099-911fea646318@00:27:26
- date: 2026-09-24
- side: dealer
- role: unknown (says he runs the store's follow-up team; a manager beside him confirms appointments)
- text: "Spine tried to schedule a test drive for... 12PM, but that appointment never made it in the system... nobody would have ever known that this customer was supposed to even have an appointment." (Spyne SMS follow-up on an aged sales lead)

### E34
- source: arali:meeting:c1a25a67-9b45-4f9b-84d2-c0482edc6566@00:45:34
- date: 2026-10-13
- side: dealer
- role: used car manager
- text: "It's got the AI goal in its mind of I have to set the appointment versus... there might be a different way to attack this lead." (reviewing Emily's aged-lead text follow-ups)

### E35
- source: arali:meeting:c95786a6-4c00-4462-a655-0c906aa1db07@00:41:24
- date: 2026-09-21
- side: dealer
- role: general manager
- text: "It's always moving to the phone. Moving to the phone. It's too much commitment to try and get him to book an appointment with text." Counter-signal: dead-deal re-engagement campaign, rooftop is in Canada.

### E36
- source: arali:meeting:0886f834-ad0c-4744-9880-66f93fb428d3@00:11:57
- date: 2026-09-22
- side: dealer
- role: unknown
- text: "it is creating appointments for a car that we don't have that we don't have on the ground." Prospect describing their current vendor's AI, not Vini. Inventory awareness matters to them, but the failure is the opposite of E6.

### E37
- source: arali:meeting:65fc1506-f9f8-4b63-a229-2d3dd1565714@00:09:59
- date: 2026-10-06
- side: spyne
- role: csm
- text: CSM reply to E30: "I have received this feedback from other dealership as well." Fix offered was a per-store rule to stop proactive pricing questions. Spyne-side, does not satisfy the slot.

### E38
- source: search:search-ticket-messages:"Vini SMS repeating same appointment times, not following up" and "sales agent text lead vehicle sold or not in inventory, no alternative offered, appointment not booked"
- date: 2026-10-21
- side: system
- role: engineering
- text: 2 ticket searches, no company filter, 2026-07-23 to 2026-10-21, 20 results each: 0 dealer tickets on repeated or unfollowed SMS time offers, 0 on inventory-miss dead ends. Hits were VIN sync, merchandising, an STL text to a sold lead, and a July ticket on repeats after a confirmed appointment (different problem).

### E39
- source: search:search-thread-messages:"AI text conversation did not book appointment, customer went quiet, no follow up, vehicle not available"
- date: 2026-10-21
- side: system
- role: engineering
- text: 1 email/Slack search, 2026-09-21 to 2026-10-21, 20 results: 0 relevant to sales SMS. Hits were service-scheduler booking failures (Xtime, Dealer-FX) and Studio uploads.

### E40
- source: search:search-transcripts:"AI text keeps offering the same appointment times, customer stops responding" + "vehicle not in stock, offer similar vehicles or source" (2026-09-21 to 2026-10-21) + "text conversations not converting to appointments, leads not booked handed back to BDC" (2026-07-23 to 2026-10-21)
- date: 2026-10-21
- side: system
- role: engineering
- text: 3 transcript searches, 20-25 results each. Rooftops raising the job (unbooked text leads lost or mishandled, wants a direct close or a hand-back): 3, all inside 30 days (E30-E34). Pushing the other way (move text leads to the phone): 1 (E35). Raising the Vini inventory-miss dead end: 0 (1 prospect on another vendor, E36). No dealer named repeated time pairs specifically. Semantic search, not exhaustive.

### E13
- source: conversational-ai-backend:src/agents/agents-v2.service.ts:1500 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: Any agent type whose name contains "sales" (other than acquisition) resolves to the sales_v2 prompt root, on every channel, so Sales Inbound SMS renders sales_v2.xml.

### E14
- source: conversational-ai-backend:src/agents/agents-v2.service.ts:2905 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: templateVars.visit_ask_gate is true only when communication_mode is 'voice' and the mapping is not workflow_v1/workflow_v2 (lines 2905-2911). On SMS it is false, so the sales_visit_ask_gate tool is not supplied and the gate branch of VisitInvite (sales_new/appointment-conversion.xml:8-9) does not render.

### E15
- source: conversational-ai-backend:src/prompts/base-system-prompts/sales_new/appointment-conversion.xml:19 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: Repeat protection on SMS is prompt text only: "Each new ask uses different days and times from every earlier ask; a pair the customer declined is never offered again" (line 19), restated at lines 71 and 106.

### E16
- source: conversational-ai-backend:src/prompts/base-system-prompts/sales_new/appointment-conversion.xml:30 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: Turning down only the two offered times is not a no: "ask once what day and time suit them" (line 30); an open day or time question is allowed only after both times are turned down or the customer cannot commit (line 62). Undecided replies are "not now": keep helping and ask again after a real buying signal (line 30).

### E17
- source: conversational-ai-backend:src/prompts/base-system-prompts/sales_new/appointment-conversion.xml:131 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: The SMS channel arm (lines 131-134) only says to use a short one-tap ask with two exact times and a reply path; it has no SMS-specific rule for the turn after an untaken offer.

### E18
- source: search:git-grep conversational-ai-backend origin/release src/ for offeredSlots|offeredTimes|proposedSlots|declinedSlots|lastOfferedSlot
- date: 2026-10-21
- side: system
- role: engineering
- text: No match. There is no server-side field that records the time pairs already offered or declined in an SMS thread.

### E19
- source: conversational-ai-backend:src/sms/sms-wakeup.constants.ts:4 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: SMS wake-up defaults: enabled, fires 10 minutes after the window is armed, at most 2 wake-ups per conversation (lines 3-5). The window is re-armed on every inbound SMS reply (sms-wakeup.service.ts:67, 82) and stops at the cap (sms-wakeup.service.ts:190).

### E20
- source: conversational-ai-backend:src/sms/sms-wakeup.service.ts:177 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: A wake-up is skipped when a meeting exists, an action item with a non-scheduling intent exists, or the last message was marked isConcluded (line 177); also on outcomes such as SOFT_DECLINE and CALLBACK_REQUESTED (sms-wakeup.constants.ts:27-56).

### E21
- source: conversational-ai-backend:src/prompts/base-system-prompts/sales_new/sms-wakeup.xml:7 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: On flowType=wakeup the root drops appointment-conversion.xml and offer-conversion.xml (sales_v2.xml:57-59) and the nudge is told to ignore AppointmentConversion (line 7) and re-ask the open question in fresh wording (line 44). Its examples re-offer the same visit ("does next Friday still work", line 18; "next Friday at 11 or 4", line 53); no rule says to offer a different pair.

### E22
- source: conversational-ai-backend:src/meetings/tentative-booking-evaluator.service.ts:72 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: Tentative (pencil) booking cron picks in-progress SMS conversations from sources speed_to_lead, sms or follow_up (tentative-booking.constants.ts:17-22) that have had a wake-up sent and then the team's createAfter wait (fallback 15 minutes, line 68) with no human takeover (lines 72-83).

### E23
- source: conversational-ai-backend:src/meetings/tentative-appointment-gate.service.ts:278 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: The pencil gate needs a customer-stated visit commitment (line 271) and a customer-stated daypart or exact time; times in Agent lines do not count (line 278), and a date-only reply is rejected (line 279).

### E24
- source: conversational-ai-backend:src/prompts/base-system-prompts/sales_new/unavailable-vehicle-discovery.xml:3 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: On inventorySearchOutcome="requested_vehicle_unavailable" (line 3) the agent states the miss once and asks one question about what the vehicle is for (line 14), searches with searchMode="agreed_alternative" and shows at most two verified listings (line 32); if that returns empty it stops and offers one visit-oriented next step (line 40). The block is skipped in the request-only visit flow (line 1). Included for all channels (sales_v2.xml:49).

### E25
- source: search:git-grep sales_v2.xml and every fragment it includes on origin/release for sourc|locate|special order|dealer trade|find one
- date: 2026-10-21
- side: system
- role: engineering
- text: No match for a sourcing, locate or dealer-trade instruction. The only hit for "locate" is cancelling a meeting (sales_new/guardrails.xml:10).

### E26
- source: conversational-ai-backend:src/action-items/intent/intent-code.enum.ts:12 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: Sales action-item intents (lines 12-29) cover appointment, callback, quote, test drive, showroom visit, send vehicle info, quote and be-back follow-ups, trade-in, finance, manager, voicemail and lost lead. No vehicle sourcing or locate intent exists.

### E27
- source: conversational-ai-backend:src/braintrust/eval-toolsets.ts:19 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: Canonical Sales:inbound toolset (lines 19-32): inventory_search_vehicles_v3, inventory_get_carfax_history, communication_get_details, communication_send_sms, dealership_check_hours, find_sibling_rooftop, communication_transfer_call_v3, communication_end_call, sales_get_finance_partners, sales_get_finance_prequalify, get_finance_offers_tool, sales_create_meeting. No note or task tool. Live agents take tools from agent config (agents-v2.service.ts:2265-2276), so a given rooftop's list is not proven by code.

### E28
- source: search:git-grep conversational-ai-backend origin/release src/ for remember_sales_details
- date: 2026-10-21
- side: system
- role: engineering
- text: remember_sales_details appears only in workflows/sales_v2 fragments (for example workflows/sales_v2/appointments/create.xml:2), the workflow_v2 path, not in the sales_v2 root that SMS renders.

### E29
- source: conversational-ai-backend:src/sms/sms-v2.service.ts:2630 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: The prompt tells the agent to use note-style wording ("I'll note that...", sales_new/escalation.xml:193; guardrails.xml:143) with no tool behind it. The dealer CRM receives the SMS thread as a conversation summary note after the thread goes idle (lines 2630-2632), posted via createSalesNote with title 'AI SMS Conversation' (lines 1456-1465).

### E41
- source: conversational-ai-backend:src/tools/definitions/sales/sales-confirm-tentative-meeting.tool.ts:47 (origin/release 21dd50b5a)
- date: 2026-10-21
- side: system
- role: engineering
- text: sales_confirm_tentative_meeting promotes a penciled meeting to scheduled when the customer confirms (lines 47-54; prompt rule sales_new/guardrails.xml:17-22). sales_create_meeting is for sales meetings only and must not be used for callbacks or text follow-ups (sales-create-meeting.tool.ts:139).

### E42
- source: search:transcript-read:sales-inbound-weekly-2026-10-21 (results/sms-b1..b4.json joined to data/blind-key.json)
- date: 2026-10-21
- side: system
- role: engineering
- text: The 100 sampled SMS threads came from 14 rooftops. The 47 winnable untaken-offer threads span 10 rooftops (two stores carry 14 and 13, the next 7). The 10 inventory-miss dead ends span 5 rooftops (one store carries 6).

### E43
- source: conversational-ai-backend:src/crm_integration/crm_integration.service.ts:853 (origin/release e7190a7d9)
- date: 2026-10-21
- side: system
- role: engineering
- text: syncActionItems sends each sales action item with intent, description and due_date (lines 858-881). With crm-core on it posts crm-core /v1/internal/action-items/ci/bulk, which also fires the CRM push (lines 897-935; crm-core-service.client.ts:847); otherwise dealer-leads /v3/action-items/bulk then start-insertion-process with type 'action_items' (lines 937-958).

### E44
- source: dealer-leads-backend:api/helpers/crm-integrations/start-insertion-process.js:636 (release a1587e2b1)
- date: 2026-10-21
- side: system
- role: engineering
- text: start-insertion-process looks up the rooftop's one registered CRM (provider type "crm" for sales, "crm-service" for service, lines 636-664) and hands the payload to that CRM's own push lambda (lines 1336-1361). The per-CRM object mapping lives in each lambda, not in dealer-leads (lines 773-774).

### E45
- source: dealer-leads-backend:api/helpers/crm-integrations/start-insertion-process.js:894 (release a1587e2b1)
- date: 2026-10-21
- side: system
- role: engineering
- text: Action items with no conversation_id or call_id are dropped before the push (lines 894-920), and the sales sync gate can hold a whole conversation from the CRM (lines 592-628).

### E46
- source: search:gh-api:spyne-ai-tech/lambdas crm-integrations/ (release c846c1430)
- date: 2026-10-21
- side: system
- role: engineering
- text: Sales CRM push lambdas that handle actionItems: adf-push, drivecentric-push, eleads-push, pbs-push, tekion-push, vinsolution-push (foureyes-consent-push is consent only). Six write paths, one per CRM.

### E47
- source: lambdas:crm-integrations/drivecentric-push/transform.js:667 (release c846c1430)
- date: 2026-10-21
- side: system
- role: engineering
- text: DriveCentric writes each action item as a customer task (type "Touchpoint", name = intent) with assignedAt = due_date, pulled forward to now + 5 min if in the past (lines 667-704; called at main.js:657-658). Carries a due time.

### E48
- source: lambdas:crm-integrations/pbs-push/transform.js:518 (release c846c1430)
- date: 2026-10-21
- side: system
- role: engineering
- text: PBS writes each action item as a Workplan reminder with DueDate = due_date (or now if missing), Status Active, Summary = description (lines 518-527; called at main.js:878-881). Carries a due time.

### E49
- source: lambdas:crm-integrations/eleads-push/fortellis.js:783 (release c846c1430)
- date: 2026-10-21
- side: system
- role: engineering
- text: eLead (Fortellis) writes each action item as an already-completed activity named "Note" via /activities/complete with a completedDate, no due date (lines 783-793). Only meetings go through /activities/schedule with a dueDate (lines 768-779). No due time on action items.

### E50
- source: lambdas:crm-integrations/tekion-push/transform.js:551 (release c846c1430)
- date: 2026-10-21
- side: system
- role: engineering
- text: Tekion writes each action item as a lead note with title = intent and description only (lines 551-569), posted to /openapi/v4.0.0/leads/{id}/notes (insert-data.js:534; main.js:540-567). No due time.

### E51
- source: lambdas:crm-integrations/vinsolution-push/handler.js:1669 (release c846c1430)
- date: 2026-10-21
- side: system
- role: engineering
- text: VinSolutions joins action-item descriptions with meetings, notes and timeline lines into one text block written to the lead's Note field on a lead update (lines 1669-1711). No task object, no due time.

### E52
- source: lambdas:crm-integrations/adf-push/xml-formats.js:103 (release c846c1430)
- date: 2026-10-21
- side: system
- role: engineering
- text: ADF push lists action items as bullets under "ACTION ITEMS" inside the ADF lead's comments text (lines 103-125, used at 183-213). No task object, no due time.

### E53
- source: crm-core-service:src/external-crm-sync-status/update-external-crm-sync-status.service.ts:225 (release a5d1d5be5)
- date: 2026-10-21
- side: system
- role: engineering
- text: external_crm_synced_timestamp is set by crm-core PATCH /v1/sales/external-crm-sync (user-auth guard, synced_by system or user; controller lines 47-54), which writes the legacy action item (action-item-legacy.mongo.repository.ts:105-112). Push lambdas report CRM ids back via /v1/internal/sales/sync-external-crm-ids (eleads-push/spyne.js:65). This pass did not prove the lambda path also sets the timestamp.

### E54
- source: search:transcript-read:sales-inbound-weekly-2026-10-21 (results/sms-b1..b4.json, after_unaccepted_offer = same_times_repeated, 20 ids) joined to clickhouse:dealer_leads.smsMessages.wakeUpMessage
- date: 2026-10-21
- side: system
- role: engineering
- text: Of the 20 threads where the same time pair was repeated after an untaken offer, 9 repeated it only in a wake-up nudge, 7 only in live replies to a customer message, and 4 in both. By message: 30 repeated-pair messages, 13 wake-ups and 17 live replies. Every agent message that followed another agent message with no customer turn between carried wakeUpMessage = 1, so the transcript rule and the warehouse flag agree on all 20 threads.

### E55
- source: search:transcript-read:sales-inbound-weekly-2026-10-21 (same 20 threads); conversational-ai-backend:src/prompts/base-system-prompts/sales_new/appointment-conversion.xml:19 (origin/release e7190a7d9)
- date: 2026-10-21
- side: system
- role: engineering
- text: 13 of the 17 live repeats came right after a side question (address or location, price or out-the-door, photos or link, trade-in, website listing); 2 followed a customer constraint (a different day, a budget), 1 an objection, 1 a near-yes. The rendered live rule forbids all of these: "Each new ask uses different days and times from every earlier ask; a pair the customer declined is never offered again, even after a side question" (line 19). Outcomes: 4 of 7 live-only threads booked (2 on a time the customer proposed), 0 of 9 wake-up-only threads booked, and 8 of those 9 got no customer reply after the nudge.

### E56
- source: conversational-ai-backend:src/sms/sms-v2.service.ts:4142 (origin/release e7190a7d9); clickhouse:dealer_leads.smsMessages
- date: 2026-10-21
- side: system
- role: engineering
- text: Wake-ups are identifiable per message: sendOutbound saves wakeUpMessage = true on each SmsMessage when the lambda passes wakeUp (line 4142; field at conversation/sms-message.schema.ts:129, added in ffa97f355 on 2026-08-27), and the flag is in ClickHouse as dealer_leads.smsMessages.wakeUpMessage (Nullable UInt8). messageReason is not a reliable marker: 5 of the 16 wake-ups in these 20 threads carry a reply-style reason (question_or_new_info) instead of wakeup_follow_up.

### E57
- source: clickhouse:dealer_leads.smsMessages (20 conversation ids, 14 to 20 Oct 2026); conversational-ai-backend:src/prompts/base-system-prompts/sales_new/sms-wakeup.xml:13 (origin/release e7190a7d9)
- date: 2026-10-21
- side: system
- role: engineering
- text: 5 of the 16 wake-ups repeated the previous agent message word for word (3 of them carrying the time pair), although the wake-up prompt tells the model to check for and discard a draft that repeats the last message (lines 13-14). 11 of 16 wake-ups fired 10 to 21 minutes after the last agent message; 4 were deferred 11 to 25 hours, three of them sent in one 12:10 UTC batch on 19 Oct, still carrying the pair offered the night before.

### E58
- source: lambdas:converse/sms-worker/index.js:1522 (release c846c1430); conversational-ai-backend:src/sms/sms-v2.service.ts:3851, src/sms/sms-wakeup.service.ts:268, src/sms/sms.service.ts:2545 (origin/release e7190a7d9)
- date: 2026-10-21
- side: system
- role: engineering
- text: The SMS turn is generated in the sms-worker lambda, not the backend: it requests the prompt with flowType "wakeup" or "reply" (line 1522), strips booking tools on a wake-up (lines 1528-1532), calls the model, and posts to /internal/sms/v2/messages/outbound with wakeUp (lines 1576-1582). The wake-up sees the whole thread: the dispatch passes Date.now() as the window start (sms-wakeup.service.ts:268) and getMessagesInWindow returns every chat-completion message before it (sms-v2.service.ts:3851-3873). The window is re-armed only by an inbound customer reply (sms.service.ts:2545), so a thread gets at most one wake-up per customer silence.

### E59
- source: clickhouse:dealer_leads.conversationNotifications, dealer_leads.conversations, dealer_leads.smsMessages (12 conversation ids, results/sms-b1..b4.json after_unaccepted_offer = no_followup, 14 to 20 Oct 2026); conversational-ai-backend:src/sms/sms-wakeup.constants.ts:3-5, 74-82 (origin/release e7190a7d9)
- date: 2026-10-21
- side: system
- role: engineering
- text: None of the 12 threads lost its wake-up to a setting, the cap, a failed send or an unelapsed window. All 5 teams have no wakeup key in conversationNotifications (1 of 2,739 rows in the warehouse sets one), so the defaults apply: enabled, 10 minutes, cap 2. The highest wakeup.totalWakeups on any of the 12 is 1. Every wake-up sent was delivered with no error code, and the last customer message in every thread was more than 10 minutes (and past any silent-hours deferral) before the 21 Oct read.

### E60
- source: clickhouse:dealer_leads.smsMessages.wakeUpMessage, dealer_leads.conversations.wakeup_totalWakeups (same 12 ids)
- date: 2026-10-21
- side: system
- role: engineering
- text: 4 of the 12 did get a wake-up, so "no follow-up" is the reader's code, not the system's: 01a13d91, 01a14318 and 01a151f2 in the 12:10 UTC batch the morning after a late-night silence, and 01a15a7b 10 minutes after the offer. None of the 4 carried a fresh time pair: 2 repeated the previous agent message word for word (same text, same length) and so read as a double send, 1 asked a non-scheduling question, and 1 re-sent the listing link with an open "stop by" ask. In 01a15a7b the customer replied, then sent an image, a media handover followed and a SEND_VEHICLE_PHOTO action item blocked the second wake-up.

### E61
- source: clickhouse:dealer_leads.actionItems (meta.conversationId), dealer_leads.conversations.conversationAnalytics.outcome, dealer_leads.meetings (conversation_id or call_id); conversational-ai-backend:src/sms/sms-wakeup.service.ts:144-178, src/sms/sms-wakeup.constants.ts:15-22 (origin/release e7190a7d9)
- date: 2026-10-21
- side: system
- role: engineering
- text: 6 of the 12 were stopped by a skip rule written about a minute after the customer's last message, inside the 10-minute window. 5 by an action item whose intent is not on the scheduling allowlist: SALES_SCHEDULE_CALLBACK (2 threads, one also carrying SALES_FOLLOW_UP_WITH_QUOTE and CUSTOM), SEND_VEHICLE_PHOTO, SALES_TRADE_IN_FOLLOW_UP and SALES_LOST_LEAD (1 each). 1 by the outcome Human Requested (checked first), which also had a CUSTOM action item. None had a meeting row, and none carried the outcomes Soft Decline or Callback Requested. SALES_SCHEDULE_CALLBACK and SALES_TRADE_IN_FOLLOW_UP block by design today: only six SALES_/SERVICE_ schedule intents are exempt.

### E62
- source: clickhouse:dealer_leads.smsChatCompletions (is_concluded in the stored assistant JSON), dealer_leads.smsMessages.status; conversational-ai-backend:src/sms/sms-v2.service.ts:4078-4090, 4141, 4157-4163 (origin/release e7190a7d9)
- date: 2026-10-21
- side: system
- role: engineering
- text: The other 2 of the 12 (01a14cb3, 01a15a95) have no action item, meeting or blocking outcome. In both the last agent message was marked is_concluded after a customer "I'll check and let you know" style reply, which stops the wake-up (sms-wakeup.service.ts:177). Two more threads (01a13c2e, 01a14a1f) end the same way on top of their action item. A concluded batch is saved with status queued and never sent to the carrier (sms-v2.service.ts:4157), so in these 4 threads the customer never received the agent's closing line either.

### E63
- source: conversational-ai-backend:src/sms/sms-wakeup.service.ts:94-104, 236-266 (origin/release e7190a7d9); clickhouse:dealer_leads.conversations.wakeup_lastAction
- date: 2026-10-21
- side: system
- role: engineering
- text: The rule that fired is inferred, not logged. checkWakeupEligibility returns false without writing a reason, and wakeup.lastAction keeps only the last state: 8 of the 12 show "cancelled", from removeFromWakeupZset, but conversations.updatedAt (the last write) lands 1 to 2 days after each window was due, so the cancel came after the skip and did not cause it. smsMessages.isConcluded is not mirrored to ClickHouse; E62 reads it from smsChatCompletions instead. Proving which check fired per dispatch would need a log line in checkWakeupEligibility.

### E64
- source: clickhouse:dealer_leads.conversations + dealer_leads.meetings (direct join on conversation_id / call_id) + dealer_leads_raw.leads; query /private/tmp/claude-502/-Users-yash-Documents-claude-code/69f1cb87-8494-46f4-9502-58e7e1be05b4/scratchpad/r4_q3.sql
- date: 2026-10-21
- side: system
- role: engineering
- text: Cohort: leads whose first Sales Inbound SMS thread started 27 Jul to 20 Sep 2026 at live, non-test rooftops (12,553 leads, 18 rooftops; one row per lead; 113 leads with a meeting already on file before the thread excluded; every lead observed for 30 days after the thread). Visits set by the agent inside the first thread (source spyne, conversation_id = that thread, created more than 30s after it, sales intent): 192 leads at 11 rooftops, days from lead created to scheduled visit time median 1.6, p75 2.9, p90 5.0, 77% within 3 days. Lead creation to first thread is a median of 0 days (STL), so this is effectively days from first contact.

### E65
- source: clickhouse:dealer_leads.meetings (source spyne, conversation_id or call_id = a later conversation of the same lead); query /private/tmp/claude-502/-Users-yash-Documents-claude-code/69f1cb87-8494-46f4-9502-58e7e1be05b4/scratchpad/r4_q3.sql
- date: 2026-10-21
- side: system
- role: engineering
- text: Visits set by the agent in a later Spyne conversation (SMS or call, any agent, within 30 days, lead not booked in the first thread): 199 leads, lead created to scheduled visit median 5.8 days, p75 12.7, p90 22.6, 34% within 3 days. The subset whose customer had replied in the first thread and then went quiet (the recovery case): 36 leads at 7 rooftops, median 5.8, p75 11.5, p90 19.0. Booking to visit is about 1 to 2 days in every group, so the gap comes from when the visit is set, not how far out it is scheduled. Groups self-select, so the roughly 4-day median gap is a description, not an effect estimate; n=36 is small.

### E66
- source: clickhouse:dealer_leads.meetings source='bdc' (lead_id join only, no conversation key); query /private/tmp/claude-502/-Users-yash-Documents-claude-code/69f1cb87-8494-46f4-9502-58e7e1be05b4/scratchpad/r4_q3.sql, /private/tmp/claude-502/-Users-yash-Documents-claude-code/69f1cb87-8494-46f4-9502-58e7e1be05b4/scratchpad/r4_q4.sql
- date: 2026-10-21
- side: system
- role: engineering
- text: Store-set visits are only partly observable. They arrive as meetings with source bdc imported from the dealer CRM (41,679 schedule_appointment rows at 64 teams since 27 Jul), with no conversation_id, so they tie to the lead by lead_id and cannot be attributed to any conversation. Only 16 of the 18 cohort rooftops have this feed (9,051 of 12,553 leads); at the other 2 a store booking is invisible. Where visible: 612 leads with no Spyne-set visit got a store-set sales appointment within 30 days, median 2.0 days lead to visit, p75 5.0, p90 13.5; of those, 150 had replied in the first thread, median 1.8, p75 4.5. Not observable: who at the store set it (BDC or salesperson), whether the thread prompted it, and whether created_at is booking time or CRM import time. Show and sale are not measurable for Spyne-set visits (about 99% of spyne meetings stay scheduled); CRM rows do carry completed and noshow, so a show comparison across the groups is not possible.
