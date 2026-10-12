---
id: data-trap--vdp-url-key-by-row-age
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

**Rule:** Read both VDP URL keys in `inventory.dealerVinMapping.vinDetails` when pulling a vehicle's VDP link.

**Why:** The VDP URL is stored at `vehicleSnap.vinUrl` on older rows but at `websiteVdpUrl` on 2026 rows. A query that reads only one key silently misses the URL on the other set of rows.

**Instead:** Coalesce `websiteVdpUrl` and `vehicleSnap.vinUrl`, and treat a row as missing a VDP only when both are empty.
