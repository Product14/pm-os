---
name: reviewer
description: Maintainer tool. Run the PM OS reviewer pipeline or its eval on this machine, for local testing before the GitHub Action is live or to debug a verdict. Use when the PM OS owner says "run the reviewer", "review the queue", "run the reviewer eval", or "test the reviewer". Other PMs never need this; the reviewer runs on its own.
argument-hint: run | eval
---

# Run the reviewer locally

Run commands for the PM. Report results in plain words, not raw logs.

1. Read `repo_path` from `~/.pm-os/profile.json` and work in that folder.
2. **`run`** (the default): run `bash scripts/pm-os-review.sh` with the environment variable `PM_OS_SOURCE_ROOTS` set to a colon-separated list of folders the reviewer may read to verify sources. Use the PM's Claude memory folder and their workspace when they exist. It can take several minutes; run it in the background and wait for it to finish.
3. **`eval`**: run `node scripts/eval-reviewer.mjs`, then read `evals/reviewer/last-run.md`.
4. **Report:**
   - **run:** how many vetoes were applied, entries repaired, merged, held and rejected, and skill proposals merged, held and rejected, from the command output and today's `review-log/` file. Then the cost. For each hold or reject, give the reason in one line.
   - **eval:** passed out of total, false merges, cost, and any failing case with what the reviewer said.
5. Commits from the run are local. Do not push.
