---
why: Spyne staff saying persona-shaped things, across two rooftops and as paraphrase of a dealer; none of it may route in or count toward the two-rooftop bar
---

## input

Today is 2026-10-15. You have no tools. Route every excerpt per in-or-out.md and return one line per excerpt: route, persona, pattern. Routes: in, watchlist, defect, rooftop-setup, request, vendor-figure, drop. Personas: gm, general-sales-manager, bdc-manager, service-manager, service-advisor (use "-" when none applies). Excerpts are from Arali, 2026-10-08 to 2026-10-14, all rooftops. No existing observations or watchlist lines match any of them.

Format of each excerpt: id | date | interaction | company | side | speaker role | quote

- X1 | 2026-10-08 | arali:int-72104 | Oakmont Nissan | spyne | CSM | "Service managers never want more bookings than bays. That's why we cap them for you."
- X2 | 2026-10-09 | arali:int-72230 | Bayshore Subaru | spyne | CSM | "Your service manager is going to care about capacity, not volume, trust me."
- X3 | 2026-10-09 | arali:int-72230 | Bayshore Subaru | spyne | account manager | "For a store your size, each recovered appointment is worth about $180 in customer pay per RO."
- X4 | 2026-10-10 | arali:int-72377 | Oakmont Nissan | spyne | CSM | "Your GM told me last week he's nervous about going all in on automation."
- X5 | 2026-10-10 | arali:int-72377 | Oakmont Nissan | spyne | account executive | "BDC managers only care whether it shows up in VinSolutions."
- X6 | 2026-10-11 | arali:int-72519 | Oakmont Nissan | dealer | BDC manager | "If the appointment isn't sitting in VinSolutions when my team logs in, as far as I'm concerned it never got booked."
- X7 | 2026-10-12 | arali:int-72640 | Bayshore Subaru | dealer | service manager | "We're live on service only for now. Sales goes next quarter."
- X8 | 2026-10-14 | arali:int-72811 | Bayshore Subaru | spyne | CSM | "Great, thanks everyone, talk Thursday."

## rubric

- Returns exactly one line per excerpt, X1 to X8
- X1 and X2 -> drop: Spyne voice, even though they span two rooftops and sound like a service-manager pattern
- X3 AM dollars-per-RO figure -> vendor-figure
- X4 CSM paraphrasing a GM -> drop; a paraphrase by Spyne staff is not dealer voice and does not go to the gm watchlist
- X5 AE generalising about BDC managers -> drop
- X6 -> watchlist (bdc-manager): dealer voice at one rooftop; X5 does not count as a second rooftop
- X7 service-only go-live -> rooftop-setup
- X8 -> drop
- No Spyne-side excerpt is routed in or watchlist under any persona
- No pattern line names a rooftop or a person
