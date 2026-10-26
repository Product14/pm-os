# Solution context: live-test mode on the demo flow (build-generalised, feature live-agent-test)

Sources: evidence E-ids; DF = brainstorming-flows/projects/demo-flow/demo-flow-live-rooftops.md; PROTO = conversational-ai-backend-live-test commit f996cd4c8 (local, unpushed prototype, not shipped behaviour [E24]). Blue Brain was not called; claims are read from DF, the prototype diff and git grep on origin/main and origin/release.

## Pieces to reuse and the flag each needs

**Backend (conversational-ai-backend)**
- Demo-flow methods stay; add `mode: 'live'` on details, onboarded-agents and call/start (PROTO commit message; DF:104-110).
- `resolveDemoAgent` takes `{ live }`: skips the stage block, never sets `isDemoAgent`, never creates a mapping, real mappings only via `isDemoAgent: {$ne: true}` (PROTO demo-flow.service.ts:374-390). Today it refuses live teams [E5] and flags a real mapping as demo [E6], which 404s real web calls [E7] and forces lease and payment overrides [E8].
- Test stamping copies the reception test [E9]: conversation `isTest: true` (PROTO demo-flow.service.ts:506), call `forceTestCall` plus `isLiveTestCall` (PROTO web-call.service.ts, `liveTest` argument), report row `isLiveTest: true` (PROTO demo-flow.service.ts:526). Demo rails stay: transfers declined, `is_demo_meeting`, no post-processing [E10] (DF:108-114).
- Token rooftop check on live endpoints (PROTO demo-flow.service.ts:647 region; DF:101). Today most demo endpoints skip it (DF:73).
- No live mode for SMS [E24].

**Demo app (agent-demo-flow)**
- New params `?mode=live&teamAgentMappingId=...&test=inbound|outbound`, straight to the lane (DF:147). The app cannot target an agent today (DF:76).
- Console embed: the demo iframe already exists on the Overview route [E4]; DF:156-157 proposes a new self-contained route instead.

**Console (spyne-console-microfrontends)**
- Wire only `onTalkToAgent` (AgentsSettingsTab.tsx:151, origin/release). Flag on: route to a new `/converse-ai/settings/test-agent` page that iframes the demo app with the Overview token build (DF:156-159). Flag off: today's modal [E3]. The tab belongs to another team (DF:32).
- Gate `SPYNE_OWNER`, then everyone [E21]. The console already uses that role check (e.g. recall/layout.tsx:41). `release` and `uat-release` have drifted, so two branches (DF:161).

## What the demo app must stop doing in live mode
- Writes [E15]: `POST /demo-flow/working-hours` including the auto-save before a test, central-config agent-config (finance, trade-in, service policies, service menu), console `/v1/product-onboarding/vini/agent` name/voice (DF:64-67). Knowledge rail becomes read-only with "Edit in Settings" links [E21].
- Copy [E16]: "Nothing goes live" (AgentHeroCard.tsx:311), "Your agent is not live" (HubScreen.tsx:131), and the "Get Vini on your lines" CTA (ReportScreen.tsx:659, PendingReport.tsx:103, SmsReportScreen.tsx:533), which files a sales request.
- Demo inventory fallback: "We will use a demo lot until your inventory is connected" (AgentHeroCard.tsx:216; KnowledgeFacts.tsx:1279). The prototype drops the demo lot and demo service menu flags server-side (commit message); the UI side is DF:152.

## How the rooftop finds past tests [E18]
`GET /demo-flow/reports` lists a rooftop's `DemoConversationReport` by department and direction, newest first (demo-flow.service.ts:1836). Nothing new is needed on the store except a "Tests" entry in Settings linking the demo app history [E21]; the Settings entry is Full value scope.

## What keeps tests out of reporting today vs the leaks
- Excluded today for a live test (DF:128-133): calls list and drawer, analytics (`isTestCall`, E59), end-call email/SMS and PagerDuty, service contact/appointment/follow-up metrics, reception overview, and every `ifNull(c.isTest,0)=0` report [E11, E60] once `isTest` is set.
- Not excluded (DF:135-142): ClickHouse `meetings` has no demo column [E12]; callback/follow-up action items have no test check [E13]; CRM lead has no marker [E14, E56]; in-call SMS has no demo gate and reminders on demo meetings likely fire; DMS write-back of a demo service booking is unverified; iframe apps and dealer-leads `v3/meetings` are outside the repos read.
- Today's Talk to agent already leaks: dealer staff calls stay `isTest` false [E63] and sales outbound creates a real CRM lead [E54, E56]. The unmerged `uat/FD-24439-exclude-demo-from-console` adds an `isDemo` ClickHouse column and console-report exclusion [E22].

## Agent Demos admin flag
Live tests write the same `DemoConversationReport` rows the admin reads (DF:172). Flag or filter on `DemoConversationReport.isLiveTest` in admin-tools, not in the backend (DF:173-175). Prior admin work is separate; do not change its other behaviour.

## Rollout gate
Phase 0 verify in UAT on a rooftop with a working DMS integration: demo booking does not write back, lead not pushed to external CRM, which lists read which source (DF:84-87). Then UAT end to end (inbound web call, outbound, a booking), then prod for `SPYNE_OWNER`, then all (DF:163-169; E21).

## Risks
1. Real agent flagged as demo if any path misses the live guard [E6-E8].
2. Prod data: a rooftop that ran the prospect demo before going live may already have `isDemoAgent: true` on its real mapping; needs a Mongo check, fix per rooftop (DF:143).
3. Outbound uses the shared `DEMO_OUTBOUND_CALLER_ID`, any E.164, 20/hour, no allow-list (DF:75, 178).
4. `delete-demo-data` sweeps leads by tester mobile when Sales Inbound later enters Onboarding on a rooftop already live on Service (E17, DF:144).
5. Full value touches tools and CRM lead creation owned by other teams [E13, E14].
6. Demand and dealer P&L impact are unmeasured; Arali failed [E30, E50]. No dealer figure is available.

## Unknowns
- DMS or scheduler write-back for `is_demo_meeting` bookings, and push of the test lead to the dealer's external CRM (DF:84-87, 140-141).
- Whether service cards show `isOnboarded` for live service rooftops, and whether live mode covers the receptionist (DF:179-180).
- Whether `isTest` on conversations excludes tests in the iframe report apps (DF:142).
- Prototype test results are the author's report (DF:123-126), not re-run here.
