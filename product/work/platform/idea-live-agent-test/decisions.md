# Decisions

## Fixed intents
- Live rooftops reach the demo flow from Settings > Agents > Talk to agent, for Sales and Service agents. [E1]
- A live test uses the rooftop's real agent setup (prompt, policies, finance provider) with no demo overrides; transfers are blocked so the store's line never rings; bookings carry the demo flag. [E21]
- Agent info is read-only in the live test, with links to edit it in Settings. No test screen writes to the live agent's configuration. [E21]
- The demo flow replaces the existing Talk to agent modal behind a flag; with the flag off the old modal stays. [E21]
- Rollout: Spyne owners first on prod, then every user. [E21]
- Reuse the working demo flow with flags; do not rewrite working pieces or touch what can be worked around. [E21]
- Test conversations stay out of the rooftop's core reporting and analytics, and the rooftop can find its tests later. [E21]
- The Agent Demos admin flags or filters out rooftops already live on the agent they tried. [E21]

## Log
- 2026-10-22 Decide gate: judge said defer; PM reopened as build (build-generalised, feature live-agent-test).
- 2026-10-22 Idea opened by PM; case built from the 21 Oct investigation (brainstorming-flows/projects/demo-flow/demo-flow-live-rooftops.md).

## Overrides
- 2026-10-22 Decide gate: judge (ceo persona) outcome defer; PM reopened as build. Reason: PM call; live rooftops already test through Talk to agent and those tests reach reports and CRM, so a guided test-flagged path on the real agent is wanted now.
