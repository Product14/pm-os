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
- how: Read ParsedEmailData in integrations-backend src/email-parsing/email-parser.service.ts (parseAdf at line 315), then run the dealer's sample emails from Q2 through the parser on UAT.
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
