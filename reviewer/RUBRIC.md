---
rubric_version: 1
---

# Reviewer rubric v1

The rubric is version-locked. Change it only in its own commit, then bump `rubric_version` and re-run `node scripts/eval-reviewer.mjs`. Every eval case must pass before the new version reviews anything.

## Context entries

A candidate is **merged** only when every test passes.

| # | Test | Fails when |
|---|---|---|
| C1 | One rule | The entry states two independent rules, or the **Rule:** line needs "and" to join two unrelated actions |
| C2 | Actionable | A PM reading only the Rule and Instead lines would still not know what to do differently. "Be careful with X" fails |
| C3 | Team-reusable | It is project status, a to-do, a PR or branch state, a one-off incident, or only true for one PM's local setup |
| C4 | Durable | It will likely be false within a month: a current metric value, an in-flight rollout, "currently broken" |
| C5 | Sourced | Any number, table, column or behaviour claim has no source, or the source is "everyone knows" or a gut feeling |
| C6 | Source checks out | The cited file, commit or doc exists and supports the claim. Record `verified`, `unverifiable` (cannot reach it from here) or `contradicted` |
| C7 | Nothing sensitive | Spyne commercials (ARR, revenue, contract values, pricing, margin), customer PII (dealer or rooftop names, people outside Spyne, phones, emails, VINs), credentials, internal IDs | <!-- pm-os-allow: states the rule -->
| C8 | No silent conflict | It contradicts a stable entry without saying it supersedes it, or duplicates one |

**Decisions**
- **merge:** every test passes. Set `risk`:
  - `low`: a new, verified or plainly checkable fact that changes nothing existing.
  - `medium`: it supersedes an existing entry, or the source is `unverifiable` but the claim is specific and internally consistent.
  - `high`: it changes a metric definition other entries depend on, or it supersedes with an `unverifiable` source.
- **hold:** it is probably right, but you cannot verify a load-bearing claim, or it conflicts with a stable entry and the evidence is not clearly stronger.
- **reject:** it fails C1, C2, C3, C4, C5 or C7, or the source is `contradicted`, or it duplicates a stable entry. Say exactly what would make it mergeable.

**Fixable defects.** If the only problem is wording (too long, no imperative verb, a missing "Instead" that the Why already implies), return `revised_body` with the fix and decide as if the fix were applied. Never use `revised_body` to add facts the candidate did not contain, and never to split one entry into two.

## The policy the script applies (you do not decide this)

| Verdict | Applied as |
|---|---|
| merge + low risk + source not contradicted | Auto-merged into `context/` |
| merge + medium risk + source verified | Auto-merged |
| merge + medium risk + source unverifiable | Held |
| merge + high risk | Held |
| hold | Held. Re-reviewed once after 14 days, then rejected if still held |
| reject | Removed, and the reason is logged |

Any human can veto a merged entry afterwards with `node scripts/veto.mjs <id> "<reason>"`. Vetoes are shown to the reviewer as calibration examples.

## Skill improvements

A proposed skill change is merged only when:

1. **Safety gate (script):** it adds no send, post, reply, create, update or delete action. It removes no approval or "never" rule. It adds no external URL. Any hit means hold.
2. **Eval gate (script plus judge):** the skill has at least 3 eval cases. The candidate scores at least the baseline on every case (a 0.5 tolerance absorbs judge noise) and improves the mean by at least 0.25, **or** ties the baseline while making the skill at least 10% shorter.
3. **Size gate (script):** if the skill grows more than 25%, the improvement must be at least 0.5.

A skill with fewer than 3 eval cases cannot be improved automatically. The first change to it must add cases.
