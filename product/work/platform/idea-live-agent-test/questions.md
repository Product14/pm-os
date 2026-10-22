# Questions

### Q1
- slot: job
- unknown: Job is THIN. Bar: at least 1 E-id behind the inferred job.
- blocks: which direction to take, and whether this is worth solving
- who: csm
- how: <the researcher fills this in>
- status: open

### Q2
- slot: context_30d
- unknown: Customer context (30 days) is EMPTY. Bar: at least 1 dealer-side arali E-id dated within 30 days of fetched_arali.
- blocks: which direction to take, and whether this is worth solving
- who: csm
- how: <the researcher fills this in>
- status: open

### Q3
- slot: who_feels_this
- unknown: Who feels this is THIN. Bar: at least 1 dealer-side E-id with a known role.
- blocks: which direction to take, and whether this is worth solving
- who: csm
- how: <the researcher fills this in>
- status: open

### Q4
- slot: directions
- unknown: Candidate directions is THIN. Bar: 2 or more directions with a P&L angle, one of them labelled **Full value:** (the path that unlocks the dealer's full value, build scoped).
- blocks: which direction to take, and whether this is worth solving
- who: csm
- how: <the researcher fills this in>
- status: open

### Q5
- slot: frequency
- unknown: Frequency is THIN. Bar: a count, backed by at least 1 E-id.
- blocks: which direction to take, and whether this is worth solving
- who: pm
- how: <the researcher fills this in>
- status: open

### Q6
- slot: context_30d
- unknown: Whether live-rooftop dealer staff said anything in 2026-09-22 to 2026-10-22 about testing or hearing their live agent. Arali search failed (E30), so unknown, not zero.
- blocks: Customer context section, Gate 1
- who: pm
- how: Re-run the Arali transcript, ticket and thread searches for the window when the Arali search service recovers; or ask CSMs in Slack whether live dealers asked to test their agent.
- status: open

### Q7
- slot: who_feels_this
- unknown: Which dealership roles raise live-agent testing. No dealer-side evidence gathered (E30).
- blocks: Who feels this section, persona choice in PRD reviews
- who: pm
- how: Same Arali re-run, reading participant titles; otherwise ask CSMs which dealer role asks for test calls.
- status: open

### Q8
- slot: job
- unknown: Why live dealers want to hear their agent in dealer terms (wrong info to customers, missed calls, CSM dependence). No evidence gathered (E30).
- blocks: Job section, P&L angle of candidate directions
- who: pm
- how: Same Arali re-run on wrong-hours/policy complaints and change requests; add Freshdesk search for tickets asking CSMs to change agent info.
- status: open

### Q50
- slot: frequency
- unknown: How many distinct rooftops in 2026-07-24 to 2026-10-22 asked to test or hear their live agent, or reported a test call behaving wrongly or appearing in reports, CRM or leads. Arali search failed (E50).
- blocks: Frequency section, priority of the idea against other work
- who: pm
- how: Retry Arali search-ticket-messages and search-transcripts when the server recovers; ask CSMs in Slack; list Freshdesk tickets by cf_voc_l1 and read subjects.
- status: open

### Q51
- slot: how_it_works_today
- unknown: Does today's Talk to agent call (ordinary path, source CONSOLE) show up in conversation reports and the CRM, and can the dealer open its transcript afterwards (E60, E62)?
- blocks: Gap section, which reporting leaks the full-value direction must close
- who: engineering
- how: Place one Talk to agent call on a UAT rooftop and check Conversations, console reports and ClickHouse conversations isTest.
- status: open
