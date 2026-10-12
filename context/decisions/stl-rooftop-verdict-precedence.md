---
id: decision--stl-rooftop-verdict-precedence
kind: decision
area: vini-sales
status: stable
owner: yash.sharma
source: prototypes/stl-audit-dashboard/build.py; memory project_stl_rooftop_dashboard.md (2026-09-21)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: metric-definition--stl-eligibility-and-coverage
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Classify each rooftop's STL verdict with this ordered precedence: volume < 20, then no STL-capable feed, then nothing eligible, then blocked sales-inquiry volume, then coverage bands on `smsSent / eligibleByType`.

**Why:**
- Classifying by the largest percentage drop mislabels rooftops. A rooftop that messages almost all of its eligible leads gets called an integration problem when most of its total volume is non-ADF. Total-lead denominators are inflated by bulk imports and native capture.
- A 50% bar on reach fails nearly every rooftop and buries the config gaps. In the Sep 2026 audit, only about 31% of arriving leads across the roster came in on a qualifying webhook.

**Instead:** Apply the ordered precedence, which follows what CS can act on. Never classify by the largest % drop. Treat reach as context only, with no 50% bar. Flag a feed problem only when volume arrives with zero webhook leads.
