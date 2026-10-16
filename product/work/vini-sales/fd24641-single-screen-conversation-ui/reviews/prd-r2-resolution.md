# PRD round 2: resolution

Document: `prd/v2.md` · Revised to: `prd/v3.md` · Date: 2026-10-16
Panel: gm, general-sales-manager, service-manager, backend-engineer, ceo. All five verdicts: revise. No blocking issues, no intent-challenges.

## Consolidation
- Issues raised: 24 (0 blocking, 14 major, 10 minor). Discarded (quote not found in v2.md, whitespace normalised): 0.
- Merged: general-sales-manager-r2-1 + gm-r2-1 (same quote, same ask) with service-manager-r2-3 (minor, same line); ceo-r2-1 + gm-r2-3 (minor, same quote, same ask). 14 majors fold into 13 rows.
- Previous issues: every round-1 accept checked fixed except service-manager-r1-5 (accepted in r1 but the pass bar never reached the text; fixed now, row service-manager-r2-1). ceo-r1-3 and ceo-r1-6 remain escalated, not re-raised.
- Reviewer requests: 7, not yet run through the context-request flow. Carried as Open questions 1, 3, 5, 7, 8. The gm request (console-reply versus never-answered share) is what Phase 0 now reports by definition.
- Weighing rule as round 1: accept what evidence, code or the approved one-pager supports; reject what goes beyond `one-pager/final.md`; escalate PM-only calls. No fixed intent is touched.

## Blocking and major

