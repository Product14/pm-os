---
id: data-trap--service-inbound-extractor-traps
kind: data-trap
area: vini-service
status: candidate
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/ROADMAP-SERVICE-INBOUND.md; memory project_service_inbound_roadmap.md (2026-10-05), project_service_demo_flow_gaps.md (2026-10-05)
verified: 2026-10-05
confidence: medium
---

**Rule:** For Service Inbound analysis, judge tool results from the response body, dedupe calls, and ignore service report placeholders.

**Why:**
- Tool event status is wrong in both directions.
- `conversational_ai_pg.calls` carries replicated duplicate rows.
- The backend service extractor writes placeholder `overview` / `evalreport` on every service report.
- When scoring against "the" prompt, the reference must be the majority prompt generation in the window, or scores shift.

**Instead:** parse tool response bodies; dedupe `conversational_ai_pg.calls` by call id; read service report content from `report.service`.
