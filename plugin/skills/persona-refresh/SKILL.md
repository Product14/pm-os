---
name: persona-refresh
description: Weekly refresh of the PM OS dealer personas from real customer conversations in Arali. Samples the last 7 days of calls, meetings, threads and tickets across all rooftops, routes every signal (persona observation, watchlist, defect, rooftop setup, request, vendor figure, drop), and proposes new or updated persona observations for the reviewer. Runs on a weekly schedule; also use when the PM says "refresh the personas" or "update personas from Arali".
---

# Refresh the personas from real customers

Personas review every one-pager and PRD. They stay useful only if they track what real dealers say now. You read last week's customer conversations, keep what predicts how a dealer role reacts, and route everything else to where it belongs.

## Rules

- **Read-only outside the repo.** You read Arali. You write only to `queue/`, the persona `watchlist.md` files and `product/triage/`.
- **The test lives in `reference/in-or-out.md`.** Read it fully before extracting. Use its worked examples as your guide.
- **No PII.** Roles, not names. Rooftops as A, B, C in observations. Quotes under 25 words.
- **Sample the whole base,** not only rooftops with open tickets. Otherwise personas drift toward the complaining minority.
- Keep raw pulls in `.cache/persona-refresh/<date>/`. Never commit them.

## Steps

1. **Setup.** Read `repo_path` from `~/.pm-os/profile.json` (for a scheduled run, use the repo the run started in). `git pull --ff-only`.
2. **Window.** Default: the last 7 days. First run, or if the last report is more than 14 days old: 30 days. The last report is the newest `product/triage/persona-refresh-*.md`.
3. **Pull, by search not by dump.** For each persona in `gm, general-sales-manager, bdc-manager, service-manager, service-advisor`, run 3 to 5 `search-transcripts` and `search-ticket-messages` queries on that role's concerns (from its `core.md` > What they protect and How they judge a proposal), within the window, with no company filter. Add `get-interaction-timeline` with `kind: meeting`, paged, to catch recent customer meetings. At most 60 Arali calls in total.
4. **Extract, one subagent per persona (`model: sonnet`), at most 3 at a time.** Give each: its persona `core.md`, its existing observation files, its `watchlist.md`, `reference/in-or-out.md`, and the cached excerpts for its queries. Each returns a JSON list of signals:
   `{ "quote", "date", "interaction", "company", "speaker_side", "role", "route", "pattern", "predicts", "matches_existing" }`
   The subagent may read a full interaction with `get-interaction` when an excerpt is ambiguous about who is speaking, at most 5 times.
5. **Route (you, deterministic):**
   - `in` with 2 or more distinct companies: write or update an observation candidate (format in `in-or-out.md`).
   - `in` matching an existing observation: write a candidate with the same `id`, the new `support_rooftops`, `support_mentions`, `last_seen` and added evidence lines, and `supersedes: <id>`.
   - `in` or `watchlist` with 1 company: add a line to the persona's `watchlist.md`: `- <date> | <pattern> | rooftop <letter> | arali:<interaction> | count 1`. If the same pattern is already on the watchlist from a different company, promote it: write the observation candidate and remove both watchlist lines.
   - `defect`: list it in the report with the interaction pointer, for the area PM to file.
   - `rooftop-setup`, `request`, `vendor-figure`, `drop`: count them in the report only.
6. **Check.** Run `node scripts/check.mjs`. Fix any S2 (PII) hit by rewriting the quote. Never use an allow marker on customer text.
7. **Report.** Write `product/triage/persona-refresh-<YYYY-MM-DD>.md`:
   - the window and the number of interactions read
   - per persona: new observations, updated, promoted from the watchlist, watchlist added
   - counts per route
   - defects found, with pointers
   - observations not seen again for more than 90 days (they go stale and stop loading)
8. **Publish.** Commit the queue candidates, watchlists and report on a branch `persona-refresh/<date>`, and publish through `../../reference/contribute.md`. The reviewer decides what merges.

## Scheduled runs

When this runs on the weekly schedule, nobody is there to answer questions. Skip anything that would need the PM, record it in the report under "Needs a PM", and finish.
