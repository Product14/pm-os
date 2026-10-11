---
id: system-fact--call-transfer-behaviour
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: conversational-ai-backend communication-transfer-call-v3.tool.ts, call-transfer-execution.service.ts, livekit-webhook.service.ts:135; spyne-ai-tech/livekit agent/src/tools/warm_transfer/_transfer_handoff.py; memory project_transfer_escalation_research.md (2026-10-06)
verified: 2026-10-06
confidence: high
---

**Rule:** Assume a live transfer has one destination, a 45s ring, no escalation, and no real callback.

**Why:**
- Backend picks the destination; the dial runs in the separate `spyne-ai-tech/livekit` Python repo (`_resolve_transfer_failure`). Targets come from user-management: one phone per department/person, no order or backup field.
- `transfer_configs.ringing_timeout` = 45s. `on_failure=return_to_agent` on 2,645 of 2,649 teams: the agent says staff are busy and offers a callback.
- `sales_schedule_callback` is a stub that saves nothing. No live alert reaches staff.
- Dealer lines often roll over (p50 26s) to our own number before our timeout, so the agent answers itself.
- Prod 6 Sep-5 Oct 2026 (Spyne internal): 43.2% of dialed transfers reached no human; forwarded-back = 24.1%; Service Inbound 46.9% vs Sales Inbound 27.3%. VAPI is legacy (2 teams).

**Instead:** design escalation from these hooks: single-destination `TRANSFER_READY` payload, `_resolve_transfer_failure`, the `call.transfer.attempt` webhook, `conversationNotificationsUsers` as alert recipients.
