---
id: data-trap--eval-v3-na-is-pitch-inapplicable
kind: data-trap
area: vini-sales
status: stable
owner: yash.sharma
source: memory project_abr_deepdive.md (2026-08-11)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--abr-attempt-times-close
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Compute pitch rate over pitch-eligible conversations only (eval code `V3` = pass or fail), treating `V3 = 'n/a'` as pitch-inapplicable.

**Why:** `V3 = 'n/a'` means the pitch did not apply, not that the value is missing; a large share of n/a rows are L2 transfers. Putting n/a rows in the denominator makes pitch rate silently absorb routing mix.

**Instead:** Use `countIf(V3 = 'pass') / countIf(V3 IN ('pass','fail'))` and report the n/a share separately if routing mix matters.
