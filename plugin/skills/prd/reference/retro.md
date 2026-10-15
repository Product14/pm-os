# Retro: turn this run into learning

Runs at the end of every PRD run, including runs that stopped at the decide gate or at discovery. One subagent, fresh context. It reads `decisions.md` (gate answers, overrides, fixed intents), `run.json`, the Gate 3 rating and feedback, the fit-check verdict, and the resolution logs. It writes candidates to `queue/` only. The reviewer decides what merges.

## 1. Lessons (`kind: lesson`)

A lesson is a rule a future run should follow, learned from what the PM changed or said. Write one only when the PM's feedback or override would apply to a different ticket. Not "this PRD needed X", but "PRDs for <situation> need X".

Targets: `prd-drafting`, `decide`, `fit-check`, `triage`, `reviewer-<role>`.

```markdown
---
id: lesson--<target>--<slug>
kind: lesson
target: <target>
area: <area>
status: candidate
owner: <PM username>
source: product/work/<area>/<folder>/decisions.md
verified: <today>
confidence: medium
---

**Rule:** <one imperative line a drafter or reviewer can follow>

**Why:** <what happened in this run, in one or two lines: the gate, what the PM changed, and why>

**Instead:** <what to do differently>
```

Examples of good lessons:
- target `decide`: "Treat requests to change how the agent pronounces model names as a configuration or bug outcome, never a PRD."
- target `reviewer-service-manager`: "Do not block on loaner availability for flows that never offer a loaner." (from a PM override)
- target `prd-drafting`: "For any booking change, write an acceptance criterion for the appointment landing in the store's scheduler with the concern text intact."

Not lessons: anything specific to one rooftop, project status, praise, or a rule that just restates the rubric.

## 2. Calibration from overrides

Every entry in `decisions.md` > Overrides is a candidate lesson with target `reviewer-<role>`, unless the PM's reason is specific to this one ticket. Say in **Why:** what the persona raised and why the PM overruled it.

## 3. Persona observations from this case

If `evidence.md` has dealer-side quotes with a known role that pass the in-or-out test in `../../persona-refresh/reference/in-or-out.md`, add them to that persona's `watchlist.md` as one line each (role, pattern, E-pointer to this work folder, date). Do not write observations here. `/pm-os:persona-refresh` promotes watchlist items once a second rooftop says the same thing.

## 4. Ledger entry

If `decide.md` produced a ledger candidate and it is not yet in `queue/`, write it now (format in `decide.md`).

## 5. Run record

Append one JSON line to `.cache/runs.jsonl` in the repo:

```json
{"date":"","folder":"","area":"","outcome":"","rounds":{"onepager":0,"prd":0},"issues":{"raised":0,"accepted":0,"rejected":0,"escalated":0,"discarded":0},"overrides":0,"open_questions":0,"assumptions":0,"fit":"","rating":null,"lessons_loaded":0,"observations_loaded":0,"lessons_proposed":0}
```

Also write the same object into `run.json` > `record`, so it is committed with the work folder (`.cache` is local only).

## 6. Publish

Commit the queue files with the work folder, and publish through `../../../reference/contribute.md`. Tell the PM in one line per candidate what was proposed. The reviewer handles the rest; `/pm-os:status` shows the verdicts.
