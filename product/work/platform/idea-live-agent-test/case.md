---
id: idea-live-agent-test
area: platform
stage: triaged
pm: yash.sharma
freshdesk_ticket:
ticket_updated_at:
rooftop_slug:
rooftop_name:
freshdesk_company_id:
arali_company:
raised_by: pm (Sales Inbound PM)
raised_by_role: unknown
csm:
feature: live-agent-test
outcome: build-generalised
prd:
jira: RETCONVAI-5409
ledger_match:
fetched_freshdesk:
fetched_arali:
fetched_code: 2026-10-21
---

# A rooftop whose Vini agent is already live cannot test that agent the way a prospect can try it in the demo

## Ask
PM idea, not a dealer ticket. Make the agent demo flow, which today only prospects (rooftops not yet live) can use, available to rooftops whose agents are already live, launched from the "Talk to agent" button on Sales and Service > Settings > Agents [E1]. The rooftop should hear its own live agent, see what it captured, and reach those test conversations later, without the test touching its live agent setup, its reports or its CRM [E21].

## Job
Let the rooftop's GM, BDC manager or service manager check what customers actually hear from their live agent, and fix what is wrong in Settings, without a support ticket and without waiting on a Spyne CSM [ASSUMPTION: live rooftops want to self-test after go-live; not yet shown by dealer evidence]. P&L angle: fewer missed or mishandled calls reaching the BDC and service drive because the store caught a wrong policy, hours or script itself, and less CSM time per change [ASSUMPTION: not measured].

## Customer context (30 days)
Not found: every Arali search failed with a server error on 2026-10-22 [E30]. Open question, to re-run when Arali recovers.

## Who feels this
GM, BDC manager and service manager at a live rooftop who own what the agent says [ASSUMPTION: inferred from who uses Settings]. Spyne CSM and onboarding staff who test live agents for dealers [ASSUMPTION].

## Agents affected
- Sales inbound: yes. The Settings Agents tab shows the inbound agent card with Talk to agent [E2] [E3].
- Sales outbound: yes. The outbound card has the same button [E3]; the demo flow already has an outbound lane that dials the tester's phone [E23].
- Sales STL and chat: unknown. The demo flow's text test exists for inbound sales [E23]; no live-mode text path exists [E24].
- Service inbound: yes. Same Agents tab for Service [E2].
- Service outbound: yes, same as sales outbound [E23].
- Receptionist: unknown. Reception has its own Settings route and its own test call that already runs on the real agent [E9].

## How it works today
- The Agents tab with the Talk to agent button is console code, not org-settings: spyne-console-microfrontends:apps/converse-ai/app/converse-ai/settings/page.tsx:217 renders AgentsSettingsTab [E2]. org-settings' own agent cards are mock data [E20].
- Talk to agent opens a console modal that collects customer details, then starts a browser call or a real outbound phone call on the live agent from the console's own call screen [E3].
- Today's Talk to agent calls go to the production call routes with no test flag [E52] [E55] [E57] [E58]. Only the calls table hides them, because the source is the console [E59]. The conversation row stays counted in reports unless the tester's lead has a Spyne email [E63], sales outbound creates a real CRM lead first [E56], and the call runs through ordinary post-call processing [E62]. So live rooftops already test their agent today, and those tests already reach their reports and CRM.
- The demo flow is shown only on the Vini Overview route to rooftops without a live product record for that department [E4]. The backend refuses demo agents for teams whose product line is live, onboarding, churned or contracted [E5].
- If that refusal were lifted as is, the demo marks the rooftop's real agent as a demo agent [E6], which makes real web calls fail [E7] and turns lease offers and payment estimates on for every real conversation [E8].
- The reception test already runs on a live rooftop's real agent and marks the call and conversation as test data [E9].
- Demo calls skip post-call processing and write their report to the demo flow's own store [E10]; the rooftop's demo history reads that store [E18].
- The demo flow writes to the live agent's configuration when its knowledge rail is edited (hours, policies, name, voice) and saves standard hours automatically before a test [E15]. Its copy assumes the rooftop is not live [E16].
- Delete demo data runs only when Sales Inbound enters Onboarding [E17].

## Gap
- No way for a live rooftop to open the demo flow on its own agent: the console only shows it before go-live [E4] and the backend blocks it [E5].
- Opening it as built would damage the live agent [E6] [E7] [E8] and let test edits change production config [E15].
- Test conversations must stay out of the rooftop's reporting. Most surfaces already exclude demo calls [E10] [E11]; bookings in the ClickHouse meetings data [E12], callback action items [E13] and the CRM lead [E14] would still show.
- The rooftop needs a place to find its tests later; the demo history exists [E18] but is not linked from Settings.

## Candidate directions
1. Non-build: keep the existing Talk to agent modal [E3] and train CSMs and dealers on it. No transcript-led report or history, but zero build cost; CSM time per dealer change stays as today.
2. Reuse the demo flow with a live-test mode: same screens and report, the real agent read as it is, agent info read-only with links to Settings, call marked as test data like the reception test [E9]; console Talk to agent opens it behind a flag. Removes CSM time per change and the days a wrong script or policy stays live before someone notices. Touches the backend demo flow, the demo app and one console handler.
3. **Full value:** direction 2 plus closing the remaining reporting leaks (bookings, callback action items, CRM lead) for both the live test and the reception test, and a "Tests" entry in Settings that lists past test conversations. No test cost leaks into the rooftop's reports or CRM. Touches shared tools and CRM lead creation, which other teams own.
4. Decline: live rooftops test with a real phone call to their own number. Real calls pollute reports and the CRM, so this only works with a test-number exclusion that does not exist today [ASSUMPTION: no test-number exclusion found]. Zero build cost, but report and CRM cleanup cost lands on the dealer.

## Frequency
Not established: 0 counted, because ticket and Arali searches failed with server errors on 2026-10-22 [E50] [E30]. Open question.

## Slot status

| Slot | Status | Bar |
|---|---|---|
| Ask | SUPPORTED | at least 1 E-id from freshdesk, arali or pm, in the customer's words |
| Job | THIN | at least 1 E-id behind the inferred job |
| Customer context (30 days) | EMPTY | at least 1 dealer-side arali E-id dated within 30 days of fetched_arali |
| Who feels this | THIN | at least 1 dealer-side E-id with a known role |
| Agents affected | SUPPORTED | names the impact on both Sales and Service agents (yes, no or unknown for each), with an E-id or code reference |
| How it works today | SUPPORTED | at least 1 bluebrain E-id or `repo:path:line` reference |
| Gap | SUPPORTED | at least 1 E-id or code reference |
| Candidate directions | SUPPORTED | 2 or more directions with a P&L angle, one of them labelled **Full value:** (the path that unlocks the dealer's full value, build scoped) |
| Frequency | SUPPORTED | a count, backed by at least 1 E-id |

