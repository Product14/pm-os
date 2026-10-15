---
why: Dealers asking for features; each must route request with the job behind it extracted, and a job seen at two rooftops becomes a separate in item without the feature in it
---

## input

Today is 2026-10-15. You have no tools. Route every excerpt per in-or-out.md and return one line per excerpt: route, persona, pattern. For a request, the pattern is the job behind it, not the feature. Routes: in, watchlist, defect, rooftop-setup, request, vendor-figure, drop. Personas: gm, general-sales-manager, bdc-manager, service-manager, service-advisor (use "-" when none applies). Excerpts are from Arali, 2026-10-08 to 2026-10-14, all rooftops. No existing observations or watchlist lines match any of them.

Format of each excerpt: id | date | interaction | company | side | speaker role | quote

- X1 | 2026-10-08 | arali:int-73015 | Ridgeway Honda | dealer | service manager | "Can you add a quick survey text after the RO closes? Honda grades us on it and it hits our incentive check."
- X2 | 2026-10-09 | arali:int-73190 | Summit Toyota | dealer | service director | "Toyota's survey scores drive part of our quarterly money. Anything that annoys a customer before that survey lands costs me."
- X3 | 2026-10-09 | arali:int-73190 | Summit Toyota | dealer | BDC manager | "Just have the agent write the appointment straight into our DealerSocket calendar."
- X4 | 2026-10-10 | arali:int-73344 | Westfield Hyundai | dealer | BDC manager | "Every appointment your system books, one of my coordinators retypes into VinSolutions. If it's not in Vin, it didn't happen as far as my managers go."
- X5 | 2026-10-11 | arali:int-73502 | Ridgeway Honda | dealer | BDC manager | "Put a button in your console so I can block off a slot when the shop is slammed."
- X6 | 2026-10-12 | arali:int-73650 | Ridgeway Honda | dealer | service advisor | "Can the agent text the customer a video of the worn brakes when we recommend work? I'd get approvals faster."
- X7 | 2026-10-13 | arali:int-73190 | Summit Toyota | spyne | CSM | "We could build them a survey feature. I'll log it."

## rubric

- Returns exactly one line per excerpt, X1 to X7
- X1 "add a survey" -> request (service-manager); pattern is the job: OEM CSI scores tie to the store's incentive money, not "wants a survey"
- X2 -> in (service-manager), pattern OEM CSI tied to incentive money, with X1's job as the second rooftop
- X3 calendar write -> request (bdc-manager); job: the appointment lands in their CRM with no re-keying
- X4 -> in (bdc-manager), pattern: an outcome not in the CRM did not happen; X3's job counts as the second rooftop
- X5 console button -> request; job: protect shop capacity when the drive is overloaded
- X6 brake video -> request (service-advisor); job: faster customer approval on recommended work; at most watchlist as a job, one rooftop
- X7 CSM offer -> drop
- No in or watchlist pattern names a feature (survey, button, calendar write, video)
- No pattern line names a rooftop or a person
