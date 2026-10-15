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

### Q6
- slot: frequency
- unknown: How many other Tekion rooftops have leads whose vehicle of interest is empty at dial time because it was attached after lead creation? Spyne staff suspect all Tekion rooftops (E30); nobody has checked (E31).
- blocks: whether the vehicle half is a one-rooftop fix or a Tekion-wide integration gap, and the priority of direction 2
- who: engineering
- how: Count outbound sales dials in the last 90 days on Tekion rooftops where the lead had no vehicle of interest, then spot-check a sample against Tekion to see how many have a vehicle there now.
- status: open

### Q7
- slot: directions
- unknown: Who owns the polling workaround agreed on 2026-10-14, what it polls, and when it ships; and will Tekion's lead webhooks come back (E28, E29, E32)?
- blocks: direction 2 scope and whether to wait for Tekion webhooks instead of polling
- who: engineering
- how: Ask the integrations engineer named in comment 33 for an owner, a date and whether polling reuses GET /tekion/leads/:leadId/vehicles (E13); ask the Tekion partner contact for the webhook status.
- status: open

### Q8
- slot: agents_affected
- unknown: Does the Service outbound agent's prompt render the vehicle fields from the shared call prompt variables, where does its vehicle come from (DMS or CRM lead), and does a Service outbound summary reach a Sales inbound callback under the department filter?
- blocks: the Service outbound row of Agents affected and the scope of the full-value direction (4)
- who: engineering
- how: Engineering checks the service_v2 outbound prompt template for the InterestedVehicle or owned-vehicle block and lists the agentType values the lead memory department filter matches (`conversational-ai-backend:src/memory/lead-memory.service.ts:262`).
- status: open
