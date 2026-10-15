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
- status: open

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
