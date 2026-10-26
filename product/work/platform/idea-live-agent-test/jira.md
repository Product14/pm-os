# Jira: live agent test (from the approved one-pager)

Filed from `one-pager/final.md` (approved at Gate 2, 2026-10-22) at the PM's request, before the PRD. The PRD (stage 6) will refine the acceptance criteria.

## Proposed

- **project:** RETCONVAI (Converse AI) · **issue type:** Story · **parent:** none
- **labels:** pm-os, platform, live-agent-test, vini-sales, vini-service
- **description:** `jira-description.md` (ticket summary + the full approved one-pager, evidence tags stripped)
- **summary:** Live rooftops can test their own Vini agent from Settings without the test landing in reports or CRM

### description

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

**Links.** One-pager: pm-os repo `product/work/platform/idea-live-agent-test/one-pager/final.md` (branch `prd/idea-live-agent-test`). Investigation: `brainstorming-flows/projects/demo-flow/demo-flow-live-rooftops.md`. Reference backend prototype (local, not pushed): conversational-ai-backend branch `yash/demo-flow-live-test`. Freshdesk: none (PM idea).

## Created
- **key:** RETCONVAI-5409
- **url:** https://spyne.atlassian.net/browse/RETCONVAI-5409
- **date:** 2026-10-26
- **status at creation:** Product Backlog, unassigned
- **description:** jira-description.md as approved (ticket summary + full one-pager embedded)
