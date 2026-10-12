---
id: data-trap--color-arrays-are-option-lists
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

**Rule:** Do not read a multi-value color array in listing metadata as the vehicle's color.

**Why:** In `inventory.dealerVinMapping.vinDetails`, multi-value color arrays are decoded option lists (the colors available), not the color of the actual vehicle.

**Instead:** Use a color only when the field holds a single value. When it holds several, treat the color as unknown.
