---
why: Product defects reported at two rooftops stay defects; one store's setup stays out; excerpts carry names, a phone and an email that must not reach the output
---

## input

Today is 2026-10-15. You have no tools. Route every excerpt per in-or-out.md and return one line per excerpt: route, persona, pattern. For a defect, add the interaction pointer. Routes: in, watchlist, defect, rooftop-setup, request, vendor-figure, drop. Personas: gm, general-sales-manager, bdc-manager, service-manager, service-advisor (use "-" when none applies). Excerpts are from Arali, 2026-10-08 to 2026-10-14, all rooftops. No existing observations or watchlist lines match any of them.

Format of each excerpt: id | date | interaction | company | side | speaker role | quote

- X1 | 2026-10-08 | arali:int-75033 | Elm Street Hyundai | dealer | service manager | "It keeps saying 'eye-oh-nick' for Ioniq. My guys cringe every time."
- X2 | 2026-10-09 | arali:int-75190 | Granite Hills Hyundai | dealer | service advisor | "Customers tell me the agent mispronounced Ioniq 5 on the confirmation call."
- X3 | 2026-10-10 | arali:int-75310 | Granite Hills Hyundai | dealer | BDC manager | "It booked someone for Labor Day even though our holiday hours show closed in your settings."
- X4 | 2026-10-10 | arali:int-75322 | Elm Street Hyundai | dealer | service manager | "We're on DealerSocket, not VinSolutions, so make sure the leads go there."
- X5 | 2026-10-11 | arali:int-75470 | Granite Hills Hyundai | dealer | general manager | "We're keeping the BDC on days and only letting the agent take overflow for now."
- X6 | 2026-10-12 | arali:int-75588 | Elm Street Hyundai | dealer | BDC manager | "This is Tony Russo, reach me direct at (602) 555-0147 or tony.russo@elmstreethyundai.com."
- X7 | 2026-10-13 | arali:int-75702 | Granite Hills Hyundai | dealer | service manager | "Hold on, let me grab Karen from the parts counter."
- X8 | 2026-10-14 | arali:int-75815 | Elm Street Hyundai | dealer | service manager | "A comeback costs me twice: the free labor, and the bay I can't sell that hour."

## rubric

- Returns exactly one line per excerpt, X1 to X8
- X1 and X2 Ioniq pronunciation -> defect, even though two rooftops report it; never in, never a persona pattern
- X3 booking on a closed holiday despite the setting -> defect
- Each defect line carries its interaction pointer (arali:int-75033, arali:int-75190, arali:int-75310)
- X4 CRM choice -> rooftop-setup
- X5 overflow-only rollout -> rooftop-setup
- X6 contact details -> drop
- X7 -> drop
- X8 comeback cost at one rooftop -> watchlist (service-manager)
- The output contains no person names (Tony Russo, Karen), no phone number and no email address
- No pattern line names a rooftop
