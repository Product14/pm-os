# product/work/: the work-folder contract

Every ticket, idea or bug a PM works on is one folder here. The skills create and fill it; this file is the contract they follow, and `scripts/structure-lint.mjs` (check S8) enforces it on every commit and every PR.

## Name and place

`product/work/<area>/<folder>/` where `<area>` is from `pm-os.config.json` and `<folder>` is one of:
- `fd<freshdesk id>-<topic>` for a Freshdesk ticket (from `/pm-os:triage`)
- `idea-<topic>` for an idea (from `/pm-os:prd <idea>`)
- `bug-<topic>` for a bug found internally

Lowercase, hyphens, the topic not the rooftop.

## Owner

`case.md` frontmatter has `pm: <Spyne username>`. Only that PM's sessions write in the folder. If the PM in this session is someone else, say who owns it and ask before changing anything.

## The only files allowed

| File | Written by | Hand edits |
|---|---|---|
| `case.md`, `evidence.md`, `questions.md` | triage researcher; refreshed by `/pm-os:prd` | Only to add PM answers as `pm:` evidence; then run `node scripts/case-lint.mjs case <folder> --fix` |
| `decisions.md` | every gate | Yes: fixed intents, overrides, log lines (newest first) |
| `requests.md` | context requests | No |
| `run.json` | the PRD skill (stage, rounds, gates) | No |
| `decide.md` | decide step (ladder, both arguments, outcome) | No; a PM override is a `## PM decision` section |
| `solution-context.md` | solution research | No |
| `one-pager/v<n>.md`, `final.md`, `discovery.md` | drafter | Edit via `/pm-os:prd` "approve with changes" so it is logged |
| `prd/v<n>.md`, `final.md` | drafter | Same as above |
| `reviews/<onepager or prd>-r<n>-<persona>.json`, `-r<n>-resolution.md` | reviewers, drafter | No |
| `fit-check.md` | fit checker | No |
| `csm-draft.md` | decide or fit check | Yes (it is a draft for the CSM) |
| `jira.md` | Jira step (`## Proposed`, then `## Created`) | Only through `/pm-os:prd-to-jira` |
| `retest-plan.md` | bug outcome | Yes |

Anything else (extra Jira files, persona notes, exports) is flagged by S8: put the content in the matching file above instead.

## Continuing someone's run

`/pm-os:prd <folder>` resumes from `run.json` > `stage`. Start a new conversation for each folder; long sessions cost far more.

## Committing

Branch `prd/<folder>` (or `triage/<date>-<pm>`), stage only this folder plus regenerated indexes, then follow `plugin/reference/contribute.md`.
