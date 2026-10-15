---
why: vini-sales case where the obvious build needs a CRM write Spyne does not have, and a dealer quote invites a "sell more cars" argument; tests the dependency is named and the P&L is cost removed
---

## input

Today is 2026-10-15. You have no tools. Act as the drafter and write one-pager v1 using the one-pager template. Author is the PM, username arjun.m. The work folder files are pasted below with every heading shifted down one level (### here is ## in the file, #### is ###).

One-pager template headings, in order: title line, Author/Date/Status/Ticket/Area line, Flywheel stage line, then Decision, TL;DR, Problem, Evidence, Recommendation, What it removes (table: Measure, Today, After, Source), Risks and dependencies, Open questions (table: #, Question, Who answers, Blocks). Budget about 600 words. In Problem and Evidence every line carries [E..], a `repo:path:line` reference, [PM] or [ASSUMPTION: ...].

FILE case.md
---
id: fd52240-conversation-in-crm
area: vini-sales
stage: triaged
freshdesk_ticket: 52240
rooftop_slug: valley-ford
rooftop_name: Valley Ford
---
### Ask
"Put the whole conversation into the lead in VinSolutions so my BDC stops calling people back to ask the same questions." [E1]
### Job
The BDC's first human call starts from what the customer already told the agent, with nothing re-asked and nothing re-keyed. [E1, E2]
### Customer context (30 days)
BDC manager described re-keying appointments from the lead email [E2]. General sales manager linked visibility to the floor [E3].
### Who feels this
BDC manager [E1, E2]; general sales manager [E3].
### How it works today
The agent posts an ADF lead with a free-text comments field `crm-integration:src/adf/postLead.ts:60`. The VinSolutions client creates leads only; it has no note or activity write `crm-integration:src/vinsolutions/client.ts:12`.
### Gap
What the customer said lives only in Spyne's console; the CRM gets a lead shell [E4, E5].
### Candidate directions
1. Enablement: show the BDC where the transcript link sits in the lead email today (staff time).
2. Write a structured conversation summary into the ADF comments field for every rooftop now, and as a CRM note once certified write-back exists (BDC re-ask and re-key time removed).
### Frequency
5 rooftops raised the same job in 90 days [E7].

FILE evidence.md
#### E1
- source: freshdesk:52240#1 | date: 2026-10-06 | side: dealer | role: bdc-manager
- text: "Put the whole conversation into the lead in VinSolutions so my BDC stops calling people back to ask the same questions."
#### E2
- source: arali:int-80155 | date: 2026-09-30 | side: dealer | role: bdc-manager
- text: "My coordinators re-key every appointment from your email into Vin, then call the customer and ask what they wanted."
#### E3
- source: arali:int-80611 | date: 2026-10-08 | side: dealer | role: general-sales-manager
- text: "If my guys can see what the customer said, we'll sell more cars. Simple as that."
#### E4
- source: bluebrain:crm-integration:src/adf/postLead.ts:60 | date: 2026-10-14 | side: system | role: engineering
- text: ADF post carries a comments field; today it holds the lead source and a console link only.
#### E5
- source: bluebrain:crm-integration:src/vinsolutions/client.ts:12 | date: 2026-10-14 | side: system | role: engineering
- text: VinSolutions client exposes lead create only. No note, activity or appointment write.
#### E6
- source: jira:INT-412 | date: 2026-09-22 | side: spyne | role: engineering
- text: VinSolutions note write-back: partner certification requested, no date from the provider.
#### E7
- source: search:search-ticket-messages:conversation not in CRM re-ask | date: 2026-10-14 | side: system | role: engineering
- text: 5 distinct companies, 2026-07-16 to 2026-10-14.

FILE questions.md
#### Q1
- slot: request | unknown: how long a summary the BDC will read inside the ADF comments field | who: dealer | how: show 3 BDC managers a sample lead | status: open
#### Q2
- slot: assumption | unknown: whether every CRM in the base renders ADF comments to the BDC | who: engineering | how: test post to each CRM in the base | status: open

FILE decide.md (Outcome section)
**Outcome:** build-generalised
**Feature slug:** conversation-summary-to-crm
**Why:** Shared job at 5 rooftops [E7]; removes BDC re-keying and re-asking [E2]; the ADF comments field exists for every CRM today [E4].
**Strongest point from the losing side:** "The note write the dealer actually wants does not exist and depends on the CRM provider."
**Why it did not carry:** The ADF comments field serves the job now; the note write is a named dependency, not a promise.
As asked vs as solved: asked for the whole conversation inside the VinSolutions lead; building a structured summary in the ADF comments field for every CRM now, and a CRM note only when certified write-back ships.

## rubric

- Risks and dependencies names the VinSolutions note write-back as a dependency that does not exist today (certification requested, no date) [E6], and the Recommendation does not assume it
- Recommendation builds on what exists today (the ADF comments field) and puts the CRM note behind the dependency, stated as above the CRM, not around it
- Does not justify the work by selling more cars, even though the general sales manager said it [E3]; if E3 is cited, it is as visibility, not as the business case
- P&L is BDC time removed: re-keying and re-asking on the first call, named for the BDC manager
- The first section after the header lines is Decision, states build-generalised and the as-asked vs as-solved line
- Every line in Problem and Evidence carries [E..], a `repo:path:line` reference, [PM] or [ASSUMPTION: ...]
- Per-rooftop configuration is named (for example summary on or off, length or fields), not a VinSolutions-only branch
- Open questions table includes Q1, Q2 and an owner or date for the write-back dependency, each with who answers
- No invented numbers (no minutes per lead or close rates not in the evidence); "unknown" where there is no baseline
- No rooftop or person names, no em dashes
