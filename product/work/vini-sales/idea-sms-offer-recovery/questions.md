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
