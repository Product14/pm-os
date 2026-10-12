---
id: metric-definition--qualified
kind: metric-definition
area: vini-sales
status: candidate
owner: yash.sharma
source: apps/reporting-vini/vini_sms_funnel_weekly.sql; memory project_sms_funnel_dashboard.md (2026-08-14), project_sales_inbound_lead_funnel.md (2026-08-26)
verified: 2026-08-26
confidence: medium
reject_reasons: reviewer rejected; C1: Rule joins two unrelated actions (SMS outcome allowlists; conversationLeadEval for lead level), and Instead adds three more independent rules; C6: cited SQL path does not exist in the repo; the file lives under apps/vini-daily-calls/src/abr-trends/; C2/C4: the Why says only one signal can be called qualified but never picks one, and the source lists that choice as open; C8 hygiene: links data-trap--outcome-label-taxonomy-drift, which is not a stable entry
fix_hint: Split it into separate entries (the SMS qualified allowlist, conversationLeadEval as the lead-level qualified source once the IRA choice is settled, and the never-engaged vs engaged split). Fix the SQL path to apps/vini-daily-calls/src/abr-trends/vini_sms_funnel_weekly.sql. Drop the link to the unmerged entry.
---

**Rule:** Define qualified with channel- and department-specific outcome allowlists that include Vehicle Inquiry and General Engagement; at lead level use `conversationLeadEval`.

**Why:**
- The original SMS allowlist missed 58% of bookings: `Vehicle Inquiry` (7.4% booking rate) and `General Engagement` (8.1%) out-convert `Pricing Inquiry` (1.5%), which was already in (Aug 2026).
- `dealer_leads.conversationLeadEval`: one row per lead; `funnelStatus` prospect -> lead; `stage` Engaged -> Qualified -> Appointment Set; `temperature` dead/cold/warm/hot; `leadScore`. At scale only from Aug 2026 (~80% coverage).
- It disagrees with the call-level IRA flag by about a third (1,542 vs 1,170 leads, 1-25 Aug 2026), worst on sales transfers. Only one can be called "qualified".
- Call outcome relabel ~20 Jul 2026 breaks call qualified trends (see data-trap--outcome-label-taxonomy-drift).

**Instead:**
- Separate sales and service allowlists, per `vini_sms_funnel_weekly.sql`.
- Qualification is an attribute across every disposition bucket, not a branch.
- Split never-engaged (no user turns) from engaged-no-outcome; only the second is agent failure. Opt-out / not interested / already purchased / wrong number = queue hygiene, not loss.
- Calls have no separate Engaged step: `role='user'` already defines connected.
