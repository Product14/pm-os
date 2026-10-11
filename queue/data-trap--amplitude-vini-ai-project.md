---
id: data-trap--amplitude-vini-ai-project
kind: data-trap
area: vini-platform
status: candidate
owner: yash.sharma
source: memory project_vini_pageviews_chart.md (2026-08-13)
verified: 2026-08-13
confidence: medium
---

**Rule:** In Amplitude project "Vini - AI" (848727), filter internal traffic and stay under the 30-series cap.

**Why:**
- Tracking starts 2026-08-04; earlier ranges show leading zeros, not a decline.
- Internal traffic is ~44% of page views (Aug 2026); excluding it changes the tab ranking.
- Group-by returns max 30 series and drops the tail silently; `tab` + `sub_tab` = exactly 30 pairs.
- `tab` is near-constant (`Sales` or unset). `sub_tab` has a literal `Undefined` value.
- Event `Page Viewed`; `email` is an EVENT property. `team_id` = rooftop, `enterprise_id` = dealer group; `enterprise_id` is unreliably populated for the same `team_id`; some views carry no `team_id`.
- No group types, so native group analytics is unavailable. A segmentation chart in table view shows one period column only.

**Instead:** filter `email does not contain "spyne"` (internal users on personal addresses still leak); group by `sub_tab` alone to reconcile totals; count rooftops with `metric: "prop_count"` on `team_id`; `dataTableV2` escapes the 30 cap but ignores interval. Re-fetch after `edit_dashboard`; its response is misleading. Scheduled Amplitude delivery must use native subscriptions (no Amplitude connector in cloud routines).
