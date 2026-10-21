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
- status: open

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
- status: open

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
- status: open
