# PRD: Unanswered queue on Conversations (sales and service)


| Author       | Senior PM, Vini Sales Agents                                                               |
| ------------ | ------------------------------------------------------------------------------------------ |
| Last updated | 2026-10-16                                                                                 |
| Status       | Approved with changes, Gate 3 (2026-10-16)                                                 |
| Area         | vini-sales (console surface shared with vini-service)                                      |
| Source       | Freshdesk 24641, work folder product/work/vini-sales/fd24641-single-screen-conversation-ui |
| One-pager    | product/work/vini-sales/fd24641-single-screen-conversation-ui/one-pager/final.md           |
| Decision     | build-generalised, my-unanswered-queue (decide.md, PM override 2026-10-16)                 |


## 1. Problem

- When Vini hands a customer to a person, nobody sees that the customer now waits on a human, or on which one [E6, E16].
- The used car manager wants to "only stay in one screen" and click "[my] unanswered" [E5, E6, E7].
- He is adding two salespeople and already has "trouble with them following up" [E5, E6, E7].
- His floor cross-checks Conversations, Action Items and two VinSolutions tabs on about 600 leads a month (dealer-stated, not audited) [E10, E13].
- Cost: handoff wait plus manager cross-checking, unmeasured. Service RO value is unknown [E16, E37, Q15].
- **Honest gap** [PM] [E5, E7]:
  - On day one his rooftop gets the team view and click clears.
  - His "mine" and one-screen asks wait on the VinSolutions owner and activity reads.
  - No VinSolutions write-back is planned this quarter.

- **Who this is for** [E5, E6, E37, Q10]:
  - Sales: sales and used car managers, salespeople, BDC.
  - Service: service managers, advisors, service BDC.
- **What it changes** [ASSUMPTION: 2-week target, 30-day review]:
  - Flywheel stage: lead to appointment; service customer to RO.
  - Removes: hours to first human reply per department.
  - Whether it moves appointments shown or service bookings is checked in Phase 0 (Spyne data, correlational).
  - No gross claim until then.

## 2. Evidence

- "a dashboard that says unanswered [...] [my] unanswered, click on it" [E7]; a "customers unanswered" line on Conversations [E11].
- 1 rooftop asked, 0 others in 90 days, 2 companies with the adjacent job; built because the console is the product [E25, E26, E42].
- The team list picks leads by lead `service_type`, newest conversation first; never by owner or wait `conversational-ai-backend:src/customers/customers.service.ts:2512`.
- Unread is not unanswered: AI sends set it `conversational-ai-backend:src/sms/sms.service.ts:753`; any reader clears it for all `conversational-ai-backend:src/customers/customers.service.ts:1092`.
- The lead assignee is Spyne's round-robin, not the CRM salesperson `conversational-ai-backend:src/crm_integration/crm_integration.service.ts:267`.



## 3. Goals and metrics

Terms used in this PRD:

- **Episode:** one customer waiting on a human reply; one per lead and department (R1).
- **Human-owed:** a person, not Vini, owes the customer the next reply (R1).
- **`since`:** the time the episode opened.
- **In hours:** inside the department's working hours. "In-hours minutes" count only those.
- **N:** in-hours minutes an episode may stay open before it escalates (R5).
- **Aged:** past its aging cutoff where we cannot see CRM replies (R3).
- **Attestation:** a per-department setting that reps reply only in the console (R6).
- **Mark only:** the episode shows in the views, but no text goes (R6).
- **This L:** this build, sized L.

### Cut the handoff wait

- **Metric:** median hours from episode open to first human reply.
  - Split per department, agent and channel.
  - Click-cleared and aged episodes count as unreplied.
- **Measured in:** Mongo `unanswered_episode_transitions`; ClickHouse via `UNANSWERED_EPISODE_EVENTS`, reconciled daily.
- **Baseline:** unknown; Phase 0.
- **Target:** set after baseline.

### Know where reps reply

- **Metric:** console-reply share per rooftop, department and week.
  - Formula: cleared by console reply / cleared any way or aged. Opt-outs are left out.
  - It is a proxy: without an activity read, CRM replies count as aged.
