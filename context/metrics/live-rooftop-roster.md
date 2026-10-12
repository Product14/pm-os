---
id: metric-definition--live-rooftop-roster
kind: metric-definition
area: data-warehouse
status: stable
owner: yash.sharma
source: Vini-Success-Dashboard/products/vini-enablement/queries/call-hours-7d.sql (prod + roster CTEs); Vini-Success-Dashboard/products/vini-enablement/queries/roster-at.sql
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--live-rooftop-roster
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Define a live Vini inbound rooftop with the predicate from call-hours-7d.sql / roster-at.sql copied verbatim, never with a hardcoded enterprise blocklist.

**Why:**
- The shipped predicate, per product, as of `{as_of}`:
  - `aggregated_data.aggregated_product_details FINAL`: `_peerdb_is_deleted=0 AND product_line_name='conversationalAi' AND product_name IN ('inboundSales','inboundService')`
  - date anchor: `AND (live_date IS NULL OR toDate(live_date) <= {as_of:Date})`
  - live or not yet churned: `AND ((stage='Live' AND is_active AND (churn_date IS NULL OR toDate(churn_date) > {as_of:Date})) OR (churn_date IS NOT NULL AND toDate(churn_date) > {as_of:Date}))`
  - in call-hours-7d.sql, INNER JOIN to deduped `enterprise_details` (ed) and `enterprise_team_details` (etd) with `WHERE ed.t=0 AND etd.t=0 AND etd.rt!=''`. Here `t` is `is_test_account` and `rt` is `coalesce(nullIf(dealer_name,''),team_name)`.
- `live_date IS NULL` is kept on purpose. Most live rows have no live_date, so filtering on `live_date IS NOT NULL` would quietly shrink the roster by more than half.
- Without the date anchor and churn branch, a past date gets re-derived against today's roster, and churned rooftops vanish from past dates retroactively. That mismatch blocked a publish.
- selftest.py checks that the predicate in the two files is identical character for character. The decomposition `delta = (on - off) + (joined - left)` only holds when both files mean the same roster.
- service-inbound-capabilities.sql used a hardcoded enterprise blocklist and a LEFT JOIN that only nulled test names. It disagreed with the roster in both directions.

**Instead:**
- Copy the predicate verbatim into any new roster or fact query. Don't add or remove clauses (live_date, reseller, name screens) in only one query.
- If the definition has to change, edit call-hours-7d.sql and roster-at.sql together and keep the selftest parity guard passing.
