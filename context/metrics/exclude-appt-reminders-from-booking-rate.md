---
id: metric-definition--exclude-appt-reminders-from-booking-rate
kind: metric-definition
area: data-warehouse
status: stable
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/features.sql (lines 65-68, 230); memory project_vini_red_history.md (2026-09-11)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--booked-appointment-attribution
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Exclude the `appt_reminders` bucket (`task_type = 'APPOINTMENT_REMINDER'`) from any booking or appointment-rate numerator.

**Why:** Vini sends an appointment reminder only to a lead that already has a booking, so reminder leads show a near-100% booking rate by definition. The reminder did not cause the booking, so counting it is circular.

**Instead:** Keep `appt_reminders` as its own bucket for reconciliation only, and compute Sales Inbound appointments from `appts_first` without it.
