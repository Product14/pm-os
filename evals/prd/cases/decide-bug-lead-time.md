---
why: The cited spec and setting say the product should already do this and it does not; the judge must call it a bug, not a new same-day booking feature
---

## input

Today is 2026-10-15. You have no tools. Act as the judge. Write the Outcome section of decide.md for the ladder, inputs and arguments below. Outcome is one of: already-possible, bug, build-generalised, build-as-asked, defer, decline. Use these lines: Outcome, Feature slug (build outcomes only), Why (3 lines max, citing inputs), Strongest point from the losing side (a quote), Why it did not carry, Revisit trigger, Rubric scores (Job not request, Evidence weight, Five facts, Proportion, Reversibility, each 1 to 5).

Case: Freshdesk 53017, vini-service. Headings below are shifted down one level.

### Ladder
1. **Literal ask:** "We set two hours minimum notice. Your agent booked a brake inspection 25 minutes out and nobody was ready for it. Give us real same-day controls." [E1]
2. **Job:** Same-day bookings leave the drive enough notice to staff the car, so a walk-up-style arrival does not jump the queue. [E1, E2]
3. **Who else has this job:** 2 rooftops reported bookings inside their notice window in 30 days [E5].
4. **Smallest shared building block:** the minimum notice setting `service-agent-backend:src/booking/leadTime.ts:22` (minLeadMinutes, per rooftop). The service spec says no slot inside minLeadMinutes may be offered [E4].
5. **What varies per store:** the notice length, already a per-rooftop value.

### Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E5] | 2 rooftops in 30 days |
| Dealer P&L impact | [E1, E2] | Advisor and tech time scrambled for unplanned arrivals; size unknown |
| Strategic fit | org fact 4 | Inside our booking flow; no DMS write |
| Cost and risk to build | [E3] | The check compares the slot in store-local time against now in UTC; S to fix |
| Cost of not solving | [E2] | Service manager: "If it keeps doing this I'll turn same-day off entirely." |
| Prior decisions | none | none |

### Evidence
- E1 freshdesk:53017#1, service manager: the literal ask above.
- E2 arali:int-83104, 2026-10-08, service manager: "If it keeps doing this I'll turn same-day off entirely."
- E3 bluebrain:service-agent-backend:src/booking/leadTime.ts:22, engineering: minLeadMinutes is read per rooftop; the comparison uses the slot's local time against the server's UTC now, so stores west of UTC get slots inside the window.
- E4 jira:SVC-1188, engineering: service booking spec, "No slot inside the rooftop's minLeadMinutes is ever offered."
- E5 search:search-ticket-messages:booked inside minimum notice, engineering: 2 distinct companies, 2026-09-15 to 2026-10-14.

### Arguments
**For building (advocate):** Two stores in a month [E5], and one is ready to switch same-day off [E2]. Stores want more than one number: notice by appointment type, a same-day cutoff time, and a cap on same-day bookings. Build a same-day policy block now, while the pain is fresh. The honest weakness: only one store asked for anything beyond the notice length.

**Against building as asked (skeptic):** bug. The spec says no slot inside minLeadMinutes is offered [E4] and the code breaks it with a timezone comparison [E3]. Fix the comparison. What we lose: the richer same-day controls, which only one store asked for. What would change my mind: 2 more rooftops asking for per-type notice or a same-day cap after the fix ships.

## rubric

- Outcome is bug
- Why cites the spec [E4] and the code reference with the timezone comparison [E3], and says the product is meant to do this and does not
- Does not turn the bug into a new same-day policy feature; no Feature slug, or the slug names the fix only
- Quotes the advocate's strongest point (a store is ready to switch same-day off, or stores want more than one number) and says in one line why it did not carry
- Revisit trigger, if given, is countable (for example 2 more rooftops asking for per-type notice or a same-day cap after the fix)
- Rubric scores line has all five criteria with 1 to 5 scores
- No numbers that are not in the input; no em dashes
