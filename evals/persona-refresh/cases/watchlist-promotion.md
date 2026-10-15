---
why: Counting rooftops, not mentions; promotion from an existing watchlist line; an update to an existing observation
---

## input

Today is 2026-10-15. You have no tools. Route every excerpt per in-or-out.md and return one line per excerpt: route, persona, pattern. Where an excerpt promotes a watchlist line or matches an existing observation, say so on its line. Routes: in, watchlist, defect, rooftop-setup, request, vendor-figure, drop. Personas: gm, general-sales-manager, bdc-manager, service-manager, service-advisor (use "-" when none applies). Excerpts are from Arali, 2026-10-08 to 2026-10-14, all rooftops.

Existing observation: obs-service-manager-slot-capacity (support_rooftops 2, last_seen 2026-09-20): "Thinks in bay and slot capacity. A booking past capacity is a cost, not a win."

Current gm watchlist: `- 2026-09-22 | wants a human override before handing over more calls | rooftop C | arali:int-66012 | count 1` (rooftop C is not any company below).

Format of each excerpt: id | date | interaction | company | side | speaker role | quote

- X1 | 2026-10-08 | arali:int-74011 | Maple Grove Chevrolet | dealer | general manager | "I want to be able to grab the wheel. If a call goes sideways I need a person on it in a minute."
- X2 | 2026-10-13 | arali:int-74580 | Maple Grove Chevrolet | dealer | general manager | "Before I give it sales calls too, I want to see every conversation and be able to step in."
- X3 | 2026-10-09 | arali:int-74102 | Riverbend Ford | dealer | BDC manager | "My team lives in the CRM. If a lead isn't in there with the notes, nobody touches it."
- X4 | 2026-10-10 | arali:int-74233 | Copper Canyon Kia | dealer | BDC director | "If it's not in VinSolutions, it didn't happen. That's how my managers grade us."
- X5 | 2026-10-10 | arali:int-74240 | Riverbend Ford | dealer | service advisor | "When the agent books a waiter at 7:30 I already have six waiters. I end up writing ROs in the parking lot."
- X6 | 2026-10-12 | arali:int-74466 | Riverbend Ford | dealer | service advisor (a different advisor) | "Seven-thirty waiters are killing us. Nobody can write them up fast enough."
- X7 | 2026-10-12 | arali:int-74470 | Copper Canyon Kia | dealer | service manager | "An overbooked Saturday means I'm comping work and paying overtime. I'd rather turn the call away."
- X8 | 2026-10-14 | arali:int-74580 | Maple Grove Chevrolet | dealer | general manager | "Thanks, appreciate it."

## rubric

- Returns exactly one line per excerpt, X1 to X8
- X1 and X2 -> in (gm), keep-a-hand-on-the-wheel pattern, promoted from the watchlist because rooftop C plus Maple Grove make 2 rooftops; both mentions count as one rooftop
- X3 and X4 -> in (bdc-manager), pattern: an outcome not in the CRM did not happen; 2 distinct rooftops
- X5 and X6 -> watchlist (service-advisor): two advisors but one rooftop, so not in
- X7 -> in (service-manager), matches obs-service-manager-slot-capacity; flagged as an update to the existing observation (supersedes or same id, support now 3 rooftops), not a new observation
- X8 -> drop
- Rooftop counts are by distinct company, never by number of mentions or speakers
- No pattern line names a rooftop or a person
