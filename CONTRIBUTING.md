# Contributing: how knowledge gets in

Sharing knowledge out to every PM is the easy part. Getting what each PM learns back into the shared repo is the whole game.

This repo is expected to grow. What is forbidden is growing it privately: a lesson that stays in one PM's memory folder is a lesson the next PM pays for again.

## The ladder

```
  candidate  ──►  stable  ──►  deprecated
   queue/        context/       context/ (kept, marked)
```

| Status | Where | Who changes it |
|---|---|---|
| candidate | `queue/` | Anyone. Harvested from sessions or written by hand |
| stable | `context/<kind>/` | The area owner promotes it with `scripts/promote.mjs` |
| deprecated | `context/<kind>/` | The area owner. The body names what replaced it |

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

## Flow

1. **Capture.** At the end of a session the harvest step proposes candidates into `queue/`, or you write one by hand.
2. **PR.** Open a PR with the candidate. `scripts/check.mjs` must pass.
3. **Review.** The area owner (see `OWNERS.md`) checks the source, then runs `node scripts/promote.mjs queue/<file>.md` or `--reject`.
4. **Freshness.** Entries not re-verified in 90 days are flagged by the check and listed in the quarterly audit.

## Skills

New skills start in your personal `~/.claude/skills/` under a distinct name (`my-prd-style`, never `prd`). When a skill works for you, propose it in `registry.json` as `candidate` with a rubric and at least 3 test cases. It becomes `stable` and ships in the plugin once a second PM has used it and the owner signs off.
