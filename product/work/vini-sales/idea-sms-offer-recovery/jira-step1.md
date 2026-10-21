# Jira: step 1 of sms-offer-recovery as a Bug

## Proposed

- **project:** RETCONVAI (Converse AI) · **issue type:** Prod Bug · **parent:** none
- **labels:** pm-os, vini-sales, sales-inbound, sms, sms-offer-recovery
- **summary:** SMS agent repeats or drops the visit offer after a shopper passes, and ends on a missing car

### description

**Problem.** When a texting shopper doesn't take the first two visit times, the SMS agent re-sends the same two times (20 of 47 conversations read, 14 to 20 Oct) or sends nothing useful (12 of 47); it asks what time works in only 5. When the car isn't in stock it often ends the conversation ("I hope you find the right one soon", 10 of 84). After a yes it sometimes keeps asking questions; a sales director said this "ruined the appointment". 4 in 5 texting shoppers offered two times don't book (418 of 517, 10 to 20 Oct).

**Why it happens (code, origin/release)**
- The no-repeat rule exists (`sales_new/appointment-conversion.xml:19`) but the automatic follow-up drops it and is told to re-ask the same question with the same times (`sales_new/sms-wakeup.xml:44`, `:53`). Of 30 repeated-time messages, 13 were follow-ups and 17 live replies; 13 of the 17 live repeats came right after a side question (address, price, photos). Exact split from `smsMessages.wakeUpMessage`.
- Of the 12 silent conversations: 6 were stopped by a skip rule because the shopper also asked for something else (photo, callback, trade-in, an action item written ~1 min after the last text); 2 had the agent's last reply marked concluded, saved and never sent (`sms-v2.service.ts:4078`, wake-up skip `sms-wakeup.service.ts:177`); 4 got a follow-up that said nothing new (2 word for word).
- The meeting skip is per conversation (`sms-wakeup.service.ts:166`) and never sees store-booked CRM visits.

**Fix (SMS only; every change behind one per-rooftop flag in `conversationNotifications`, off = today; SMS and voice share one agent per rooftop, so add an SMS channel check, same pattern as `outboundCallTransferEnabled`)**
1. Change the offer: after a shopper passes or asks a side question, answer, ask once what day or time works, then offer two times not yet offered. The follow-up offers fresh times inside store hours, never the previous night's pair. Never send a follow-up identical to the last agent message.
2. Close the yes: on agreement reply "today or tomorrow" (or the next two open days) and nothing else.
3. Don't go quiet: send the reply after "let me check" instead of suppressing it as concluded. A photo or quote action item no longer cancels the follow-up, except where it became a person's task in the CRM (every sales action item on DriveCentric; PBS with a rep); callback, lost lead, trade-in and Human Requested keep blocking. Unknown CRM: keep blocking. Any uncancelled meeting for the lead, or a human takeover, stops the follow-up.
4. Don't end on a missing car: offer a similar unit still listed at send time, with times, or ask one question about what matters.
5. Log every follow-up skip with its reason, the branch taken and the flag state.

Prompt fragments these rules touch are also rendered for voice, chat and outbound; guard every change to SMS and add render tests proving the other channels unchanged.

**Answer before ship:** which action-item intents mean a person owns the lead and where the follow-up reads the CRM type; whether the live SMS turn sees store-booked visits and the import lag; send clock (store time zone) and STOP handling for follow-ups; store hours available to the follow-up; what SMS may say about price today; what "verified" means in the inventory search.

**Pilot.** Flag on at CRM-feed rooftops (not VinSolutions, where a visit lands only as a note; Tekion after its missing-id issue is understood).

**Acceptance**
- [ ] Flag off: behaviour identical to today on SMS; voice, chat and outbound render tests unchanged
- [ ] Same times re-sent after a shopper passes: half or fewer at pilot rooftops over two weekly reads (baseline 20 of 47), follow-ups and live replies measured apart via `wakeUpMessage`
- [ ] Agent replies saved but never sent: 0
- [ ] No follow-up fires while a person owns the lead in the CRM (DriveCentric, PBS with a rep) or a meeting exists for the lead
- [ ] Conversations ending on a missing car: fewer than the 10 of 84 baseline
- [ ] Guards: agent-set visits per 100 shoppers offered times not down at pilot rooftops; opt-outs after a new offer not up
- [ ] Every skip logged with reason and flag state

**Out of scope.** Voice (RETCONVAI-5392). Server-side memory of offered times and a vehicle-sourcing request are steps 2 and 3 of the PRD, behind their own triggers.

**Sources.** pm-os `product/work/vini-sales/idea-sms-offer-recovery/` (one-pager/final.md, evidence.md E2 E5 E6 E9 E10 E30 E31 E54 E55 E57 E60-E62 E69 E71 E77-E80 E87); Sales Inbound weekly review 21 Oct 2026. Full PRD to follow.

## Created

- RETCONVAI-5395 · https://spyne.atlassian.net/browse/RETCONVAI-5395 · 2026-10-21 · Prod Bug, no parent, unassigned, Product Backlog
