# Contributing: how knowledge gets in

Sharing knowledge out to every PM is the easy part. Getting what each PM learns back into the shared repo is the whole game.

This repo is expected to grow. What is forbidden is growing it privately: a lesson that stays in one PM's memory folder is a lesson the next PM pays for again.

## The ladder

```
  candidate  ──►  reviewer agent  ──►  stable  ──►  deprecated
   queue/        (no human step)      context/     (veto or superseded)
```

Nobody approves entries by hand. A separate reviewer agent checks every candidate against `reviewer/RUBRIC.md`. A fixed policy in `scripts/review-context.mjs` then decides:

| Reviewer verdict | What happens |
|---|---|
| merge, low risk, source not contradicted | Merged into `context/` automatically |
| merge, medium risk, source verified | Merged automatically |
| merge, medium risk, unverified source; or high risk | Held in `queue/held/` |
| hold | Held, re-reviewed once after 14 days, then rejected if still unsure |
| reject | Removed. The reason and the fix are in `review-log/` |

Nothing waits on a person, and nothing risky merges silently.

**Humans keep a veto, after the fact.** If a merged entry is wrong, any PM runs:

```
node scripts/veto.mjs <entry-id> "<why it was wrong>"
```

The entry is deprecated and the veto goes into `reviewer/vetoes.md`. The reviewer reads the vetoes on every run as calibration.

**The reviewer is evaluated before it is trusted.** `node scripts/eval-reviewer.mjs` runs it on planted cases: good entries, plus project status, customer names, commercials written in words, duplicates, contradictions, unsourced numbers, a fake source file and a prompt injection. Every case must pass with zero false merges before a rubric change ships. Results: `evals/reviewer/last-run.md`.

## Entry kinds

| Kind | Folder | Example |
|---|---|---|
| data-trap | `context/traps/` | "Never count appointments from conversation_fact" |
| metric-definition | `context/metrics/` | How ABR is computed, with the SQL |
| system-fact | `context/facts/` | "Prompt history lives in git and Mongo AgentTypeLog, not ClickHouse" |
| decision | `context/decisions/` | What we decided, when, why, and the link to the thread or doc |

One entry, one file, one rule. If you need two rules, write two entries.

## Entry format

```markdown
---
id: data-trap--conversation-fact-undercounts-appts
kind: data-trap
area: vini-sales
status: candidate
owner: <spyne username>
source: <repo path, commit, doc link, or Slack permalink>
verified: YYYY-MM-DD
confidence: high | medium | low
---

**Rule:** One imperative line.

**Why:** The evidence. Every number says where it came from.

**Instead:** What to use.
```

The easiest way to write one is `/pm-os:capture` at the end of a session.

## Skills

Improve a skill by proposing its full new version:

```
proposals/skills/<skill>/<short-slug>/SKILL.md   the whole proposed file
proposals/skills/<skill>/<short-slug>/WHY.md     one line on what it improves
```

`scripts/review-skills.mjs` decides with no human step:

1. **Safety gate.** It holds any change that:
   - adds a send, post, reply, create, update or delete tool
   - adds an external URL or a raw network call
   - adds wording that skips approval
   - removes a guard line (approval, never, draft, PII, commercials)

   Held proposals are rejected after 14 days. Split the risky part out and propose it separately.
2. **Eval gate.** The current and proposed versions both run on every case in `evals/<skill>/cases/`. A separate judge scores them blind against each case's rubric. The proposal merges when:
   - no case drops by more than 0.5
   - **and** either the mean improves by at least 0.25, or quality ties while the file gets at least 10% shorter
   - **and**, if the file grows by more than 25%, the mean improves by at least 0.5
3. **New skills** must beat plain Claude, with no skill loaded, by at least 0.5 and score 3.5 or higher.

A skill needs at least 3 eval cases before it can change automatically. Each case is `## input` plus `## rubric` (one line per thing a good answer does).
