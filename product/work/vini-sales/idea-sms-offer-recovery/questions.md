# Questions

### Q1
- slot: context_30d
- unknown: Customer context (30 days) is EMPTY. Bar: at least 1 dealer-side arali E-id dated within 30 days of fetched_arali.
- blocks: which direction to take, and whether this is worth solving
- who: csm
- how: done. Arali transcript, thread and ticket searches, 2026-09-21 to 2026-10-21, found 3 dealer-side rooftops (E30-E34). Lever 2 (inventory miss) still has no dealer voice: ask the CSMs for Dream and Bob Johnson whether stores flagged "car not in stock" SMS dead ends.
- status: answered (E30)

### Q2
- slot: who_feels_this
- unknown: Who feels this is THIN. Bar: at least 1 dealer-side E-id with a known role.
- blocks: which direction to take, and whether this is worth solving
- who: csm
- how: done. Roles come from Arali contact titles: sales director (E31), used car manager (E34), general manager (E35). The BDC manager is still not heard directly: ask a CSM to put the hand-back question to one BDC manager on the next sync.
- status: answered (E31)

### Q3
- slot: how_it_works_today
- unknown: How it works today is EMPTY. Bar: at least 1 bluebrain E-id or `repo:path:line` reference.
- blocks: which direction to take, and whether this is worth solving
- who: engineering
- how: Read from origin/release (21dd50b5a): sales_v2 prompt fragments, sms-wakeup service and prompt, tentative booking gate, Sales tool definitions. See E13 to E29 and E41.
- status: answered (E13)

### Q4
- slot: how_it_works_today
- unknown: The live tool list on production Sales Inbound SMS agents. Code shows only the canonical eval toolset; live agents take tools from agent config [E27].
- blocks: whether a note or sourcing-task tool already reaches any SMS rooftop, which changes the build size of direction 3
- who: engineering
- how: Read the tools / toolIds on the Sales Inbound TeamAgentMapping and AgentType documents in Mongo for the SMS rooftops in the 21 Oct read.
- status: open

### Q5
- slot: how_it_works_today
- unknown: How many SMS rooftops have wake-ups enabled and a tentativeBooking.createAfter set, versus running on defaults [E19] [E22].
- blocks: how many untaken-offer threads already get a nudge or a pencil, which sizes the gap the prompt change must close
- who: engineering
- how: Query conversationNotifications in Mongo for wakeup.enabled, wakeup.totalWakeups and tentativeBooking.createAfter by teamId.
- status: partly answered (E59): wake-ups run on defaults almost everywhere (1 of 2,739 conversationNotifications rows sets a wakeup key; none of the 5 teams in the silent threads). tentativeBooking.createAfter overrides still unread; no longer blocks the one-pager.

### Q6
- slot: request
- unknown: BDC follow-up touches on an SMS lead that leaves the first thread without a set visit (calls, texts, emails by store staff before a visit or a lost status).
- blocks: Inputs > Dealer P&L impact (cost removed)
- who: csm
- how: ask the BDC manager at 2 SMS rooftops for their follow-up cadence on unbooked internet leads, or read CRM activity counts on those leads if a CRM export is available.
- status: open

### Q7
- slot: request
- unknown: days from lead to visit (and to sale) for SMS leads whose visit is set inside the first thread versus set later by the BDC.
- blocks: Inputs > Dealer P&L impact (days removed); the case.md Job assumption
- who: engineering
- how: join SMS conversations to meetings by lead, compare lead-created to meeting-time for first-thread bookings vs later bookings; read the context/metrics and context/traps entries first.
- status: answered for days to visit (E64, E65, E66); sale and show not measurable today (E66), so the one-pager claims neither. Detail: first-thread agent visits median 1.6 days (p75 2.9) from lead created; later agent visits after a reply median 5.8 (p75 11.5, n=36); store-set CRM visits after a reply median 1.8 (p75 4.5), visible at 16 of 18 rooftops by lead_id only. Still unknown: days to sale and show for any group, who at the store set the visit, and whether the thread caused it.

### Q8
- slot: request
- unknown: how many rooftops the measured untaken-offer and inventory-miss threads span (R1).
- blocks: Inputs > Demand breadth
- who: engineering
- how: count distinct teamId in the 21 Oct read results for after_unaccepted_offer and no_inventory_match_no_sourcing_offer.
- status: answered (E42)

### Q9
- slot: request
- unknown: which dealer CRMs receive sales action items today, as what object, and with a due time (R2).
- blocks: Ladder rung 7 (Full value CRM task) and the build size of lever 2b
- who: engineering
- how: read the action-item CRM sync path in conversational-ai-backend and crm-core-service; list the CRMs it supports.
- status: answered (E53)

