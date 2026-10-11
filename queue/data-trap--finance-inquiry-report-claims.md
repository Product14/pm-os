---
id: data-trap--finance-inquiry-report-claims
kind: data-trap
area: vini-sales
status: candidate
owner: yash.sharma
source: brainstorming-flows/projects/call-analysis/finance-inquiry-report.md; brainstorming-flows/projects/informativ-payments-pitch/hypothesis-findings.md; memory project_informativ_payments_pitch.md (2026-08-18)
verified: 2026-08-18
confidence: high
---

**Rule:** Do not reuse the headline claims in `finance-inquiry-report.md`; they fail matched comparison.

**Why:**
- "17.5% vs 6.4% booking": the baseline includes human_request, operational and no_signal calls. Matched against sales_shopping calls it is 18.9% vs 16.3%.
- "45% end with nothing": `outcome_after_ask` exists only on money calls, so it has no baseline. Comparable `outcome_achieved=none` is 33.2% vs 32.0%.
- The incremental-gross estimate built on the 45% is invalid too.
- All figures are Spyne internal analysis (Aug 2026 call corpus), not audited; attribute them as such.

**Instead:** matched comparisons only. Defensible finding: close-on-pitch is 34.3% on money calls vs 43.8% otherwise (n=405 vs 1,105, z=-3.32). Money questions weaken the close rather than end calls. 44.3% of money calls never pin a specific vehicle.
