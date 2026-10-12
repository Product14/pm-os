---
expect: reject
why: Not actionable (C2), unsourced (C5)
---

## candidate

```md
---
id: data-trap--clickhouse-can-be-wrong
kind: data-trap
area: data-warehouse
status: candidate
owner: someone
source: experience
verified: 2026-10-10
confidence: low
---

**Rule:** Be careful with ClickHouse numbers, they can be wrong sometimes.

**Why:** Several dashboards disagreed in the past.

**Instead:** Double check.
```
