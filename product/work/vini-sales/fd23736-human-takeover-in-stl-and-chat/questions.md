# Questions

### Q1
- slot: gap
- unknown: Do this rooftop's reps take over Vini conversations in the Spyne Console at all, or do they work leads only in DriveCentric?
- blocks: choosing between direction 1 (note on Console takeover) and direction 3 (pause on CRM activity); a takeover note does nothing if nobody takes over in the Console
- who: engineering
- how: Count conversations for this team with `humanTransferDetails.phase` ever ACTIVE (or human-transfer claimed Kafka events) in the last 30 days; then the CSM asks the BDC lead where reps reply to Vini leads.
- status: open

### Q2
- slot: assumption
- unknown: Is Spyne STL live at this rooftop now, or does DriveCentric AI still own text and lead response (as the dealer said on 2026-07-16, E7)?
- blocks: whether the problem is two AIs on one lead (configuration) or Vini-to-human ownership (build)
- who: csm
- how: CSM checks the rooftop's active agent types and STL config in admin-tools, and confirms with the dealer whether DriveCentric AI auto-response is still on.
- status: open

### Q3
- slot: context_30d
- unknown: No dealer interaction in Arali for the last 30 days; did the dealer raise this directly by email, text or in person?
- blocks: whether the ask is dealer-voiced or CSM-inferred, and its urgency
- who: csm
- how: Ask the Vini CSM what prompted the ticket on 2026-09-21 and for the dealer's message if one exists; Arali has only the 2026-07-16 call.
- status: open

### Q4
- slot: who_feels_this
- unknown: Title of the dealer contact on the 2026-07-16 call, and which floor role (BDC, internet sales, sales managers) works Vini leads in DriveCentric
- blocks: persona for the PRD reviews and who the note must be written for
- who: csm
- how: CSM confirms from onboarding records or the dealer's email signature; no Arali contact record exists for the enterprise.
- status: open

### Q5
- slot: ask
- unknown: The Freshdesk ticket body (original request text) was not returned by the API
- blocks: quoting the ask exactly, including what "chatbot enhancement" in the subject covers (possibly the chat vs voice consistency issue in E19)
- who: pm
- how: Open ticket 23736 in the Freshdesk UI and read the description; ask the CSM what "chatbot enhancement" refers to.
- status: answered (E25)

### Q6
- slot: how_it_works_today
- unknown: Does any consumer of the human-transfer Kafka topic, or the chat-service handover path, write anything to the dealer's CRM today? Where is the 18-hour SMS auto-resume implemented?
- blocks: confirming the "nothing reaches the CRM" claim for web chat and for auto-resume (E15 is a 0.72 card; the timer was not found)
- who: engineering
- how: Ask the RETCONVAI-5165 owner; grep consumers of the human-transfer events topic and `chat-service:src/chat/handover-timer.service.ts`.
- status: open

### Q7
- slot: directions
- unknown: Should a takeover also pause call-channel tasks, so that a CRM note saying "AI paused" is true?
- blocks: direction 1 scope; today calls keep firing after takeover (E13, E17)
- who: pm
- how: Decide with the RETCONVAI-5190 owner whether call suppression ships before or with the CRM note.
- status: open

### Q8
- slot: ask
- unknown: Ticket pod is "Vini - Smartview" with product Chatbot, not a Vini Sales pod; is vini-sales the right owner?
- blocks: which PM owns the PRD
- who: pm
- how: Confirm with the area owners in `OWNERS.md`; the STL half is sales, the web chat half may sit with the Smartview or chat owner.
- status: open

### Q9
- slot: gap
- unknown: Who owns delivery of RETCONVAI-5165 and what is the revised ETA? Two internal chases (E26, E27) got no reply and the 2026-09-24 ETA has passed.
- blocks: whether this case closes on 5165 alone or needs PM escalation to get it scheduled
- who: engineering
- how: PM asks the 5165 assignee in Jira or the Vini engineering channel for status and a date, then the support specialist updates the CSM on the ticket.
- status: open

