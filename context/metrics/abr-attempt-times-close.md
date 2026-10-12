---
id: metric-definition--abr-attempt-times-close
kind: metric-definition
area: vini-sales
status: stable
owner: yash.sharma
source: Vini-Success-Dashboard/products/sales-inbound/queries/abr-trends.sql; memory project_abr_sep_refresh.md (2026-10-01), project_abr_deepdive.md (2026-08-11)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--abr-attempt-times-close
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: medium
---

**Rule:** Decompose ABR (from the shipped `abr-trends.sql`) into attempt rate and close-given-attempt, where attempt = `booking_tool_fired`.

**Why:**
- Close-given-attempt (agent invokes the booking tool on a qualified conversation -> booked) held 93-100% every week May-Sep 2026 on both calls and SMS, while estate ABR fell from ~39% to ~12% (Spyne internal analysis). ABR tracked the attempt rate almost exactly, so a single ABR line hides which half broke.
- `booking_tool_fired` is a real `sales_create_meeting` invocation: a structural event, not phrase-matched agent text. It agreed with the judge L1 label on 99.5% of calls (Spyne internal analysis), and the agent self-report fields are mostly empty.

**Instead:**
- Take the ABR definition from the shipped `abr-trends.sql`, not the eval corpus or `conversation_fact`.
- Report attempt rate (qualified conversations with `booking_tool_fired`) and close-given-attempt (booked / attempted) next to ABR, split by channel and read week over week.
- Do not substitute a phrase-matched "agent offered a time" measure for attempt; if one is used as a supporting signal, label it as text-detected.