- **Measured in:** same as above.
- **Baseline:** Phase 0.
- **Target:** one definition for R6 and the success check.

### Clears and texts are real

- **Metrics:**
  - Click and aged share per owner.
  - CRM clears by actor.
  - Replies per member.
  - Summary texts sent, deferred and failed.
- **Measured in:** same as above.
- **Baseline:** none.
- **Target:** failures reviewed weekly.

### Wait links to the P&L

- **Sales metric:** shows within 7 days, by wait bucket, where show status is read. Else meetings set, labelled.
- **Service metric:** Vini Service bookings, if they are in `meetings`. Customer-pay ROs are unmeasured.
- **Measured in:** Mongo `meetings`, filtered to:
  - strict `conversation_id`;
  - `source='spyne'`, `is_active=1`;
  - SMS >30s, calls ±7 days;
  - no demo or reminder;
  - after `since`.
- **Baseline:** unknown.
- **Target:** check, not the claim.

### Fewer screens

- **Metric:** Action Items page views per member and manager. Manager time is unmeasured.
- **Measured in:** console analytics event.
- **Baseline:** unknown.
- **Target:** check.

Never from `vini_reporting.conversation_fact`, `isUnread`, `conversationAnalytics.outcome` or agent-reported transfer fields.

## 4. Scope

**In scope**

- Unanswered episodes; team view and count per department.
- "Mine" for sales once the VinSolutions read connects.
- Capped escalation in department hours, gated texts, manager view, episode record and events.
- Every agent on the surface:
  - Sales: inbound, outbound, STL, chat if listed.
  - Service: inbound and outbound.

**Per-rooftop configuration** (defaults go to the PM, Open question 4)


| Setting                                    | Default                                                                    |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| View flag, sales                           | On at day one                                                              |
| View flag, service                         | Off until confirmed                                                        |
| Writer switch                              | On                                                                         |
| Owner source                               | None                                                                       |
| Owner-to-member map                        | Empty                                                                      |
| Owner max age                              | 24 hours                                                                   |
| Unowned-queue owner                        | Sales/BDC or service manager                                               |
| Manager list                               | That owner always, plus recipients                                         |
| Manager list until the CSM briefs the store | The rooftop's console admins [PM]                                          |
| Recipients                                 | None until set                                                             |
| N (escalation threshold)                   | 30 in-hours minutes                                                        |
| Text window                                | 30 minutes                                                                 |
| Hours, sales                               | Team working hours                                                         |
| Hours, service                             | Its own, else a setting the CSM fills before the pilot                     |
| Hours unset                                | No escalation                                                              |
| Attestation "reps reply only in the console", per department | False                                                    |
| Aging cutoff, sales                        | 24 in-hours hours                                                          |
| Aging cutoff, service                      | Close of that day                                                          |
| Aged label                                 | "Possibly answered in CRM" or "in scheduler or by phone"                   |
| Missed calls                               | Off                                                                        |


Action-item allowlist, per department:

- Explicit normalised intents, written at enablement.
- Sales: all but lost-lead and no-meaningful-interaction.
- Service: set after reading its intents.
- New intents open nothing until added.

**Out of scope**

- The two boards, counters, journey stages, removing Customers [E28, E30, E32].
- Console reassignment [E43].
- Scheduler or DMS reads (service "Mine", booking, RO, advisor messages): per provider, sized apart [Q19].
- CRM or DMS write-back: the full-value path. No VinSolutions write-back this quarter [E16, E34] [PM].
- Action item missing from Customers [E9]: bug path.
- Any change to `isUnread`, `lastReadAt`, `has_unread` or Needs Attention.



## 5. How it works today and after


| Step                              | Today                                                  | After                                                                    | Ref                                                                 |
| --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Customer messages after a handoff | `isUnread` flips on create, calls, any email, AI sends | Opens or joins the lead's department episode if human-owed               | `conversational-ai-backend:src/sms/sms.service.ts:1924`             |
| Someone opens the thread          | Clears unread for every member                         | Never clears Unanswered                                                  | `conversational-ai-backend:src/customers/customers.service.ts:209`  |
| Team list                         | Leads by lead `service_type`; `createdAt` desc         | Unanswered queries open episodes by their department, oldest first (R13) | `conversational-ai-backend:src/customers/customers.service.ts:2452` |



