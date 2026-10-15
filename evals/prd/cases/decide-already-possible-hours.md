---
why: The job is covered by an existing hours setting a CSM can change today; the judge must pick already-possible over a tempting generalised build
---

## input

Today is 2026-10-15. You have no tools. Act as the judge. Write the Outcome section of decide.md for the ladder, inputs and arguments below. Outcome is one of: already-possible, bug, build-generalised, build-as-asked, defer, decline. Use these lines: Outcome, Feature slug (build outcomes only), Why (3 lines max, citing inputs), Strongest point from the losing side (a quote), Why it did not carry, Revisit trigger, Rubric scores (Job not request, Evidence weight, Five facts, Proportion, Reversibility, each 1 to 5).

Case: Freshdesk 52811, vini-service. Headings below are shifted down one level.

### Ladder
1. **Literal ask:** "Your agent keeps telling people we close at noon on Saturday. We're open till 4 now. Fix it." [E1]
2. **Job:** Callers hear the store's real service hours, so they are not turned away from Saturday afternoon slots the drive can fill. [E1, E2]
3. **Who else has this job:** 3 rooftops in 90 days reported the agent giving wrong hours after an hours change [E5].
4. **Smallest shared building block:** the per-rooftop service hours setting the agent already reads `central-config:src/hours/standardHours.ts:30`; a CSM can change it in the console today [E4].
5. **What varies per store:** the hours themselves, including seasonal and holiday hours, which are values in the same setting.

### Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E5] | 3 rooftops, same job |
| Dealer P&L impact | [E1, E2] | Saturday afternoon capacity goes unbooked; size unknown |
| Strategic fit | org fact 4 | Hours live in our config; no DMS write involved |
| Cost and risk to build | `central-config:src/hours/standardHours.ts:30` | Setting exists. An auto-sync from the store's Google Business Profile would be M, with the risk that the profile is also wrong |
| Cost of not solving | [E3] | Service manager said "this makes us look like we don't know our own hours" |
| Prior decisions | none | none |

### Evidence
- E1 freshdesk:52811#1, service manager: the literal ask above.
- E2 arali:int-82290, 2026-10-01, service advisor: "Saturday afternoon is dead on the book and I know people are calling."
- E3 arali:int-82290, service manager: "This makes us look like we don't know our own hours."
- E4 bluebrain:central-config:src/hours/standardHours.ts:30, engineering: service hours per rooftop, editable in the console; this rooftop still shows Saturday 8:00 to 12:00.
- E5 search:search-ticket-messages:agent wrong hours, engineering: 3 distinct companies, 2026-07-16 to 2026-10-14.

### Arguments
**For building (advocate):** Three stores hit this in a quarter [E5], so it is not one store's mistake. Hours drift because the store changes them in three places and nobody tells the CSM. Build an hours sync from the store's Google Business Profile so the agent's hours cannot go stale. The honest weakness: the profile can be wrong too.

**Against building as asked (skeptic):** already-possible. The setting the agent reads exists and is editable today `central-config:src/hours/standardHours.ts:30`; this rooftop's value is simply stale [E4]. A CSM fixes it in minutes. What we lose: stores will drift again after the next change. What would change my mind: a count of rooftops whose hours were correct in our config and still read wrong.

## rubric

- Outcome is already-possible
- Why cites the existing setting `central-config:src/hours/standardHours.ts:30` and that this rooftop's value is stale [E4]
- Quotes the advocate's strongest point (hours drift because they change in several places and nobody tells the CSM, or the 3-rooftop count) and says in one line why it did not carry
- No Feature slug, or it is explicitly not applicable
- If a Revisit trigger is given, it is countable (for example a number of rooftops whose correct config still read wrong, or a number of stale-hours tickets in a quarter)
- Rubric scores line has all five criteria with 1 to 5 scores
- No numbers that are not in the input; no invented size of lost Saturday bookings
- No "sell more cars" reasoning; no em dashes
