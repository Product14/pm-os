# Requests

### R1
- question: For a booking made during a demo/test call (is_demo_meeting true), does the booking still write to the dealer's DMS or service scheduler (Xtime, myKaarma, CDK, Reynolds, Tekion, Dealertrack, PBS) or the sales calendar, and to the dealer's own CRM (VinSolutions, eLead, DriveCentric push)?
- blocks: one-pager Risks and rollout gate; reviewers backend-engineer-r1-3, service-manager-r1-1, gm, ceo, bdc-manager
- why: a test booking could take a real service bay or land in the dealer's CRM
- source: bluebrain
- status: answered (E80..E84)

### R2
- question: During a demo/test call, do the in-call SMS tool, appointment confirmations/reminders, and callback/follow-up tasks fire for real, to whom, and is there any demo/test check?
- blocks: one-pager Risks; reviewers backend-engineer-r1-6, service-manager, bdc-manager, gm
- why: real texts or staff tasks from a test would reach customers or the BDC queue
- source: bluebrain
- status: answered (E90..E96; open: dealer-leads reminder/event gate for is_demo_meeting, E93)

### R3
- question: In the last 90 days, how many distinct live rooftops placed console Talk to agent test calls (calls with source CONSOLE that are not demo calls), and how many live teams have a real agent mapping flagged isDemoAgent true today?
- blocks: one-pager demand line and rollout gate; reviewers ceo, gm, backend-engineer-r1-9
- why: demand breadth is unknown and pre-flagged real agents would break live mode
- source: clickhouse
- status: partial (E100..E102): (a) answered, 92 teams / 549 calls (60 live inbound teams); (b) unanswerable, no agent mapping replica in ClickHouse

### R4
- question: Is the live-mode backend prototype merged or deployed anywhere?
- blocks: one-pager status line; reviewer backend-engineer
- why: the one-pager must not imply it exists in production
- source: context
- status: answered (E24, E61): local branch yash/demo-flow-live-test, commit f996cd4c8, not pushed, calls only.
