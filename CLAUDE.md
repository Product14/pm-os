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
- Do not push or publish without Yash's approval. Committing locally is fine.

## Where things are

| Looking for | Read |
|---|---|
| Shared rules, traps, metrics, facts, decisions, lessons, persona observations | `context/INDEX.md` |
| Dealer personas used by PRD reviews | `context/personas/<role>/core.md` |
| Ticket and PRD work, triage snapshots, approved PRDs | `product/CLAUDE.md` |
| Which features have PRDs, tickets, Jira | `product/feature-index.yaml` (generated) |
| How knowledge gets in | `CONTRIBUTING.md` |
