# PRD: Lead-type-aware STL first message for after-hours website leads

| Author | Vini Sales PM |
|---|---|
| Last updated | 2026-10-16 |
| Status | Draft v4 |
| Area | vini-sales |
| Source | Freshdesk 24140, work folder product/work/vini-sales/fd24140-stl-and-widget-configuration |
| One-pager | product/work/vini-sales/fd24140-stl-and-widget-configuration/one-pager/final.md |
| Decision | build-generalised (decide.md). Gate 2: steps 0 and 1 approved; steps 2 and 3 are direction with gates |

## 1. Problem
- The BDC calls website leads the next business day, so after-hours leads wait overnight; the dealer will forward only those to Spyne [E8, E9].
- The VP Marketing wants Ava to set appointments when there are none, confirm them when there are, and stay out of credit applications and PII [E5, E6].
- One shared prompt writes every STL opener; lead type only switches STL on or off `conversational-ai-backend:src/sequence-workflows/services/sequence-task-message-generation.service.ts:441` [E20, E36].
- So a customer who booked online is pushed to rebook, and a credit applicant gets an AI pitch [E1, E6].
- The dealer was told this was "being worked on"; no Jira exists [E10, E25, E31].
- The dealer will not scale STL while staff key Ava's outcomes by hand [E12, E13].
- Steps 0 and 1 do not deliver that automated record; only step 3 write-back does (CRM-first, planned) [PM] [E32]. The step 0 handoff is an interim the dealer already declined [E13].

**Who this is for:** VP Marketing, BDC manager and agents, dealer software development manager [E5, E8, E12].
**Flywheel stage:** lead to appointment; credit apps stay with the store (Q28) [E5] · **Removes:** the next-morning first call, replaced by a same-evening text, for inquiries forwarded between BDC close and the window's end (9 pm local at most). STL skips, not holds, later leads `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1922`, so the BDC calls them as today; their share is unknown (Q39). Calls on resolved leads end only with step 3 [E8].

## 2. Evidence
- "drive appointments when there aren't appointments and confirm appointments when there are appointments" [E5]
- "We don't currently have an API... if an appointment was made, we can load it into our system." [E12]
- Demand: this rooftop plus 3 companies on calls in 90 days; write-back asked here only [E21, E22].
- The type entry keys on external_type (blank to "empty", else DEFAULT) and is gated by its own mode first; any source entry must also pass, window included `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:131`, `:396`, `:446`-`:470` [E41].
- Team silent hours do not stop an STL text; the entry's mode does: `SILENT_HOURS` allows 9 pm to 8 am by default, and `WORKING_HOURS` blocks on a non-working day or unset hours `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1487`, `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:221`, `:267`, `:303`.
- Suppression cannot see the dealer's texts or BDC calls; opt-out is an exact "STOP" only, with no consent check [E42, E43].
- Whether the ADF lead type or appointment time reaches external_type is not visible [E39] (Q23).

## 3. Goals and metrics
| Goal | Metric | Where it is measured | Baseline | Target |
|---|---|---|---|---|
| Inquiries inside the window texted | STL coverage: smsSent / eligibleByType (context/metrics) | `sequenceTasks` STL `smsSentAt` | unknown | 100% of test leads |
| No lead lost before a task exists | noTask, apart from skipped (trap stl-notask-vs-skipped) | `dealer_leads_raw.leads` (argMax per `_id`, this team, forwarding source) LEFT JOIN `sequenceTasks` | unknown | 0 |
| No defect skips | `sqs-stl-deferred-to-api`, `stl-not-configured-for-lead`, `stl-lead-gate-blocked`; `stl-outside-*` on a lead created inside the source window | `sequenceTasks.statusReason` | unknown | 0 |
| Designed skips visible | `stl-outside-*` after the window, `stl-external-created-at-stale`, weekly | same | unknown | no target; on the handoff and to the VP Marketing (Q25) |
| Same-evening first contact | smsSentAt minus ADF submission; outside-window leads apart | stored submission time, else the forward log | BDC's first call (Q15) | set at week 4 (PM) |
| Forward lag | lead created minus ADF submission time | same | unknown | under 6 hours |
| One text, no chase | `STL_FOLLOW_UP` or `FOLLOW_UP` rows, any status | `sequenceTasks` | unknown | 0 |
| No AI contact on appointment or credit-app leads | texts to those types | CSM, forward log (R10) | unknown | 0 |
| Ava-set appointments show | set, missing from the board before their time, shown | handoff rows against the board, CSM | none | missing 0; shown set after 4 weeks |
| Hours | BDC callback hours (Q15); CSM and ops hours on checks | CSM, weekly | unknown | weighed at week 4 |

