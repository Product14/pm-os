---
name: triage
description: Triage the Freshdesk "waiting on product" queue for Vini Sales and Vini Service. For every ticket, find the rooftop, pull the last 30 days of customer context from Arali, read how the product works today from the code graph, and write one evidence-backed case file per ticket that /pm-os:prd can turn into a PRD. Use when the PM says "triage the queue", "what's waiting on product", "run triage", or wants case files for pending product tickets.
---

# Triage the "waiting on product" queue

You produce one **case file** per ticket. The case file is the only thing the PRD skill reads, so it has to be right, short and honest about what is unknown. You orchestrate; subagents do the reading. Keep raw data out of this conversation.

## Rules

- **Read-only.** Never write to Freshdesk, Arali, Jira or Slack in this skill. No notes, no replies, no status changes.
- **The main thread holds only file paths and summaries of at most 6 lines.** Never paste a ticket thread, transcript or code trace into the main conversation.
- **Evidence or a question, never a guess.** Every claim in a case cites an evidence id (E1, E2, ...). Anything you cannot evidence becomes an open question. `scripts/case-lint.mjs` decides what is supported; you do not.
- **No PII in the repo.** Dealer staff are named by role ("the service manager"). No customer names, phones, emails or VINs in any file. Rooftop names appear only in `case.md` frontmatter.
- **Spyne staff are not the customer.** Quotes from Spyne CSMs, AMs or AEs are evidence with `side: spyne` and never count as the customer's voice.
- Numbers from Spyne staff (close rates, dollars per RO) are vendor figures. If one is used, attribute it as such.

## Setup

1. Read `repo_path` from `~/.pm-os/profile.json`. No profile: tell the PM to run `/pm-os:setup` and stop.
2. Read `pm-os.config.json` > `freshdesk.queue` in the repo. If it is missing or `status_id` is `null`, run the discovery in "Queue discovery" below first.
3. Read `context/INDEX.md` (decisions and traps sections only) and `product/feature-index.yaml`. You will pass the relevant lines to the researchers.

## Queue discovery (first run, or when the config is missing)

1. Call `mcp__plugin_pm-os_freshdesk__list_ticket_fields`.
2. Find the status whose agent label matches `freshdesk.queue.status_label` (default "Waiting on Product"), and the field that separates Vini Sales from Vini Service (a custom dropdown, group or tag). Show the PM what you found and confirm with AskUserQuestion.
3. Write `status_id`, `area_field` and `area_values` into `pm-os.config.json` > `freshdesk.queue`. This is a config change: commit it on its own.

## Steps

1. **Fetch the queue.** Call `mcp__plugin_pm-os_freshdesk__search_tickets` with `status:<status_id>` plus the area filter. Page until all results are in (at most 10 pages). Map each ticket to `vini-sales` or `vini-service`.
2. **Skip what is current.** For each ticket, look for `product/work/<area>/fd<id>-*/case.md`. Skip it when its `ticket_updated_at` equals the ticket's `updated_at`. Say how many you skipped.
3. **Research, one subagent per ticket, at most 4 at a time.** Use the Agent tool (general-purpose). Give each subagent:
   - the ticket id, area and the work folder path it must write to: `product/work/<area>/fd<id>-<topic-slug>/`. The slug describes the topic, never the rooftop.
   - the full text of `reference/researcher.md` from this skill folder, and the path to `reference/case-template.md`
   - the matching decision and trap lines from the index, and the feature-index lines for that area
   - the instruction to return only the 6-line summary defined in `researcher.md`
4. **Lint every case.** For each folder run `node scripts/case-lint.mjs case <folder> --fix`, then run it again without `--fix`. It must exit 0. If it does not, send the same subagent the problems once. If it still fails, mark the case `stage: blocked` in its frontmatter and keep going.
5. **Index.** Run `node scripts/index.mjs`.
6. **Write the snapshot** `product/triage/<YYYY-MM-DD>.md`:
   - a table ranked by: ledger revisit flag first, then severity, rooftops affected, ticket age, and the number of supported slots
   - columns: ticket, area, rooftop, one-line ask, supported slots out of 8, open questions, ledger match, link to the case
   - a short list of cases that are too thin to write a PRD from, with their top question
7. **Gate 1: the PM confirms each case.** One AskUserQuestion per case, open questions shown first, then the ask and job in two lines. Options:
   - **Confirm**: the problem statement is right. Record it in `decisions.md` as a fixed intent if the PM adds one.
   - **Correct**: the PM's correction becomes evidence with `source: pm:<date>` and `side: pm`. Update the slot, then re-lint.
   - **Answer questions**: each answer becomes `pm` evidence. Mark the question `status: answered (E<n>)`.
   - **Park**: set `stage: parked` and a one-line reason in `decisions.md`.
   Append every answer to `decisions.md` with the date.
8. **Commit** the work folders, the snapshot and the indexes. Follow `../../reference/contribute.md` with branch `triage/<date>`. Work files live in `product/`, which the intake check accepts.
9. **Close.** Tell the PM: how many tickets, how many confirmed, how many parked, how many too thin, and which ones are ready for `/pm-os:prd <folder>`. Name the strongest candidate first.

## When the ledger already has an answer

If a researcher reports a `ledger_match`, the case is pre-filled with the prior outcome. At Gate 1, show the prior decision and its revisit trigger. If the trigger is met, say so plainly: "This was deferred on <date> until <trigger>. That is now met (<count> rooftops)." The PM decides whether to reopen it.

## Output files (per ticket)

```
product/work/<area>/fd<id>-<topic-slug>/
  case.md        the contract (reference/case-template.md)
  evidence.md    E1..En
  questions.md   Q1..Qn, every THIN or EMPTY slot covered
  decisions.md   Gate 1 answers, fixed intents
```

Raw pulls go to `.cache/<area>/fd<id>/` in the repo. That folder is gitignored and never committed.
