---
id: system-fact--rooftop-timezone-write-path
kind: system-fact
area: vini-service
status: stable
owner: yash.sharma
source: spyne-console-microfrontends/apps/admin-tools/components/vini-working-hours/api/vini-working-hours-api.js:152-156 (POST /user-management/v1/team/set-working-days {teamId, workingDays, timezone}); conversational-ai-backend/src/dealer/dealer.service.ts:70-76 (getTeamTimezone reads enterprise_team_details.timezone); conversational-ai-backend/src/demo-flow/dto/save-working-hours.dto.ts (SaveWorkingHoursDto has no timezone field) + src/main.ts:129 (global forbidNonWhitelisted); conversational-ai-backend/src/slot-bookings/slot-bookings.service.ts:208 (|| 'UTC'); conversational-ai-backend/src/sms/vincue-sms-prompt-builder.service.ts:269 and src/chat-v2/chat-v2.service.ts:88 (|| 'America/New_York'); memory project_hours_save_side_effects.md (2026-10-06) for the update-team-info rejection
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: system-fact--rooftop-hours-and-timezone-config
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Set a rooftop's timezone only through user-management `set-working-days`. Do not set it through `update-team-info` or the conv-ai working-hours save.

**Why:**
- The timezone is stored in one place only: user-management `enterprise_team_details.timezone`. conv-ai's `getTeamTimezone` reads that column.
- When the column is empty, the fallbacks disagree. Tools such as slot bookings use `UTC`. Prompt builders such as vincue SMS and chat-v2 use `America/New_York`. So a rooftop with no timezone gets inconsistent hours without any error.
- conv-ai `SaveWorkingHoursDto` has no `timezone` field. The global `forbidNonWhitelisted` pipe rejects a request that includes one.
- According to the author's memory note (not re-verified in code), `update-team-info` rejects a body that carries only a timezone because it always validates website and address.

**Instead:** Call `POST /user-management/v1/team/set-working-days` with `{teamId, workingDays, timezone}`, the same call admin-tools' working-hours screen makes. Then read `enterprise_team_details.timezone` back to confirm the value was saved.
