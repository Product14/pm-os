---
expect: hold,reject
why: Cited file should be in this repo and does not exist (contradicted)
---

## candidate

```md
---
id: metric-definition--abr-magic-query
kind: metric-definition
area: vini-sales
status: candidate
owner: someone
source: scripts/abr-magic.sql in this repo
verified: 2026-10-10
confidence: high
---

**Rule:** Compute ABR only with `scripts/abr-magic.sql`.

**Why:** `scripts/abr-magic.sql` is the canonical query and handles every edge case.

**Instead:** Run `scripts/abr-magic.sql`.
```
