---
expect: reject
why: Project status, not durable team knowledge (C3, C4)
---

## candidate

```md
---
id: system-fact--sales-summary-not-deployed
kind: system-fact
area: vini-sales
status: candidate
owner: someone
source: Slack thread
verified: 2026-10-10
confidence: medium
---

**Rule:** Do not test the sales daily summary yet; ping the owner first.

**Why:** The PR is merged but not deployed this week, and the flag is still off while QA finishes.

**Instead:** Wait for the deploy announcement.
```
