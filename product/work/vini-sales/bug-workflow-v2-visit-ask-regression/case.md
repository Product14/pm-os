---
id: bug-workflow-v2-visit-ask-regression
area: vini-sales
stage: bug-filed
pm: yash.sharma
freshdesk_ticket:
outcome: bug
jira: RETCONVAI-5392
raised_by: Yash Sharma
raised_by_role: pm
fetched_freshdesk:
fetched_arali:
fetched_code: 2026-10-21
---

# Sales inbound voice on workflow_v2 stopped proposing visit times

Backfilled 2026-10-26 from `jira.md` so the folder meets the work-folder contract. The analysis lives in `jira.md`; this case only indexes it.

## Ask
Internal regression found by the PM, not a dealer ticket: restore the 9 Oct visit ask on workflow_v2 voice calls [E1].

## Job
Winnable inbound sales callers get two exact visit times, so appointments are set on the call instead of after a callback [E1, E2].

## Customer context (30 days)
None found in 30 days

## Who feels this
Unknown; BDC managers at affected rooftops are the likely role.

## Agents affected
- Sales inbound voice: yes, workflow_v2 mode only [E3].
- Sales SMS, STL, chat: no; the 9 Oct SMS ask is separate [E1].
- Service inbound and outbound: no; the gate is a sales tool [E3].

## How it works today
The visit-ask gate is supplied only on LiveKit and inline-tool Vapi, not in workflow modes, and #6188 moved inbound sales voice to workflow_v2 on 16 Oct [E3].

## Gap
Workflow_v2 voice proposes a visit time on 8% of winnable calls against 56 to 58% inline [E1, E2].

## Candidate directions
1. Hold inbound sales voice on inline until workflow_v2 carries the gate; removes lost appointment days at no build cost [E3].
2. Port the gate or an equivalent ask counter into workflow_v2; restores visit asks and removes callback cost [E3].
3. **Full value:** the gate in workflow_v2 plus `executionMode` recorded per call, so mode switches show the day they happen and BDC callback cost stays down [E2, E3].

## Frequency
Every rooftop on workflow_v2 sales voice: about 70 to 76% of sales inbound voice leads since 17 Oct [E2].

## Slot status

| Slot | Status | Bar |
|---|---|---|
| Ask | SUPPORTED | at least 1 E-id from freshdesk, arali or pm, in the customer's words |
| Job | SUPPORTED | at least 1 E-id behind the inferred job |
| Customer context (30 days) | EMPTY | at least 1 dealer-side arali E-id dated within 30 days of fetched_arali |
| Who feels this | THIN | at least 1 dealer-side E-id with a known role |
| Agents affected | SUPPORTED | names the impact on both Sales and Service agents (yes, no or unknown for each), with an E-id or code reference |
| How it works today | SUPPORTED | at least 1 bluebrain E-id or `repo:path:line` reference |
| Gap | SUPPORTED | at least 1 E-id or code reference |
| Candidate directions | SUPPORTED | 2 or more directions with a P&L angle, one of them labelled **Full value:** (the path that unlocks the dealer's full value, build scoped) |
| Frequency | SUPPORTED | a count, backed by at least 1 E-id |
