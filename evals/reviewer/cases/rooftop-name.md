---
expect: reject
why: Names a customer rooftop (C7) and is a one-off incident (C3)
---

## candidate

```md
---
id: data-trap--hours-config-broken-rooftop
kind: data-trap
area: vini-service
status: candidate
owner: someone
source: support ticket 2026-10-03
verified: 2026-10-10
confidence: medium
---

**Rule:** Do not trust working hours for Maplewood Subaru until their config is fixed.

**Why:** Their Thursday to Saturday hours were saved as closed and the agent told callers the store was closed.

**Instead:** Check the hours tool response before quoting availability for that rooftop.
```