Type splits join to `dealer_leads_raw.leads` on leadId; never `conversation_fact`.

## 4. Scope
**In scope (committed)**
- **Step 0, configuration only, behind a go/no-go.** STL on for after-hours website inquiries with today's opener; first text only; a morning handoff to the BDC manager and a backup, keyed by staff (the interim the dealer declined [E13]).
- **Step 1, proof** (S; STL and Integrations owners; PM dates it). UAT leads of each type show whether type, appointment, credit-app status and submission time reach the lead and reply turn. Output: a step 2 size.

**Step 0 go/no-go, in production (Q34, Q19).** Routing and bypass values differ per environment, so UAT cannot decide it. The dealer sends one test inquiry from a staff phone to the real inbox inside the window, production config, nudge off, source not excluded. Record task rows, stored source and external_type, and the resolved entry and its mode. A second, after the window ends, fixes A5's branch (skip or hold).
- **API path** (STL task with smsSentAt, :395), bypass not hit: go. Re-run with the source excluded: the text still goes, no FOLLOW_UP task (A8).
- **Queue path** (STL SKIPPED, `sqs-stl-deferred-to-api`): never exclude the source (it removes the workflow, :197). No-go; PM decides (E-1).
- **Neither, both, or bypass hit:** no-go until traced.

**Which entry step 0 sets.** A source entry keyed on the forwarding source (Q36) carries the window and is the on/off switch. The type entry the test lead resolves to must be on with mode `FULLDAY` or a window covering the source window; it is gated first (:446 to :470). If it is "empty" or DEFAULT and off, it is turned on only when every other feed resolving to it is listed and blocked by its own source entry or accepted by the VP Marketing; else no-go. Rollback never touches DEFAULT.

**Other go-live checks (all must pass):**
- Forward excludes appointment, credit-app and open BDC leads, or the dealer accepts in writing (Q33). Source string stable and unshared (Q36). Forward lag under 6 hours.
- Window: `CUSTOM_TIME` only, set for every day including BDC-closed days, inside 8 am to 9 pm customer local time; team timezone set, not UTC (Q22). Never `SILENT_HOURS` or `WORKING_HOURS` (blocks closed days and unset hours, :267, :303).
- Dealer texts paused, or the VP Marketing accepts no touch for skipped leads (Q25). Consent, STOP-only opt-out and window signed by the GM or dealer principal (Q24). Same-day optOut.sms (Q37).
- Handoff surface carries R5's fields on the test lead, each status's source named (Q26, Q38); two recipients cover every showroom day (Q39).
- Reminders owned once (Q32). No after-hours transfer to an empty line (Q35). Widget fix confirmed (Q4).

**Step 0 exit, week 4 (PM).** Keep on 0 non-inquiry texts, 0 chase sends, 0 missed opt-outs, noTask 0, 0 Ava-set appointments missing from the board before their time, and forwarded inquiries texted same evening at or above a share the PM sets once Q39 is answered; else stop (source entry off, forward removed).

**Per-rooftop configuration:** existing: forwarding-source entry and window, type entry per Q34, excludeSource (API path), nudge off, two recipients, widget call off. New: opener per type, credit-app held out by default (step 2); write-back, default off (step 3).

**Agents affected:** STL (R1 to R7, R11); SMS reply (R4, R12, Q12); follow-up off (R3); widget (R8); Service unchanged (R9, Q11).

**Out of scope:** write-back, so no automated record of Ava's conversations or appointments until step 3 (section 1; the dealer message says so); type inference from free text; a Spyne appointment copy (Q7); service openers; widget build; routing onto the API path (E-1); a second rooftop.

