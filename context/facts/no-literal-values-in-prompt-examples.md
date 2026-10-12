---
id: system-fact--no-literal-values-in-prompt-examples
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: memory project_close_quality_prd.md (2026-10-08)
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: system-fact--live-eval-and-prompt-testing
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never put literal values in agent prompt examples.

**Why:** Models copy literal examples. In an Oct 2026 PM test call, the sales inbound agent made four visit asks after pushback. Each one offered the same "eleven AM or three PM", because that literal example appeared in 11 prompt locations.

**Instead:** Write prompt examples with placeholders or describe the pattern, so the agent fills in real values from the conversation and tools.
