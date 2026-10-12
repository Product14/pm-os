---
id: data-trap--full-images-from-rooftopinventories
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

**Rule:** Pull a VIN's full processed image list from `PartnerSystem.rooftopinventories.processedImageUrls`.

**Why:** `inventory.dealerVinMapping` holds only thumbnails, so it cannot supply a complete image set for a listing or feed.

**Instead:** Join on the VIN to `PartnerSystem.rooftopinventories` and read `processedImageUrls`. Use `dealerVinMapping` only for thumbnails and media metadata.
