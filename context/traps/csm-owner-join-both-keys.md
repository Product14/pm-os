---
id: data-trap--csm-owner-join-both-keys
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_stl_rooftop_dashboard.md (2026-09-21)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--live-rooftop-roster
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Join the CSM owner from `eventila.enterprise_poc_details` on both `enterprise_id` and `product_line_details_id`, never on enterprise alone.

**Why:** If you key on `enterprise_id` alone, distinct CSM owners on different product lines of the same dealer group collapse into the wrong owner.

**Instead:** Join `eventila.enterprise_poc_details` ON `enterprise_id` AND `product_line_details_id`, and pick the owner with `argMax(cs_id, id)`.
