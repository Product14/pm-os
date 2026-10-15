---
rubric: onepager
version: 2
---

# One-pager rubric v2 (frozen; change only with a version bump and a passing eval)

Every reviewer scores these 1 to 5, plus their own persona "Review lens" criteria.

| Criterion | 5 means | 1 means |
|---|---|---|
| Real problem | The problem is stated as a dealer role would describe it, with the customer's own words cited | A generic problem statement that could fit any software |
| Right decision | The Decision follows from the ladder: a shared job is built generally, one-store needs are config, non-build options were weighed | Builds the literal request for one store with no generalisation or alternative |
| Evidence | Every claim is tagged; the 30-day customer context and the frequency count are used | Claims rest on assumptions, or evidence is cited but does not support them |
| P&L | Names the days removed or cost removed, and for which role | "Improves experience", "drives sales", or no P&L line |
| Above the DMS | Dependencies on DMS or CRM reads and writes are named, with whether we have them | Assumes data or write access we do not have |
| Honest unknowns | Open questions list every thin slot and assumption, each with who answers it | Unknowns are hidden or missing |
| Shared scope | Names every agent the change lands on (sales and service, inbound and outbound) and designs for each | Designs only for the agent that raised the ticket when the surface is shared |
| Full value | States the path that unlocks the dealer's full value, CRM-first, and whether this release takes it or plans it | Ships a partial fix with no plan for what unlocks the full go-live |
| Brevity | A busy reader gets the point from the TL;DR and Decision alone | Must read everything to find the recommendation |

**Blocking for every reviewer:**
- A claim the evidence contradicts.
- A recommendation that conflicts with the five facts (works against the DMS, or is justified only by selling more cars).
- A recommendation that would visibly break the reviewer's core "Blocks when" list.
