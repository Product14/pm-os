---
rubric: decide
version: 1
---

# Decide rubric v1 (frozen; change only with a version bump and a passing eval)

You are the judge. Read the Ladder, the Inputs, and both arguments. Pick one outcome. Score each criterion 1 to 5 for the outcome you pick, and write them on the `Rubric scores` line.

| Criterion | 5 means | 1 means |
|---|---|---|
| Job, not request | The outcome serves the job in rung 2, generalised to rung 3's rooftops | It builds the literal ask for one store |
| Evidence weight | Demand and impact readings are cited and specific | They rest on assertions or unknowns |
| Five facts | Justified in days removed or cost removed, above the DMS | Justified by "more cars" or works against the DMS |
| Proportion | Build size matches demand and impact | An L build for a one-store, low-impact ask, or a defer on a widespread, high-cost problem |
| Reversibility | The first release is small and can be undone | It locks the base into one store's process |

## Decision rules

- **build-as-asked** only when the literal ask already is the general building block.
- **build-generalised** when the job is shared (2 or more rooftops, or strong evidence it will be) and the impact is named.
- **already-possible** when a cited setting or flow covers the job today. This beats building.
- **bug** when the cited code or spec shows the product is meant to do this and does not.
- **defer** when the job is real but demand or impact is below the bar. Always give a countable revisit trigger.
- **decline** when it conflicts with the five facts or is a one-off with no shared job. Always give a reason a CSM can say to a dealer.
- **If two outcomes are close**, pick the cheaper one and say what evidence would flip it.
- **Unknown inputs** lower your confidence. They never get filled by assumption. If Demand breadth and P&L impact are both unknown, pick defer with the trigger "the open questions are answered".

You must quote the strongest point from the losing side and say in one line why it did not carry.
