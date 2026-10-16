# One-pager round 2: resolution

Document: `one-pager/v2.md` · Revised to: `one-pager/v3.md` · Date: 2026-10-16
Panel: gm, general-sales-manager, service-manager, backend-engineer, ceo. All five verdicts: revise. No blocking issues, no intent-challenges.

## Consolidation
- Issues raised: 31 (0 blocking, 17 major, 14 minor).
- Discarded (quote not found in v2.md, whitespace normalised): 0.
- Merged: 17 major issues, plus 3 related minors, fold into 13 rows below.
- Reviewer requests: 13, not yet run through the context-request flow. The ones that block v3 text are folded into Open questions 1 to 4 (provider owner/booking/RO reads and freshness, CRM-to-console member mapping, missed-call record, department hours, roadmap displacement).
- Weighing rule this round: an issue that adds scope without changing the decision, or asks for detail the PRD carries, is rejected with "belongs in PRD", even where the concern is valid.

## Blocking and major

| Issue | From | Decision | Reason |
|---|---|---|---|
| backend-engineer-r2-1, ceo-r2-1, general-sales-manager-r2-1 | backend-engineer, ceo, general-sales-manager | accept | The provider table shows no owner source is read today (`vinsolutions.ts:191`, Q18, Q19), so Decision now says day one is the team "Unanswered" view at every rooftop; "mine" turns on per rooftop as its source connects. The VinSolutions salesperson read is named as inside this L (flagged [ASSUMPTION], Q24, for the PM to confirm), and the Decision ends with the ask. Not taken: GSM's alternative of holding launch at the requesting rooftop until "mine" works, and the ceo's "AI SPYNE as owner" risk line (belongs in PRD; the unmapped-owner rule already sends such records to the team view) |
| ceo-r2-2 | ceo | accept | Org fact 4: data access is a commercial negotiation. Provider reads now say "negotiated by a commercial owner (unnamed), built by integrations-backend"; naming the owner is Open question 4. Status per provider is not in evidence, so it is not stated |
| backend-engineer-r2-2 | backend-engineer | accept | `isUnread` feeds contact metrics, Customers unreadCount and Needs Attention (solution-context, Who else calls it). v3: "New fields; `isUnread` unchanged." Writer list and field names belong in PRD |
| general-sales-manager-r2-3, backend-engineer-r2-3, service-manager-r2-2 (minor) | general-sales-manager, backend-engineer, service-manager | accept, narrowed | Escalation is now a copy, not a move, in that department's hours; the owner keeps the customer; failed texts are counted; recipient and hours source go to Open question 4. Backend's mechanism (read-time overdue filter, no scheduled job, texts sub-flag) belongs in PRD |
| gm-r2-1 | gm | accept | Reps reply from VinSolutions (E13) and CRM activity is read nowhere [Q18], so escalation texts would fire on answered customers. v3: texts run only where we see replies (CRM read, or console-only reps); click-clear share is a check after launch. This changes what ships, so it stays in the one-pager |
| general-sales-manager-r2-2, gm-r2-3, ceo-r2-6 (minor) | general-sales-manager, gm, ceo | accept | One-click clears show per owner in the manager view and never stop the wait clock; measure is median hours to first human reply per department, and the pre-UI baseline is labelled as missing CRM-sent replies. TL;DR no longer claims the Action Items cross-check goes away; Action Items use moves to the checks [E13] |
| ceo-r2-4 | ceo | accept | Target rule, review date and pull-back now written: cut set within 2 weeks of baseline; review 30 days after launch, requesting rooftop first; if median wait does not fall, rollout stops. These are drafter proposals, flagged [ASSUMPTION] (Q25) for the PM. p90 dropped for length; belongs in PRD |
| ceo-r2-3 | ceo | accept | What the L displaces is not in evidence: stated as unknown, Open question 4 asks the PM to name the item it moves out of this quarter. Reason it stays apart from Console v2 given: that epic is unscheduled backlog [E23]. Needs a PM answer at the gate |
| service-manager-r2-1, service-manager-r2-3 (minor) | service-manager | accept | Service clears also from a scheduler booking or RO opened where we read it; otherwise manual, by one click. The scheduler/DMS row now covers advisor, booking and RO, none read [Q19]; the RO check says "where read" |
| general-sales-manager-r2-4 | general-sales-manager | accept | Email no longer has its own rule: one rule for every channel (customer message after a Vini handoff or action item, or once a human is active, no human reply since) |
| backend-engineer-r2-4 | backend-engineer | reject | Belongs in PRD: the per-channel episode signals (which humanTransferPhase or action-item event opens an episode, chat-service state, actor on a send) are design detail. The one-pager already says "human reply" and now names the action item via gsm-r2-4; the missed-call record is carried as a reviewer request in Open question 2 |
| gm-r2-2 | gm | accept, narrowed | An owner without a console seat falls to the team view; CRM-user-to-console-member mapping and reassignment freshness go to Open question 1. Unmapped-owner count in the manager view belongs in PRD |
| ceo-r2-5 | ceo | accept | Named cuts applied: Evidence to two bullets (lastReadAt and SYSTEM bullets folded into one line with refs), Unanswered and Cleared-by to one line each, Decision "command board" line and the Judge's case bullet removed (decide.md and decisions.md hold them), Problem to two lines. v3 is 724 words (v2: 947) |

## Minor (bulk)
- Accepted: backend-engineer-r2-6 (estimate after Q18 to Q21; Q17 no longer gates under the fixed intent), backend-engineer-r2-7, general-sales-manager-r2-5, gm-r2-6, service-manager-r2-5 (the named cuts: Judge's case bullet, lastReadAt bullet, code bullets collapsed, command-board line), general-sales-manager-r2-6 (owner alerts are texts, E33), gm-r2-4 (manager-time row dropped; the hours claim stands alone), gm-r2-5 (flag per rooftop per department), service-manager-r2-4 (Open question 3 asks which rooftops run Vini Service; service flag stays off until answered). Also counted above: service-manager-r2-2, service-manager-r2-3, ceo-r2-6.
- Rejected: ceo-r2-7 (who benefits versus who signs): adds scope without changing the decision; belongs in PRD and GTM. backend-engineer-r2-5 (owner data contract: stored copy, source, synced-at, webhook): belongs in PRD; freshness is asked in Open question 1.
- Not taken (part of accepted issues): gm-r2-6 agent coverage line, cut for length again; it lives in decide.md rung 6 and belongs in PRD.

## Escalated
None. No issue touches a fixed intent; none is an intent-challenge or a blocking conflict.

## For the PM at the gate (not escalations)
- Confirm the VinSolutions salesperson read is inside this L (Q24) and name the commercial owner who negotiates provider reads.
- Name what the L displaces this quarter (Open question 4).
- Confirm or replace the 2-week target and 30-day review cadence (Q25).
