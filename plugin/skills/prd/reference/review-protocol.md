# Review protocol

One loop, used for the one-pager and then the PRD. At most 3 rounds. The orchestrator runs it.

## The panel

From `case.md` > Who feels this and the area:
- **Always:** `gm`, `backend-engineer`, `ceo`.
- **Plus 1 or 2 department roles:** the roles named in Who feels this, mapped to `general-sales-manager`, `bdc-manager`, `service-manager` or `service-advisor`. If the slot says unknown: `bdc-manager` for vini-sales, `service-manager` for vini-service.
- At most 5 reviewers.

## Load each persona

Run `node scripts/index.mjs persona <role> <area> <tags>`, where the tags are 3 to 5 keywords from the case (for example `scheduling,capacity,booking`). It prints the persona core plus up to 10 matching observations. Write the observation ids loaded into `run.json` > `observations_loaded.<role>`. Also pass any `context/lessons/reviewer-<role>/` lesson files (calibration from past PM overrides).

## One round

Run reviewers as fresh subagents with `model: sonnet`, at most 3 at a time. They never see each other's reviews. Each gets:
1. The persona text (core plus observations) and its calibration lessons.
2. The rubric for this document (`rubric-onepager.md` or `rubric-prd.md`) plus the persona's own "Review lens" criteria.
3. The document to review.
4. `case.md`, `evidence.md` and `decide.md`. The engineer also gets `solution-context.md` and may call Blue Brain (`find_prior_art`, `get_repo`, `trace_handler`, `who_calls`, `find_symbol`), at most 8 calls, to check code claims.
5. The fixed intents from `decisions.md`.
6. From round 2: this reviewer's own issues from the previous round and the resolution log for them. Not the other reviewers' issues.

The reviewer prompt:

> You are <persona>. Review this <one-pager | PRD> as that person would, using your core, your observations and the rubric. You are checking whether the document is right for real dealerships, not whether it is well written.
> Every issue must quote the exact line it is about, and must cite the evidence or observation behind your concern (E-id, `[obs:<id>]`, a code reference, or "missing" if the problem is that evidence is missing). An issue without a quoted line is discarded.
> Do not raise issues against the fixed intents. If you believe a fixed intent is wrong, raise one issue with severity `blocking` and type `intent-challenge`; the PM decides.
> If you need a fact you do not have, add it to `requests` instead of guessing.
> In round 2 and later, first check whether each of your previous issues was actually fixed.
> Return JSON only.

The reviewer writes `reviews/<stage>-r<n>-<role>.json`:

```json
{
  "persona": "service-manager",
  "round": 1,
  "verdict": "approve | revise | block",
  "scores": { "<criterion>": 1-5 },
  "previous_issues": [ { "id": "service-manager-r1-2", "fixed": true, "note": "" } ],
  "issues": [
    {
      "id": "service-manager-r1-1",
      "severity": "blocking | major | minor",
      "type": "wrong-for-dealers | missing-evidence | unsupported-claim | scope | feasibility | five-facts | acceptance-gap | intent-challenge",
      "quote": "<exact line from the document>",
      "concern": "<what is wrong, as this person would say it>",
      "because": "E7 | obs:obs-service-manager-slot-capacity | `repo:path:line` | missing",
      "ask": "<the concrete change that would resolve it>"
    }
  ],
  "requests": [ { "question": "", "blocks": "", "source": "" } ]
}
```

At most 10 issues. A `block` verdict needs at least one blocking issue.

## Consolidate (orchestrator, deterministic)

1. Drop issues whose `quote` is not found in the document (normalise whitespace before matching). Count them in `run.json` as `discarded_generic`.
2. Merge issues from different reviewers that quote the same line and ask for the same change. Keep every persona id on the merged issue.
3. Send `requests` through the context-request flow before resolution.
4. Write `reviews/<stage>-r<n>-resolution.md`, one row per blocking or major issue:

| Issue | From | Decision | Reason |
|---|---|---|---|
| service-manager-r1-1 | service-manager, gm | accept | <one line> |
| ceo-r1-3 | ceo | reject | <one line, citing evidence or a fixed intent> |
| bdc-manager-r1-2 | bdc-manager | escalate | conflicts with fixed intent "<intent>" |

The resolution is written by a fresh drafter subagent, which gets the issues, the document, the case files and the fixed intents. Rules:
- **accept** when the issue is supported by evidence or an observation and does not touch a fixed intent.
- **reject** only with a reason that cites evidence, a fixed intent, or the decide outcome.
- **escalate** anything that touches a fixed intent, any `intent-challenge`, and any blocking issue where the evidence conflicts.
- Minor issues: accept or skip in bulk, one line.

5. The drafter revises (see `drafter.md`, Revising), then the doc lint runs.

## Stop rule

Stop when **every** reviewer's verdict is `approve` and no blocking issue is open, or after round 3. Record in `run.json` > `rounds.<stage>`: rounds run, issues raised, accepted, rejected, escalated, discarded. Everything still open or escalated goes to the next PM gate, listed first.

## What the PM sees at the gate

- Escalated issues, each with the persona, the quote, the concern and the evidence.
- Unresolved blocking issues after round 3.
- Score averages per persona per round (are reviews converging?).
- When the PM overrules a persona, record it in `decisions.md` > Overrides as `<date> <issue id> <persona>: <PM's reason>`. The retro turns it into a calibration lesson.
