---
expect: merge
why: A specific, reusable drafting rule from a PM gate, sourced to a work folder 
---

## candidate

```md
---
id: lesson--prd-drafting--booking-lands-in-scheduler
kind: lesson
target: prd-drafting
area: vini-service
status: candidate
owner: yash.sharma
source: evals/reviewer/fixtures/fd48211-decisions.md
verified: 2026-10-15
confidence: medium
---

**Rule:** For any change to service booking, write an acceptance criterion that the appointment lands in the store's scheduler with the customer's concern text intact.

**Why:** At Gate 3 the PM sent the PRD back because every criterion checked the booking was made, none checked it reached the scheduler the advisors use.

**Instead:** Add a criterion of the form "Given a booked appointment, when the advisor opens the scheduler, then the appointment shows at the booked time with the concern text".
```
