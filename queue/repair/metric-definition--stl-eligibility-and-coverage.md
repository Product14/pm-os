---
id: metric-definition--stl-eligibility-and-coverage
kind: metric-definition
area: vini-sales
status: candidate
owner: yash.sharma
source: prototypes/stl-csm-report/resolver_fixture.json + roster_query.sql; prototypes/stl-audit-dashboard/build.py; projects/stl-audit/ATTRIBUTION-FINDINGS.md; memory project_stl_rooftop_dashboard.md (2026-09-21), project_inbound_performance_page.md (2026-08-14)
verified: 2026-09-21
confidence: high
reject_reasons: reviewer rejected; C1: bundles at least three independent rules: the coverage formula and resolver, the STL vs follow-up taskType mapping, and the rooftop verdict precedence (plus the 50% reach-bar rule); C1: the Instead section has three unrelated actions, and revised_body cannot be used to split an entry; C6: claims check out against the memory file and roster_query.sql; the ATTRIBUTION-FINDINGS path is missing its brainstorming-flows/ prefix; C8: overlaps the dealer-leads join-traps candidate only on sequenceWorkflows; not a duplicate
fix_hint: Split it into separate entries: (1) a metric-definition for STL coverage = smsSent / eligibleByType with the exact resolver and the eligibleByArrivalTime trap; (2) a metric-definition for the STL vs follow-up taskType mapping; (3) a decision for the rooftop verdict precedence, including the no-largest-drop and no-50%-reach-bar rules. Fix the ATTRIBUTION-FINDINGS path to brainstorming-flows/projects/stl-audit/.
---

**Rule:** Compute STL (speed-to-lead) coverage as `smsSent / eligibleByType` using the exact eligibility resolver.

**Why:**
- Resolver (matches the audit extract 17/17): key = `upper(external_type)`, or the literal `'empty'` when blank. 1) `byType[key]` exists -> its `isEnabled`; 2) else `bySource[upper(source)]`; 3) else `bySource.DEFAULT`. `byType.DEFAULT` is never consulted.
- Lead-type matching is case-insensitive (confirmed 2026-09-18). An uppercase type at zero is a feed gap, not casing; the extract's `meta.caveats` saying otherwise is wrong.
- `eligibleByArrivalTime` is populated only for SILENT_HOURS rooftops; FULLDAY zeros mean "no time gate", not "no data".
- `noTask` (no STL task ever created) is a different defect from `skipped` (created then declined). 52% of eligible-but-unmessaged leads had no task and no `sequenceWorkflows` row (Sep 2026), so aggregate skip reasons are not per-lead explanations.
- Total-lead denominators are polluted by bulk imports and native capture; only ~31% of arriving leads come via a qualifying webhook roster-wide.

**Instead:**
- Coverage denominator: `eligibleByType` everywhere.
- STL vs follow-up: `sequenceTasks.taskType` `STL` / `STL_FOLLOW_UP` -> STL; `FOLLOW_UP` -> follow-up sequences.
- Rooftop verdict by ordered precedence: volume < 20, no STL-capable feed, nothing eligible, blocked sales-inquiry volume, then coverage bands. Never classify by largest % drop; never put a 50% bar on reach.
