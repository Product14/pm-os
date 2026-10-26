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

### Q52
- slot: request
- unknown: Any churn or escalation signal tied to live rooftops being unable to test, or to test calls polluting reports or CRM. No evidence retrieved (E30, E50).
- blocks: Cost of not solving input in decide.md
- who: pm
- how: Re-run Arali signals and ticket searches when the server recovers; ask CSMs in Slack for escalations about test calls or wrong agent info.
- status: open

### Q53
- slot: request
- unknown: Dealer P&L impact: which live-agent errors (hours, policy, script) a rooftop caught by self-test, and the days each stayed live. No measurement or dealer-side evidence exists.
- blocks: Dealer P&L impact input in decide.md
- who: csm
- how: Ask CSMs for the last 10 change requests to a live agent's info and how long each error ran; do not estimate.
- status: open

### Q54
- slot: request
- unknown: Demand breadth by job, not words: how many distinct live rooftops in the last 90 days tested their own agent (Talk to agent usage) or asked a CSM to.
- blocks: Demand breadth input in decide.md
- who: engineering
- how: Count distinct teams with Talk to agent calls (metadata source CONSOLE, E59) on live product lines over 90 days in ClickHouse or the calls table.
- status: open

### Q70
- slot: request
- unknown: Does an is_demo_meeting booking or the demo CRM lead reach the DMS, scheduler or the dealer's external CRM on a live rooftop? Not answerable from the repos read (DF:84-87, 140-141).
- blocks: rollout gate, Phase 0
- who: engineering
- how: UAT rooftop with a working DMS integration
- status: open

### Q71
- slot: request
- unknown: Do live service cards show isOnboarded, does live mode cover the receptionist, and does isTest exclude tests in the iframe report apps? (DF:142, 179-180)
- blocks: lane scope and reporting claim
- who: engineering
- how: UAT check plus iframe app code read
- status: open

### Q72
- slot: assumption
- unknown: illustrative; no dealer has been quoted yet
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q73
- slot: assumption
- unknown: rooftops will self-check after a change
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q74
- slot: assumption
- unknown: not measured, Q53
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q75
- slot: assumption
- unknown: texts and reminders are not gated for tests
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q76
- slot: assumption
- unknown: no DMS write; Q70
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q77
- slot: assumption
- unknown: some live rooftops carry an old demo mark
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q78
- slot: assumption
- unknown: inferred from who uses Settings
- blocks: v2.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q79
- slot: request
- unknown: Does a test call text only the tester's verified number or any number the agent is given, and from which sender number?
- blocks: one-pager step 7 and owners-stage gate
- who: engineering
- how: trace communication_send_sms args in a live test call
- status: open

### Q80
- slot: request
- unknown: Does the inbound sales test create a lead that shows in the BDC task queue or speed-to-lead counts?
- blocks: one-pager step 7
- who: engineering
- how: trace lead creation on inbound sales demo call start (E14, E56)
- status: open

### Q81
- slot: request
- unknown: Which console role sees a callback action item created by a live test, and does the lead list show the tester's lead?
- blocks: one-pager step 7
- who: engineering
- how: trace action item assignment in receptionist-create-follow-up and the console action items list
- status: open

### Q82
- slot: request
- unknown: In a test call, does the service agent read open slots and appointment-type limits from the real scheduler?
- blocks: one-pager fidelity claim
- who: engineering
- how: trace service availability tool on a demo call
- status: open

### Q83
- slot: request
- unknown: Can service callback tasks and in-call texts be blocked for demo-flagged calls before the owners stage?
- blocks: owners-stage rollout gate
- who: engineering
- how: size a demo-call check in the SMS and follow-up tools
- status: open

### Q84
- slot: assumption
- unknown: not measured
- blocks: v3.md
- who: pm
- how: <confirm or replace with evidence>
- status: open
