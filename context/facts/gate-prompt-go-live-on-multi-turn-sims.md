---
id: system-fact--gate-prompt-go-live-on-multi-turn-sims
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

**Rule:** Gate Vini prompt go-live on multi-turn simulated-customer evals, not single-reply checks.

**Why:** Single-reply checks missed failures that only show up across turns. In a UAT test call, the agent repeated the same visit ask four times after pushback, never offered to send the CARFAX, and said "I'll note" three times.

**Instead:** Before go-live, run the prompt against simulated customers across a full multi-turn conversation, including pushback, and judge the whole conversation.
