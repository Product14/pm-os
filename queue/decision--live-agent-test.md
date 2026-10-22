---
id: decision--live-agent-test
kind: decision
area: platform
status: candidate
owner: yash
source: product/work/platform/idea-live-agent-test/decide.md
verified: 2026-10-22
confidence: medium
outcome: defer
revisit_trigger: 3 or more distinct live rooftops in 90 days using Talk to agent or asking a CSM to test their live agent (Q50/Q54); or CSM-logged live-agent errors with days each stayed live (Q53); or a rooftop still asks for a test report or history after console tests are flagged as test data
demand_rooftops: unknown (0 counted; Arali and ticket searches failed)
work: product/work/platform/idea-live-agent-test
---

**Rule:** Do not open the demo flow to live rooftops yet; point them to Talk to agent in Settings > Agents and keep their test calls out of reports instead.

**Why:** Demand and dealer P&L impact are both unknown because the searches failed and nothing was measured, and Talk to agent already lets a live rooftop call its own agent. The cost that is shown is test pollution: dealer test conversations count in reports and sales outbound tests create real CRM leads, which a test flag fixes without the live-test build.

**Instead:** Tell the rooftop how to test today with Talk to agent (csm-draft.md in the work folder). Treat the test-pollution leak as its own fix, following the reception test's test flag. Reopen when the revisit trigger is met.
