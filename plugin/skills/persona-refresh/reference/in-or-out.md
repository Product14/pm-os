# In or out: what goes into a persona

A persona exists to **predict how a real person in that seat reacts to a proposal**, so a review catches what a real BDC or service manager would catch before we ship. Something goes into a persona only if it makes that prediction better.

## The test (all five must hold)

1. **About the person, not our product.** What they are measured on, what they fear, a constraint they work under, how they decide.
2. **Predicts a reaction.** It can be written as "so they will push back on, or insist on, X".
3. **Dealer voice.** Said by someone who works at the dealership. Spyne CSMs, AMs and AEs pitching or paraphrasing do not count.
4. **No solution in it.** Record the job behind a request, not the feature asked for.
5. **Two or more rooftops.** One rooftop goes to the watchlist until a second says the same thing.

## Nothing is thrown away; it is routed

| Signal | Where it goes |
|---|---|
| A defect in our product | `route: defect`: the ticket's case evidence and Jira, or `context/traps` if PMs keep tripping on it |
| One rooftop's setup (their CRM, their hours, their go-live phase) | `route: rooftop-setup`: that case's evidence; never a persona |
| A feature request phrased as a solution | `route: request`: the case's Ask slot. The job behind it may be a separate `in` item |
| Numbers said by Spyne staff (close rates, dollars per RO) | `route: vendor-figure`: nowhere in a persona |
| Passes the test at only 1 rooftop | `route: watchlist` |
| Names, phone numbers, small talk, agreement noises | `route: drop` |
| Passes all five | `route: in` |

## Worked examples

These come from real Spyne customer calls between Sep 15 and Oct 13, 2026, with people named by role. They are the few-shot guide for the extractor and for the reviewer.

**1. In (once a second rooftop says it).** Service manager, on how many appointments to book: "If I book 15, I lose money... if I overbook, I have to compensate the customer because they're waiting."
- About his P&L. Predicts he rejects anything that books past slot capacity. Dealer voice. No solution in it.
- Becomes `service-manager/slot-capacity`: "Thinks in bay and slot capacity. A booking past capacity is a cost, not a win." Review prompt: "What stops this from overbooking a slot?"

**2. In if it recurs.** Internet or BDC lead: "The appointment just pops onto our appointment scheduler... It doesn't appear [the vendor] has the capability."
- Judges an agent by whether its output lands in their own system with no double entry. Predicts rejection of anything that needs a second screen. Matches org fact 4 (the DMS and CRM stay the system of record).
- Becomes `bdc-manager/lands-in-crm`: "An outcome that is not in the CRM did not happen." Review prompt: "Where does this show up in their CRM, and who re-keys it?"

**3. Watchlist.** Service manager: do not promise a named advisor, "it might be his day off... schedules change week to week".
- Passes the test, but one rooftop so far. Stays in that ticket's case and on the watchlist.

**4. Out: defect.** Service manager: the agent read "V60" as "five sixty".
- Describes our product, not the person. However many stores report it, it is a defect: case evidence and Jira, or a trap.

**5. Out as a feature, in as the job.** Service manager: some OEMs require capturing service feedback, "how was their service experience".
- "Add a survey" is a solution (`route: request`). The job behind it, "OEM CSI scores tie to my incentive money", is a candidate `in` item if two rooftops show it.

**6. Out: Spyne voice.** A Spyne CSM: "I'm here to help you not over-inundate your service team... that's why we run them in phases."
- Said by us, not the dealer. `route: drop`.

**7. Out: vendor figure.** A Spyne CSM: "a close rate of 24%". A Spyne AM: "approximately $210" per RO.
- Our numbers, said to a customer. `route: vendor-figure`. Never in a persona.

**8. In if repeated.** GM, after hearing results: concern with "completely going AI" even though it is "working better than expected".
- Adoption anxiety. Predicts he wants a human override and visibility before handing over more work.
- Becomes `gm/keep-a-hand-on-the-wheel` once a second GM says the same.

**9. Out: rooftop setup.** Customer: "We'll be starting with after hours to begin with."
- One store's rollout choice. `route: rooftop-setup`.

**10. Drop.** "Right. Yeah. That's great." `route: drop`.

## Writing an observation

```markdown
---
id: obs-<persona>-<slug>
kind: observation
persona: <gm | general-sales-manager | bdc-manager | service-manager | service-advisor>
area: <vini-sales | vini-service>
tags: [<3 to 5 keywords>]
support_rooftops: <count of distinct rooftops>
support_mentions: <count of mentions>
last_seen: <YYYY-MM-DD>
sources: <arali:<interaction id>, arali:<interaction id>>
status: candidate
owner: <PM username>
source: <the persona-refresh report path>
verified: <today>
confidence: medium
---

**Pattern:** <how this person thinks or decides, one line>

**Predicts:** <the reaction to expect in a review>

**Ask in review:** "<the question this persona will ask>"

**Evidence:**
- <date>, <role>, rooftop A: "<short scrubbed quote>"
- <date>, <role>, rooftop B: "<short scrubbed quote>"

**Not this:** <the nearby thing it is not, e.g. "not a request for a capacity feature">
```

Rooftops appear as A, B, C. Never their names. Quotes are under 25 words and scrubbed of names.
