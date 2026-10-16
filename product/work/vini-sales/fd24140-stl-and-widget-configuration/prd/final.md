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
- The BDC (business development center, the dealer's phone team) calls website leads the next business day. After-hours leads wait overnight, and the dealer will forward only those to Spyne [E8, E9].
- The VP Marketing wants three things from Ava [E5, E6]:
  - set appointments when there are none;
  - confirm them when there are;
  - stay out of credit applications and PII.
- One shared prompt writes every STL (speed to lead, the first text after a lead arrives) opener. Lead type only switches STL on or off `conversational-ai-backend:src/sequence-workflows/services/sequence-task-message-generation.service.ts:441` [E20, E36].
- As a result, a customer who booked online is pushed to rebook, and a credit applicant gets an AI pitch [E1, E6].
- The dealer was told this was "being worked on". No Jira exists [E10, E25, E31].
- The dealer will not scale STL while staff key Ava's outcomes by hand [E12, E13].
- Steps 0 and 1 do not deliver that automated record. Only step 3 write-back does (CRM-first, planned) [PM] [E32].
- The step 0 handoff is an interim the dealer already declined [E13].

### Who this is for and what it removes
- **Who:** VP Marketing, BDC manager and agents, dealer software development manager [E5, E8, E12].
- **Flywheel stage:** lead to appointment. Credit apps stay with the store (Q28) [E5].
- **Removes:** the next-morning first call, replaced by a same-evening text [E8].
  - This covers inquiries forwarded between BDC close and the window's end (9 pm local at most).
  - STL skips, not holds, later leads, so the BDC calls them as today `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1922`.
  - The share of those later leads is unknown (Q39).
  - Calls on resolved leads end only with step 3 [E8].

## 2. Evidence
- "drive appointments when there aren't appointments and confirm appointments when there are appointments" [E5]
- "We don't currently have an API... if an appointment was made, we can load it into our system." [E12]
- Demand: this rooftop plus 3 companies on calls in 90 days. Write-back was asked here only [E21, E22].
- STL eligibility runs through two config entries `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:131`, `:396`, `:446`-`:470` [E41]:
  - The type entry (the STL config row for a lead type) keys on external_type, the lead-type field STL reads.
  - A blank external_type resolves to "empty"; otherwise it resolves to DEFAULT.
  - The type entry is gated by its own mode first.
  - Any source entry (the STL config row for a lead source) must also pass, window included.
- Team silent hours do not stop an STL text; the entry's mode does `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1487`, `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:221`, `:267`, `:303`:
  - `SILENT_HOURS` allows 9 pm to 8 am by default.
  - `WORKING_HOURS` blocks on a non-working day or unset hours.
- Suppression cannot see the dealer's texts or BDC calls. Opt-out is an exact "STOP" only, with no consent check [E42, E43].
- Whether the ADF (the standard lead email format) lead type or appointment time reaches external_type is not visible [E39] (Q23).

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

Type splits join to `dealer_leads_raw.leads` on leadId. Never use `conversation_fact`.

## 4. Scope

### In scope (committed)
- **Step 0: configuration only, behind a go/no-go.**
  - STL on for after-hours website inquiries, with today's opener.
  - First text only.
  - A morning handoff to the BDC manager and a backup, keyed by staff.
  - This handoff is the interim the dealer declined [E13].
- **Step 1: proof** (S; STL and Integrations owners; PM dates it).
  - UAT leads of each type show whether type, appointment, credit-app status and submission time reach the lead and the reply turn.
  - Output: a step 2 size.

### Step 0 go/no-go, in production (Q34, Q19)
Routing and bypass values differ per environment, so UAT cannot decide it.

Two workflow-creation paths exist (section 5):
- **API path:** the STL task is created inline with the lead.
- **Queue path:** STL is SKIPPED and only the cadence is created.

How to run the test:
- The dealer sends one test inquiry from a staff phone to the real inbox, inside the window.
- Conditions: production config, nudge off, source not excluded.
- Record the task rows, the stored source and external_type, and the resolved entry and its mode.
- A second test inquiry is sent after the window ends.

Checklist (go only if every check passes):
1. **The inside-window test lead takes the API path.**
   - Passes: an STL task with smsSentAt (:395), and the bypass is not hit.
   - Fails, queue path (STL SKIPPED, `sqs-stl-deferred-to-api`): no-go; PM decides (E-1). Never exclude the source, because that removes the workflow (:197).
   - Fails, neither path, both paths, or bypass hit: no-go until traced.
2. **Source exclusion keeps the text and drops the follow-up** (API path only, A8).
   - Passes: re-run with the source excluded; the text still goes, and no FOLLOW_UP task exists.
   - Fails: the text does not go, or a FOLLOW_UP task exists.
3. **The after-window test lead fixes A5's branch.**
   - Passes: the result is recorded as skip or hold.
   - Fails: no branch is recorded.

### Which entry step 0 sets
- **Source entry:** keyed on the forwarding source (Q36).
  - It carries the window.
  - It is the on/off switch.
- **Type entry:** the one the test lead resolves to.
  - It must be on, with mode `FULLDAY` or a window covering the source window.
  - It is gated first (:446 to :470).
  - If it is "empty" or DEFAULT and off, it is turned on only when every other feed resolving to it is both:
    - listed, and
    - blocked by its own source entry, or accepted by the VP Marketing.
  - Otherwise, no-go.
- Rollback never touches DEFAULT.

### Other go-live checks (all must pass)
**Forward**
1. **Forward excludes appointment, credit-app and open BDC leads** (Q33).
   - Passes: the rule excludes them, or the dealer accepts in writing.
   - Fails: any of them is forwarded without written acceptance.
2. **Source string is stable and unshared** (Q36).
   - Passes: the string does not change and no other feed uses it.
   - Fails: it changes, or another feed shares it.
3. **Forward lag is under 6 hours.**
   - Passes: under 6 hours.
   - Fails: 6 hours or more.

**Window (Q22)**

4. **Window mode is `CUSTOM_TIME` only.**
   - Passes: `CUSTOM_TIME`.
   - Fails: `SILENT_HOURS` or `WORKING_HOURS` (blocks closed days and unset hours, :267, :303).
5. **Window is set for every day, including BDC-closed days.**
   - Passes: every day has a window.
   - Fails: any day is unset.
6. **Window sits inside 8 am to 9 pm customer local time.**
   - Passes: inside that range.
   - Fails: any part falls outside it.
7. **Team timezone is set, not UTC.**
   - Passes: the team's own timezone is set.
   - Fails: unset, or UTC.

**Dealer sign-off and opt-out**

8. **Dealer texts are paused** (Q25).
   - Passes: paused, or the VP Marketing accepts no touch for skipped leads.
   - Fails: neither.
9. **Consent, STOP-only opt-out and window are signed** (Q24).
   - Passes: signed by the GM or dealer principal.
   - Fails: not signed.
10. **Same-day optOut.sms (the SMS opt-out flag) is possible** (Q37).
    - Passes: a non-STOP opt-out can get optOut.sms the same day (R4).
    - Fails: it cannot.

**Handoff**

11. **Handoff surface carries R5's fields on the test lead, with each status's source named** (Q26, Q38).
    - Passes: every field shows, each status with its named source.
    - Fails: any field or source is missing.
12. **Two recipients cover every showroom day** (Q39).
    - Passes: every showroom day has a covering recipient.
    - Fails: any day is uncovered.

**Other**

13. **Reminders are owned once** (Q32).
    - Passes: one owner sends reminders.
    - Fails: more than one owner.
14. **No after-hours transfer to an empty line** (Q35).
    - Passes: an after-hours request for a person does not transfer to an empty line (R12).
    - Fails: any such transfer.
15. **Widget fix is confirmed** (Q4).
    - Passes: confirmed.
    - Fails: not confirmed.

### Step 0 exit, week 4 (PM)
Keep step 0 on only if all of these hold:
- 0 non-inquiry texts.
- 0 chase sends.
- 0 missed opt-outs.
- noTask 0.
- 0 Ava-set appointments missing from the board before their time.
- Forwarded inquiries texted same evening at or above a share the PM sets once Q39 is answered.

Else stop: source entry off, forward removed.

### Per-rooftop configuration
- **Existing:**
  - forwarding-source entry and window;
  - type entry per Q34;
  - excludeSource (API path);
  - nudge off;
  - two recipients;
  - widget call off.
- **New:**
  - opener per type, with credit-app held out by default (step 2);
  - write-back, default off (step 3).

### Agents affected
- STL: R1 to R7, R11.
- SMS reply: R4, R12, Q12.
- Follow-up: off (R3).
- Widget: R8.
- Service: unchanged (R9, Q11).

### Out of scope
- Write-back. So there is no automated record of Ava's conversations or appointments until step 3 (section 1). The dealer message says so.
- Type inference from free text.
- A Spyne appointment copy (Q7).
- Service openers.
- Widget build.
- Routing onto the API path (E-1).
- A second rooftop.

### Vehicle location: out, own ticket [E16]
- Step 0 is configuration with today's opener.
- No lot field is shown reaching the lead or reply turn [E39].
- Naming the lot changes a shared reply agent.
- CSM wording:

> In the pilot Ava will not say which lot a vehicle is on. That needs each vehicle's location carried from your feed to her, which is unconfirmed, so it is a separate request. Your BDC sees every conversation on the morning handoff.

### Step 2, per-type opener: direction (M)
- **Gate:** Q12, Q23, Q11, Q14, Q15, Q30, and an E22 company that pilots.
- **Contents:**
  - a template on the type entry (`renderPrompt` :441, Q20);
  - literal credit-app text;
  - confirmations that never propose a new time;
  - a no-PII guardrail (Q31, Q27);
  - opt-out beyond STOP.

### Step 3, CRM-first read and write-back: direction (L)
- **Gate:** Q10, Q17, Q21, Q29, and an agreement the CSM starts during step 0.
- **Channel:** certified write-back; else one reusable no-API channel.
- **Delivery:** retried, idempotent, never silently dropped.

## 5. How it works today and after
| Step | Today | After (steps 0, 1) | Ref |
|---|---|---|---|
| Workflow creation | Queue: STL SKIPPED, cadence only. API: STL inline | Production Q34 first; API go, queue no-go | `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:193`, `:395` |
| Gate and window | Type and any source entry must pass; outside the window, a skip | Source entry carries the window | `...speed-to-lead-console-call.service.ts:446`, `:470` |
| After first text | Nudge and cadence run | Nudge off; source excluded | `conversational-ai-backend:src/notifications/conversation-notifications.service.ts:2408`, `:2634` |
| BDC handoff | Email (untraced), Console | R5 fields, named sources, two recipients | not traced (Q26, Q38) |

## 6. Requirements

### R1. Only after-hours inquiries are forwarded (P0) [E9, E14] [PM]
- Only after-hours inquiry leads reach the leads inbox.
- Appointment and credit-app leads are excluded.

### R2. One standard first text per inquiry, API path only (P0) `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:193`
- On the API path, each forwarded inquiry inside the window gets exactly one STL first text.
- That text uses the standard opener.
- On the queue path, no go-live.

### R3. Nothing follows the first text unless the customer replies (P0) `conversational-ai-backend:src/sequence-workflows/controllers/sequence-workflows.controller.ts:24` [E44]
- Nothing follows the first text unless the customer replies.
- A forwarded lead with a follow-up row in any status has its workflow cancelled that day.
  - "Any status" matters because a console save can reset the nudge.

### R4. Opt-outs stop all outbound (P0) `conversational-ai-backend:src/sms/sms.service.ts:2349` [E42]
- STOP ends all outbound.
- A non-STOP opt-out is caught on the handoff or by the daily scan. It then gets:
  - optOut.sms the same day (Q37; else no go-live);
  - do-not-contact at the dealer.
- A re-forwarded opted-out customer gets no text.

### R5. Morning handoff to the BDC manager and a backup (P0) [E8, E12, E13]
- Before open, the BDC manager and a backup get every forwarded lead.
- Each lead carries:
  - name and phone;
  - status, from a named source (Q38), one of:
    - texted;
    - replied;
    - callback requested;
    - appointment set;
    - opted out;
    - not texted, with reason;
  - appointment time;
  - summary;
  - Console link.
- A missing lead is called as today.

### R6. Rollback with no deploy (P0) `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:470` [E41]
- Turning the forwarding-source entry off stops new texts for forwarded leads that do not hit the bypass.
  - No deploy is needed.
  - DEFAULT is untouched.
- Removing the forward is the guaranteed rollback.

### R7. Step 1 proves what lead data arrives (P0) [PM] [E39]
- Step 1 answers Q23, Q12 and Q15.
- It records submission time and source per test lead.
- It sizes step 2.

### R8. Widget call option stays off (P1) [E3, E4]
- The widget call option stays off.
- The smartview-config failure is confirmed fixed, or filed.

### R9. Service teams unchanged (P0) `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:479` [E36]
- Service teams' STL config, messages and leads do not change.

### R10. CSM check cadence (P0) [PM] [E41]
- Reconciliation and non-inquiry texts: daily in week one, then weekly.
- Opt-out scan: daily throughout.
- Follow-up rows: daily until 4 clean weeks.
- Ava-set appointments against the board: weekly.

### R11. First text only inside the accepted window (P0) `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:341`
- No first text outside the accepted window.
- That window sits inside 8 am to 9 pm customer local time (Q22, Q24).
- A lead outside it shows "not texted (outside window)" and is called as today.

### R12. No after-hours transfer to an unstaffed line (P0) [E43] (Q35)
- An after-hours request for a person never transfers to an unstaffed line.
- The lead shows "callback requested" with the customer's words.

## 7. Acceptance criteria
> Each criterion names what it covers: happy path, negative, stop or fallback.

### R1. Forward rule
- **A1** (happy, negative). Given the forward rule is live, when a test inquiry, appointment and credit app are sent, then only the inquiry arrives [E9].
- **A2** (stop). Given step 0 is live, when a non-inquiry slips through or is reported, then [PM]:
  - the source entry goes off the same day until the rule is retested;
  - the BDC calls the lead.
- **A3** (fallback). Given the forward cannot exclude by type, when the go-live review runs, then no go-live [E10].

### R2. One first text, API path only
- **A4** (R2 and R11, happy). Given the API path and an inquiry inside the window, when the lead is created, then one text goes before BDC open and the bypass is not hit `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:341` (Q22).
- **A6** (negative, fallback). Given the production test shows the queue path, when the go-live review runs, then `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:197`:
  - no go-live;
  - the source is not excluded;
  - the PM decides.
- **A7** (stop). Given a customer texted inside this team's suppressionWindow, when a second forward arrives inside it, then no second text goes, and repeats per phone are counted daily `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1880` [E43].
  - The suppressionWindow is recorded at go-live; it is 15 hours if unset.

### R3. No follow-up
- **A8** (negative). Given the API path with the source excluded, when an inquiry arrives, then the text is sent and no FOLLOW_UP task exists `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:504`.
- **A9** (happy, stop). Given a text was sent with no reply, when 7 days pass, then no follow-up row exists in any status [E44].
- **A10** (fallback). Given a console save resets the nudge, exclusion or source entry, when the daily query runs (scheduled rows included), then `conversational-ai-backend:src/sequence-workflows/controllers/sequence-workflows.controller.ts:24`:
  - the nudge is off;
  - workflows are cancelled;
  - the source entry is off.

### R4. Opt-outs
- **A11** (happy). Given a texted customer, when they reply "STOP", then optOut.sms is set and nothing further is sent `conversational-ai-backend:src/sms/sms.service.ts:2349`.
- **A12** (negative, stop). Given a texted customer in week three, when they reply "unsubscribe" and are then re-forwarded, then [E42, E43]:
  - at most one reply is sent;
  - optOut.sms and do-not-contact are set by next morning;
  - no text goes on the re-forward.
- **A13** (fallback). Given no dealer pause and no written acceptance, when the go-live review runs, then no go-live [E15, E43].

### R5. Morning handoff
- **A15** (happy). Given the BDC manager is out, when it is before open, then every lead, with R5's fields, reaches the backup [E8] (Q26).
- **A16** (happy). Given Ava sets an appointment, when it is before open, or before the appointment on a BDC-closed day, then [E6, E12] (Q32, Q39):
  - the backup or BDC manager keys it;
  - they cancel any duplicate;
  - they confirm by call;
  - the CSM checks weekly.
- **A17** (fallback). Given the email lacks R5's fields, when the go-live review runs, then go only if all of these hold [E13]:
  - Console filters callback-requested and appointment-set leads;
  - A14 and A16 pass there;
  - the VP Marketing signs.
- **A18** (R5 and R10, fallback). Given a lead with no task, when the daily reconciliation runs, then it shows "not texted (no workflow)" and the BDC calls it `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:203`.
- **A19** (negative, stop). Given week one, when the daily CSM check runs, then [PM]:
  - the forwarded count equals the handoff count;
  - opted-out and booked leads are not cold-called.

### R6. Rollback
- **A20** (happy, stop). Given step 0 is live, when ops turns the source entry off, then the next test lead is not texted, DEFAULT is unchanged, and no deploy happens `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:560`.
- **A21** (fallback). Given a bypass lead, or a failed config write, when rollback is needed, then the forward is removed and no new leads arrive `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:760`.

### R7. Step 1 proof
- **A22** (happy). Given UAT leads of each type, when step 1 runs, then the stored fields and reply-turn variables are recorded [E39].
- **A23** (stop, fallback). Given the type is not stored (Q23), or the test-parse route is down, when step 1 runs, then `lambdas:crm-integrations/webhook-processor/crm-clients/adf.js:156`:
  - step 2 waits on a parser port;
  - fields are read from `dealer_leads_raw.leads`;
  - no dealer change is made.

### R8. Widget
- **A25**. Given the widget is live, when a shopper opens it, then there is no call option and SMS works [E4, E7].

### R9. Service unchanged
- **A24**. Given a service lead reaches the inbox, when the workflow is created, then there is no inline STL and the service config is unchanged `conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:479`.

### R11. Window
- **A5** (stop). Given an inquiry forwarded after the window ends, when the lead is created, then `conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:1946`:
  - no text goes (`stl-outside-*`);
  - the handoff shows "not texted (outside window)";
  - the BDC calls it.
  - If the second test shows a hold instead, the handoff shows "text due at <time>", and the BDC calls after that time.

### R12. No after-hours transfer
- **A14**. Given a lead texted at 11 pm, when the customer asks for a person, then [E43] (Q35, Q38):
  - there is no transfer to an empty line;
  - the handoff shows callback requested, with the customer's words;
  - the BDC calls first;
  - else no go-live.

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
| CRM write-back | Status, appointment, opt-out | Certified CRMs only (Q29); see note | `crm-core-service:src/crm-sync/external-crm-sync.service.ts:149` [E12] |
| DMS | None | Not touched | n/a |

CRM write-back note:
- This rooftop has no API.
- So write-back is a **dependency, not in scope**.
- The CSM owns the agreement.

## 10. Rollout
- **Pilot:** one rooftop, one sales team, API path only. No new flag.
- **Watch:** R10, BDC slip reports, the week-4 review.
- **Pause on any of:**
  - a text to an appointment or credit-app lead;
  - a chase message;
  - a missed opt-out;
  - a text outside the window;
  - an untexted test lead;
  - an after-hours transfer;
  - a lead missing from the handoff;
  - an Ava-set appointment not on the board before its time.
- **Rollback:**
  - source entry off, and follow-up workflows cancelled;
  - for a bypass lead or a failed write, the forward is removed.
- **Dealer message (CSM):**
  - Sent only after the production test shows the API path.
  - The dealer pauses its texts after it.

> Inquiries go live N business days after your after-hours texts are paused.
>
> Leads after <window end> are still called by your BDC in the morning.
>
> Appointment and credit-app texts: answer by <step 1 date>.
>
> Until write-back, your staff key Ava's conversations and appointments from the morning email or Console, which you told us was not enough. The automated record comes with write-back, dated once the channel is agreed.
>
> Vehicle location is a separate request.

- **Queue path message:**

> Inquiries cannot go live on configuration alone. Your BDC works them as today. Next answer by <E-1 date>.

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
- Step 0 (section 4): production path test, then STL on for forwarded inquiries, first text only, BDC handoff.
- Step 1: prove lead type reaches the lead and reply turn; size step 2.

PRD: product/work/vini-sales/fd24140-stl-and-widget-configuration/prd/v4.md

**Acceptance criteria:** A1 to A25 in the PRD.

**Labels:** pm-os, vini-sales, lead-type-aware-stl-first-message

---
Version history (all 2026-10-16): v1 draft; v2 round 1; v3 round 2; v4 fit check and round 3: vehicle location out, automated record step 3 only, `CUSTOM_TIME` and type-entry mode, second test, week-4 floor and board check. Readability pass on final.md: structure only, no change to scope, numbers or tags.
