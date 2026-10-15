# Open questions

### Q1
- slot: ask
- unknown: Which agent is this really? (area conflict: pod says Service Inbound, but the category is Vini Sales IB, platform Sales Inbound, tags L2 Sales, and the thread is about a Tekion sales lead's interested vehicle on an outbound call followed by a customer callback; E2, E3)
- blocks: which area owns the case and which code path the PRD targets (sales outbound plus sales inbound callback vs service)
- who: pm
- how: Open the two reference call ids from the thread in the console and read each call's agent type (outbound and the callback). Do not infer direction from agentCallType (context/traps/agent-call-type-not-direction.md). If both are Sales, move the folder to vini-sales.
- status: answered (E20)

### Q2
- slot: context_30d
- unknown: Has the dealer raised this themselves, or did the CSM only spot it in call review? Arali has no interactions for this rooftop at all (E7).
- blocks: whether this is a dealer-felt problem worth a build or an internal quality fix
- who: csm
- how: Ask the rooftop's Vini CSM in the ticket's private notes or on Slack whether a dealer staff member complained, and get the date and role. Also check why Arali shows no interactions for a Live rooftop (company not linked).
- status: open

### Q3
- slot: who_feels_this
- unknown: Which dealer role works the returned calls and noticed the agent had no context (BDC manager, internet sales manager, sales manager)?
- blocks: persona for the PRD and how the fix is sold (staff time vs lead recovery)
- who: csm
- how: CSM asks the rooftop's main Vini contact on the next check-in: who handles returned calls, and did they hear these two calls?
- status: open

### Q4
- slot: gap
- unknown: After the September fixes (phone fallback of 2026-09-18, RETCONVAI-4995 and -5090), does a callback on this rooftop now get the prior outbound summary, including after day 3 and when a different department's agent answers?
- blocks: whether direction 1 closes the callback half, and the scope of direction 3
- who: engineering
- how: Engineering replays the two reference callers' lead memory query against today's code (department and 3-day window from E10, E11), then places one test outbound plus callback on a test lead for this rooftop.
- status: open

### Q5
- slot: gap
- unknown: Can the outbound prefetch call the Tekion lead-vehicles endpoint before each dial, and is that allowed and within rate limits under the Tekion agreement?
- blocks: direction 2 (refresh vehicle of interest pre-dial)
- who: engineering
- how: Ask the integrations engineer who answered on 2026-09-07 (E5) whether GET /tekion/leads/:leadId/vehicles returns vehicles attached after lead creation, and what it costs per call.
- status: open
