---
name: status
description: Show what happened to the PM's own PM OS contributions (merged, held, sent for repair, rejected, vetoed) and what the shared context looks like now. Use when the PM asks "did my entry get in", "what happened to what I captured", "PM OS status", "what's new in the PM OS", or wants to see the reviewer's verdicts.
---

# PM OS status

Read-only. Never change files in this skill.

1. Read `~/.pm-os/profile.json` for `repo_path` and the PM's username. In the repo, run `git pull --ff-only` quietly so the answer is current.
2. Find the PM's contributions:
   - **merged:** `context/**/*.md` whose `author` (or `owner`, if there is no author) is the PM
   - **held:** `queue/held/*.md` owned by the PM, with `hold_reason`
   - **waiting for repair:** `queue/repair/*.md` owned by the PM
   - **still waiting for review:** `queue/*.md` owned by the PM
   - **rejected or vetoed:** rows in `review-log/*.md` from the last 30 days that name the PM's entry ids
3. Show one short table per state that has rows: entry, the Rule line (short), and what happens next. For anything held or rejected, give the reviewer's fix hint in plain words, and offer `/pm-os:capture` to resubmit a fixed version.
4. Then one line on the whole OS: how many stable entries by kind (from `context/INDEX.md`), and how many merged this week (from `review-log/`).
