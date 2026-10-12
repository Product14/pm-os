---
id: data-trap--outcome-label-taxonomy-drift
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: conversational-ai-backend commit 55411f278; agentBaseFact.sql; memory project_sms_funnel_dashboard.md (2026-08-14), project_abr_sep_refresh.md (2026-10-01)
verified: 2026-10-01
confidence: high
held_since: 2026-10-12
hold_reason: reviewer held
---

**Rule:** Treat every outcome or action-item allowlist as dated; check for relabels before trending.

**Why:**
- SMS outcome taxonomy changed 2026-06-08: `Appointment` retired; `Purchase Intent`, `Soft Decline`, `Customer Considering`, `No Slots Available` added. Pre/post not comparable; pre-June "hard intent" ABR of ~70% is an artifact.
- Call outcome relabel ~2026-07-20 (sales inbound): `General Engagement` (qualified) 1,596 -> 151, `Could Not Conclude` (not qualified) 0 -> 382 per week, coverage 100%. Call Qualified reads 88.6% -> 18.6% with no real change.
- `qualified_via_call` in `agentBaseFact.sql`: 7 legacy camelCase labels return 0 rows; `SALES_SCHEDULE_APPOINTMENT` (rename of `ScheduleAppointment`) is missing. Degrades TV Wall call ABR. `report.connected` (read at :215) exists on 0 of 451,526 rows.

**Instead:** anchor on structural fields (`meetings`, `endedReason`, tool invocation). If an allowlist is unavoidable, check weekly label counts for step changes and include both naming generations.
