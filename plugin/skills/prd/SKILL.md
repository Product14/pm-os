---
name: prd
description: Turn a triaged case file (or a new idea) into an approved one-pager and PRD. Decides first whether the problem deserves solving and in what form, then drafts, runs automated review rounds with dealer, engineering and CEO personas grounded in real customer conversations, checks the result against what the customer actually asked, and files a Jira issue only after the PM approves. Use when the PM says "write the PRD for this ticket", "/pm-os:prd <folder>", "spec this out", or "one-pager for this idea".
---

# Case to reviewed PRD

You orchestrate. Subagents draft, review, research and judge, each in a fresh context, and everything they produce is a file in the work folder. The main conversation holds only `run.json`, file paths and summaries of at most 6 lines. That is what keeps quality high across a long run.

## Rules

- **Evidence or a question.** Every claim in the Problem, Evidence, Requirements and Acceptance sections carries an E-id, a `repo:path:line` reference, `[PM]` or `[ASSUMPTION: ...]`. `scripts/case-lint.mjs doc` enforces it. Every assumption becomes an open question.
- **Fixed intents are locked.** Anything in `decisions.md` > Fixed intents cannot be traded away by a reviewer. An issue that would change one is escalated to the PM, never applied.
- **Only the PM approves.** Three gates (one-pager, PRD, Jira) plus one extra gate when the decision is not to build. Ask every gate question with AskUserQuestion, open questions first.
- **One external write, and only on "create".** `createJiraIssue` runs only after the PM picks "create" at the Jira step. Nothing else in this skill writes outside the repo. Messages to CSMs or dealers are drafts in files, never sent.
- **Justify in days removed and cost removed, never "sell more cars".** Dealer statistics are attributed (NADA, Cox, etc.) or left out. Spyne commercials never appear.
- No PII in any file. People are named by role.

## Setup

1. Read `repo_path` from `~/.pm-os/profile.json`. No profile: tell the PM to run `/pm-os:setup` and stop.
2. Resolve the work folder:
   - A path was given: use it.
   - A Freshdesk id was given: find `product/work/*/fd<id>-*`. None: tell the PM to run `/pm-os:triage` first.
   - An idea was given: create `product/work/<area>/idea-<slug>/` with an empty case from `../triage/reference/case-template.md` (ask the PM for the area). The sufficiency step fills it.
3. Create or load `run.json` in the folder: `{ "stage", "started", "rubrics": {...versions}, "lessons_loaded": [], "observations_loaded": {}, "rounds": {}, "requests": 0, "gates": [] }`. If a run is in progress, resume from its `stage`.
4. Load lessons: from `context/INDEX.md`, take the lesson lines whose target is `prd-drafting`, `decide` or `fit-check` and whose area matches, newest first, at most 15 per target. Record their paths in `run.json`. Pass the file paths to subagents, not the text.

## Stages

Each stage writes its files, updates `run.json` > `stage`, and commits. Read `reference/` files only when you hand them to a subagent.

### 1. Freshness and sufficiency
- If `fetched_*` in `case.md` is more than 7 days old, or `get_ticket` shows a newer `updated_at`, send one researcher subagent (with `../triage/reference/researcher.md`) to refresh only the stale slots. Then re-lint.
- Run `node scripts/case-lint.mjs case <folder>`. For each THIN slot, send one targeted research subagent with just that slot's bar and the open question. At most 2 rounds. What is still thin stays a question.
- **Hard stop.** If `ask` or `how_it_works_today` is EMPTY, go to "Discovery one-pager" below. No PRD.

### 2. Decide
Follow `reference/decide.md`. It writes `decide.md` with the job ladder, the six scored inputs, the advocate and skeptic arguments and the judge's outcome.
- **Build (generalised or as asked):** continue to stage 3.
- **Already possible, bug, defer or decline:** stop and show the PM the outcome with AskUserQuestion (accept, choose another outcome, or reopen as build). On accept, write the ledger candidate and the CSM draft as `decide.md` says, run the retro, and finish. A bug goes to the Jira step with issue type Bug.

### 3. Solution research
One subagent with `reference/solution-researcher.md`, the chosen direction from `decide.md` and the case. It writes `solution-context.md` (about 800 words, every claim cited).

