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
