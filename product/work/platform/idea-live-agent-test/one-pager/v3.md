# A live rooftop cannot test its own Vini agent without the test landing in its reports and CRM

**Author:** Sales Inbound PM · **Date:** 2026-10-22 · **Status:** Draft v3 · **Ticket:** none (PM idea) · **Area:** platform
**Where it lands:** sales leads and appointments, service drive appointments

## Decision
Build one guided test for live rooftops' Sales and Service voice agents, on their own live agent, with test calls marked to stay out of conversation reports. [PM] [E1]
Text-message agents and the receptionist are not in this release; the receptionist is decided in the PRD. [E24] [PM]
The judge said defer because demand is unmeasured; the PM overrode it because test calls on live rooftops already count in their reports and sales tests post a lead. [PM] [E63] [E56]

## TL;DR
Today a manager who wants to hear their live agent places a real call that counts like a customer's. We will give them the guided test prospects get, with a report and a list of past tests; a few places where a test still shows must close before every user gets it. The gain, catching a wrong hours or policy answer before customers hear it, is not yet measured. [PM] [E63]

## Problem
A service manager changes Saturday hours in Settings and wants to hear the agent say them before customers call. [ASSUMPTION: illustrative; no dealer has been quoted yet]
Today they click Talk to agent, fill in a short form, and a real call goes to the live agent. [E3]
That call counts in conversation reports like a customer's, and a sales test also posts a lead. [E63] [E56]
They get no report of what the agent captured and no list of past tests. [E18]
Prospects get both in the guided demo, which is blocked for live stores. [E4] [E5]
Opened as built, the demo would break the live agent: real calls would fail, customers would be offered lease and payment estimates, and test edits would change live hours and policies. [E6] [E7] [E8] [E15]
The GM, BDC manager and service manager own what the agent says, yet nothing links a Settings change to what customers hear. [ASSUMPTION: inferred from who uses Settings]

**Goal:** a live rooftop hears what its customers hear, sees what the agent captured, and fixes it in Settings, without the test touching its live setup, reports or store line. [PM]

## Evidence
- In 90 days, 60 live rooftops placed 431 test calls from the console; Spyne staff testing there are included and cannot be separated. [E101] [E100]
- No dealer has asked in their own words yet; the searches failed, so that count is missing, not zero. [E30] [E50]
- The receptionist test already runs on a live rooftop's real agent and marks its calls as tests for reporting. [E9] [E11]

## Recommendation
1. On Sales or Service > Settings > Agents, Talk to agent opens the guided test on the rooftop's own live agent. [E1] [PM]
2. The tester picks a browser call, or has the outbound agent call their own verified phone, never a customer's. [E23] [PM]
3. The agent runs its live script, hours, policies, service menu, inventory and finance provider, and marks bookings as tests. It never transfers, so the store's line never rings and transfers are not tested. Whether a service test offers real open slots is not yet known. [E21] [E15] [E96] [E81]
4. Agent details are read-only with links to edit in Settings; the test never changes the live setup. [E21] [E15]
5. The tester gets a report written for a live store, with no sales request button, and a list of past tests. [E16] [E18]
6. The Spyne sales team's demo list flags rooftops already live. [E21]

**Kept out**
- The calls list and call analytics, already true today. [E59]
- Conversation reports, by marking tests the way the receptionist test does; still to be checked. [E9] [E11]
- The dealer's DMS or scheduler for a new test service booking; read in code, not yet run. [E81]
- The dealer's own CRM unless the rooftop opted in, with known misses (5 of 46 in a staging test). [E83] [E84]

**Still shows until fixed** (owner: Sales Inbound PM; closed before every user)
- Test bookings in the overview appointment count. [E12]
- Real staff tasks from callback requests. [E94]
- A lead under the tester's phone, from inbound and outbound sales tests. [E14] [E56]
- Real texts to whatever number the agent is given. [E90] [E91]
- Reminders on test bookings, unless stopped upstream. [E92] [E93]

**Rollout:** Spyne owners first on production, then every user; an off switch per rooftop returns today's form. [E21] [PM]
- Before the first production test: a test rooftop run with a live DMS and a connected CRM shows nothing reaches either, tests are checked to stay out of reports, and Engineering alerts on any live agent set up as a demo agent. [E81] [E84] [E6] [PM]
- Before every user: "still shows" closed, no live agent set up as a demo agent, and an Engineering daily check that tests add no report counts, tasks, leads or texts. [E102] [PM]
- What the owners stage needs first is the PM's call (open question 1). [PM]

Set per rooftop: which agents show and the tester's verified phone. [E23] [PM]
Not in this release: text-message tests, the receptionist, and rebuilding what already works. [E24] [PM]
For the PRD: how the test mark is stored and read, how the CRM block links a record to its call, and what cleanup at sales go-live removes. [E11] [E84] [E17]

## What it removes
| Measure | Today | After | Source |
|---|---|---|---|
| Test calls counted in conversation reports | Counted | Excluded, once checked | [E63] [E9] |
| Service drive appointments missed or misbooked after a wrong agent answer (service manager's number) | Not measured | Fewer | [ASSUMPTION: not measured] |
| Spyne customer success (CSM) time per agent change (a Spyne cost) | Not measured | Lower | [ASSUMPTION: rooftops will self-check after a change] |

## Risks and dependencies
- A live agent left set up as a demo agent fails its real calls; the alert catches it and the off switch rolls back. [E6] [E7] [E8]
- Some live agents may already be set up that way from the prospect demo, and our reporting data cannot count them. [E102] [ASSUMPTION: some live rooftops carry an old demo mark]
- Outbound tests ring from a shared Spyne number, and what a callback to it reaches is unverified. [E23]
- Cleanup at sales go-live must remove only test leads, never one a person worked. [E17]
- The "still shows" fixes touch other teams' tools, with no date yet. [E13] [E14] [PM]

## Open questions
| # | Question | Who answers | Blocks |
|---|---|---|---|
| 1 | Before the owners stage: block texts, callback tasks and reminders for tests, or run with a written rule that testers use only their own phone and an internal number list? | PM | Spyne owners stage |
| 2 | Does the test rooftop run cover Xtime, cancel and move? | Engineering | First production test |
| 3 | By when can each "still shows" item close, and which team fixes it? | PM | Every user |
| 4 | How many live agents are set up as demo agents today? | Engineering, source database | Spyne owners stage |
| 5 | Are tests hidden in the report pages embedded in the console, and is the receptionist in scope? | Engineering | What we promise |
| 6 | Does a service test offer real open slots and keep to appointment limits? | Engineering | What Service can trust |
| 7 | What must the report show: lead status, appointment, summary, handoff reason, who a transfer would ring, and for service the concern, time and loaner promise? | PM with BDC and service managers | Report design |
| 8 | Which live-agent errors did CSMs fix recently, how long did each run, and which service drive number does that protect? | CSM | Days removed |
