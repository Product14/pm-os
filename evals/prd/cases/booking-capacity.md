---
why: Full vini-service case decided build-generalised; tests the one-pager puts the Decision first, tags every line, argues in cost removed and keeps per-rooftop differences as configuration
---

## input

Today is 2026-10-15. You have no tools. Act as the drafter and write one-pager v1 using the one-pager template. Author is the PM, username neha.v. The work folder files are pasted below with every heading shifted down one level (### here is ## in the file, #### is ###).

One-pager template headings, in order: title line, Author/Date/Status/Ticket/Area line, Flywheel stage line, then Decision, TL;DR, Problem, Evidence, Recommendation, What it removes (table: Measure, Today, After, Source), Risks and dependencies, Open questions (table: #, Question, Who answers, Blocks). Budget about 600 words. In Problem and Evidence every line carries [E..], a `repo:path:line` reference, [PM] or [ASSUMPTION: ...].

FILE case.md
---
id: fd51877-slot-capacity
area: vini-service
stage: triaged
freshdesk_ticket: 51877
rooftop_slug: harbor-city-hyundai
rooftop_name: Harbor City Hyundai
---
### Ask
"Stop letting the agent put 12 people in a 7:30 slot when I have 5 techs on." [E1]
### Job
Bookings respect what the drive can actually turn per slot, so the store stops paying comps, loaner days and CSI hits for overbooked waves. [E1, E2, E3]
### Customer context (30 days)
Service manager tied overbooking to comps and loaner days on a call [E2]. A service advisor described waiters stacking at the desk [E3].
### Who feels this
Service manager [E1, E2]; service advisor [E3].
### How it works today
The agent offers any slot the scheduler returns as open `service-agent-backend:src/booking/xtimeSlots.ts:88`. A per-rooftop cap exists but defaults to no cap `central-config:src/service/capacity.ts:41`. Xtime's availability response carries no capacity count [E6].
### Gap
Nothing limits how many agent bookings land in one slot unless a CSM sets the cap by hand, and no rooftop has it set [E5].
### Candidate directions
1. Set the existing cap for this rooftop now (config; removes comps this week).
2. Make the cap a supported per-rooftop setting by day and appointment type, enforced at booking (cost removed: comps, loaner days, advisor time).
### Frequency
4 rooftops raised the same job in 90 days [E7].

FILE evidence.md
#### E1
- source: freshdesk:51877#1 | date: 2026-10-09 | side: dealer | role: service-manager
- text: "Stop letting the agent put 12 people in a 7:30 slot when I have 5 techs on. I comped four oil changes Monday."
#### E2
- source: arali:int-77412 | date: 2026-09-29 | side: dealer | role: service-manager
- text: "Every car past what the shop can turn is a comp or a loaner day out of my pocket."
#### E3
- source: arali:int-78020 | date: 2026-10-03 | side: dealer | role: service-advisor
- text: "When eight waiters show at once I'm not writing ROs, I'm doing damage control."
#### E4
- source: arali:int-78020 | date: 2026-10-03 | side: spyne | role: csm
- text: "Your close rate on agent-booked appointments is 28%, which is strong."
#### E5
- source: bluebrain:central-config:src/service/capacity.ts:41 | date: 2026-10-14 | side: system | role: engineering
- text: maxAgentBookingsPerSlot is per rooftop, default null; set for 0 rooftops.
#### E6
- source: bluebrain:service-agent-backend:src/booking/xtimeSlots.ts:88 | date: 2026-10-14 | side: system | role: engineering
- text: Xtime availability returns open or closed per slot, no capacity count.
#### E7
- source: search:search-ticket-messages:overbooked slot capacity | date: 2026-10-14 | side: system | role: engineering
- text: 4 distinct companies, 2026-07-16 to 2026-10-14.

FILE questions.md
#### Q1
- slot: assumption | unknown: whether caps should differ for waiter vs drop-off appointments | who: dealer | how: ask the 4 service managers | status: open
#### Q2
- slot: request | unknown: what the agent should say when the requested slot is full | who: pm | how: review 20 booking transcripts | status: open

FILE decisions.md
Fixed intents: Never book past the configured cap; offer the next open slot instead. [PM]

FILE decide.md (Outcome section)
**Outcome:** build-generalised
**Feature slug:** service-slot-capacity
**Why:** Shared job at 4 rooftops [E7]; removes comps and loaner days the service manager pays today [E1, E2]; small build on an existing setting [E5].
**Strongest point from the losing side:** "Setting the existing cap for this rooftop solves the ticket today without a build."
**Why it did not carry:** The cap is unset everywhere and unsupported; four stores share the job, so it must be a real setting.
As asked vs as solved: asked "stop booking 12 into a 7:30 slot" at one rooftop; building a per-rooftop, per-day booking cap enforced at booking for every service rooftop.

## rubric

- The first section after the header lines is Decision, states build-generalised, and says asked X at one rooftop, building Y for every rooftop with this job (or equivalent)
- Every line in Problem and Evidence carries [E..], a `repo:path:line` reference, [PM] or [ASSUMPTION: ...]
- P&L is stated as cost or days removed for a named role (comps, loaner days, advisor time, CSI), never as more bookings or selling more cars
- Recommendation names per-rooftop configuration (cap per slot, by day or appointment type, with a default) rather than a branch for this one rooftop
- Respects the fixed intent: when a slot is full the agent offers the next open slot, never books past the cap
- Names the dependency honestly: Xtime gives no capacity count, so capacity comes from rooftop configuration [E6]
- The CSM's 28% close rate is left out or labelled a vendor figure; it is not used as justification
- What it removes uses only numbers from the evidence, and writes "unknown" or an [ASSUMPTION] where there is no baseline
- Open questions table is present, includes Q1 and Q2, and each row has who answers
- No rooftop or person names, no phone numbers, no em dashes, no "AI-powered"
- Roughly 600 words; the TL;DR and Decision alone tell a busy reader what is being built and what it removes
