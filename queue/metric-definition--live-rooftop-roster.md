---
id: metric-definition--live-rooftop-roster
kind: metric-definition
area: data-warehouse
status: candidate
owner: yash.sharma
source: Vini-Success-Dashboard call-hours-7d.sql, roster-at.sql, service-inbound-capabilities.sql; memory project_vini_enablement_tab.md (2026-08-27), project_stl_rooftop_dashboard.md (2026-09-21)
verified: 2026-09-21
confidence: high
---

**Rule:** Define a live Vini rooftop with one shared predicate; never a hardcoded enterprise blocklist.

**Why:**
- Filter chain (inbound sales, Aug 2026): `stage='Live' AND is_active AND product_line_name='conversationalAi'` (155) -> enterprise `is_test_account=0` (65, the dominant filter) -> team `is_test_account=0` (63) -> `reseller_id=''` direct customers (60) -> name screens (59). Name screens removed only one real rooftop when tested.
- ~99 test rooftops carry `stage='Live'`; `live_date IS NOT NULL` or `rooftop_name != ''` removes them.
- `service-inbound-capabilities.sql` used a hardcoded 13-enterprise list and a LEFT JOIN that only nulls test names, so it disagreed with the roster both ways.
- `is_active` alone is never a live test (see data-trap--aggregated-product-details-current-state).
- CSM owner keyed on enterprise alone collapses distinct owners.

**Instead:**
- Reuse the `call-hours-7d.sql` predicate everywhere (enablement tab form: `ed.is_test=0 AND etd.is_test=0 AND etd.rooftop_name != ''`); keep the parity selftest against `roster-at.sql`.
- `team_id` = rooftop, `enterprise_id` = dealer group.
- CSM owner: `eventila.enterprise_poc_details` joined on BOTH `enterprise_id` AND `product_line_details_id`, `argMax(cs_id, id)`.
