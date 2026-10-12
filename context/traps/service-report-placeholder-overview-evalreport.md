---
id: data-trap--service-report-placeholder-overview-evalreport
kind: data-trap
area: vini-service
status: stable
owner: yash.sharma
source: /Users/yash/.claude/projects/-Users-yash-Documents-claude-code/memory/project_service_demo_flow_gaps.md (2026-10-01 entry)
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: data-trap--service-inbound-extractor-traps
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never read `overview` or `evalreport` from service reports. The backend service extractor writes placeholders into them.

**Why:** The backend service extractor writes placeholder `overview` / `evalreport` values on every service report, so those fields carry no call content for Service.

**Instead:** Read service report content from `report.service`.
