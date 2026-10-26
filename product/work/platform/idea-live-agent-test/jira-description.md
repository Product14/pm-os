**Problem.** A manager at a rooftop whose Vini agent is already live can only test it with Talk to agent, which places a real call that counts in conversation reports like a customer's, and a sales test also posts a CRM lead. They get no report of what the agent captured and no list of past tests. Prospects get both in the guided demo, which is blocked for live rooftops, and opening it as built would break the live agent. In 90 days, 60 live rooftops placed 431 console test calls (ClickHouse; Spyne staff testing included).

**What changes (reuse the existing demo flow with a live-test mode; do not rebuild what works)**
1. On Sales or Service > Settings > Agents, Talk to agent opens the guided test on the rooftop's own live agent: a browser call, or the outbound agent calls the tester's own verified phone (shared Spyne demo number).
2. The agent runs its live script, hours, policies, service menu, inventory and finance provider. It never transfers (the store's line never rings) and marks bookings as tests.
3. Agent details are read-only with links to edit in Settings. The test never changes the live setup, including the automatic hours save.
4. The tester gets a report written for a live store (no "Get Vini on your lines" button) and a list of past tests.
5. Agent Demos admin flags rooftops already live on the agent they tried.
6. Behind a flag with a per-rooftop off switch (off = today's Talk to agent modal). Spyne owners first on production, then every user.

**Kept out of the rooftop's data:** calls list and call analytics (already true); conversation reports (mark the test like the reception test does); the dealer's DMS/scheduler for a test service booking (skipped in code, not yet run); the dealer's own CRM unless the rooftop opted in (gate known to fail open).

**Acceptance**
- [ ] Talk to agent on Sales and Service Settings > Agents opens the live test on that rooftop's own agent (inbound browser call and outbound call to the tester's phone); flag off shows today's modal
- [ ] The live agent is never marked as a demo agent and its real calls keep working during and after a test
- [ ] The test uses the live script, policies, inventory and finance provider; transfers decline; bookings are marked as tests
- [ ] No test screen writes to the live agent's setup (hours, policies, name, voice); every section links to Settings
- [ ] A test call adds nothing to the calls list, call analytics or conversation reports
- [ ] Before the first production test: real texts, callback tasks and reminders are blocked for test calls; a test rooftop run with a live DMS and a connected CRM shows nothing reaches either; an alert fires on any live agent set up as a demo agent
- [ ] The tester sees the report and the list of past tests for their rooftop and department only
- [ ] Before every user: test bookings no longer count in the overview appointment count, and sales tests no longer leave a lead under the tester's phone
- [ ] Agent Demos admin flags live-test rows
- [ ] Only the rooftop in the login token can run a live test

**Out of scope (this release).** Text-message tests, the receptionist (decided in the PRD), rebuilding what already works.

**Open before build.** Size and owner of blocking texts, callback tasks and reminders for test calls; how many live agents already carry an old demo mark (database check); whether the test rooftop run covers Xtime, cancel and move; whether a service test offers real open slots; what the report must show for BDC and service.

**Links.** Full one-pager below. Investigation: `brainstorming-flows/projects/demo-flow/demo-flow-live-rooftops.md`. Reference backend prototype (local, not pushed): conversational-ai-backend branch `yash/demo-flow-live-test`. Freshdesk: none (PM idea).

---

## One-pager (approved at Gate 2, 2026-10-22)

### Decision
Build one guided test for live rooftops' Sales and Service voice agents, on their own live agent, with test calls marked to stay out of conversation reports.
Text-message agents and the receptionist are not in this release; the receptionist is decided in the PRD.
Dealer demand in their own words is not yet measured; we build now because test calls on live rooftops already count in their reports and sales tests post a lead.

### TL;DR
Today a manager who wants to hear their live agent places a real call that counts like a customer's. We will give them the guided test prospects get, with a report and a list of past tests; a few places where a test still shows must close before every user gets it. The gain, catching a wrong hours or policy answer before customers hear it, is not yet measured.

### Problem
A service manager changes Saturday hours in Settings and wants to hear the agent say them before customers call. (assumption: illustrative; no dealer has been quoted yet)
Today they click Talk to agent, fill in a short form, and a real call goes to the live agent.
That call counts in conversation reports like a customer's, and a sales test also posts a lead.
They get no report of what the agent captured and no list of past tests.
Prospects get both in the guided demo, which is blocked for live stores.
Opened as built, the demo would break the live agent: real calls would fail, customers would be offered lease and payment estimates, and test edits would change live hours and policies.
The GM, BDC manager and service manager own what the agent says, yet nothing links a Settings change to what customers hear. (assumption: inferred from who uses Settings)

**Goal:** a live rooftop hears what its customers hear, sees what the agent captured, and fixes it in Settings, without the test touching its live setup, reports or store line.

### Evidence
- In 90 days, 60 live rooftops placed 431 test calls from the console; Spyne staff testing there are included and cannot be separated.
- No dealer has asked in their own words yet; the searches failed, so that count is missing, not zero.
- The receptionist test already runs on a live rooftop's real agent and marks its calls as tests for reporting.

### Recommendation
1. On Sales or Service > Settings > Agents, Talk to agent opens the guided test on the rooftop's own live agent.
2. The tester picks a browser call, or has the outbound agent call their own verified phone, never a customer's.
3. The agent runs its live script, hours, policies, service menu, inventory and finance provider, and marks bookings as tests. It never transfers, so the store's line never rings and transfers are not tested. Whether a service test offers real open slots is not yet known.
4. Agent details are read-only with links to edit in Settings; the test never changes the live setup.
5. The tester gets a report written for a live store, with no sales request button, and a list of past tests.
6. The Spyne sales team's demo list flags rooftops already live.

**Kept out**
- The calls list and call analytics, already true today.
- Conversation reports, by marking tests the way the receptionist test does; still to be checked.
- The dealer's DMS or scheduler for a new test service booking; read in code, not yet run.
- The dealer's own CRM unless the rooftop opted in, with known misses (5 of 46 in a staging test).

**Blocked for test calls before the first production test**
- Real staff tasks from callback requests.
- Real texts to whatever number the agent is given.
- Reminders on test bookings.

**Still shows until fixed** (owner: Sales Inbound PM; closed before every user)
- Test bookings in the overview appointment count.
- A lead under the tester's phone, from inbound and outbound sales tests.

**Rollout:** Spyne owners first on production, then every user; an off switch per rooftop returns today's form.
- Before the first production test: texts, callback tasks and reminders are blocked for test calls; a test rooftop run with a live DMS and a connected CRM shows nothing reaches either, tests are checked to stay out of reports, and Engineering alerts on any live agent set up as a demo agent.
- Before every user: "still shows" closed, no live agent set up as a demo agent, and an Engineering daily check that tests add no report counts, tasks, leads or texts.

Set per rooftop: which agents show and the tester's verified phone.
Not in this release: text-message tests, the receptionist, and rebuilding what already works.
For the PRD: how the test mark is stored and read, how the CRM block links a record to its call, and what cleanup at sales go-live removes.

### What it removes
| Measure | Today | After | Source |
|---|---|---|---|
| Test calls counted in conversation reports | Counted | Excluded, once checked | |
| Service drive appointments missed or misbooked after a wrong agent answer (service manager's number) | Not measured | Fewer | (assumption: not measured) |
| Spyne customer success (CSM) time per agent change (a Spyne cost) | Not measured | Lower | (assumption: rooftops will self-check after a change) |

### Risks and dependencies
- A live agent left set up as a demo agent fails its real calls; the alert catches it and the off switch rolls back.
- Some live agents may already be set up that way from the prospect demo, and our reporting data cannot count them. (assumption: some live rooftops carry an old demo mark)
- Outbound tests ring from a shared Spyne number, and what a callback to it reaches is unverified.
- Cleanup at sales go-live must remove only test leads, never one a person worked.
- The "still shows" fixes touch other teams' tools, with no date yet.

### Open questions
| # | Question | Who answers | Blocks |
|---|---|---|---|
| 1 | How big is the change to block texts, callback tasks and reminders for test calls, and which team owns each tool? | Engineering | First production test |
| 2 | Does the test rooftop run cover Xtime, cancel and move? | Engineering | First production test |
| 3 | By when can each "still shows" item close, and which team fixes it? | PM | Every user |
| 4 | How many live agents are set up as demo agents today? | Engineering, source database | Spyne owners stage |
| 5 | Are tests hidden in the report pages embedded in the console, and is the receptionist in scope? | Engineering | What we promise |
| 6 | Does a service test offer real open slots and keep to appointment limits? | Engineering | What Service can trust |
| 7 | What must the report show: lead status, appointment, summary, handoff reason, who a transfer would ring, and for service the concern, time and loaner promise? | PM with BDC and service managers | Report design |
| 8 | Which live-agent errors did CSMs fix recently, how long did each run, and which service drive number does that protect? | CSM | Days removed |