### Q10
- slot: request
- unknown: whether rooftops want the SMS agent to offer to locate or source a vehicle the store does not have, and what that request must contain for a salesperson to act on it. No dealer has raised lever 2 [E40].
- blocks: As asked vs as solved, lever 2b; whether sourcing ships at all or only the similar-unit path
- who: csm
- how: put the question to the used car manager or internet sales manager at 2 SMS rooftops on the next sync.
- status: open

### Q11
- slot: request
- unknown: why the 12 untaken-offer threads with no follow-up got no wake-up: wake-ups disabled, cap reached, a skip rule (meeting, non-scheduling action item, isConcluded, SOFT_DECLINE, CALLBACK_REQUESTED), or a failed send [E19] [E20].
- blocks: As asked vs as solved, lever 1b (build vs fix a setting)
- who: engineering
- how: for the 12 thread ids in results/sms-b1..b4.json, read conversationNotifications wake-up state and the last message outcome in Mongo.
- status: answered (E59..E63)

### Q12
- slot: solution
- unknown: whether repeating an open time pair after a side question (address, price, photos, trade-in) actually costs bookings; 4 of 7 live-only repeat threads booked [E55]. Decides whether line 19's "even after a side question" stays as written.
- blocks: one-pager/v1.md Recommendation, phase 1 live SMS rule
- who: engineering
- how: in the next weekly read, compare booking and customer reply after a side question for threads that re-offered the same open pair vs a different pair or no pair; use smsMessages.wakeUpMessage to keep live replies only.
- status: open

### Q13
- slot: assumption
- unknown: an SMS lead that leaves the first thread without a visit is worked again by the BDC
- blocks: one-pager/v1.md Problem (cost to the store)
- who: csm
- how: ask the BDC manager at 2 SMS rooftops what happens to an internet lead the SMS agent did not book (who picks it up, when, by what channel); pairs with Q6.
- status: narrowed (E66): stores do book some of these leads (612 leads with no agent-set visit got a store-set visit within 30 days, at the 16 of 18 rooftops with the CRM feed). Still open: who at the store works the lead (BDC or salesperson), by what channel, and whether the thread prompted it. The one-pager assumption is removed; the question stays as Q13 in Open questions.

### Q14
- slot: assumption
- unknown: a wake-up that changes the offer gets more customer replies than one that repeats it
- blocks: one-pager/v1.md Risks (the phase 1 bet)
- who: engineering
- how: after phase 1 ships, compare customer reply rate within 24 hours of a wake-up (smsMessages.wakeUpMessage = 1) for wake-ups that repeat the last pair vs those that change it; today's baseline is 8 of 9 wake-up-only repeat threads with no reply [E55].
- status: open

### Q15
- slot: solution
- unknown: which action-item intents mean a human now owns the lead, so they must keep blocking the SMS wake-up, and which leave the visit offer open (photo, trade-in follow-up, quote) and should stop cancelling it. Today only six schedule intents are exempt and every other intent blocks, including SALES_SCHEDULE_CALLBACK and SALES_TRADE_IN_FOLLOW_UP by design [E61].
- blocks: one-pager/v1.md Recommendation, phase 1 skip rule; the "Wake-up cancelled by a side action item" row
- who: pm, engineering
- how: list the sales action-item intents in intent-code.enum.ts; PM marks each as "human owns the lead" or "offer still open"; engineering checks the 5 E61 threads against the split.
- status: open

