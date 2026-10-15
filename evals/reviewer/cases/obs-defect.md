---
expect: reject
why: Describes a product defect, not how the person thinks (O1)
---

## candidate

```md
---
id: obs-service-manager-model-names
kind: observation
persona: service-manager
area: vini-service
tags: [voice, pronunciation]
support_rooftops: 3
support_mentions: 4
last_seen: 2026-10-13
sources: arali:18613690, arali:aa11bb22, arali:cc33dd44
status: candidate
owner: yash.sharma
source: evals/reviewer/fixtures/persona-refresh-report.md
verified: 2026-10-14
confidence: high
---

**Pattern:** The agent reads model names with letters as numbers, for example V60 as "five sixty".

**Predicts:** Service managers will complain when the agent mispronounces model names.

**Ask in review:** "Does the agent say model names correctly?"

**Evidence:**
- 2026-10-13, service manager, rooftop A: "He said five sixty instead of V60, a couple of times."
- 2026-10-02, service manager, rooftop B: "It mangled the model name on the reschedule."
- 2026-09-28, service advisor, rooftop C: "Customer asked why it said a different car."

**Not this:** a pricing issue.
```
