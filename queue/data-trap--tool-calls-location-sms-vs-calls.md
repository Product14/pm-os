---
id: data-trap--tool-calls-location-sms-vs-calls
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: apps/reporting-vini/vini_sms_funnel_weekly.sql, src/abr-trends/vini_funnel_base.sql; memory project_sms_funnel_dashboard.md (2026-08-14)
verified: 2026-08-14
confidence: high
---

**Rule:** Read tool calls from message JSON; never from `tool_invocation_events` or funnelEval deterministic steps for SMS.

**Why:**
- funnelEval `step1_conversationReached`, `step6_bookingToolCalled`, `step7_crmAppointmentWritten` pass 0 of 60,994 SMS conversations. They read voice-side sources (`conversation_ai.tool_invocation_events` has zero SMS rows). Wiring bug; a backfill will not fix it. LLM-graded step4/step5 do work.
- SMS assistant messages use BOTH `toolCalls[].function.name` (camelCase, dominant) and `tool_calls[].function.name` (snake_case, ~5%). Reading one spelling finds ~5% and makes names look unavailable. Substring `'oolCall'` matches only camelCase. `role:"tool"` messages usually carry no name.
- On calls, `tool_invocation_events` matched only 78%.

**Instead:** SMS: read both spellings on the assistant message (100% recoverable). Calls: `endcallreports.callDetails_messages` keyed on `callId`, camelCase `toolCalls` only.