| Issue | From | Decision | Reason |
|---|---|---|---|
| backend-engineer-r2-1 | backend-engineer | accept | `customers.service.ts:2452` picks leads by the lead's `service_type` and `:2512` sorts conversations by `createdAt` desc before skip/limit, so A5's service episode on a sales lead never lists and "oldest wait first" cannot sort. New R13: `unansweredOnly` queries open episodes by team, episode department, bucket and optional `ownerConsoleUserId`, sorted by `since`, paginated on episodes, then joined; two named indexes; the badge counts the same query. A5, A13 run through it |
| backend-engineer-r2-2 | backend-engineer | accept | Episode key is lead + department (once per customer, across channels; any channel's reply clears). Unique partial index on the key where open; duplicate-key insert is a no-op without `opened`. Mutable `unanswered_episodes` (fields and writers listed) split from append-only `unanswered_episode_transitions`, the metrics source. A3 covers two pods, SMS plus email |
| backend-engineer-r2-3 | backend-engineer | accept | Summary text claimed by a unique upsert on recipient + department + window start; escalations after the window's text go at window end; retry, failure and episode ids sit on the summary. A24, A28 |
| backend-engineer-r2-4 | backend-engineer | accept | R8's inbound budget rules out a synchronous provider read. Owner refresh is a deduped queued job (lead + department); the stored owner shows meanwhile. CRM activity clears enter through the R4 internal endpoint into the R12 clear with time and actor. A22 |
| ceo-r2-1, gm-r2-3 (minor) | ceo, gm | accept | Nothing measures manager time. v3 labels it unmeasured and never quoted; the fallback claim is screens removed, measured by Action Items page views per member and per manager (existing Goals row). New tab-switch instrumentation not added: the reviewer offered the label as an equal fix |
| ceo-r2-2 | ceo | accept, narrowed; part escalated | One-pager: "If median wait does not fall, rollout stops." Sales is already everywhere, so v3 adds: the live sales view goes to a PM decision within a week of the review. Whether that decision is keep or flag off is the PM's (Open question 4) |
| ceo-r2-3 | ceo | accept | Section 9 and Q19: no scheduler/DMS read in this L. R2's service clause now applies only once a provider read exists; in this L service clears by console reply, click or opt-out |
| ceo-r2-4 | ceo | accept | Goals call the P&L link "check, not the claim"; F&I has no evidence in the case. Removes line now: hours to first human reply; appointments shown and service bookings checked in Phase 0; no gross claim until then |
| general-sales-manager-r2-1, gm-r2-1, service-manager-r2-3 (minor) | general-sales-manager, gm, service-manager | accept | E10, E13: without texts the badge is the only alarm, so aging on wall clock empties weekend be-backs and hides the worst failure. Aging runs on the R5 in-hours clock; aged episodes show per owner in R7 with count and oldest wait, count unreplied (censored, outside the median); aged share goes on the weekly watch. Label and cutoff per department (service: "Possibly answered in scheduler or by phone"). A16, A17. The 24-hour value and the service close-of-day default go to the PM |
| general-sales-manager-r2-2 | general-sales-manager | accept | E30: human CRM activity counts, not only outbound. Sales CRM clears add an inbound call logged answered and a showroom visit or appointment marked shown, same actor rule, where the CRM tells them apart; an unanswered inbound call never clears. Section 9 says the distinction is unknown. A9, A10 |
| gm-r2-2 | gm | accept | Console-reply share defined in Goals: per rooftop, department and week, episodes cleared by console reply / cleared any way or aged, opt-outs excluded, from the episode record; labelled a proxy where no activity read exists. One definition for R6, the success-check pick and Phase 0 |
| service-manager-r2-1 | service-manager | accept, narrowed | r1 accept not carried. Pass: service median wait falls against the pilot's own Phase 0 baseline, with click share and Vini Service bookings reported; fail, the next service rooftop does not turn on. Service click-share threshold comes from the pilot's first two live weeks, not Phase 0: Phase 0 is dark and has no clicks |
| service-manager-r2-2 | service-manager | accept | Showroom and drive reply in different places. Attestation, console-reply share and revert are per rooftop per department. A30: sales attested, service not, service episode is mark only |

## Minor (bulk)
- Accepted: backend-engineer-r2-5 (R1 and backfill name the signal: SMS `authorType`, claim and release events, action item creation and completion; other channels labelled), backend-engineer-r2-6 (allowlist is an explicit list written at enablement; new intents open nothing; A2 adds the unlisted case), general-sales-manager-r2-4 (Phase 0 reports expected clicks per rooftop and last console replier, not clicks per rep), gm-r2-4 (the unowned-queue owner is always on the manager list; A32 with recipients unset), service-manager-r2-4 (A27 drops the stale assumption; unstored service hours become a setting the CSM fills before the pilot), service-manager-r2-5 (A30 names the advisor-communication read; advisor and RO reads alone give mark only). Also counted above: service-manager-r2-3, gm-r2-3.
- Accepted, narrowed: ceo-r2-5: an unbriefed rooftop gets the view with escalation "not configured" and day one does not wait. The live rooftop count and CSM hours are not in evidence; Open question 7, not invented. general-sales-manager-r2-3: a reply clear stores `clearedByUserId`; the manager view shows replies per member beside the owner (A8). The "replier is not the owner" flag is rejected: outside approved scope (one-pager manager view is count, oldest wait, clicks per owner; credit between reps stays in the CRM).

## Escalated to the PM
Carried from round 1, still open: ceo-r1-6 (what the L displaces; write-back date), ceo-r1-3 (VinSolutions read status; activity read inside the L; CSM date), gm-r1-1 part (hold sales at the requester), ceo-r1-1 part (no-qualifier fallback).
New this round:
1. ceo-r2-2 (part): if the success check shows no fall, does the live sales view stay or go back behind the flag?
2. Defaults added to the list: aging cutoff stays 24 hours but now in department hours; service aging default "close of that day's service hours"; service click-share threshold set from pilot weeks.

## Counts
Raised 24 · accepted 24 (4 narrowed: ceo-r2-2, service-manager-r2-1, ceo-r2-5, general-sales-manager-r2-3) · rejected 0 whole issues (1 part: general-sales-manager-r2-3 not-owner flag, outside approved scope) · escalated 0 whole issues (1 part, ceo-r2-2, plus 1 defaults list) · discarded 0.
