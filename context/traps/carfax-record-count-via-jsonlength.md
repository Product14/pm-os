---
id: data-trap--carfax-record-count-via-jsonlength
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

**Rule:** Count Carfax detailed records with `JSONLength(detailed_history)`, not the "N Detailed Records" text.

**Why:** In `inventory.carfaxHistory.historyData` (filtered to `status='success'`), the "N Detailed Records" text undercounts the records that are actually present.

**Instead:** Count records with `JSONLength(detailed_history)` on `status='success'` rows, and never parse the number out of the overview text.
