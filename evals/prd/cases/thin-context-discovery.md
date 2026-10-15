---
why: The ask is supported but how the product works today is EMPTY, so the stage-1 hard stop applies; the drafter must write a discovery one-pager of questions, not a spec
---

## input

Today is 2026-10-15. You have no tools. Act as the drafter. Stage 1 found How it works today EMPTY, so the stage-1 hard stop applies: write the discovery one-pager (one-pager/discovery.md) using the one-pager template. Decide has not run. Author is the PM, username neha.v. The work folder files are pasted below with every heading shifted down one level (### here is ## in the file, #### is ###).

One-pager template headings, in order: title line, Author/Date/Status/Ticket/Area line, Flywheel stage line, then Decision, TL;DR, Problem, Evidence, Recommendation, What it removes, Risks and dependencies, Open questions (table: #, Question, Who answers, Blocks). In Problem and Evidence every line carries [E..], a `repo:path:line` reference, [PM] or [ASSUMPTION: ...].

FILE case.md
---
id: fd52502-recall-parts-on-hand
area: vini-service
stage: triaged
freshdesk_ticket: 52502
rooftop_slug: lakeshore-kia
rooftop_name: Lakeshore Kia
---
### Ask
"When someone calls about a recall, your agent books them like a regular oil change. Can it check whether we have the part before it books?" [E1]
### Job
Inferred: recall customers are booked only when the part can be on hand, so the store does not send people home and re-book them [E1, E2].
### Customer context (30 days)
None found in 30 days
### Who feels this
Service manager [E1]; parts manager [E2].
### How it works today
Not found
### Gap
Not known until how the agent books recall calls today is known.
### Candidate directions
1. Enablement: have the agent offer a callback for recall calls so an advisor checks parts first (advisor time, a wasted visit removed).
2. Flag recall appointments so parts can pre-order before the day (days removed between call and repair).
### Frequency
Unknown; no search returned a usable count [E3].

FILE evidence.md
#### E1
- source: freshdesk:52502#1 | date: 2026-10-10 | side: dealer | role: service-manager
- text: "Your agent books them like a regular oil change. Then they show, we don't have the part, and I have to send them home and book again."
#### E2
- source: freshdesk:52502#3 | date: 2026-10-11 | side: dealer | role: unknown
- text: "Parts here. Recall kits are allocated by the OEM, we rarely stock them ahead."
#### E3
- source: search:search-ticket-messages:recall booked without parts | date: 2026-10-14 | side: system | role: engineering
- text: Search timed out twice; no count.

FILE questions.md
#### Q1
- slot: context_30d | unknown: whether the rooftop raised this anywhere else recently | who: csm | how: ask the CSM and recheck Arali under the store's group name | status: open
#### Q2
- slot: how_it_works_today | unknown: how the agent classifies and books a recall call today, and whether it reads open recalls for the VIN | who: engineering | how: trace the service booking flow for a recall intent | status: open
#### Q3
- slot: how_it_works_today | unknown: whether we have any read of parts inventory from the DMS for this rooftop | who: engineering | how: check the DMS read scopes for this store | status: open
#### Q4
- slot: frequency | unknown: how many rooftops share the job | who: pm | how: rerun the frequency search with a narrower query | status: open
#### Q5
- slot: who_feels_this | unknown: the role behind E2 | who: csm | how: ask the service manager who replied | status: open

## rubric

- Writes a discovery one-pager, not a PRD and not a build one-pager
- Decision says "Not decided: evidence too thin" or the same in other words
- Recommendation is "Answer these questions before we decide", or the same in other words, and recommends nothing to build
- No requirements, acceptance criteria, scope, rollout or solution design anywhere
- The Open questions table is the main content and carries Q1 to Q5, each with who answers and what it blocks
- Does not invent how the agent handles recall calls today, and cites no code reference (none exists in the input)
- Does not claim a parts-inventory or recall read from the DMS exists; it is a question
- Quotes the customer's ask with its E-id; the E2 speaker stays role unknown or "a parts-side reply", not upgraded to a confirmed role
- Every line in Problem and Evidence is tagged
- No rooftop or person names, no invented numbers, no em dashes