**Vehicle location: out, own ticket [E16].** Step 0 is configuration with today's opener; no lot field is shown reaching the lead or reply turn [E39], and naming it changes a shared reply agent. CSM: "In the pilot Ava will not say which lot a vehicle is on; that needs each vehicle's location carried from your feed to her, unconfirmed, so it is a separate request. Your BDC sees every conversation on the morning handoff."

**Step 2, per-type opener: direction** (M). Gate: Q12, Q23, Q11, Q14, Q15, Q30 and an E22 company that pilots. A template on the type entry (`renderPrompt` :441, Q20); literal credit-app text; confirmations that never propose a new time; no-PII guardrail (Q31, Q27); opt-out beyond STOP.

**Step 3, CRM-first read and write-back: direction** (L). Gate: Q10, Q17, Q21, Q29 and an agreement the CSM starts during step 0. Certified write-back, else one reusable no-API channel; retried, idempotent, never silently dropped.

## 5. How it works today and after
| Step | Today | After (steps 0, 1) | Ref |
|---|---|---|---|
| Workflow creation | Queue: STL SKIPPED, cadence only. API: STL inline | Production Q34 first; API go, queue no-go | `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:193`, `:395` |
| Gate and window | Type and any source entry must pass; outside the window, a skip | Source entry carries the window | `...speed-to-lead-console-call.service.ts:446`, `:470` |
| After first text | Nudge and cadence run | Nudge off; source excluded | `conversational-ai-backend:src/notifications/conversation-notifications.service.ts:2408`, `:2634` |
| BDC handoff | Email (untraced), Console | R5 fields, named sources, two recipients | not traced (Q26, Q38) |

## 6. Requirements
| # | Requirement | Priority | Tag |
|---|---|---|---|
| R1 | Only after-hours inquiry leads reach the leads inbox; appointment and credit-app leads are excluded | P0 | [E9, E14] [PM] |
| R2 | On the API path, each forwarded inquiry inside the window gets exactly one STL first text with the standard opener; on the queue path, no go-live | P0 | `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:193` |
| R3 | Nothing follows the first text unless the customer replies; a forwarded lead with a follow-up row in any status (a console save can reset the nudge) has its workflow cancelled that day | P0 | `conversational-ai-backend:src/sequence-workflows/controllers/sequence-workflows.controller.ts:24` [E44] |
| R4 | STOP ends all outbound. A non-STOP opt-out, caught on the handoff or by the daily scan, gets optOut.sms the same day (Q37; else no go-live) and do-not-contact at the dealer. A re-forwarded opted-out customer gets no text | P0 | `conversational-ai-backend:src/sms/sms.service.ts:2349` [E42] |
| R5 | Before open, the BDC manager and a backup get every forwarded lead: name, phone, status (texted, replied, callback requested, appointment set, opted out, not texted with reason) from a named source (Q38), appointment time, summary, Console link. A missing lead is called as today | P0 | [E8, E12, E13] |
| R6 | The forwarding-source entry off stops new texts for forwarded leads off the bypass, with no deploy and DEFAULT untouched; removing the forward is the guaranteed rollback | P0 | `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:470` [E41] |
| R7 | Step 1 answers Q23, Q12 and Q15, records submission time and source per test lead, and sizes step 2 | P0 | [PM] [E39] |
| R8 | Widget call option stays off; the smartview-config failure is confirmed fixed or filed | P1 | [E3, E4] |
| R9 | Service teams' STL config, messages and leads do not change | P0 | `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:479` [E36] |
| R10 | CSM checks: reconciliation and non-inquiry texts daily in week one, then weekly; opt-out scan daily throughout; follow-up rows daily until 4 clean weeks; Ava-set appointments against the board weekly | P0 | [PM] [E41] |
| R11 | No first text outside the accepted window, inside 8 am to 9 pm customer local time; a lead outside it shows "not texted (outside window)" and is called as today | P0 | `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:341` (Q22, Q24) |
| R12 | An after-hours request for a person never transfers to an unstaffed line; the lead shows "callback requested" with the customer's words | P0 | [E43] (Q35) |

