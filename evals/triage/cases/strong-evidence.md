---
why: Rich ticket with two connecting dealer quotes, a CSM vendor figure and code refs; tests E-id citing, side tagging, a non-build direction and PII scrubbing
---

## input

Today is 2026-10-15. You have no tools. Act as the ticket researcher and return case.md, evidence.md and questions.md as three fenced blocks. Everything the research calls returned is pasted below.

Format reminder: case.md has frontmatter (id, area, stage: triaged, freshdesk_ticket, ticket_updated_at, rooftop_slug, rooftop_name, fetched_freshdesk, fetched_arali, fetched_code) and these slot headings: Ask, Job, Customer context (30 days), Who feels this, How it works today, Gap, Candidate directions, Frequency. evidence.md blocks are `### E<n>` with source, date, side, role, text. questions.md blocks are `### Q<n>` with slot, unknown, blocks, who, how, status.

FRESHDESK TICKET 48213 (area: vini-service, updated_at 2026-10-13T16:02:11Z, company: Brookfield Toyota, company_id 7700412)

Message 1, incoming from requester, 2026-10-13:
"Saturday your agent booked 14 appointments into the 8:00 to 9:00 window. We run 6 express bays and 2 advisors on Saturdays. Waiters sat for two hours, I comped three oil changes and two of them left reviews. I need the agent to stop booking once a slot is full. Mike Delgado, Service Manager, (469) 555-0182, mdelgado@brookfieldtoyota.com"

Message 2, reply from Spyne support, 2026-10-13:
"Thanks Mike, escalating to product."

Private note, Spyne CSM, 2026-10-13:
"Rooftop went live on service inbound in August. They schedule in Xtime."

ARALI (company matched: Brookfield Toyota). Timeline 2026-09-15 to 2026-10-15: 2 calls, 1 meeting, 1 ticket.

- arali:int-90311, call, 2026-09-24, speaker title "Service Manager": "If I book more than the shop can push through, I'm paying for it in comps and loaner days. A full Saturday is fine, an overbooked one costs me."
- arali:int-90544, meeting, 2026-10-06, speaker title "Service Advisor": "Saturday mornings the waiters stack up at my desk. I spend the first hour apologizing instead of writing ROs."
- arali:int-90544, same meeting, speaker "Priya Nair, Spyne CSM": "Good news is your close rate on agent-booked ROs is 31%, that's above most of our stores."
- arali:int-90102, call, 2026-09-18, speaker title "Service Manager": "Can we change the greeting to mention the new tire center?"

Frequency search: search-ticket-messages and search-transcripts, no company filter, 2026-07-17 to 2026-10-15, query "agent booked past capacity / too many appointments in one slot / overbooked drive": 4 distinct companies.

BLUE BRAIN (code graph)

- `service-agent-backend:src/booking/xtimeSlots.ts:88` reads open slots from the Xtime availability call and offers any slot Xtime returns as open.
- `service-agent-backend:src/booking/xtimeSlots.ts:131` does not count bookings the agent already made in the same window before offering it again. Card confidence: medium.
- `central-config:src/service/capacity.ts:41` defines maxAgentBookingsPerSlot per rooftop; default null, meaning no cap. Not set for this rooftop.

## rubric

- Returns exactly three fenced blocks: case.md, evidence.md and questions.md
- Ask quotes the service manager's own words from ticket message 1 and cites that message's E-id
- Every slot claim cites an E-id or a `repo:path:line` reference; no uncited behaviour claims
- The CSM close-rate line, if recorded, has side: spyne and role csm, is labelled a vendor figure, and is never used as customer voice in Ask, Job or Customer context
- The CSM private note is side: spyne, not dealer
- Customer context (30 days) cites the two connecting dealer-side Arali items (service manager call, service advisor meeting) and leaves out the unrelated greeting request
- How it works today cites the three code references given, and notes the medium-confidence card
- Candidate directions has 2 or 3 items, each with a P&L angle (comps, loaner days, advisor time, CSI), and at least one non-build option such as setting the existing per-slot cap for this rooftop
- Frequency gives the count 4 with its search E-id and names no other rooftop
- No person names, phone numbers or emails anywhere in evidence.md or questions.md; dealer staff are named by role
- The rooftop name appears only in case.md frontmatter
- No numbers that are not in the input
