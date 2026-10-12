---
expect: reject,hold
why: Two independent rules in one entry (C1)
---

## candidate

```md
---
id: data-trap--appointments-and-agent-split
kind: data-trap
area: vini-sales
status: candidate
owner: someone
source: abr-trends.sql
verified: 2026-10-10
confidence: high
---

**Rule:** Count appointments from `dealer_leads.meetings`, and always split every Vini metric by agent type and channel before comparing.

**Why:** Other appointment sources undercount, and agent types behave differently.

**Instead:** `dealer_leads.meetings` with the agent and channel split.
```