### Q16
- slot: request
- unknown: In the wake-up flow, which tools does the sms-worker lambda keep after stripping booking tools, and does it keep dealership_check_hours?
- blocks: backend-engineer-r1-10 (different pair from store hours)
- who: engineering
- how: raised by the backend-engineer reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q17
- slot: request
- unknown: Does our Fortellis eLead subscription allow /activities/schedule for non-appointment activity types? What task or reminder object, and what certification, do Tekion, VinSolutions and ADF offer?
- blocks: backend-engineer-r1-8 (phase 3 dependency)
- who: engineering
- how: raised by the backend-engineer reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q18
- slot: request
- unknown: How many sales SMS rooftops have dealership_sales_hours empty?
- blocks: backend-engineer-r1-10
- who: engineering
- how: raised by the backend-engineer reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q19
- slot: request
- unknown: What clock does the SMS silent-hours deferral use (rooftop timezone, customer area code, or a fixed UTC send time like the 12:10 UTC batch in E57), what are the quiet-hour bounds, and is STOP or opt-out checked at wake-up dispatch?
- blocks: bdc-manager-r1-6
- who: csm
- how: raised by the bdc-manager reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q20
- slot: request
- unknown: Do agent-set SMS visits get a confirmation and a reminder text today, and do spyne-created meetings ever get completed or noshow back from the CRM?
- blocks: bdc-manager-r1-3
- who: csm
- how: raised by the bdc-manager reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q21
- slot: request
- unknown: At the two stores carrying 27 of the 47 threads, does a BDC or a salesperson work unbooked SMS leads, and from the CRM task list or the Spyne console?
- blocks: bdc-manager-r1-4 (Q13)
- who: csm
- how: raised by the bdc-manager reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q22
- slot: request
- unknown: How many BDC or salesperson touches does an unbooked SMS lead get before a visit is set or the lead is closed (Q6)?
- blocks: ceo-r1-1; the only cost-removed argument this has
- who: pm
- how: raised by the ceo reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q23
- slot: request
- unknown: Estimated engineer-days for phase 1, and what on the Sales Inbound roadmap it displaces (including RETCONVAI-5392).
- blocks: ceo-r1-6; decision readiness
- who: pm
- how: raised by the ceo reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q24
- slot: request
- unknown: Does the agreed_alternative inventory search rank or filter by days in stock, or only by match to the customer's need?
- blocks: ceo-r1-8; whether lever 2 can be argued in days in stock
- who: pm
- how: raised by the ceo reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q25
- slot: request
- unknown: Per-rooftop repeat-pair rate in the 21 Oct sample (repeat threads over sampled threads per rooftop), with the two concentrated stores shown separately.
- blocks: ceo-r1-7; base versus one-off
- who: pm
- how: raised by the ceo reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q26
- slot: request
- unknown: What does 'verified' mean in inventory_search_vehicles_v3 results: does it exclude sold, in-transit and in-recon units, and how stale can the feed be at booking time?
- blocks: general-sales-manager-r1-5
- who: engineering
- how: raised by the general-sales-manager reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q27
- slot: request
- unknown: Can Spyne-set meetings be matched to the CRM-imported appointment rows that carry completed or noshow, for the rooftops that have that feed?
- blocks: general-sales-manager-r1-2
- who: engineering
- how: raised by the general-sales-manager reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q28
- slot: request
- unknown: On SMS today, what can the agent say when asked for price or out-the-door: listing price only, a configured store answer, or a computed OTD?
- blocks: general-sales-manager-r1-3
- who: engineering
- how: raised by the general-sales-manager reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q29
- slot: request
- unknown: After the sms-worker strips booking tools on a wake-up, does the wake-up still have dealership_check_hours, or store hours rendered in its prompt?
- blocks: gm-r1-6, phase 1 wake-up rule
- who: engineering
- how: raised by the gm reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q30
- slot: request
- unknown: What local time did the 12:10 UTC wake-up batch of 19 Oct land at for each rooftop that received it? Did any text go out before the store opened?
- blocks: phase 1 overnight-deferral rule; store's name on an early-morning text
- who: engineering
- how: raised by the gm reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q31
- slot: request
- unknown: What is different at the two stores that carry 27 of the 47 untaken-offer threads (narrow hours, lead source STL vs inbound vs follow_up, assertiveness, lead volume)? Is it a fleet pattern or two stores' setup?
- blocks: Right decision: generalised build vs per-store config
- who: engineering
- how: raised by the gm reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q32
- slot: request
- unknown: How do the 47 untaken-offer threads split by source (inbound sms, speed_to_lead, follow_up)?
- blocks: gm-r1-9, scope of the re-offer rules
- who: engineering
- how: raised by the gm reviewer in one-pager round 1; over the 5-request stage cap, so carried as a question
- status: open

### Q33
- slot: assumption
- unknown: the live SMS turn does not see a store-set appointment for the lead
- blocks: one-pager/v2.md Recommendation, phase 1 lead-level skip on the live turn
- who: engineering
- how: read what the SMS reply prompt renders about existing meetings (sms-v2.service.ts getAgentConfig) and whether it reads meetings by lead_id; the wake-up check is per conversation only (E77).
- status: open

### Q34
- slot: assumption
- unknown: phase 1 pilots first at rooftops whose CRM takes the visit as an appointment, not VinSolutions
- blocks: one-pager/v2.md Risks, pilot choice; VinSolutions writes a visit as a note line (E87), 18 of 319 carry a CRM id (E89)
- who: pm
- how: PM decides the pilot list in the PRD; confirm the CRM per pilot rooftop from the integration registry, not the E89 heuristic.
- status: open
