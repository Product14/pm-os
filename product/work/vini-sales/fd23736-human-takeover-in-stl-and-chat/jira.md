# Jira

Source: decide.md Outcome (defer of the delta, accepted at the decide gate 2026-10-16) and decisions.md fixed intent: RETCONVAI-5165 ships in the current sprint, owned by the tech lead (Ankit Singh). Nothing new is created; this updates the EXISTING issue RETCONVAI-5165. Not applied. Waiting on the PM to approve the field changes and the comment.

Read-only lookups, 2026-10-16 (cloudId spyne.atlassian.net): `getJiraIssue RETCONVAI-5165 fields *all`, `searchJiraIssuesUsingJql "sprint in openSprints() AND project = RETCONVAI"` (paged until no open sprint was left out), `lookupJiraAccountId "Ankit Singh"`.

## Current state of RETCONVAI-5165

- **type / status:** Story, Product Backlog (unchanged since 2026-09-23, no comments)
- **parent epic:** RETCONVAI-2997 (SMS Conversation Human Handoff)
- **component:** Sales
- **labels:** Agent_capabilities, CRM_Writeback, freshdesk-23736
- **assignee:** Utkarsh Tiwari (accountId 712020:a3cae6c1-3be3-4397-9a31-adf1349fd36f)
- **sprint (customfield_10020):** none, so the issue has no board of its own

## Which sprint is "current"

RETCONVAI has 4 sprints in state `active`. Every one of them is past its Jira end date:

| Sprint id | Name | Board | Jira dates | Read |
|---|---|---|---|---|
| **4355** | **CI Sprint 13** | **1135** | 2026-08-24 to 2026-09-02 | **The live one.** 50+ issues updated in the last 14 days, the newest on 2026-10-15. Holds the sibling takeover bug RETCONVAI-5190, Ankit Singh's RETCONVAI-5296 and the current assignee's work. |
| 4220 | CI Receptionist Sprint 1 | 1136 | 2026-08-31 to 2026-09-14 | Receptionist board, not this team |
| 4632 | CI Sprint 1 | 1536 | 2026-08-10 to 2026-08-24 | Other board |
| 4526 | CI Sprint 13 | 1134 | 2026-05-18 to 2026-05-28 | Other board; **same name as 4355**, so set the sprint by id, not by name |

So the current sprint is **CI Sprint 13 (id 4355, board 1135)**. Its end date (2026-09-02) has never been moved and the team keeps working inside it. "This sprint" therefore has no end date in Jira. Before applying, the PM should agree a delivery date with Ankit Singh and put it in the comment (placeholder below).

## Proposed

### (a) Field changes on RETCONVAI-5165

| Field | From | To |
|---|---|---|
| assignee | Utkarsh Tiwari (712020:a3cae6c1-3be3-4397-9a31-adf1349fd36f) | **Ankit Singh (712020:7aae7c3b-fe52-4894-93bf-c72cc9d598b3)** |
| sprint (customfield_10020) | none | **4355 (CI Sprint 13, board 1135)** |

Payload for `editJiraIssue` (cloudId spyne.atlassian.net, issue RETCONVAI-5165), only after the PM approves:

```json
{
  "assignee": { "accountId": "712020:7aae7c3b-fe52-4894-93bf-c72cc9d598b3" },
  "customfield_10020": 4355
}
```

Notes:
- The account lookup returned exactly one "Ankit Singh" (the other matches were Ankit Attri and ankit.choudhary), so the id is unambiguous.
- Reassigning removes Utkarsh Tiwari as assignee. The PM's instruction is that the tech lead owns delivery. If Ankit Singh wants Utkarsh to keep building it, keep Utkarsh as assignee and record Ankit Singh as owner in the comment instead. Confirm before applying.
- Status is not changed here. Moving it out of Product Backlog is the owner's call once it is in the sprint.

### (b) Comment to add

```markdown
**Decision (PM, 2026-10-16):** this story ships in the current sprint, CI Sprint 13. Owner: Ankit Singh (tech lead). Target date: {date agreed with Ankit Singh}. Freshdesk 23736 has been waiting on it since the 2026-09-24 ETA was missed.

**Scope: as specified in this story, plus one wording change.**
Event 1 (human takeover / claim) must not say "Vini AI paused". Takeover pauses Vini's texts only. Call tasks keep running on purpose (orchestrator comment from RETCONVAI-4553: a rep taking over the text thread says nothing about whether the lead should still be called). The note has to match what actually happens, so event 1 reads:

> "Vini texting paused. Conversation is now handled by {user name} ({channel}). Takeover at {timestamp, rooftop TZ}. Calls continue as scheduled."

Everything else stays as written: events 1 to 4, both directions, Speed-to-Lead SMS and web chat, per-rooftop on/off, idempotent, failures logged, DriveCentric first and CRM-agnostic. Takeover logic stays out of scope.

**Deferred, not in this story:**
- Pausing call tasks while a rep owns the lead (reverses a deliberate design; RETCONVAI-5190 was closed as "not an issue").
- Pausing Vini when a rep works the lead only in the CRM and never presses takeover in the Console. This needs read access to rep activity from DriveCentric, which has not been negotiated.

**Revisit trigger for the deferred part:** either (a) within 60 days after this story is live, 2 or more rooftops raise a Freshdesk ticket or complaint about Vini texting or calling a lead a rep already owns, or (b) DriveCentric confirms read access to rep activity on a lead. Either one reopens the deferred part as a shared build.

**Decision record:** pm-os repo, `product/work/vini-sales/fd23736-human-takeover-in-stl-and-chat` (decide.md, decisions.md).
```

To confirm with the PM before applying:
- The target date in the comment.
- Whether events 3 and 4 ("AI resumed") should also read "Vini texting resumed" so all four notes use the same words. Only event 1 was approved; this file does not change 3 and 4.
- Whether to also edit row 1 of the description's note table, so the story itself carries the new wording and not only the comment. Not proposed here; the PM asked for assignee, sprint and a comment.

READ-ONLY: nothing above has been written to Jira.
