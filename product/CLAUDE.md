# product/

PM work artifacts. Not reviewed knowledge: durable rules live in `context/`.

| Path | What | Written by |
|---|---|---|
| `work/<area>/<fd<id>-topic or idea-topic>/` | One folder per ticket or idea: case, evidence, questions, decisions, decide, one-pager, PRD, reviews, fit check, Jira | `/pm-os:triage`, `/pm-os:prd` |
| `triage/<date>.md` | Queue snapshots, ranked | `/pm-os:triage` |
| `triage/persona-refresh-<date>.md` | Weekly persona refresh reports | `/pm-os:persona-refresh` |
| `prds/<area>/<feature>-prd.md` | Approved PRDs | `/pm-os:prd` at Gate 3 |
| `areas/<area>/CLAUDE.md` | What the area ships today, owner, where the code lives | area owner |
| `feature-index.yaml` | Area > feature > work, tickets, PRDs, Jira. Generated | `node scripts/index.mjs` |
| `rooftops.yaml` | Rooftop id map (Freshdesk company, Arali company). Generated | `node scripts/index.mjs` |

## Rules

- Work folder names describe the topic, never the rooftop.
- Rooftop names appear only in `case.md` frontmatter and the generated `rooftops.yaml`. Dealer staff are named by role everywhere.
- Customer context is read live from Arali each run. Raw pulls go to `.cache/` (gitignored) and are never committed.
- Every case passes `node scripts/case-lint.mjs` (check S7). Every THIN or EMPTY slot has an open question.
- Nothing here is edited by hand once a PRD is approved, except through `/pm-os:prd`.
