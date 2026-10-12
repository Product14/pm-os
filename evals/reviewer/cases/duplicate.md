---
expect: reject
why: Duplicates the stable neighbor (C8)
---

## candidate

```md
---
id: data-trap--avoid-conversation-fact
kind: data-trap
area: data-warehouse
status: candidate
owner: someone
source: abr analysis Sep 2026
verified: 2026-10-10
confidence: high
---

**Rule:** Avoid `vini_reporting.conversation_fact` when counting Vini appointments.

**Why:** It returns fewer appointments than `dealer_leads.meetings`.

**Instead:** Use `dealer_leads.meetings`.
```

## neighbor

```md
---
id: data-trap--conversation-fact-unreliable
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: appointments-30d-by-rooftop.sql header
verified: 2026-09-11
confidence: high
---

**Rule:** Never use `vini_reporting.conversation_fact` for Vini reporting.

**Why:** Returns 12-17% fewer appointments than `dealer_leads.meetings` (Spyne internal analysis, Sep 2026).

**Instead:** `dealer_leads.meetings` for appointments.
```