### 4. One-pager
1. Drafter subagent with `reference/drafter.md`, `reference/one-pager-template.md`, and paths to `case.md`, `evidence.md`, `decide.md`, `solution-context.md`, `decisions.md` and the lesson files. It writes `one-pager/v1.md`.
2. Run `node scripts/case-lint.mjs doc one-pager/v1.md --fix`, then without `--fix`. Untagged lines go back to the drafter once.
3. Review loop with `reference/review-protocol.md` and `reference/rubric-onepager.md`, at most 3 rounds.
4. Copy the last version to `one-pager/final.md`.

### 5. Gate 2 (one-pager)
AskUserQuestion. Show, in this order: open questions and assumption count; the decision (outcome and the losing side's best point); the one-pager's TL;DR and recommendation; unresolved reviewer issues. Options: approve, approve with changes (the PM says what; a drafter applies it; no new review round unless the PM asks), redirect (back to stage 2 or 4 with the PM's note), park.
- The PM can add fixed intents here. Write them to `decisions.md`.
- When the PM overrules a persona's issue, log the persona, the issue id and the PM's reason in `decisions.md` > Overrides. The retro turns these into calibration lessons.

### 6. PRD
1. Drafter subagent with `reference/drafter.md`, `reference/prd-template.md`, the approved `one-pager/final.md`, and the same case files. It writes `prd/v1.md`.
2. Doc lint as in stage 4.
3. Review loop with `reference/rubric-prd.md`, at most 3 rounds. Copy the last version to `prd/final.md`.

### 7. Fit check
One subagent with `reference/fit-checker.md`. Give it only: the ticket's dealer-side evidence blocks, the `As asked vs as solved` table from `decide.md`, and `prd/final.md`. It must not see the drafts, reviews or decisions. It writes `fit-check.md`. On any `not covered` ask: one drafter revision, then re-run the fit check. If it still fails, carry it to Gate 3.

### 8. Gate 3 (PRD)
AskUserQuestion. Show: open questions; the fit-check verdict and any gaps; unresolved reviewer issues; the PRD's scope and acceptance criteria headings. Options: approve, approve with changes, send back (with the PM's note), park.
Then ask for a 1 to 5 rating and one line of feedback (free text through the "Other" option). On approval:
- copy `prd/final.md` to `product/prds/<area>/<feature>-prd.md`
- set `stage: approved`, `feature`, `outcome` and `prd` in `case.md` frontmatter
- run `node scripts/index.mjs`

### 9. Jira (the PM approves)
Follow `reference/jira.md`. Nothing is created unless the PM picks "create".

### 10. Retro
Follow `reference/retro.md`. It writes lesson candidates, persona-calibration candidates and the ledger entry to `queue/`, and appends the run record to `.cache/runs.jsonl`.

## Context requests (any stage)

Drafters and reviewers never fetch data themselves. When one needs something specific, it writes a block to `requests.md`:

```
### R1
- question: <exact question>
- blocks: <section or decision>
- why: <one line>
- source: arali | bluebrain | freshdesk | clickhouse | jira | context
```

You send one research subagent per open request with only that block. It searches `.cache/` first, then the live source. It appends the answer to `evidence.md` as a new E-id and marks the request `answered (E<n>)`. Then you resume the drafter or reviewer. At most 5 requests per stage and 2 rounds. An unanswerable request becomes a question with `slot: request`. For ClickHouse, the research subagent must read the matching `context/metrics` and `context/traps` entries before writing any query.

## Discovery one-pager

When the case is too thin (stage 1 hard stop) or the PM asks for discovery only: the drafter writes `one-pager/discovery.md` from `reference/one-pager-template.md` with the Recommendation set to "Answer these questions before we decide", listing every open question with who and how. One review round with the GM persona and the CEO only, to sharpen the questions. Then show it to the PM and stop.

## Files in the work folder

```
case.md evidence.md questions.md decisions.md requests.md run.json
decide.md solution-context.md
one-pager/v1.md .. final.md
prd/v1.md .. final.md
reviews/<onepager|prd>-r<n>-<persona>.json
reviews/<onepager|prd>-r<n>-resolution.md
fit-check.md csm-draft.md jira.md
```

## Committing

After each stage, commit the work folder on a branch `prd/<folder-name>` with a message naming the stage. Publish through `../../reference/contribute.md` only at the end of the run, after the retro. Never push without the PM agreeing.
