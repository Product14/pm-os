---
id: metric-definition--agent-closed-out-is-queue-hygiene
kind: metric-definition
area: vini-sales
status: stable
owner: yash.sharma
source: memory project_sales_inbound_lead_funnel.md (2026-08-26)
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: metric-definition--qualified
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Count leads the agent closed out (opt out, not interested, already purchased, wrong number) as queue hygiene, not as lost leads.

**Why:** These outcomes remove leads that could never convert, so they save the team work. Counting them as losses understates how the agent performs. This bucket only exists once SMS is in scope.

**Instead:** Report a separate "closed out by agent" disposition bucket and leave it out of loss and agent-failure counts.
