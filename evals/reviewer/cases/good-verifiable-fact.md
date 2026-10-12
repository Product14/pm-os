---
expect: merge
why: Verifiable in this repo, one actionable rule, durable
---

## candidate

```md
---
id: system-fact--index-regen-after-context-edit
kind: system-fact
area: vini-platform
status: candidate
owner: someone
source: scripts/check.mjs (S6 index check)
verified: 2026-10-10
confidence: high
---

**Rule:** After adding or editing anything in `context/`, run `node scripts/index.mjs` before committing.

**Why:** The commit check compares `context/INDEX.md` byte for byte with the generated index and blocks the commit when they differ (S6 in `scripts/check.mjs`).

**Instead:** Run `node scripts/index.mjs`, then `node scripts/check.mjs`.
```
