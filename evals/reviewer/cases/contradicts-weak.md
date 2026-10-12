---
expect: hold,reject
why: Contradicts a stable entry on a say-so source (C5, C8)
---

## candidate

```md
---
id: system-fact--transfers-ring-90s-with-fallback
kind: system-fact
area: vini-sales
status: candidate
owner: someone
source: heard on a dealer call
verified: 2026-10-10
confidence: medium
---

**Rule:** Assume a live transfer rings for 90 seconds and then falls back to a second destination.

**Why:** A dealer mentioned it on a call last week.

**Instead:** Tell dealers they do not need a backup number.
```

## neighbor

```md
---
id: system-fact--call-transfer-behaviour
kind: system-fact
area: vini-sales
status: stable
owner: yash.sharma
source: memory project_transfer_escalation_research.md (2026-10-06)
verified: 2026-10-06
confidence: high
---

**Rule:** Assume a live transfer has one destination, a 45s ring, no escalation, and no real callback.

**Why:** Transfer research on Oct 6 2026 found single-destination transfers with a 45 second ring (Spyne internal analysis).

**Instead:** Design flows that do not depend on a fallback destination.
```