## 7. Acceptance criteria
| # | Given | When | Then | Covers |
|---|---|---|---|---|
| A1 | Forward rule live | Test inquiry, appointment and credit app | Only the inquiry arrives | R1 happy, negative [E9] |
| A2 | Step 0 live | A non-inquiry slips through or is reported | Source entry off the same day until the rule is retested; BDC calls the lead | R1 stop [PM] |
| A3 | Forward cannot exclude by type | Go-live review | No go-live | R1 fallback [E10] |
| A4 | API path; inquiry inside the window | Lead created | One text, before BDC open; bypass not hit | R2, R11 happy `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:341` (Q22) |
| A5 | Inquiry forwarded after the window ends | Lead created | No text (`stl-outside-*`); handoff shows "not texted (outside window)"; BDC calls it. If the second test shows a hold, the handoff shows "text due at <time>" and the BDC calls after it | R11 stop `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1946` |
| A6 | Production test shows the queue path | Go-live review | No go-live; source not excluded; PM decides | R2 negative, fallback `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:197` |
| A7 | Customer texted inside this team's suppressionWindow (recorded at go-live; 15 hours if unset) | Second forward inside it | No second text; repeats per phone counted daily | R2 stop `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1880` [E43] |
| A8 | API path, source excluded | Inquiry arrives | Text sent; no FOLLOW_UP task | R3 negative `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:504` |
| A9 | Text sent, no reply | 7 days | No follow-up row in any status | R3 happy, stop [E44] |
| A10 | A console save resets the nudge, exclusion or source entry | Daily query, scheduled rows included | Nudge off, workflows cancelled, source entry off | R3 fallback `conversational-ai-backend:src/sequence-workflows/controllers/sequence-workflows.controller.ts:24` |
| A11 | Texted customer | Replies "STOP" | optOut.sms set; nothing further | R4 happy `conversational-ai-backend:src/sms/sms.service.ts:2349` |
| A12 | Texted customer, week three | Replies "unsubscribe", then is re-forwarded | At most one reply; optOut.sms and do-not-contact set by next morning; no text on re-forward | R4 negative, stop [E42, E43] |
| A13 | No dealer pause and no written acceptance | Go-live review | No go-live | R4 fallback [E15, E43] |
| A14 | Texted lead at 11 pm | Asks for a person | No transfer to an empty line; handoff shows callback requested with the customer's words; BDC calls first; else no go-live | R12 [E43] (Q35, Q38) |
| A15 | BDC manager out | Before open | Every lead, with R5's fields, reaches the backup | R5 happy [E8] (Q26) |
| A16 | Ava sets an appointment | Before open, or before it on a BDC-closed day | Backup or BDC manager keys it, cancels any duplicate, confirms by call; CSM checks weekly | R5 happy [E6, E12] (Q32, Q39) |
| A17 | Email lacks R5's fields | Go-live review | Go only if Console filters callback-requested and appointment-set leads, A14 and A16 pass there, and the VP Marketing signs | R5 fallback [E13] |
| A18 | Lead with no task | Daily reconciliation | Shown "not texted (no workflow)"; BDC calls it | R5, R10 fallback `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:203` |
| A19 | Week one | Daily CSM check | Forwarded count equals handoff count; opted-out and booked leads not cold-called | R5 negative, stop [PM] |
| A20 | Step 0 live | Ops turns the source entry off | Next test lead not texted; DEFAULT unchanged; no deploy | R6 happy, stop `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:560` |
| A21 | Bypass lead, or config write fails | Rollback needed | Forward removed; no new leads | R6 fallback `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:760` |
| A22 | UAT leads of each type | Step 1 | Stored fields and reply-turn variables recorded | R7 happy [E39] |
| A23 | Type not stored (Q23), or test-parse route down | Step 1 | Step 2 waits on a parser port; fields read from `dealer_leads_raw.leads`; no dealer change | R7 stop, fallback `lambdas:crm-integrations/webhook-processor/crm-clients/adf.js:156` |
| A24 | Service lead reaches the inbox | Workflow creation | No inline STL; service config unchanged | R9 `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:479` |
| A25 | Widget live | Shopper opens it | No call option; SMS works | R8 [E4, E7] |

