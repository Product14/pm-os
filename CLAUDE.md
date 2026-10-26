# PM OS repo

The Spyne product team's shared Claude Code operating system. Many PMs use it, each with their own Claude Code habits. These rules make the work come out the same whoever asks and however they phrase it. `README.md` and `QUICKSTART.md` say what it is and how to set it up.

## First, check the PM is set up

The session hook prints the PM's profile. If it says there is no PM OS profile, or the `/pm-os:*` skills are not available, stop and tell the PM to follow `QUICKSTART.md` (install the plugin, then `/pm-os:setup`). Do not do PM OS work by hand without the plugin.

## Route every request to its skill

Whatever words the PM uses, do the work through the matching skill so it lands in the same files with the same checks. Never write these files freehand.

| The PM wants to | Use | It writes to |
|---|---|---|
| See or work the "waiting on product" queue | `/pm-os:triage` | `product/work/<area>/fd<id>-<topic>/`, `product/triage/<date>.md` |
| Write, continue or revise a one-pager or PRD (ticket or idea) | `/pm-os:prd <folder or idea>` | that work folder; approved PRDs also to `product/prds/<area>/` |
| File or update Jira for approved work | `/pm-os:prd-to-jira <folder>` | `jira.md` in the work folder (Jira only after the PM picks "create") |
| Save a data trap, metric definition, system fact or decision for the team | `/pm-os:capture` | `queue/` (the reviewer decides what reaches `context/`) |
| Say a shared entry is wrong | `/pm-os:veto` | `queue/vetoes/` |
| Change how a PM OS skill behaves | `/pm-os:propose-skill` | `proposals/skills/` |
| Refresh the dealer personas | `/pm-os:persona-refresh` | `queue/`, persona `watchlist.md` files |
| Check what happened to their work | `/pm-os:status` | nothing (read-only) |

If a request does not fit a skill, say so and ask the PM before writing anywhere in the repo.

## Hard rules

- Never commit on `main`, never push to `main`, never force-push. Work reaches `main` only as a pull request from a branch, through `plugin/reference/contribute.md`, after the PM agrees. A repo guard hook blocks the rest.
- Stage files by path, never `git add -A` or `git add .`. Never commit `.cache/`, zips, exports or downloads.
- Run `node scripts/check.mjs` before saying any change is done. It must exit 0. Never commit with `--no-verify`.
- Each folder may have its own `CLAUDE.md`. Read it before writing there.
- Never write Spyne commercials (ARR, revenue, contract values, pricing), customer PII, or credentials anywhere in this repo. The check blocks most of it; do not rely on that. <!-- pm-os-allow: states the rule -->
- Dealer staff are named by role. Rooftop names appear only in `case.md` frontmatter and triage snapshots.
- Goals sheets are read live through Google Sheets. Never copy sheet contents into this repo.
- Generated files are never edited by hand: `context/INDEX.md`, `product/feature-index.yaml`, `product/rooftops.yaml`, `review-log/`. Regenerate with `node scripts/index.mjs`.
- Use subagent models per step as the skills say (Sonnet for research and reviews, Opus only for drafting and the decide judge, Haiku for edits), at most 3 at a time.

## Where things are

| Looking for | Read |
|---|---|
| Shared rules, traps, metrics, facts, decisions, lessons, persona observations | `context/INDEX.md` |
| Dealer personas used by PRD reviews | `context/personas/<role>/core.md` |
| Ticket and PRD work, triage snapshots, approved PRDs | `product/CLAUDE.md` |
| Which features have PRDs, tickets, Jira, and who owns each | `product/feature-index.yaml` (generated) |
| How knowledge gets in | `CONTRIBUTING.md` |
| Changing the plugin, scripts or reviewer (PM OS owner only) | `plugin/CLAUDE.md`, `scripts/CLAUDE.md`, `reviewer/CLAUDE.md` |