| Channel           | Console reply that clears                                                              | Otherwise            |
| ----------------- | -------------------------------------------------------------------------------------- | -------------------- |
| SMS, SMS v2       | `sendManualMessage` `conversational-ai-backend:src/sms/sms.service.ts:2582`            | CRM activity, click  |
| Customer email    | None found `conversational-ai-backend:src/conversation/conversation.controller.ts:101` | Same; reported apart |
| Chat, chat mirror | None found `conversational-ai-backend:src/chat-v2/chat-v2.controller.ts:35`            | Same                 |
| Calls             | Open only via R10                                                                      | n/a                  |




## 6. Requirements

### R1. When a wait opens (P0) `conversational-ai-backend:src/sms/sms.service.ts:2655` [E38, E40] [ASSUMPTION: bare-string action items are not handoffs]

- A customer message opens an episode only when the conversation is human-owed.
- Human-owed means any one of:
  - A handoff is pending or active.
  - An open action item has an allowlisted normalised intent.
    - Both naming generations of intents count.
    - Bare strings never count.
  - A member sent the last outbound message.
    - SMS marks this as `authorType: HUMAN`.
    - Email and chat have no such marker.
- Never opens from `conversationAnalytics.outcome`.
- Department:
  - The handoff's or the action item's department.
  - Else the lead's department.
- One episode per lead + department, across channels.
- Writers (paths that open episodes): SMS, SMS v2, email, chat, chat mirror.
  - Calls: only through missed calls (R10).

### R2. What clears a wait (P0) `conversational-ai-backend:src/external_crm_integrations/prepare_crm_data/vinsolutions.ts:191` [E13, E30] [PM]

- Clears a wait:
  - Any channel: a console reply. The replier is stored.
  - Sales: a store user's CRM activity after `since`.
    - An outbound call, text or email.
    - An inbound call logged as answered.
    - A visit or appointment marked shown, where the CRM tells them apart.
    - CRM activity enters via the owner endpoint (R4).
  - Service, once that provider's read exists:
    - A staff booking, RO action or advisor message.
    - That read is not in this L. So in this L, service clears only by reply, click or opt-out.
  - A click on "Handled elsewhere" or "No reply needed". Actor and time are stored.
  - Opt-out closes the episode.
- Never clears a wait:
  - Sales CRM activity that is:
    - by the Spyne integration user;
    - automation or a status change;
    - an unanswered inbound call;
    - from an unknown actor.
  - Service: a Vini booking.
  - Vini sends.
  - Opening the thread.

### R3. Team view, aging and reopen (P0) `conversational-ai-backend:src/customers/customers.service.ts:2452` [E7, E10, E13] [PM]

- One team view per department.
  - Oldest wait first; a toggle shows newest first.
  - Each row shows wait, channel and owner.
  - A live badge shows the count.
  - A row opens the thread and its action items.
- Aging:
  - Applies only without an activity read or that department's attestation.
  - An episode past its aging cutoff moves to `status: aged`.
  - The cutoff runs on the in-hours clock (R5).
  - An aged episode is off the badge, unreplied in metrics, and shown in the manager view (R7).
- Reopen:
  - A new human-owed customer message on an aged episode reopens it (R12).
  - The reopened episode goes back on the badge.
- Backfilled episodes never show.

### R4. "Mine": the CRM owner (P0) [PM] [E43] `conversational-ai-backend:src/leads/leads.service.ts:117`

- "Mine" shows episodes owned by:
  - Sales: the CRM salesperson.
  - Service: the scheduler or DMS advisor, once read.
- The owner is stored in `externalOwner.{department, source, externalId, consoleUserId, syncedAt}`.
- One writer: a conv-ai internal endpoint fed by integrations-backend.
  - Idempotent on lead + department + `syncedAt`; newest wins.
  - Also sets `ownerConsoleUserId` on open episodes.
- Refresh:
  - Where the provider allows, an episode opening queues a deduped refresh (per lead + department).
  - Inbound never waits on it.
  - The stored owner shows meanwhile.
