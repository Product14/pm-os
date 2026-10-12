---
id: data-trap--eval-export-flags-are-string-0-1
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: memory project_sales_lead_sync_gate.md (2026-08-25)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--clickhouse-null-and-type-traps
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Compare outcome flags in conversation eval exports to the string `'1'` explicitly. Never test them for truthiness.

**Why:** Eval exports store outcome flags as the strings `'0'` and `'1'`, not as booleans. Both are non-empty strings, so a truthiness check matches every row.

**Instead:** Filter with `flag == '1'` or `flag = '1'`. Before trusting a flag column, check that it actually varies across rows.
