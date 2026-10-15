# Decide: should we solve this now, and in what form

A model asked to solve something will solve it. Many dealer requests are one store's process, one store's CRM quirk, or a solution written as a requirement. This step makes "not as asked" a normal outcome, and records every decision so the next rooftop asking the same thing is matched, not re-argued.

You (the orchestrator) run four subagents in this order: ladder writer, then advocate and skeptic in parallel, then judge.

## 0. Check the ledger first

If `case.md` has `ledger_match`, read that decision. If its revisit trigger is not met, write `decide.md` with the prior outcome, the ledger link, the updated demand count, and "Revisit trigger not met". Skip to the PM gate. Run the full debate only if the PM reopens it.

## 1. Ladder writer

One subagent with `case.md`, `evidence.md`, `context/INDEX.md` (decisions lines) and `product/feature-index.yaml`. It may make context requests. It writes the first part of `decide.md`:

```markdown
# Decide: <title>

## Ladder
1. **Literal ask:** <customer's words> [E..]
2. **Job:** <the outcome they need and why, in P&L terms> [E..]
3. **Who else has this job:** <count of rooftops, last 90 days, same job not same words> [E.. search evidence]. Zero or unknown: say so; it is a question.
4. **Smallest shared building block:** <a setting, policy, template, integration field or workflow step that serves the job for every rooftop that has it> [code ref or E..]
5. **What varies per store:** <each difference, written as configuration on the building block>. Never a code branch for one rooftop.

## As asked vs as solved
| Customer asked | We would build | Same, generalised, or different | Why |
|---|---|---|---|

## Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E..] | <n rooftops> |
| Dealer P&L impact | [E..] | <days removed, cost removed, gross or absorption moved; named, not inflated> |
| Strategic fit | [E..] or org fact | <above the DMS? fits the five facts? fits the area roadmap?> |
| Cost and risk to build | [code refs] | S, M or L, and the main risk |
| Cost of not solving | [E..] | <churn or escalation signal from Arali, cited; never revenue> |
| Prior decisions | <ledger path or none> | <what was decided before> |
```

Every input without evidence says "unknown" in Reading and gets a question in `questions.md` (`slot: request`).

## 2. Advocate and skeptic (parallel, fresh contexts)

Each gets `case.md`, `evidence.md`, the Ladder and Inputs sections, and its own prompt file: `advocate.md` or `skeptic.md`. Each returns at most 250 words and must cite E-ids or code references for every factual claim. They do not see each other.

## 3. Judge

One subagent acting as the CEO persona: give it `context/personas/ceo/core.md`, `rubric-decide.md`, `outcome-examples.md`, the Ladder and Inputs, both arguments, and the `decide` lesson files. It writes the rest of `decide.md`:

```markdown
## Arguments
### For building (advocate)
<verbatim>
### Against building as asked (skeptic)
<verbatim>

## Outcome
**Outcome:** already-possible | bug | build-generalised | build-as-asked | defer | decline
**Feature slug:** <kebab-case, for build outcomes>
**Why:** <3 lines max, citing inputs>
**Strongest point from the losing side:** "<quote>"
**Why it did not carry:** <one line>
**Revisit trigger:** <for defer: a countable condition, e.g. "3 rooftops with this job" or "after DMS write-back for Xtime ships">
**Rubric scores:** <criterion: score> ...
```

## 4. What each outcome does next

| Outcome | Next |
|---|---|
| build-generalised, build-as-asked | Continue to solution research. Set `feature` in `case.md`. |
| already-possible | Write `csm-draft.md`: how the rooftop does this today, in plain dealer language. PM gate. No PRD. |
| bug | Write the bug summary into `decide.md`. PM gate, then the Jira step with issue type Bug. |
| defer | Ledger candidate with the revisit trigger. `csm-draft.md` explaining what we heard and when we will look again. PM gate. |
| decline | Ledger candidate with the reason. `csm-draft.md` explaining it honestly. PM gate. |

## 5. Ledger candidate

For every outcome except build-as-asked, write `queue/decision--<feature-or-job-slug>.md`:

```markdown
---
id: decision--<slug>
kind: decision
area: <area>
status: candidate
owner: <PM username>
source: product/work/<area>/<folder>/decide.md
verified: <today>
confidence: medium
outcome: <outcome>
revisit_trigger: <trigger or none>
demand_rooftops: <count>
work: product/work/<area>/<folder>
---

**Rule:** <for this job, the decision is X; one imperative line>

**Why:** <2 lines from the judge's Why, citing the inputs>

**Instead:** <what to do when this request comes in again: point to the config, the CSM explanation, or the revisit trigger>
```

No rooftop names in the ledger entry. Demand is a count; the work folders carry the detail. If a ledger entry for the same job already exists, write the candidate with `supersedes: <old id>` and the new demand count instead of a duplicate.