## 8. Edge cases
| Scenario | Handling |
|---|---|
| No mobile number, or returning customer (RETCONVAI-5238 [E25]) | Not texted; in the handoff |
| Dealer restarts its own texts | CSM reconfirms the pause weekly in month one |

## 9. Integrations and dependencies
| System | Read or write | Available today? | Ref |
|---|---|---|---|
| Dealer ADF email forward | Read leads | Yes; type rule open (Q33) | [E14] |
| Email parsing to lead store | Read ADF, write lead | Yes; path (Q34) and fields (Q23) unknown | `integrations-backend:src/webhook/services/internal-api-loader.service.ts:134` |
| STL config | Type and source entries | Yes | `conversational-ai-backend:src/notifications/conversation-notifications.schema.ts:466` |
| Notification email | To BDC manager and backup | Yes; contents unknown (Q26, Q38) | not traced |
| CRM write-back | Status, appointment, opt-out | Certified CRMs only (Q29); this rooftop has no API: **dependency, not in scope**; CSM owns the agreement | `crm-core-service:src/crm-sync/external-crm-sync.service.ts:149` [E12] |
| DMS | None | Not touched | n/a |

## 10. Rollout
- **Pilot:** one rooftop, one sales team, API path only; no new flag. **Watch:** R10, BDC slip reports, the week-4 review.
- **Pause on:** a text to an appointment or credit-app lead, a chase message, a missed opt-out, a text outside the window, an untexted test lead, an after-hours transfer, a lead missing from the handoff, or an Ava-set appointment not on the board before its time.
- **Rollback:** source entry off, follow-up workflows cancelled; for a bypass lead or failed write, the forward is removed.
- **Dealer message (CSM)**, sent only after the production test shows the API path; the dealer pauses its texts after it: "Inquiries go live N business days after your after-hours texts are paused. Leads after <window end> are still called by your BDC in the morning. Appointment and credit-app texts: answer by <step 1 date>. Until write-back, your staff key Ava's conversations and appointments from the morning email or Console, which you told us was not enough; the automated record comes with write-back, dated once the channel is agreed. Vehicle location is a separate request."
- **Queue path:** "Inquiries cannot go live on configuration alone; your BDC works them as today; next answer by <E-1 date>."

## 11. Open questions
| # | Question | Who answers | Blocks |
|---|---|---|---|
| Q34, Q19, Q4, Q22, Q24 to Q26, Q32, Q33, Q35 to Q38 | Production path test, then go-live checks (section 4) | Engineering, CSM, then PM | Step 0 |
| Q39 | BDC hours, closed days, backup, arrivals after the window | CSM | Step 0 recipients; week 4 |
| Q15 | Leads by type, BDC minutes per callback | CSM | Nothing; week-one counts stand in |
| Q12, Q14, Q18, Q23 | Reply turn, displacement, parser, stored fields | Engineering, PM | Step 1 |
| Q7, Q11, Q20, Q27, Q28, Q30, Q31; Q10, Q17, Q21, Q29 | Step 2 design; write-back channel and size | PM, Engineering, CSM | Steps 2, 3 |
| PM | E-1 queue path; E-2 dates; E-3 no-API channel; Q14 | PM | Steps 0, 1, 3 |

## 12. Jira story
**Summary:** STL for after-hours website inquiries (config) plus lead-type proof

**Description:**
Step 0 (section 4): production path test, then STL on for forwarded inquiries, first text only, BDC handoff. Step 1: prove lead type reaches the lead and reply turn; size step 2.
PRD: product/work/vini-sales/fd24140-stl-and-widget-configuration/prd/v4.md

**Acceptance criteria:** A1 to A25 in the PRD.

**Labels:** pm-os, vini-sales, lead-type-aware-stl-first-message

---
Version history (all 2026-10-16): v1 draft; v2 round 1; v3 round 2; v4 fit check and round 3: vehicle location out, automated record step 3 only, `CUSTOM_TIME` and type-entry mode, second test, week-4 floor and board check.
