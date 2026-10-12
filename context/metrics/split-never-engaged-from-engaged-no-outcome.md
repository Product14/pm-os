---
id: metric-definition--split-never-engaged-from-engaged-no-outcome
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

**Rule:** Split silent leads into never-engaged (no user turns at all) and engaged-no-outcome, and count only engaged-no-outcome as agent failure.

**Why:** If a lead never replied, the agent had nothing to convert. Putting both kinds into one silent or ghost bucket blames the agent for leads it never got to talk to.

**Instead:** In lead-level disposition funnels, show two separate buckets: never-engaged, and engaged with no outcome. Attribute only the engaged-with-no-outcome bucket to agent performance.
