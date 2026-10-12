---
id: data-trap--tool-calls-location-sms-vs-calls
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: apps/reporting-vini/vini_sms_funnel_weekly.sql, src/abr-trends/vini_funnel_base.sql; memory project_sms_funnel_dashboard.md (2026-08-14)
verified: 2026-08-14
confidence: high
reject_reasons: reviewer rejected; C6: the cited apps/reporting-vini/ path and vini_funnel_base.sql do not exist in the mounted repo, so the source is contradicted; Content is supported: memory items 3/4/9 and vini_funnel_extract_items.sql / vini_sms_drilldown.sql read both spellings; C1-C5, C7, C8 pass; consistent with the ABR neighbor (call tools from endcallreports)
fix_hint: Change the source paths to the real files: apps/vini-daily-calls/src/abr-trends/vini_sms_funnel_weekly.sql, plus vini_funnel_extract_items.sql or vini_sms_drilldown.sql in place of the missing vini_funnel_base.sql. Then resubmit; the body can merge as written.
---

**Rule:** Read tool calls from message JSON; never from `tool_invocation_events` or funnelEval deterministic steps for SMS.

**Why:**
- funnelEval `step1_conversationReached`, `step6_bookingToolCalled`, `step7_crmAppointmentWritten` pass 0 of 60,994 SMS conversations. They read voice-side sources (`conversation_ai.tool_invocation_events` has zero SMS rows). Wiring bug; a backfill will not fix it. LLM-graded step4/step5 do work.
- SMS assistant messages use BOTH `toolCalls[].function.name` (camelCase, dominant) and `tool_calls[].function.name` (snake_case, ~5%). Reading one spelling finds ~5% and makes names look unavailable. Substring `'oolCall'` matches only camelCase. `role:"tool"` messages usually carry no name.
- On calls, `tool_invocation_events` matched only 78%.

**Instead:** SMS: read both spellings on the assistant message (100% recoverable). Calls: `endcallreports.callDetails_messages` keyed on `callId`, camelCase `toolCalls` only.
