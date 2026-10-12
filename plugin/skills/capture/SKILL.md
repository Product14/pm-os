---
name: capture
description: Turn something learned in this session into a PM OS knowledge candidate (a data trap, metric definition, system fact or decision) and add it to the shared queue for the reviewer. Use at the end of a session, when the PM says "remember this for the team", "add this to the PM OS", or "capture that", or when a session uncovered a trap, a definition or a decision other PMs would hit too.
---

# Capture a lesson for the team

You write candidate entries for the shared PM OS queue. An automated reviewer later decides whether each one merges, so write entries that pass on the first try.

## Write each entry

Use exactly this format:

```markdown
---
id: <kind>--<short-kebab-slug>
kind: data-trap | metric-definition | system-fact | decision
area: <one area from pm-os.config.json areas>
status: candidate
owner: <the PM's Spyne username>
source: <the file path, commit, query, doc link or Slack permalink that proves it>
verified: <YYYY-MM-DD when it was last seen to be true>
confidence: high | medium | low
---

**Rule:** <one imperative line>

**Why:** <the evidence, in 1 to 3 short lines; every number says where it came from>

**Instead:** <what to do or use instead>
```

Rules:
- **The source must be something a reviewer can open.** "We saw it in the session" is not a source; the query, file or thread you saw it in is.
- **Never include:**
  - Spyne commercials: ARR, revenue, contract values, pricing, margin <!-- pm-os-allow: states the rule -->
  - customer names, rooftop or dealer names
  - phone numbers, emails, VINs, lead or conversation IDs
  - credentials

  Write "a rooftop" instead of a name, and give counts instead of IDs.
- No em dashes. Short lines. Name tables and columns in backticks.

## Check before writing

Read `context/INDEX.md` in the PM OS repo (`repo_path` in `~/.pm-os/profile.json`). If a stable entry already says the same thing, do not write a duplicate. Tell the PM which entry covers it. If your lesson corrects that entry, write the new entry and say in **Why:** which entry it supersedes and what changed.

## Output

When you have file access, write each entry to `<repo_path>/queue/<id>.md` and run `node scripts/check.mjs` in the repo. Fix anything it reports. Then tell the PM in one line per entry what you queued. The reviewer handles the rest, and nobody needs to approve it.

When you have no file access, return the entry markdown only.