- "No owner" for the Spyne integration user and for acquisition leads.
- Never `assigned_to` (Spyne's round-robin assignee).
- Never written to the CRM.

### R5. Escalation texts (P0) `conversational-ai-backend:src/notifications/notifications.service.ts:156` [E6] [ASSUMPTION: 30-minute default N and text window]

- A 1-minute sweeper (a background job that runs every minute) escalates episodes.
- It claims an episode open N in-hours minutes by setting `escalatedAt` atomically.
  - The owner keeps the episode.
- Summary texts:
  - One per recipient, department and text window.
  - Claimed by a unique upsert on that key before sending.
  - Content: count, oldest wait, link, episode ids.
  - Later escalations go at window end.
- Failures:
  - One retry, then `text_failed`.
  - The summary stores `textAttempts` and `lastTextError`.
- One in-hours function serves both escalation and aging.

### R6. When texts are allowed (P0) [PM] [E13] [ASSUMPTION: 80% console-reply share threshold]

- Texts go only where we see replies, per rooftop per department.
- Texts are allowed when one of these holds:
  - Sales: a live activity read that meets the actor rule (R2).
  - Service: an advisor-communication read.
    - An advisor or RO read is not one.
  - That department's attestation.
    - Set by the CSM at the department manager's request.
    - Reverts to mark only below the weekly console-reply threshold.

### R7. Manager view (P0) [E6] [PM]

- One manager view per department.
- Access: the manager list only.
  - Until the CSM briefs the store, the list is the rooftop's console admins.
  - So aged episodes are always visible to someone.
- Per owner:
  - Open and aged counts.
  - In-hours oldest wait of each.
  - Click clears, with actor and time.
  - Replies per member.
- No owner, Unmapped and Stale rows sit under the unowned-queue owner.
- Deferred and failed texts.
- "Escalation not configured", where it applies.

### R8. Flags, switch and safety (P0) `conversational-ai-backend:src/service-metrics/contact-metrics.service.ts:1743` [ASSUMPTION: 50 ms p95 writer budget]

- View flag, per rooftop per department: hides the view, count and texts.
- Writer switch, global and per rooftop: stops fields and events.
- Writer errors are counted and alerted. They never fail inbound.
- Unchanged: `isUnread`, `has_unread`, Needs Attention, contact metrics, `unreadCount`.

### R9. Owner text (P1) [E33] `conversational-ai-backend:src/tools/human-transfer.service.ts:149`

- Applies where "Mine" is connected.
- One text to the owner when the episode opens in hours.
- Out of hours, it goes at hours start.
- It counts in the text window.
- No handoff text goes today, so there is nothing to suppress.

### R10. Missed calls (P1) [E31]

- Missed calls open an episode where:
  - the missed-call setting is on, and
  - a missed-call record exists.

### R11. Landing view per member (P2) [E7, E13]

- Each member has a landing view: Unanswered, All or Needs Attention.

### R12. Episode record and shared service (P0) `conversational-ai-backend:src/sms/kafka/human-transfer-events.producer.ts:69` [PM]

- One shared service opens and clears episodes.
- Record: mutable Mongo `unanswered_episodes`.
  - `enterpriseId`, `teamId`: set at open from the lead, never changed.
  - Also `leadId`, `department`, `status`, `since`, `channel`, `reason`, `ownerConsoleUserId`, `escalatedAt`, `agedAt`, `clearedBy`, `clearedByUserId`, `backfilled`.
  - Written by this service, the sweeper (R5) and the owner endpoint (R4).
- Status changes:
  - `open` to `aged` at the aging cutoff (R3).
  - `aged` to `open` on a new human-owed customer message: `reopened`, new `since`, `escalatedAt` reset.
  - `open` or `aged` to `cleared` on a clear.
- Opening is atomic:
  - A unique partial index on lead + department, where status is open or aged.
  - A duplicate-key insert is a silent no-op.
  - The message then joins or reopens the existing episode.
- Every clear matches an `episodeId`:
  - A click clears the one it read.
  - A reply or CRM activity clears the open-or-aged episode for lead + department whose `since` precedes the activity time.
  - So older activity never clears a newer episode.
- Events:
  - Transitions append to `unanswered_episode_transitions`, the metrics source.
  - Kafka events keyed `episodeId + type` are best-effort, reconciled daily.
- Backfill, 14 days:
  - Where replies are observable: SMS `authorType`; claim and release events; action item creation and completion.
  - Others are labelled.
  - Marked `backfilled: true`; baseline only.

### R13. Team list query (P0) `conversational-ai-backend:src/customers/customers.service.ts:2512` [PM]

- `GET /customers/conversations/team` with `unansweredOnly` queries open episodes, not the lead pre-query.
- Filters: `enterpriseId`, `teamId`, episode department, bucket (`status` open or aged), optional `ownerConsoleUserId`.
- Sort: `since` ascending or descending.
- Paginated on episodes, then joined to conversation and lead.
- Indexes:
  - `enterpriseId` + `teamId` + department + status + `since`.
  - The same with `ownerConsoleUserId`.
- The badge counts the same query.

### R14. CSM onboarding at the requesting rooftop (P1) [PM] [E8]

- Held at the requesting rooftop before its day one.
- Trains managers, salespeople and BDC on Conversations, the Unanswered view and "Handled elsewhere".
- Covers the setup half of his ask, which needs no build.




## 7. Acceptance criteria

### A1-A7 for R1: opening a wait

- **A1.** Given a sales inbound SMS with a handoff pending, or sales outbound, STL or chat if listed, when a message meets R1, then it shows in the sales view with its reason, and one `opened` is written. Covers R1 [E7, E17].
- **A2.** Given no handoff or active human, a lead released to Vini, or only a bare-string, `SALES_LOST_LEAD` (any casing) or unlisted item, when the customer texts, then no episode opens. Covers R1 `conversational-ai-backend:src/action-items/action-items.service.ts:249`.
- **A3.** Given no open episode for lead + department, when two pods process an SMS and an email at once, then one episode and one `opened` result; the losing insert is a no-op. Covers R12 `conversational-ai-backend:src/leads/leads.service.ts:115`.
- **A4.** Given a dealer-sent email or Vini outbound, when it is written, then no episode opens and `isUnread` behaves as today. Covers R1, R8 `conversational-ai-backend:src/conversation/conversation.service.ts:777`.
- **A5.** Given a sales lead with an open service action item, when the customer texts, then the episode is in the service Unanswered list, not sales. Covers R1, R13 [E38].
- **A6.** Given service inbound ends with a service action item, or a recall reply goes to an advisor, when the customer messages, then the episode shows in the service view. Covers R1 [E38].
- **A7.** Given a service inbound or recall reply that Vini fully handles, when the customer messages, then no episode opens. Covers R1 [E38].

### A8-A12 for R2: clearing a wait

- **A8.** Given rep A owns an open episode, when rep B replies in the console, then it clears with `clearedByUserId` = B; the manager view shows B's reply, owner A. Covers R2, R7 [E6, E7].
- **A9.** Given the VinSolutions activity read is live, when a store user logs an outbound call, answered inbound call or showroom visit after `since`, then it clears with `clearedBy = crm_activity`, actor stored. Covers R2 [E13, E30].
- **A10.** Given an open episode, when any of the following happens, then it stays open. Covers R2 `conversational-ai-backend:src/customers/customers.service.ts:1092`.
  - A manager opens it.
  - Vini sends or books.
  - An RO status question comes in.
  - The only activity is Spyne-user, automated, status, unanswered-call or actorless.
- **A11.** Given the activity read is absent, when a rep clicks "Handled elsewhere", then it clears, sits in the owner's click list, and stays outside the median. Covers R2, R7 [E13].
- **A12.** Given an open episode, when the customer opts out, then `clearedBy = opted_out` and no escalation follows. Covers R2 [PM].

### A13-A18 for R3: team view and aging

- **A13.** Given both departments are on, when a member switches department, then only that department shows, oldest `since` first, and the badge equals the query total. Covers R3, R13 `spyne-console-microfrontends:apps/converse-ai/contexts/mainContext.tsx:241`.
- **A14.** Given the flag is off, unreadable or rolled back, when a member opens Conversations, then all of these hold. Covers R3, R8 `conversational-ai-backend:src/service-metrics/contact-metrics.service.ts:1784`.
  - No view, badge or text within a minute.
  - Fields still write.
  - `isUnread`, Needs Attention and counts are identical.
- **A15.** Given the team list query fails, when a member opens Unanswered, then an error with retry shows and other lists load. Covers R13 `conversational-ai-backend:src/customers/customers.controller.ts:16`.
- **A16.** Given no activity read or attestation for that department, when an episode passes the aging cutoff in department hours, then it is aged, and all of these hold. Covers R3, R7 [E10, E13].
  - Off the badge.
  - Under its owner in the manager view.
  - Unreplied in metrics.
- **A17.** Given sales closes Saturday 17:00 and is closed Sunday, when an episode opens Saturday 16:30, then it is on the badge at Monday opening. Covers R3, R5 [E6].
- **A18.** Given a Phase 0 backfill exists, when the flag turns on, then only live episodes show, and no texts go for backfill. Covers R3, R12 [E13].

### A19-A22 for R4: "Mine"

- **A19.** Given the VinSolutions owner read is live and mapped to X, when X opens Mine, then only X's CRM-owned episodes show. Covers R4, R13 [E43].
- **A20.** Given no CRM owner (even if `assigned_to` = X), the Spyne user, no seat, or past max age, when an episode opens, then it is in no one's Mine, on a No owner, Unmapped or Stale row. Covers R4, R7 `conversational-ai-backend:src/crm_integration/crm_integration.service.ts:267`.
- **A21.** Given the desk moves the customer to a closer, when the customer texts, then the episode is in the closer's Mine after refresh or sync, `since` unchanged. Covers R4 [PM].
- **A22.** Given the owner read is slow, down or failing, when an episode opens and at the next sync, then all of these hold. Covers R4 `conversational-ai-backend:src/external_crm_integrations/prepare_crm_data/vinsolutions.ts:191`.
  - Inbound is unchanged.
  - The stored owner shows until max age, then Stale.
  - "No owner" if never read.

### A23-A28 for R5: escalation

- **A23.** Given N 30, texts allowed and one recipient, when an episode is open 30 in-hours minutes, then it is escalated, one text goes, and the owner is unchanged. Covers R5 [E6].
- **A24.** Given two sweeper instances, when ten episodes escalate in five minutes and an eleventh after the text, then one text goes with ten and the oldest wait; the eleventh goes at window end. Covers R5 [E6, E10].
- **A25.** Given an escalated episode, when it clears, hours end or the flag turns off, then no further text goes; the clock pauses out of hours. Covers R5 [PM].
- **A26.** Given N, recipients, hours or timezone unset, when an episode ages, then no escalation, "not configured" shows, and there is no UTC or Eastern fallback. Covers R5 `conversational-ai-backend:src/slot-bookings/slot-bookings.service.ts:208`.
- **A27.** Given service opens 07:00 (stored or set, Open question 5) and sales 09:00, when a service episode opens at 06:45, then the service clock starts 07:00. Covers R5 `conversational-ai-backend:src/slot-bookings/slot-bookings.service.ts:208`.
- **A28.** Given the SMS provider rejects, when a summary send fails, then one retry, then `text_failed` with its episode ids, shown to the manager. Covers R5 `conversational-ai-backend:src/notifications/notifications.service.ts:156`.

### A29-A31 for R6: when texts go

- **A29.** Given sales is attested with console-only reps, when a sales episode passes N, then the text is sent. Covers R6 [PM].
- **A30.** Given any of the following, when an unattested department's episode passes N, then mark only. Covers R6 [E13].
  - Sales attested, service not.
  - No activity read.
  - Service advisor and RO reads only.
- **A31.** Given texts are allowed, when the read goes down or that department's share falls below threshold, then mark only, and the CSM is told. Covers R6 [PM].

### A32 for R7: manager view

- **A32.** Given three owners with open episodes and recipients unset, when the unowned-queue owner, then a non-manager, opens it, then the owner sees the R7 fields and "escalation not configured"; the non-manager is denied. Covers R7 [E6].

### A33-A35 for R8, R12 and R9: writer, Kafka and owner texts

- **A33.** Given the writer switch is off, or the writer throws, when a customer texts, then no fields or events, or the error is counted; inbound is identical. Covers R8 `conversational-ai-backend:src/sms/sms-v2.service.ts:3517`.
- **A34.** Given Kafka is down, when an episode opens or clears, then the queue works and the reconcile fills ClickHouse. Covers R12 `conversational-ai-backend:src/sms/kafka/human-transfer-events.producer.ts:69`.
- **A35.** Given Mine is connected, each of these holds. Covers R9 [E33].
  - When an episode opens in hours, then one owner text goes.
  - When the owner is unmapped, then none goes.
  - When it opens out of hours, then the text goes at hours start.

### A36-A39 for R3, R12, R2, R7 and R14: reopen, clear matching, default manager list, onboarding

- **A36.** Given a sales episode aged Friday, when the customer texts Monday in hours, then the same episode goes back to `open` with a new `since`, on the badge; one `reopened`; no second episode. Covers R3, R12 [PM] [E10].
- **A37.** Given an episode opened 10:00, when a rep reply or CRM activity at 09:50 arrives at 10:05, and one at 10:10, then the first leaves it open and the second clears that `episodeId`. Covers R2, R12 [PM].
- **A38.** Given an unbriefed sales rooftop with no recipients, when an episode passes the aging cutoff, then it is aged, console admins see it under its owner in R7, and no text goes. Covers R3, R7 [PM] [E6].
- **A39.** Given the requesting rooftop before day one, when CSM onboarding is held, then managers and reps are shown Conversations, Unanswered and "Handled elsewhere", logged by the CSM. Covers R14 [PM] [E8].




## 8. Edge cases


| Scenario                          | Handling                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Service customer before the visit | Usually "No owner" (advisor assigned at write-up); unowned-queue owner works it |




## 9. Integrations and dependencies

### VinSolutions salesperson `conversational-ai-backend:src/external_crm_integrations/prepare_crm_data/vinsolutions.ts:191`

- **What we read:** owner per lead.
- **Available today:** no. The push hardcodes "AI SPYNE".
- **Status:** not in evidence.
- **Access:** Integrations PM with Partnerships [PM].
- **Size:** inside this L [ASSUMPTION: the VinSolutions read fits inside the L].

### CRM activity, VinSolutions first `conversational-ai-backend:src/external_crm_integrations/prepare_crm_data/eleads.ts:240`

- **What we read:** outbound touches, answered inbound calls, visits, each with actor.
- **Available today:** unknown, including whether types are told apart [Q18].
- **Size:** whether it fits inside the L is unknown.
- **Gates:** sales clears, texts, the requester's check.

### Scheduler/DMS `conversational-ai-backend:src/meetings/appointment-alert.service.ts:160`

- **What we read:** advisor, staff booking, RO, advisor messages.
- **Available today:** none read [Q19].
- **Size:** not in this L.
- **Gates:** service Mine, clears, texts.

### Hours, recipients `conversational-ai-backend:src/notifications/notifications.service.ts:156`

- **What we read:** timezone, phones; service hours.
- **Available today:** yes; service hours unknown.

### Manager role (ref: missing)

- **What we read:** manager view access.
- **Available today:** no role guard in conv-ai; per-rooftop list.

### Missed-call record `conversational-ai-backend:src/conversation/conversation.service.ts:650`

- **What we read:** unanswered inbound call.
- **Available today:** unknown [Q9].




## 10. Rollout

- **Phase 0, dark, 2 weeks**
  - Writer on, view flags off, backfill.
  - Per department, from episode records:
    - Baseline wait. CRM replies show as aged, labelled.
    - Rooftops above N.
    - Console-reply share per rooftop.
    - Expected clicks: episodes a day not console-cleared before the cutoff, per rooftop and last console replier.
    - Wait-to-outcome within 7 days, inside versus outside N (Spyne data, correlational).
  - No link: the claim is screens removed (Action Items page views).
- **Before day one**
  - The CSM briefs departments below the threshold.
  - With each manager, the CSM sets recipients, hours and the unowned-queue owner.
  - The CSM runs R14 at the requester.
  - Unbriefed rooftops get the view unconfigured (A26), with console admins as the manager list (A38). This is not a delay.
- **Day one: sales, every rooftop including the requester [PM]**
  - Team view, count and click clears.
  - "Mine" and CRM clears at the requester once its VinSolutions reads are live.
  - Texts only where R6 passes.
- **Service**
  - Per rooftop, once Vini Service is confirmed [Q10].
  - The first is a pilot with its own Phase 0 baseline.
  - Pass [PM], at 20 or more service episodes a week [ASSUMPTION: 20-episode weekly service floor]:
    - Median wait falls against the pilot baseline.
    - Click share and aged share do not rise against it.
    - Vini Service bookings are reported.
  - Below the floor: inconclusive.
  - Inconclusive or fail: the next rooftop does not turn on.
- **Success check** [ASSUMPTION: 20 episodes a week and 50% click-share trigger]
  - 1-2 live Vini Sales rooftops, picked by the PM and CSM lead before day one.
  - Each has at least 80% console-reply share and 20 episodes a week in Phase 0.
  - The requester is measured once its activity read is live.
  - If median wait does not fall by the target set after Phase 0 [PM]:
    - The sales view stays on.
    - Escalation texts stop expanding: no new rooftop starts texts.
    - Rooftops already texting continue.
- **Weekly watch, PM**
  - Sales owner click share over 50% triggers a CSM call.
  - Service threshold: from the pilot's first two live weeks.
  - Aged share.
  - Text failures go to Vini backend.
  - Unconfigured rooftops and unmapped owners go to the CSM lead.
- **Rollback:** view flag (A14); writer switch (A33).



## 11. Open questions


| #   | Question                                                                                                                                                                                   | Who answers                           | Blocks           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ---------------- |
| 1   | Which providers expose owner, activity with actor (outbound, answered inbound, visit apart), booking, RO, show status (none known); freshness? [Q18, Q19]                                  | Integrations PM; integrations-backend | R2, R4, R6       |
| 2   | Missed-call record and call actor? [Q9]                                                                                                                                                    | Vini backend                          | R10              |
| 3   | Which rooftops run Vini Service; who works it; do advisors reply by scheduler or phone? [Q10]                                                                                              | CSM lead                              | Service flag     |
| 4   | Escalated: L displaces; VinSolutions read status; activity read in the L; no-qualifier fallback; defaults. Decided at Gate 3: no write-back this quarter; failed check keeps the view [PM] | PM                                    | Roadmap, rollout |
| 5   | Service hours stored? Vini Service bookings in `meetings`?                                                                                                                                 | Vini backend                          | R5, metrics      |
| 6   | Does the VinSolutions push set the lead salesperson? Chat or email member reply path?                                                                                                      | integrations-backend, console team    | R4, R2           |
| 7   | Live Vini Sales rooftops, how many meet the threshold, CSM hours to brief?                                                                                                                 | CSM lead                              | Setup            |
| 8   | Ship the unique index before the writer switch?                                                                                                                                            | Vini backend                          | R12              |




## 12. Jira story

**Summary:** Unanswered queue on Conversations: episodes, team view, Mine, capped escalation
**Description:** Customers Vini hands to a person wait unseen. Add human-cleared episodes, an episode-keyed team view, CRM-owner "Mine", capped escalation, a manager view. PRD: product/work/vini-sales/fd24641-single-screen-conversation-ui/prd/final.md
**Acceptance criteria:**

- [ ] A1 to A12 opening, clears; A13 to A22 view, aging, Mine
- [ ] A23 to A32 escalation, gate, manager view; A33 to A35 writer, Kafka, owner texts
- [ ] A36 to A39 reopen, clear matching, default manager list, requester onboarding

**Labels:** pm-os, vini-sales, vini-service, my-unanswered-queue

---

Version history: v1 2026-10-16 first PRD from the Gate 2 one-pager. v2 2026-10-16 round 1: false clears, text cap, episode reliability, backfill, metrics. v3 2026-10-16 round 2: episode-keyed list query, text window, in-hours aging, console-reply share, per-department attestation, service pilot bar. Gate 3 2026-10-16 [PM]: four majors, rollout incl. requester, R14.
