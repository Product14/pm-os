# Context requests

### R1
- question: Which prompt template does the "7-Day-Old Lead Follow-Up Outbound" campaign route to in `src/prompts/base-system-prompts/sales/outbound-campaign/journey-router.xml`, given the journeyName string the campaign sends, and does that template render the InterestedVehicle block from the call prompt variables?
- blocks: decide.md Ladder rung 4 (write side) and Cost and risk input
- why: E9 checked only sales_new; the router sends any unmatched journeyName to default-outbound-sales.xml (context/facts/outbound-journey-router-default-fallback.md), which may not render the vehicle even when it is present.
- source: bluebrain
- status: answered (E34)

### R2
- question: When an outbound call is not answered (no answer or voicemail), does conversational-ai-backend write any lead memory record (summary, purposeOfCall, vehicle) that the lead memory query in `src/memory/lead-memory.service.ts:262` can later return to an inbound callback?
- blocks: decide.md Ladder rung 4 (read side) and Cost and risk input
- why: the ticket's callbacks follow missed calls (E22); if a missed attempt leaves no record, widening the department filter and 3-day window fixes nothing.
- source: bluebrain
- status: answered (E35)

### R3
- question: Does the service_v2 outbound prompt render the vehicle fields from `src/call/dto/call-prompt-variables.dto.ts:59`, where does its vehicle come from, and which agentType values does the department filter in `src/memory/lead-memory.service.ts:262` match for Sales and Service?
- blocks: decide.md Ladder rung 6 (Service outbound row) and rung 4 (read side across departments)
- why: Service outbound is unknown in case.md (Q8); the department values decide whether a Sales callback can ever see a Service outreach and vice versa.
- source: bluebrain
- status: answered (E36)
