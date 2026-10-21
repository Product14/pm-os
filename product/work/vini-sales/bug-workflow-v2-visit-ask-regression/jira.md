# Jira: workflow_v2 voice drops the 9 Oct visit ask (regression)

## Proposed

- **project:** RETCONVAI (Converse AI) · **issue type:** Prod Bug · **parent:** RETCONVAI-5297 (Workflow v2: Prompt Parity with Single-Agent Prompts)
- **labels:** pm-os, vini-sales, sales-inbound, workflow-v2, regression
- **summary:** Sales inbound voice on workflow_v2 no longer proposes visit times (8% vs 58% inline)

### description

**Problem.** The 9 Oct appointment fix (PR #5972, RETCONVAI-5276) works only on inline-mode voice calls. On `workflow_v2`, the agent almost never proposes a visit time, and `workflow_v2` now carries about 70 to 76% of sales inbound voice leads. The voice half of the 9 Oct fix is effectively off.

**Evidence (blinded read of 100 voice calls, 12 to 20 Oct, rubric v1.0)**
- Agent proposed a visit clock time, unprompted, on winnable calls: **inline 14 of 25 (56 to 58%)** vs **workflow 4 of 53 (8%)**, Fisher p < 0.0001. Inline matches the 12 Oct post-release read (22 of 39).
- Before vs after #6188: 35% (14 of 40, 12 to 16 Oct) vs 11% (4 of 38, 17 to 20 Oct), p about 0.015.
- Callback offered beside a visit: 2 → 6 of winnable. "Never proposed a visit": 12 → 14. Transfers unchanged (11 of 40 vs 12 of 38), so routing does not explain it.
- Typical workflow_v2 pattern: an inventory miss ends the call with no visit offered; fallback is "would you like a callback request?".

**Evidence (warehouse)**
- `sales_visit_ask_gate` invocations: 8 to 21 leads a day through 15 Oct, 1 on 16 Oct, 0 every day since.
- Two-time offers on qualified voice calls: 20.4% (10 to 15 Oct) → 5.5% (17 to 20 Oct). Gate fired on 42% → 0%.
- Share of sales voice leads on workflow mode (marker: a `go_to_*` tool in `callDetails_messages`, which undercounts): 2% on 12 Oct, **30% on 13 Oct (14 rooftops)**, 18 to 23% on 14 to 15 Oct, 56% on 16 Oct, 52 to 76% from 17 to 20 Oct.
- Voice transfers on qualified calls stayed down (36.2% vs 44.9 to 48.9% before 9 Oct), so the transfer half of #5972 survives in both modes.

**Root cause (code)**
- #5972 supplies the `sales_visit_ask_gate` tool only on LiveKit and inline-tool Vapi; "gate prompt only where the tool exists" (commit 80d05e038). It is not supplied in workflow modes.
- #6188 (RETCONVAI-5372, merged 16 Oct 13:47 UTC): every inbound sales voice call without its own `executionMode` runs `workflow_v2` on `gpt-5.6-luna`.
- #6187 (RETCONVAI-5298, 16 Oct): ported the #5972 nudge to sales inbound workflow_v2, but the blinded read shows no recovery (4 of 37 workflow calls after 16 Oct proposed a time).

**Open: the 13 Oct switch.** 14 rooftops moved to workflow mode on Tue 13 Oct, three days before #6188. No commit on `release` explains it (#6101 only adds a telephony forwarding check; #6053 edits workflow prompt text). Most likely a per-rooftop `executionMode` config change. Who changed it and why is unknown.

**Expected.** Workflow_v2 voice proposes two exact visit times on interest at the same rate as inline (target: within noise of the inline rate on a blinded read), with the same restraint rules (no ask after a hard no, never repeat a declined pair).

**Acceptance**
- [ ] The visit-ask gate (or an equivalent per-call ask counter with the assertiveness limit) is available in `workflow_v2` sales inbound voice, or inbound sales voice is held on inline until it is
- [ ] Warehouse: gate invocations (or the equivalent) reappear on workflow calls on the day of deploy
- [ ] Blinded read of 50 workflow_v2 voice calls: agent-proposed visit time within noise of inline
- [ ] Transfer rate on qualified voice calls does not rise back above 40%
- [ ] `executionMode` recorded per call in the warehouse so mode switches are visible the day they happen
- [ ] The 13 Oct per-rooftop mode change is identified (who, which rooftops, why)

**Dealer impact.** Fewer callers leave with a set visit time; the store's BDC has to chase them later, which adds days to the deal. Show rate is not measurable (about 97% of Spyne meetings never leave `scheduled`), so no appointment or revenue figure is claimed.

**Sources.** Sales Inbound weekly review 21 Oct 2026 (pm-os / brainstorming-flows `abr-deepdive/weekly/2026-10-21/REPORT.md`, `CHANGELOG-AND-PREDICTIONS.md`, `data/mode_daily.tsv`), refresh of the same day (`REFRESH.md`). Shared doc available from the Sales Inbound PM.

## Created

- RETCONVAI-5392 · https://spyne.atlassian.net/browse/RETCONVAI-5392 · 2026-10-21 · Prod Bug, parent RETCONVAI-5297, unassigned, status Product Backlog
