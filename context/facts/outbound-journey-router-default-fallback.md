---
id: system-fact--outbound-journey-router-default-fallback
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: conversational-ai-backend src/prompts/base-system-prompts/sales/outbound-campaign/journey-router.xml:1-13
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: system-fact--outbound-journey-routing
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Do not assume an outbound journeyName has its own prompt. Inside the router's journey chain, any name it does not match exactly gets `default-outbound-sales.xml`.

**Why:** `journey-router.xml` is an if/elif chain of exact string comparisons on `journeyName`, with `{% else %} default-outbound-sales.xml` at line 11. The strings it compares are not always the enum values. For example, line 8 matches `'Agedleadfollowup'`, not `AGED_LEAD_FOLLOWUP`. A journey that is missing from the chain, or spelled differently, gets the generic sales prompt and raises no error.

**Instead:** Before you demo or ship a journey, open `journey-router.xml` and confirm that the exact journeyName string you send has its own branch.
