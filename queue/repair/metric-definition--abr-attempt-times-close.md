---
id: metric-definition--abr-attempt-times-close
kind: metric-definition
area: vini-sales
status: candidate
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/abr-trends.sql; memory project_abr_sep_refresh.md (2026-10-01), project_abr_deepdive.md (2026-08-11), project_abr_distinct_phones.md (2026-10-01)
verified: 2026-10-01
confidence: high
reject_reasons: reviewer rejected; C1: bundles at least five independent rules (ABR decomposition, pitch-eligible denominator, right-edge lag, depth_sum replay jitter, bookable-but-missed cut) under one Rule line; C1: the Rule line itself joins two actions, using the SQL as the definition and always decomposing; C8 (candidate neighbor): 'Ask' is detected from agent message text, which clashes with the transfer-wording rule against measuring agent behaviour by phrase-matching what the agent says; Risk high: this is a metric definition other entries depend on, so it must be scoped tightly before merge
fix_hint: Cut this down to one rule: read ABR as attempt rate x close-given-attempt, with attempt = booking_tool_fired and the definition from abr-trends.sql. Resubmit the pitch denominator, booking-lag right edge and depth_sum jitter as separate data-trap candidates. Define Ask structurally, or say outright that it is text-detected and why that is acceptable even though the transfer-wording rule forbids phrase-matching.
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
