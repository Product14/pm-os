---
id: data-trap--sms-handoff-from-outcome-is-circular
kind: data-trap
area: vini-sales
status: candidate
owner: yash.sharma
source: memory project_abr_sep_refresh.md (2026-10-01)
verified: 2026-10-01
confidence: high
---

**Rule:** Never read SMS handoff from `conversationAnalytics.outcome`, and never carry voice transfer findings over to SMS.

**Why:**
- SMS has no transfer path; the funnel spine hardcodes `xfer=0` on every SMS row.
- `'Human Requested'` / `'Human Transferred'` are not on the qualified allowlist, so they can never appear on a qualified SMS lead: the rate is circular by construction.
- 80.6% of qualified SMS leads end with no terminal action at all (May-Sep 2026). On SMS a missed ask is displaced by nothing; the thread just goes quiet.

**Instead:** action-item intents (`SALES_ESCALATE_TO_MANAGER`, `SALES_CONNECT_TO_FINANCE`). Populated only from week of 2026-06-29, so no earlier baseline.
