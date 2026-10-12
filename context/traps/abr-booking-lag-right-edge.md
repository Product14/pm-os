---
id: data-trap--abr-booking-lag-right-edge
kind: data-trap
area: vini-sales
status: stable
owner: yash.sharma
source: memory project_abr_sep_refresh.md (2026-10-01)
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: metric-definition--abr-attempt-times-close
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Treat only the last 1-2 days of an ABR series as truncated by booking lag, not the whole final week.

**Why:** Booking lag is short: about 75% of bookings happen the same day and 90% within 7 days (Spyne internal analysis, May-Sep 2026). The right edge of a weekly ABR chart is not materially understated except for the final 1-2 days.

**Instead:** Exclude or flag the final 1-2 days when reading the latest ABR point; do not discount the whole trailing week as immature.