### Q10
- slot: agents_affected
- unknown: Does the SMS human-takeover path (handover route, lead flag, task skip) also run for Service agent SMS (inbound and appointment-reminder outbound), and does chat-service handover serve service conversations?
- blocks: whether RETCONVAI-5165 and the full-value direction must cover service SMS and service web chat, and who the CRM note is written for
- who: engineering
- how: Ask the RETCONVAI-5165 owner to check `toggleHumanHandoverLocked` and the task-skip in the sequence orchestrator for any agentType or department condition, and whether chat-service sessions carry a service agent type.
- status: open

### Q11
- slot: directions
- unknown: Does the DriveCentric integration expose rep activity on a lead (outbound text, call, note) that Spyne may read, and how fresh is it?
- blocks: the CRM activity-read half of the full-value direction (3); without it Vini cannot pause for reps who never use the Console
- who: engineering
- how: Integrations engineer checks the DriveCentric API scope Spyne holds today; if activity is not in scope, PM raises it with the DriveCentric partner contact.
- status: open

### Q12
- slot: request
- unknown: Across rooftops with Console takeover, how many have reps who reply to Vini leads only from the CRM and never press takeover?
- blocks: decide.md Inputs > Demand breadth for the delta (CRM activity read); ladder rung 3
- who: engineering
- how: Answer R3 (takeover counts per rooftop, last 30 days); CSMs confirm for the 3 companies in E20 where reps reply.
- status: open

### Q13
- slot: request
- unknown: How often does a Vini lead get a duplicate touch (Vini SMS or call within a few hours of a rep's text or call), and how much staff time goes to checking two systems?
- blocks: decide.md Inputs > Dealer P&L impact; ladder rung 2 has no figure
- who: engineering
- how: Data pull on leads with both Vini and rep activity where the CRM logs rep touches; otherwise ask the dealer BDC lead for an estimate and label it dealer-reported.
- status: open

### Q14
- slot: request
- unknown: Is "one owner per lead" (takeover note, call suppression, CRM activity pause) on the vini-sales roadmap, and in which quarter?
- blocks: decide.md Inputs > Strategic fit (area roadmap); ladder rung 7 timing
- who: pm
- how: Area owner in `OWNERS.md` confirms; `product/areas/vini-sales/CLAUDE.md` lists no roadmap.
- status: open

### Q15
- slot: request
- unknown: Why are CALL-channel tasks deliberately excluded from takeover suppression in the sequence orchestrator, and what breaks if they are suppressed?
- blocks: decide.md Inputs > Cost and risk to build (call suppression wire); ladder rung 4
- who: engineering
- how: Answer R2; then ask the RETCONVAI-5190 owner.
- status: open

### Q16
- slot: request
- unknown: Does the July 2026 stop-outbound requirements doc (crm-sync-enhancements) already define manual pause or CRM rep activity as a reason to stop outbound, and was it approved?
- blocks: decide.md Inputs > Prior decisions; ladder rung 4 (in-from-CRM wire may already be specified)
- who: pm
- how: Answer R4; the PM reads the doc and records its status in decisions.md.
- status: open

### Q17
- slot: request
- unknown: Per-rooftop count of Console SMS takeovers (humanTransferDetails.phase ever ACTIVE, or human-transfer claimed Kafka events) in the last 30 days, for this rooftop and for all DriveCentric rooftops. ClickHouse has no takeover field (E39); Arali shows only that takeover is demoed and that some reps work in their CRM instead (E40).
- blocks: decide.md ladder rung 3; Inputs > Demand breadth (delta); Q1, Q12 (from R3)
- who: engineering
- how: Engineer runs a read-only Mongo count on Conversation.humanTransferDetails (phase ACTIVE, claimedAt in the last 30 days) grouped by teamId, or counts claimed events on the human-transfer Kafka topic, then joins teamId to CRM provider.
- status: open
