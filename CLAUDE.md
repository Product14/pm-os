# PM OS repo

This is the Spyne product team's shared Claude Code operating system. Read `README.md` for what it is.

## When working in this repo

- Run `node scripts/check.mjs` before saying any change is done. It must exit 0.
- After adding, editing or promoting anything in `context/`, run `node scripts/index.mjs`.
- Context entries follow `CONTRIBUTING.md` exactly: one rule per file, a source, an owner, a verified date.
- Never write Spyne commercials (ARR, revenue, contract values, pricing), customer PII, or credentials anywhere in this repo. The check blocks most of it; do not rely on that. <!-- pm-os-allow: states the rule -->
- Goals sheets are read live through Google Sheets. Never copy sheet contents into this repo.
- Mechanical work goes in `scripts/` as plain Node with no dependencies. Judgment goes in skills.
- Skills live in `plugin/skills/<name>/SKILL.md` and must be listed in `registry.json`.
- Never push to `main` and never force-push. Changes reach `main` only as a pull request from a branch, through `plugin/reference/contribute.md`, after the PM running the session agrees.
- Stage files by path (the work folder, the queue file), never `git add -A` or `git add .`.
- PM work goes only in `product/work/<area>/<folder>/`, `product/triage/` or `product/prds/<area>/`. Shared knowledge goes only through `queue/` (`/pm-os:capture`). Raw pulls go to `.cache/` (gitignored). Nothing else in the repo changes without the PM OS owner.

## Where things are

| Looking for | Read |
|---|---|
| Shared rules, traps, metrics, facts, decisions, lessons, persona observations | `context/INDEX.md` |
| Dealer personas used by PRD reviews | `context/personas/<role>/core.md` |
| Ticket and PRD work, triage snapshots, approved PRDs | `product/CLAUDE.md` |
| Which features have PRDs, tickets, Jira | `product/feature-index.yaml` (generated) |
| How knowledge gets in | `CONTRIBUTING.md` |
