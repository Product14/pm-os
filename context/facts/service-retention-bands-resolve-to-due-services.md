---
id: system-fact--service-retention-bands-resolve-to-due-services
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: conversational-ai-backend src/campaign/campaign.utils.ts:85-94
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: system-fact--outbound-journey-routing
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Treat the overdue, lapsing and winback service campaigns as DUE_SERVICES. They have no separate journey.

**Why:** `campaign.utils.ts` normalizes DUE_SERVICES, OVERDUESERVICES, LAPSINGSERVICES and WINBACKSERVICES to `DUE_SERVICES`. The code comment says the retention bands are one journey at different distances from the due date, so everything downstream treats them the same.

**Instead:** To change how one band behaves, change the DUE_SERVICES journey or the data passed into it, such as how far past due the vehicle is. Do not add a new journey name and expect it to route separately.
