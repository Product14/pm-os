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
