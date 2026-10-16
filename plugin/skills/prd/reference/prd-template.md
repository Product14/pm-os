# PRD template

Adapted from the team's concise PRD template. Budget about 3,000 words. Headings exactly as below. Write for a human skimming: short sentences, one idea per bullet, tables only for short cells (under ~20 words each). Sections whose names contain Problem, Evidence, Requirements or Acceptance are lint-checked: every line tagged.

```markdown
# PRD: <feature name>

| Author | <PM> |
|---|---|
| Last updated | <YYYY-MM-DD> |
| Status | Draft v<n> / In review / Approved |
| Area | <area> |
| Source | Freshdesk <id>, work folder <path> |
| One-pager | <path to one-pager/final.md> |
| Decision | <outcome> (decide.md) |

## 1. Problem
<Who feels it, what happens today, what it costs, in days or cost. Tagged lines.>

**Who this is for:** <dealer roles> [E..]
**Flywheel stage:** <stage> · **Removes:** <days or cost, named> [E..] or [ASSUMPTION: ...]

## 2. Evidence
- <the customer's own words> [E..]
- <30-day context that connects> [E..]
- <how many rooftops share the job> [E..]
- <how it works today> `repo:path:line`

## 3. Goals and metrics
| Goal | Metric | Where it is measured | Baseline | Target |
|---|---|---|---|---|
| <goal> | <metric> | <table.column or event from solution-context.md> | <from ClickHouse via a context request, or "unknown"> | <target, or "set after baseline"> |
Metric definitions must match `context/metrics` entries where one exists. Check `context/traps` before naming a source.

## 4. Scope
**In scope**
- <shared capability items>
**Per-rooftop configuration**
- <setting>: <values>, <default>
**Out of scope**
- <item>: <why; deferred items link the ledger entry>

## 5. How it works today and after
| Step | Today | After | Ref |
|---|---|---|---|
| <step in the dealer's flow> | <current behaviour> | <new behaviour> | `repo:path:line` |

## 6. Requirements
One block per requirement. No table: requirement text never sits in a table cell.

### R1. <short plain title> (P0) [E..] / `ref` / [PM]
- <one idea per bullet, under ~25 words>
- <sub-cases as nested bullets>
  - Sales: <...>
  - Service: <...>
- Never: <what must not trigger or happen>
- Depends on: <R# or system, at the end>

## 7. Acceptance criteria
Grouped by requirement. One criterion per bullet.

### For R1
- A1. Given <state>, when <event>, then <observable result>. [E..]
- A2. Stop condition: given ..., when ..., then ...
- A3. Negative case: ...
- A4. Fallback: ...
Include, for each P0 requirement: the happy path, the stop condition, the negative case, and the fallback when an integration or data source is unavailable.

## 8. Edge cases
| Scenario | Handling |
|---|---|

## 9. Integrations and dependencies
| System | What we read or write | Available today? | Ref |
|---|---|---|---|
A write to the DMS or CRM that we do not have today is a dependency with an owner, not a requirement.

## 10. Rollout
<Pilot rooftops (by count and type, no names), flag or config, how we watch it, how we roll back.>

## 11. Open questions
| # | Question | Who answers | Blocks |
|---|---|---|---|

## 12. Jira story
**Summary:** <one line, under 100 characters>
**Description:** <3 to 5 lines: problem, what changes, link to this PRD>
**Acceptance criteria:** <A1..An as a checklist>
**Labels:** pm-os, <area>, <feature>

---
Version history: v<n> <date> <one line>
```
