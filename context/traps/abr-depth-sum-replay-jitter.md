---
id: data-trap--abr-depth-sum-replay-jitter
kind: data-trap
area: vini-sales
status: stable
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/abr-trends.sql; memory project_abr_distinct_phones.md (2026-10-01)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--abr-attempt-times-close
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Do not treat a difference of up to 0.1 in `depth_sum` between two runs of unchanged `abr-trends.sql` as a regression.

**Why:** `depth_sum` is a rounded float sum (`round(sumIf(depth_num, is_engaged=1), 1)`), and ClickHouse float summation order is not deterministic, so identical queries can differ by up to 0.1.

**Instead:** In replay diffs, compare `depth_sum` with a tolerance of 0.1 (or exclude it) and gate on the integer columns.
