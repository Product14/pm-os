---
id: metric-definition--stl-coverage-eligible-by-type
kind: metric-definition
area: vini-sales
status: stable
owner: yash.sharma
source: prototypes/stl-csm-report/roster_query.sql + resolver_fixture.json; prototypes/stl-audit-dashboard/build.py; memory project_stl_rooftop_dashboard.md (2026-09-21)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--stl-eligibility-and-coverage
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Compute STL (speed-to-lead) coverage as `smsSent / eligibleByType`, with eligibility from the exact resolver below.

**Why:**
- The resolver below reproduces the audit extract exactly (pinned in `resolver_fixture.json`, carried in SQL in `roster_query.sql`): key = `upper(external_type)`, or the literal `'empty'` when blank. 1) If `byType[key]` exists, its `isEnabled` decides. 2) Otherwise `bySource[upper(source)]` decides. 3) Otherwise `bySource.DEFAULT` decides. `byType.DEFAULT` is never consulted, and keying untyped leads on `''` instead of `'empty'` gives wrong counts.
- Lead-type matching is case-insensitive (confirmed 2026-09-18). If an uppercase type sits at zero, the feed has a gap; casing is not the cause. The extract's `meta.caveats` says matching is case-sensitive, and that caveat is wrong.
- `eligibleByArrivalTime` is filled in only for SILENT_HOURS rooftops. On FULLDAY rooftops it is all zeros, which means "no time gate", not "no data", so it cannot serve as a denominator.
- Total-lead denominators are inflated by bulk imports and native capture.

**Instead:** Use `eligibleByType` as the coverage denominator everywhere. Compute it with the three-step resolver, and never add a `byType.DEFAULT` step.
