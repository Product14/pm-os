---
rubric: prd
version: 2
---

# PRD rubric v2 (frozen; change only with a version bump and a passing eval)

Every reviewer scores these 1 to 5, plus their own persona "Review lens" criteria.

| Criterion | 5 means | 1 means |
|---|---|---|
| Faithful to the one-pager | Builds what the approved one-pager decided; fixed intents intact | Scope drifted from the approved decision |
| Testable requirements | Every P0 requirement has acceptance criteria covering the happy path, the stop condition, the negative case and the fallback | Criteria only check that something is attempted |
| Today vs after | Every changed step cites how it works today in code | "Today" is described from memory |
| Configuration, not branches | Per-rooftop differences are settings with defaults | Store-specific behaviour hard-coded or unspecified |
| Measurable | Each goal names where it is measured (table, column or event) and a baseline or "unknown" | Metrics with no source, or a metric that contradicts a `context/metrics` definition or trap |
| Dependencies | DMS, CRM and integration reads and writes listed, with what is available today and an owner for what is not | Missing dependencies that will block the build |
| Rollout | Pilot by rooftop type, a flag or config, how it is watched, how it is rolled back | No rollout or rollback |
| Every agent | Requirements and acceptance criteria cover each agent in case.md > Agents affected | A shared change specified for one agent only |
| Dealer reality | A real person in each panel seat could run their day with this | Breaks the floor, the drive or the BDC in a way a dealer would notice in the first week |

**Blocking for every reviewer:**
- A P0 requirement without a stop condition or a fallback.
- A requirement that needs a DMS or CRM write we do not have, listed as in scope rather than as a dependency.
- A metric whose source contradicts a stable `context/traps` entry.
