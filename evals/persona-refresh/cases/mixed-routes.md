---
why: The worked examples re-worded, one per route; tests that each excerpt lands on the route in-or-out.md gives it
---

## input

Today is 2026-10-15. You have no tools. Route every excerpt per in-or-out.md and return one line per excerpt: route, persona, pattern. Routes: in, watchlist, defect, rooftop-setup, request, vendor-figure, drop. Personas: gm, general-sales-manager, bdc-manager, service-manager, service-advisor (use "-" when none applies). Excerpts are from Arali, 2026-10-08 to 2026-10-14, all rooftops. No existing observations or watchlist lines match any of them.

Format of each excerpt: id | date | interaction | company | side | speaker role | quote

- X1 | 2026-10-08 | arali:int-71021 | Lakeview Ford | dealer | service manager | "Every car past what my techs can turn is a free oil change I'm handing out. Overbooking is not a win for me."
- X2 | 2026-10-09 | arali:int-71388 | Pine Ridge Chevrolet | dealer | service director | "I'd rather leave a slot empty than have a customer sit in my lounge for three hours. That comes out of my pocket."
- X3 | 2026-10-09 | arali:int-71402 | Northgate Volvo Cars | dealer | service manager | "Your agent said the XC60 as 'ex see sixty thousand'. Customers think it's a robot that doesn't know cars."
- X4 | 2026-10-09 | arali:int-71402 | Northgate Volvo Cars | spyne | CSM | "Your stores on the program close about 26% of agent-booked appointments."
- X5 | 2026-10-10 | arali:int-71590 | Pine Ridge Chevrolet | dealer | service manager | "Don't let it promise a specific advisor. Rotations change every week and somebody is always off."
- X6 | 2026-10-11 | arali:int-71733 | Cedar Falls Kia | dealer | general manager | "It's doing better than I thought, honestly. I'm just not ready to hand the whole phone line to a bot."
- X7 | 2026-10-11 | arali:int-71733 | Cedar Falls Kia | dealer | BDC manager | "We'll turn it on for nights and weekends first, then see."
- X8 | 2026-10-14 | arali:int-71960 | Lakeview Ford | dealer | service advisor | "Yep. Okay. Sounds good."

## rubric

- Returns exactly one line per excerpt, X1 to X8, each with route, persona and pattern
- X1 -> in (service-manager), pattern about slot capacity: a booking past capacity is a cost
- X2 -> in (service-manager), same pattern as X1, so the pattern now has 2 rooftops
- X3 XC60 pronunciation -> defect (describes our product, not the person)
- X4 CSM close-rate figure -> vendor-figure, never in a persona
- X5 single-rooftop do-not-promise-a-named-advisor -> watchlist (service-manager)
- X6 GM adoption anxiety at one rooftop -> watchlist (gm), not in
- X7 nights-and-weekends rollout -> rooftop-setup
- X8 agreement noise -> drop
- No pattern line names a rooftop or a person, and no pattern describes a feature
