---
id: data-trap--service-inbound-extractor-traps
kind: data-trap
area: vini-service
status: candidate
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/ROADMAP-SERVICE-INBOUND.md; memory project_service_inbound_roadmap.md (2026-10-05), project_service_demo_flow_gaps.md (2026-10-05)
verified: 2026-10-05
confidence: medium
reject_reasons: reviewer rejected; C1: the Rule joins three unrelated traps with 'and', and the Why adds a fourth (majority reference prompt) that has no Instead; C1: each trap involves a different table or artifact (tool events, conversational_ai_pg.calls, service reports, prompt reference), so each is its own rule; C5: 'dedupe by call id' is not in any cited source
fix_hint: Split this into separate data-trap entries, one per trap (tool status vs response body; duplicate rows in conversational_ai_pg.calls with a sourced dedupe key; placeholder overview/evalreport vs report.service; majority-generation reference prompt). Give each one its own Instead line.
---

**Rule:** For Service Inbound analysis, judge tool results from the response body, dedupe calls, and ignore service report placeholders.

**Why:**
- Tool event status is wrong in both directions.
- `conversational_ai_pg.calls` carries replicated duplicate rows.
- The backend service extractor writes placeholder `overview` / `evalreport` on every service report.
- When scoring against "the" prompt, the reference must be the majority prompt generation in the window, or scores shift.

**Instead:** parse tool response bodies; dedupe `conversational_ai_pg.calls` by call id; read service report content from `report.service`.
