# Evidence

### E1
- source: freshdesk:23736#0
- date: 2026-09-21
- side: spyne
- role: csm
- text: "Subject: Feature- Human takeover in STL & chatbot enhancement." Raised internally by the Vini CSM (type Internal, category Feature Request/Enhancement, product Chatbot, pod Vini - Smartview). The ticket description body was not returned by the Freshdesk API.

### E2
- source: freshdesk:23736#4
- date: 2026-09-22
- side: spyne
- role: unknown
- text: Private note from a Spyne product lead: "groom ... to go live this week. Consider the case of human handing over the lead back to AI as well."

### E3
- source: freshdesk:23736#6
- date: 2026-09-23
- side: spyne
- role: engineering
- text: "This will be picked as a tech development. Following is the JIRA ID: RETCONVAI-5165. ETA will be provided by 24th Sept."

### E4
- source: freshdesk:23736#8
- date: 2026-09-29
- side: spyne
- role: unknown
- text: Automated triage note: "the CSM wants a note written to the dealer's CRM saying a human is handling the lead and the AI is paused, the same way the Console already shows it." Still waiting on a revised ETA; customer not given a new date.

### E5
- source: jira:RETCONVAI-5165
- date: 2026-09-23
- side: spyne
- role: unknown
- text: Story written from this ticket, CRM DriveCentric: "Salespeople and BDC working the lead in DriveCentric can't tell whether Vini is still texting the customer, so they double-text or aren't sure who owns the conversation." Status Product Backlog, not updated since 2026-09-23.

### E6
- source: arali:e281d668-01ee-4438-a1f3-148caf91a11a
- date: 2026-07-16
- side: dealer
- role: unknown
- text: "We're getting an email ... but we're not getting notified in our CRM. ... our sales team lives in the CRM."

### E7
- source: arali:e281d668-01ee-4438-a1f3-148caf91a11a
- date: 2026-07-16
- side: dealer
- role: unknown
- text: "we have you on phones and inbound, and we have DriveCentric AI for text communication and lead response."

### E8
- source: arali:e281d668-01ee-4438-a1f3-148caf91a11a
- date: 2026-07-16
- side: dealer
- role: unknown
- text: "the stuff that's happening within Spyne is not showing up in DriveCentric. So I don't wanna do all this if it doesn't show up in our CRM."

### E9
- source: arali:e281d668-01ee-4438-a1f3-148caf91a11a
- date: 2026-07-16
- side: dealer
- role: unknown
- text: "if you guys can show me that ... I can see all the conversations in DriveCentric, I feel like I'm ready to do more."

### E10
- source: search:get-interaction-timeline:enterprise-since-2026-09-15
- date: 2026-10-15
- side: system
- role: engineering
- text: 0 Arali interactions for the enterprise from 2026-09-15 to 2026-10-15; 1 since 2026-07-01 (the 2026-07-16 call, E6 to E9). Topic searches of tickets and transcripts with the company filter returned 0. No Arali contact records for the enterprise.

### E11
- source: bluebrain:conversational-ai-backend:src/sms/sms.service.ts:2817
- date: 2026-10-15
- side: system
- role: engineering
- text: Console SMS takeover (`toggleHumanHandoverLocked`) sets `aiMode: 'off'` and phase ACTIVE (line 2858), sets `Lead.isSmsHumanTransferActive` (2884), emits an internal Kafka claimed event (2888), returns "AI replies are paused" (2901). No CRM or note call anywhere in 2817-3030. Read from local release clone a2b8754c7 (2026-10-06).

### E12
- source: bluebrain:conversational-ai-backend:src/sms/sms.service.ts:2965
- date: 2026-10-15
- side: system
- role: engineering
- text: Hand back by the claiming rep sets `aiMode: 'auto'` (2965), clears the lead flag (2991), emits an internal Kafka released event (2997). No CRM write.

### E13
- source: bluebrain:conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:659
- date: 2026-10-15
- side: system
- role: engineering
- text: While the lead's takeover flag is set, STL, STL follow-up, follow-up and appointment-reminder SMS tasks are skipped (not killed) and resume after hand back. CALL-channel tasks are deliberately not suppressed.

