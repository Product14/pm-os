---
expect: merge
why: Verifiable in this repo, durable design rule
---

## candidate

```md
---
id: system-fact--freshdesk-public-replies-blocked
kind: system-fact
area: integrations
status: candidate
owner: someone
source: plugin/scripts/freshdesk.mjs (reply command)
verified: 2026-10-10
confidence: high
---

**Rule:** Never expect the PM OS to post a public Freshdesk reply; draft it and let the PM post it.

**Why:** `plugin/scripts/freshdesk.mjs` supports only `whoami`, `ticket` and private `note`. The `reply` command exits with code 3 by design.

**Instead:** Use `node plugin/scripts/freshdesk.mjs note <id> <file>` for internal notes; draft public replies in-session.
```
