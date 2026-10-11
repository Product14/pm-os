---
id: data-trap--data-aggregator-carries-commercial-fields
kind: data-trap
area: vini-platform
status: candidate
owner: yash.sharma
source: memory project_demo_analytics_dashboard.md (2026-09-29)
verified: 2026-09-29
confidence: high
---

**Rule:** Strip `/data-aggregator/get-enterprise-details-list` to ids and names before any use.

**Why:**
- It is the only enterprise / rooftop list source found for filter dropdowns (the org-settings network dashboard has no such API).
- It also returns confidential commercial fields.

**Instead:** a server-side proxy that keeps enterprise and team ids + names only. Never log, commit or render the raw payload.
