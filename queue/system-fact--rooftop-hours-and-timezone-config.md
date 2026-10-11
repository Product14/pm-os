---
id: system-fact--rooftop-hours-and-timezone-config
kind: system-fact
area: vini-service
status: candidate
owner: yash.sharma
source: config-hub vini-config.service.ts createDepartments (~1875-1896, ~948); user-management enterprise_team_details.timezone; memory project_hours_save_side_effects.md (2026-10-06)
verified: 2026-10-06
confidence: medium
---

**Rule:** Treat any working-hours save as a service-menu overwrite, and set timezone only via set-working-days.

**Why:**
- central-config `createDepartments` sends a hardcoded 4-service `dealerConfig.availableServices` with every hours sync; conv-ai notifications config shallow-merges it, replacing the rooftop's service menu. Looks like a UI bug; originates in central-config.
- Timezone lives only in user-management `enterprise_team_details.timezone`. Missing -> UTC in tools, America/New_York in the prompt.
- `update-team-info` rejects a timezone-only body; conv-ai `SaveWorkingHoursDto` rejects a `timezone` field.

**Instead:** `POST /user-management/v1/team/set-working-days {teamId, timezone}`; re-check the service menu after any hours save.
