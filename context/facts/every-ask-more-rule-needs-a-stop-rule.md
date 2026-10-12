---
id: system-fact--every-ask-more-rule-needs-a-stop-rule
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

**Rule:** Give every prompt rule that tells the agent to ask more a matching stop rule.

**Why:** An earlier close-quality PRD draft said "every refusal ends in a time". Its acceptance criteria only tested that the agent asks, never that it stops. In a UAT test call, the agent pushed for a visit four times after the customer pushed back.

**Instead:** Pair each ask-more rule with a stop condition, such as a not-ready state or once per topic. Add acceptance criteria that test that the agent stops.
