---
expect: merge
why: Correct and verifiable; only the wording needs tightening (revised_body)
---

## candidate

```md
---
id: system-fact--entries-need-owner-source-date
kind: system-fact
area: vini-platform
status: candidate
owner: someone
source: scripts/check.mjs (S4 required fields)
verified: 2026-10-10
confidence: high
---

**Rule:** So basically what we found is that it is generally a good idea to make sure that the owner field and also the source field and the verified date field are always filled in on every context entry, because otherwise there could be problems.

**Why:** The commit check in `scripts/check.mjs` lists owner, source and verified among the required fields and blocks the commit when any is missing.

**Instead:** Fill in owner, source and verified (YYYY-MM-DD) before committing.
```
