# One-pager template

Budget about 600 words. Headings exactly as below. The decision comes first because the panel reviews it too.

```markdown
# <Problem in dealer language>

**Author:** <PM> · **Date:** <YYYY-MM-DD> · **Status:** Draft v<n> · **Ticket:** Freshdesk <id> · **Area:** <area>
**Flywheel stage:** <where in the dealer's flow this sits: lead, appointment, show, sale, F&I, service drive, RO, retention>

## Decision
<Outcome from decide.md in one line, and why in one more> [E..] [PM]
<If generalised: "Asked for X at one rooftop; building Y for every rooftop with this job.">

## TL;DR
<2 to 3 sentences: problem, what we will do, what it removes (days or cost).>

## Problem
<Who feels it (role), what happens today, what it costs them. Every line tagged.>

## Evidence
- <dealer quote or fact> [E..]
- <how the product behaves today> `repo:path:line`
- <how many rooftops have this job> [E..]

## Recommendation
<What we build, as a shared capability. What is configurable per rooftop. What we deliberately do not build, and why.>

## What it removes
| Measure | Today | After | Source |
|---|---|---|---|
| <days, minutes per RO, re-keyed entries, missed transfers...> | <cited or "unknown"> | <expected> | [E..] or [ASSUMPTION: ...] |

## Risks and dependencies
- <DMS or CRM dependency, adoption risk, edge case> [E..] or `ref`

## Open questions
| # | Question | Who answers | Blocks |
|---|---|---|---|
<Empty only when every case slot is SUPPORTED and there are no assumptions.>
```

A **discovery one-pager** uses the same headings. Its Decision is "Not decided: evidence too thin", its Recommendation is "Answer these questions before we decide", and its Open questions table is the main content.
