---
id: data-trap--featuresnap-fixed-keys-always-false
kind: data-trap
area: integrations
status: stable
owner: yash.sharma
source: /Users/yash/.claude/projects/-Users-yash-Documents-claude-code/memory/project_demo_vins_carfax.md
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: data-trap--inventory-and-vin-metadata
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Do not use the fixed checkbox keys in `featureSnap` to decide what features a vehicle has.

**Why:** In `inventory.dealerVinMapping.vinDetails`, the 17 fixed checkbox keys in `featureSnap` (AC, cruise, heated seat, leather, and so on) are all false, even on fully loaded vehicles. The real features are the dealer's free-text keys that are set to true.

**Instead:** Build the feature list from the dealer free-text keys in `featureSnap` whose value is true, and ignore the 17 fixed keys.
