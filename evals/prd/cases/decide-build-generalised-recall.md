---
why: A shared job at 4 rooftops with a named cost and a solution-shaped literal ask; the judge must build the general building block, not the literal ask, and quote the skeptic fairly
---

## input

Today is 2026-10-15. You have no tools. Act as the judge. Write the Outcome section of decide.md for the ladder, inputs and arguments below. Outcome is one of: already-possible, bug, build-generalised, build-as-asked, defer, decline. Use these lines: Outcome, Feature slug (build outcomes only), Why (3 lines max, citing inputs), Strongest point from the losing side (a quote), Why it did not carry, Revisit trigger, Rubric scores (Job not request, Evidence weight, Five facts, Proportion, Reversibility, each 1 to 5).

Case: Freshdesk 53390, vini-service. Headings below are shifted down one level.

### Ladder
1. **Literal ask:** "Have your agent run every caller's VIN against the NHTSA recall list and book the recall work automatically." [E1]
2. **Job:** Open recalls are known when the appointment is made, so parts are ordered before the visit and the customer is not sent home and re-booked. [E1, E2, E3]
3. **Who else has this job:** 4 rooftops in 90 days, same job, different wording [E6].
4. **Smallest shared building block:** an open-recall flag on the booked appointment, read from the recall lookup the service agent already calls for status questions `service-agent-backend:src/recall/lookup.ts:57`, plus a line in the appointment note for the parts counter.
5. **What varies per store:** whether the agent mentions the recall to the caller, and who is notified (advisor or parts). Both are settings.

### As asked vs as solved
| Customer asked | We would build | Same, generalised, or different | Why |
|---|---|---|---|
| Auto-book recall work for every VIN | Flag open recalls on the appointment and note it for parts | Different | Auto-booking recall labour commits bay time before parts are confirmed [E3] |

### Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E6] | 4 rooftops |
| Dealer P&L impact | [E2, E3] | Removes a wasted visit and a re-booked RO; recall labour is warranty-paid, so the visit is not lost gross, the bay hour is |
| Strategic fit | `service-agent-backend:src/recall/lookup.ts:57`, org fact 4 | Reads data we already read; writes only our appointment note |
| Cost and risk to build | [E4] | M; risk that the lookup misses recalls released in the last few days |
| Cost of not solving | [E5] | One service manager escalated to the dealer principal after two re-booked recall ROs |
| Prior decisions | none | none |

### Evidence
- E1 freshdesk:53390#1, service manager: the literal ask above.
- E2 arali:int-84012, 2026-09-27, service manager (rooftop 2): "Recall shows up, no kit, customer took a half day off for nothing."
- E3 arali:int-84455, 2026-10-05, parts manager (rooftop 3): "Don't book recall labour until I've got the kit. Just tell me it's coming."
- E4 bluebrain:service-agent-backend:src/recall/lookup.ts:57, engineering: recall lookup by VIN exists for status questions; cache refreshes weekly.
- E5 arali:int-84901, 2026-10-09, general manager (rooftop 1): "Second time this month. I want this fixed."
- E6 search:search-transcripts:recall booked no parts, engineering: 4 distinct companies, 2026-07-16 to 2026-10-14.

### Arguments
**For building (advocate):** Four rooftops share the job [E6] and one GM has escalated [E5]. The building block is a recall flag on the appointment from a lookup we already call [E4], configurable per store. It removes a wasted customer visit and a re-booked RO [E2]. Cheapest version: flag plus note, no auto-booking. Weakness: the weekly cache can miss a new recall.

**Against building as asked (skeptic):** defer. OEMs already mail recall notices and many stores run recall campaigns through their DMS vendor; we may duplicate a program the store has. The weekly cache means some flags will be wrong [E4]. What we lose: the wasted visits continue at four stores [E2, E6]. What would change my mind: confirmation that the four stores' DMS campaigns do not flag recalls at booking.

## rubric

- Outcome is build-generalised, with a kebab-case Feature slug about recall flagging (for example recall-flag-on-appointment), not about auto-booking recall work
- Why cites the 4-rooftop demand [E6], the named cost (wasted visit, re-booked RO, bay hour) [E2, E3], and the existing lookup `service-agent-backend:src/recall/lookup.ts:57`
- Does not build the literal ask (auto-booking recall labour for every VIN)
- Quotes the skeptic's strongest point (OEM or DMS recall programs may duplicate it, or the weekly cache misses new recalls) and says in one line why it did not carry
- Names what evidence would flip it, or carries the skeptic's open question forward
- Rubric scores line has all five criteria with 1 to 5 scores
- No numbers beyond those in the input (no invented recall rates or dollar figures); no "sell more cars"; no em dashes
