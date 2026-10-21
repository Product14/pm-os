# Solution context: sms-offer-recovery (build-generalised, phases 1 to 3)

Code read from conversational-ai-backend origin/release e7190a7d9 (the prompt files and wake-up files are unchanged since 21dd50b5a) and lambdas release c846c1430.

## The judge's open question: wake-up vs live repeats
- 20 threads repeated the same pair after an untaken offer: **9 only in a wake-up, 7 only in live replies, 4 in both**. By message, 13 of the 30 repeats were wake-ups and 17 were live replies [E54].
- The warehouse settles it: every agent message sent after another agent message, with no customer turn between, has `wakeUpMessage = 1` [E54] [E56].
- Live repeats break a rule that the live prompt already renders. 13 of the 17 came right after a side question (address, price, photos, trade-in), and line 19 forbids a repeat "even after a side question" [E55].
- A wake-up-only fix (decide.md phase 1) fully covers at most 9 of the 20 threads. The other 11 still have a live repeat [E54].
- Read this alongside the outcomes. 4 of 7 live-only threads booked anyway, while 0 of 9 wake-up-only threads booked [E55]. The small sample does not show causation.

## Entry points today
- **Live SMS reply:** the sms-worker lambda requests the prompt with `flowType: "reply"`, calls the model, and posts to `/internal/sms/v2/messages/outbound` `lambdas:converse/sms-worker/index.js:1522`, `:1576` [E58].
- **Wake-up:** a Redis due-set cron dispatches `sendReplyMessage(..., true)` `conversational-ai-backend:src/sms/sms-wakeup.service.ts:268`. The lambda then switches to `flowType: "wakeup"` and removes the booking tools `lambdas:converse/sms-worker/index.js:1528-1532` [E58].
- **Prompt assembly:** `getAgentConfig` `conversational-ai-backend:src/sms/sms-v2.service.ts:3125`. `sales_v2.xml:57-66` swaps appointment-conversion for `sms-wakeup.xml` on a wake-up [E21].
- **Inventory miss:** `sales_new/unavailable-vehicle-discovery.xml:3`, `:40` [E24].

## What a change would touch
- **Phase 1, wake-up prompt:** `sms-wakeup.xml:44` says to re-ask the open question, and its example at `:53` re-offers times, so the repeat is the instructed behaviour. The self-check at `:13-14` did not stop 5 word-for-word copies [E57] [E21].
- **Phase 1, live SMS arm:** `appointment-conversion.xml:131` has no rule for the turn after an untaken offer [E17]. Line 19 already has the rule and it is not holding [E55].
- **Phase 1, miss ending:** `unavailable-vehicle-discovery.xml:40` [E10].
- **Phase 2, offer record:** extend `visitAskState` `conversational-ai-backend:src/conversation/conversation.schema.ts:58`. Its writer uses a rev-checked `$set` `src/tools/definitions/sales/sales-visit-ask-gate.tool.ts:401-403`. SMS conversations use the same model (`sms-wakeup.service.ts:331` queries it with `type: 'sms'`).
- **Phase 2, enforcement point:** a server-side block on a repeated pair has to sit in `sendOutbound` `sms-v2.service.ts:4020`, or in the lambda before the post. Generation lives in the lambda, so the change spans two repos [E58].
- **Phase 3, sourcing:** a new intent in `src/action-items/intent/intent-code.enum.ts:12-29` [E26].

## Who else calls it
- The fragments are shared by voice, chat and outbound voice (`sales_v2.xml:49`). Any rule outside the SMS arm or the wake-up file reaches channels that are out of scope [E13] [E24].
- Wake-ups and pencils also run on speed_to_lead and follow_up SMS [E22]. So an offer record covers STL by design.
- The pencil cron depends on a wake-up having been sent first [E22]. Changing what a wake-up says does not change when a pencil fires.
- Blue Brain's card for conversational-ai-backend is degraded, so its caller graph was not used (low confidence). Blast radius here comes from reading the code.

## Where per-store configuration can live
- Wake-up timing and cap per team: `resolveWakeupConfig` `sms-wakeup.service.ts:77`, set through `POST /notifications/configs/wakeup-config` (Blue Brain route, low confidence) [E19].
- Re-offer limit: the assertiveness level `agents-v2.service.ts:2901`.
- Pencil wait: `tentativeBooking.createAfter` [E22].
- No setting exists for sourcing on or off. Phase 3 adds one, default off [E25].

## Integration limits
- Timed CRM task exists today only on DriveCentric and PBS [E47] [E48]. eLead, Tekion, VinSolutions and ADF get untimed notes [E49] [E50] [E51] [E52]. Write-back for those four is a commercial dependency.
- Action items with no conversation_id are dropped before the push [E45].
- Phases 1 and 2 need no DMS or CRM write. They are Spyne-side state only.

## Where the outcome is logged
- `dealer_leads.smsMessages.wakeUpMessage` marks each wake-up [E56]. `smsMessages.body` with `createdAt` gives the pairs offered.
- `conversations.wakeup.totalWakeups` and `wakeup.lastSentAt` `sms-v2.service.ts:4298-4301`.
- Do not use `smsMessages.messageReason` for this. It is model-written, and 5 of 16 wake-ups are mislabelled [E56].
- Weekly read fields `after_unaccepted_offer` and `same_time_pair_repeated` (results/sms-b*.json) [E2] [E3]. Bookings: the qualified-to-booked SMS series [E5].

## Design constraints
1. **Two failure surfaces, not one.** Wake-ups account for 13 of the 30 repeats and live replies for 17, and the live prompt already carries the rule [E54] [E55]. Phase 1 must fix both prompts and measure them apart using `wakeUpMessage`. Otherwise the wake-up fix will look like it failed.
2. **A wake-up is a single shot that cannot book.** It is re-armed only by a customer reply (`sms.service.ts:2545`), it has no booking tools (`sms-worker/index.js:1530`), and it sees the full thread (`sms-v2.service.ts:3851`) [E58]. The repeat is therefore not a context gap. The one nudge per silence must change the offer, and a deferred overnight nudge must not resend last night's pair [E57].
3. **Wording has failed twice.** Line 19 fails on live turns and the self-check fails on wake-ups [E55] [E57]. Phase 2's server-side check is the backstop, and it spans the backend and the lambda [E58].

## Unknowns
- Why 4 of 5 word-for-word wake-ups carry a reply-style messageReason. It could be the model copying the last turn's reason, or a different prompt rendering. The lambda always sends `flowType: "wakeup"`, so the second is unlikely but not proven [E57] [E58].
- Whether repeating an open pair after a side question actually costs bookings. 4 of 7 live-only threads booked [E55]. This decides whether line 19's "even after a side question" stays.
- How many SMS teams override the wake-up defaults [Q5], and why the 12 no-follow-up threads got no wake-up [Q11]. Both are already in questions.md. The new unknowns above were not added there, per the caller's file limits.
