---
id: metric-definition--abr-attempt-times-close
kind: metric-definition
area: vini-sales
status: candidate
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/abr-trends.sql; memory project_abr_sep_refresh.md (2026-10-01), project_abr_deepdive.md (2026-08-11), project_abr_distinct_phones.md (2026-10-01)
verified: 2026-10-01
confidence: high
---

**Rule:** Compute ABR (appointment booking rate) from `abr-trends.sql` and always decompose it into attempt rate x close-given-attempt.

**Why:**
- Close-given-attempt (booking tool invoked on a qualified conversation -> booked) held 93-100% every week May-Sep 2026 on both channels while estate ABR fell from ~39% to ~12% (Spyne internal analysis). ABR tracks the attempt rate; the ask collapsed, not the close.
- Pitch rate needs a pitch-eligible denominator: eval code `V3='n/a'` means pitch-inapplicable (657 of 1,480 n/a rows were L2 transfers), not missing.
- A two-period split hid a late-onset break (week of 20 Jul) entirely; weekly view found it.
- Roster churn moves the blended line: same-store and newer rooftops moved in opposite directions in Sep 2026.

**Instead:**
- Definition: the shipped `abr-trends.sql` (not the eval corpus, not `conversation_fact`).
- Attempt = `booking_tool_fired` (real `sales_create_meeting` invocation). Ask = qualified conversation where the agent proposes a specific day/time (`endcallreports.callDetails_messages`, `smsMessages`).
- Read week over week, show same-store vs blended, split by channel.
- Right edge: 75% book same day, 90% within 7 days, so only the last 1-2 days are truncated.
- `depth_sum` jitters up to 0.1 between identical runs (float order); not a regression.
- Bookable-but-missed cut: `conversationEval.outcomeAchievable='Appointment'` vs `outcomeAchieved` (coverage from 2026-07-27).
