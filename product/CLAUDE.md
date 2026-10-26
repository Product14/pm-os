# product/

PM work. Not reviewed knowledge: durable rules live in `context/` and only get there through `queue/`.

| Path | What | Written by | Guide |
|---|---|---|---|
| `work/<area>/<folder>/` | One folder per ticket, idea or bug, owned by one PM | `/pm-os:triage`, `/pm-os:prd`, `/pm-os:prd-to-jira` | `work/CLAUDE.md` |
| `triage/<date>.md` | Queue snapshots | `/pm-os:triage` | `triage/CLAUDE.md` |
| `triage/persona-refresh-<date>.md` | Weekly persona refresh reports | `/pm-os:persona-refresh` | `triage/CLAUDE.md` |
| `prds/<area>/<feature>-prd.md` | Approved PRDs only | `/pm-os:prd` at Gate 3 | `prds/CLAUDE.md` |
| `areas/<area>/CLAUDE.md` | What the area ships today, owner, where the code lives | area owner | |
| `feature-index.yaml`, `rooftops.yaml` | Generated indexes. Never edit | `node scripts/index.mjs` | |

## Rules

- Areas are the ones in `pm-os.config.json` (plus `platform`). A new area is a config change for the PM OS owner.
- Rooftop names appear only in `case.md` frontmatter, triage snapshots and the generated `rooftops.yaml`. Dealer staff are named by role everywhere.
- Customer context is read live from Arali each run. Raw pulls go to `.cache/` (gitignored), never into these folders.
- No binaries or exports (zip, pdf, xlsx, csv, images). The structure check (S8) rejects them.
