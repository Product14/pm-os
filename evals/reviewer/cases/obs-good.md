---
expect: merge
why: A real, scrubbed, two-rooftop pattern about how service managers judge scheduling changes
---

## candidate

```md
---
id: obs-service-manager-slot-capacity
kind: observation
persona: service-manager
area: vini-service
tags: [scheduling, capacity, booking]
support_rooftops: 2
support_mentions: 3
last_seen: 2026-10-13
sources: arali:3acf6667, arali:9b21c0de
status: candidate
owner: yash.sharma
source: evals/reviewer/fixtures/persona-refresh-report.md
verified: 2026-10-14
confidence: medium
---

**Pattern:** Thinks in bay and slot capacity. A booking past capacity is a cost (comps, overtime, CSI), not a win.

**Predicts:** Rejects any booking feature measured on appointments booked that does not respect per-slot capacity in the scheduler.

**Ask in review:** "What stops this from overbooking a slot?"

**Evidence:**
- 2026-09-24, service manager, rooftop A: "If I book too many, I lose money. If I overbook, I have to compensate the customer."
- 2026-10-09, service manager, rooftop B: "Don't fill my 8am wave past what my techs can turn."

**Not this:** a request for a capacity feature. This is how they judge every scheduling change.
```