### E14
- source: bluebrain:conversational-ai-backend:src/sms/sms-v2.service.ts:1246
- date: 2026-10-15
- side: system
- role: engineering
- text: `notifyExternalCrm` already creates a note on the lead and pushes it to the dealer's external CRM (via crm-core when enabled). Only caller is `sms-v2.controller.ts:223`; the takeover path does not call it.

### E15
- source: bluebrain:chat-service:src/chat/chat.controller.ts:345
- date: 2026-10-15
- side: system
- role: engineering
- text: Web chat handover toggle sets handover on the chat session, records a `chatHandoverEvent`, and schedules an idle auto-release (`src/chat/handover-timer.service.ts:15`). No CRM side effect listed. Card verification score 0.72 (5 of 9 claims fully supported); `trace_handler` could not resolve helpers.

### E16
- source: pm:2026-10-01
- date: 2026-10-01
- side: pm
- role: unknown
- text: Spyne DriveCentric integration one-pager: "Add conversation notes: Conversation summary synced to the lead as a note. Live." and "The agent does not read earlier CRM notes or activity history. Not supported."

### E17
- source: jira:RETCONVAI-5190
- date: 2026-09-24
- side: spyne
- role: unknown
- text: Bug, other rooftop: "even after human takeover with AI engagement stopped, an outbound call was triggered the very next day." Product Backlog.

### E18
- source: jira:RETCONVAI-2998
- date: 2026-04-26
- side: spyne
- role: unknown
- text: Human Takeover for SMS: AI flags, rep claims with locking, AI resumes after 18 hours of human inactivity. Status In DEV; phase 2 is RETCONVAI-5026 (In DEV).

### E19
- source: jira:RETCONVAI-4862
- date: 2026-08-31
- side: spyne
- role: unknown
- text: Conversations inbox story lists "Chatbot and voice conversations in one thread" as a live, unowned requirement raised off this rooftop's escalation, where the chatbot and the voice agent answered the same question differently.

### E20
- source: search:search-transcripts:salesperson takes over the lead from the AI, AI keeps texting the customer after a rep responds
- date: 2026-10-15
- side: system
- role: engineering
- text: 2026-07-17 to 2026-10-15, no company filter: 3 distinct other companies where dealer staff raised the same job (the AI must know when a salesperson owns the lead, and AI activity must show where reps work). 1 more partial (worry about two AIs texting with the CRM).

### E21
- source: search:search-ticket-messages:salesperson takes over lead from AI agent, AI should stop texting, human handoff in CRM
- date: 2026-10-15
- side: system
- role: engineering
- text: 2026-07-17 to 2026-10-15, no company filter: 0 dealer-raised tickets on the same job; 1 company with an adjacent CSM-raised ticket (STL texted a lead the CRM already marked sold). That company is also one of the 3 in E20.

### E22
- source: bluebrain:conversational-ai-backend:src/sms/sms-v2.service.ts:3647
- date: 2026-10-15
- side: system
- role: engineering
- text: Before an outbound SMS, Vini fetches the live CRM lead stage and blocks only CLOSED, DELIVERED, LOST or BAD (`src/outbound-tasks/outbound.constants.ts:1`, check at line 3662). No CRM stage means "a rep is working this lead".

### E23
- source: jira:RETCONVAI-5165
- date: 2026-10-15
- side: system
- role: engineering
- text: RETCONVAI-5165 (Product Backlog, no comments since 2026-09-23) already specifies a CRM note on all 4 handoff events (takeover, AI flag, manual hand-back, auto-resume), both directions, STL SMS and web chat, per-rooftop on/off, idempotent, failures logged, DriveCentric first and CRM-agnostic. Out of scope: changes to takeover logic itself.

### E24
- source: pm:2026-10-15
- date: 2026-10-15
- side: pm
- role: unknown
- text: PM confirmed the problem is valid and asked whether RETCONVAI-5165 already covers it fully or a new PRD is needed.
