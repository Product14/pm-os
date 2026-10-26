---
id: fd23736-human-takeover-in-stl-and-chat
area: vini-sales
stage: confirmed
pm: yash.sharma
freshdesk_ticket: 23736
ticket_updated_at: 2026-10-03T06:32:02Z
rooftop_slug: lucki-mazda-of-woodbridge
rooftop_name: Lucki Mazda of WoodBridge
freshdesk_company_id:
arali_company: C.A.R. Automotive LLC
raised_by: Prabha Kumari
raised_by_role: csm
csm: prabha.kumari@spyne.ai
feature:
outcome:
prd:
jira:
ledger_match: jira:RETCONVAI-5165
fetched_freshdesk: 2026-10-15
fetched_arali: 2026-10-15
fetched_code: 2026-10-15
---

# When a rep takes over a Vini text or chat, the dealer's CRM never shows who owns the lead

## Ask
Raised internally by the Vini CSM, not by the dealer: "Feature- Human takeover in STL & chatbot enhancement" (E1). The ticket description, written by the CSM, asks for one thing: "once a chat is taken over by a human, a note is added in the CRM stating that the chat is now being handled by a human and the AI has been paused, to avoid any confusion", similar to the Console (E25). "Chatbot enhancement" in the subject is this same note, not a second ask; the description does not say whether "chat" means STL SMS, web chat or both. Spyne's automated triage read it the same way (E4). A Spyne product lead added the reverse case, a human handing the lead back to the AI (E2). Engineering filed it as RETCONVAI-5165 with an ETA of 2026-09-24 (E3). That date has passed, and the story has been in Product Backlog since 2026-09-23 (E5).

## Job
The sales floor works leads in DriveCentric, not in the Spyne Console. In the dealer's words, "our sales team lives in the CRM" (E6). When Vini texts a lead and a rep takes over in the Console, the people working that lead in the CRM cannot tell whether Vini is still texting. They double-text the customer or are unsure who owns the conversation (E5, Spyne-written; the CSM's "to avoid any confusion", E25). The job is a single owner per lead that is visible where the floor works, so speed-to-lead does not turn into two voices or no voice. In P&L terms this is staff time (no checking two systems) and gross on internet leads that would otherwise go cold or get annoyed. That framing is inferred from E5 and E8; no figure is available.

The dealer has also tied doing more with Spyne to this visibility: "I don't wanna do all this if it doesn't show up in our CRM" (E8), and "if ... I can see all the conversations in DriveCentric, I feel like I'm ready to do more" (E9). At that time the rooftop used DriveCentric's own AI for text and lead response (E7).

## Customer context (30 days)
None found in 30 days

## Who feels this
The sales team and BDC working leads in DriveCentric (E5, Spyne-written; E6, dealer). The dealer contact on the July call speaks for managers ("we get an email about it as managers") and makes vendor decisions (E7, E8), but no title is on record, so the role is unknown.

## Agents affected
- Sales STL and outbound SMS: yes. The Console takeover sets the AI off and flags the lead, and skips STL, follow-up and reminder SMS tasks (E11, E13). This is the main surface of the ticket.
- Sales web chat: yes. Chat handover is a separate path in chat-service with the same missing CRM side effect (E15); RETCONVAI-5165 scopes SMS and web chat only (E23).
- Sales inbound and outbound voice: no on the takeover path, but affected. Voice transfers to a human use a separate live-call tool (`conversational-ai-backend:src/vapi/vapi-tools.controller.ts:479`, E29), and a takeover does not suppress call tasks (E13, E17), so an "AI paused" note is untrue for call cadences.
- Service outbound SMS (reminders) and service inbound SMS: unknown, likely yes. There is one SMS handover route (E28), the flag sits on the lead (E11), and appointment-reminder SMS tasks are among those skipped (E13), but no department condition was confirmed (Q10).
- Service web chat: unknown. The chat-service card describes sales agents; the widget also takes service scheduling (E30).
- Service inbound and outbound voice: no on the takeover path; same separate transfer tool (E29).

## How it works today
- Console SMS takeover turns the AI off on our side, flags the lead as human-handled, emits an internal Kafka event and shows the rep "AI replies are paused". Nothing is written to the CRM (`conversational-ai-backend:src/sms/sms.service.ts:2858`, E11).
- Hand back by the claiming rep turns the AI back on and emits an internal released event. Again no CRM write (`conversational-ai-backend:src/sms/sms.service.ts:2965`, E12). Spec says the AI auto-resumes after 18 hours of human inactivity (E18); that timer was not located in code.
- While takeover is active, STL, STL follow-up, follow-up and reminder SMS tasks are skipped and resume after hand back. Call tasks are not suppressed (`conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:659`, E13). A bug on another rooftop shows an outbound call firing the day after a takeover (E17).
- Web chat handover is a separate path in chat-service: it flags the session, logs a handover event and auto-releases when idle, with no CRM side effect on the Blue Brain card (`chat-service:src/chat/chat.controller.ts:345`, E15; card score 0.72, helpers not traced).
- A note-to-CRM path already exists and is live for DriveCentric conversation summaries (`conversational-ai-backend:src/sms/sms-v2.service.ts:1246`, E14, E16). The takeover path does not call it.
- Vini does not read the dealer's DriveCentric notes or activity (E16). It reads only the live lead stage before sending, and stops only on closed, delivered, lost or bad (`conversational-ai-backend:src/sms/sms-v2.service.ts:3647`, E22). If a rep texts the customer from DriveCentric instead of the Console, Vini has no signal that a human has taken over.

## Gap
- Takeover and hand back change state only inside Spyne (E11, E12, E15). The CRM, where the floor works (E6), gets nothing, so the floor cannot see who owns the lead (E5).
- The note-writing path exists (E14) but is not wired to takeover events. This is why RETCONVAI-5165 scopes the work as write-back only (E5).
- The reverse direction is not covered by the ticket or by RETCONVAI-5165. A rep who works the lead in DriveCentric never triggers a Spyne takeover, so Vini keeps texting (E16). Whether the floor here uses the Console at all is unknown.
- Takeover pauses SMS but not calls (E13, E17), so a CRM note saying "AI paused" would be partly untrue for call cadences.
- Possible two-AI overlap: in July the dealer's text and lead response ran on DriveCentric AI (E7). Whether Spyne STL is now live here is not confirmed.
- Against RETCONVAI-5165 (E23): the full description (E25) asks for nothing 5165 does not already cover. It asks only for the takeover note; 5165 also covers flag, hand back and auto-resume, and both STL SMS and web chat. The open gap on the ticket is delivery: the ETA of 2026-09-24 passed, and two internal chases for status (E26, E27) got no reply on the thread.
- Shared surface: the SMS takeover path has one route and a lead-level flag (E28, E11), so the note may also land on service SMS conversations; that is unconfirmed (Q10).

## Candidate directions
1. Ship RETCONVAI-5165 as specified, as the first step: one CRM note per takeover, flag, hand back and auto-resume, DriveCentric first, reusing the existing note path (E14, E23). Angle: staff time saved on double-checking two systems, and gross kept on leads that are not double-texted. Fix the call-task gap (E13) first so the note is true. Covers only reps who press takeover in the Console.
2. Non-build first: the CSM confirms who owns first response at this rooftop (Spyne STL or DriveCentric AI) and whether reps take over in the Console at all. Then set a process rule: one AI owns first response, and a rep who picks up a lead takes it over in the Console, while the floor relies on the conversation-summary note already landing in DriveCentric (E16). Angle: cost removed (no build, possibly one overlapping AI vendor) and days saved getting the rooftop to "ready to do more" (E9).
3. **Full value:** one owner per lead, visible and enforced in the CRM. Ship RETCONVAI-5165 CRM-first (E23), suppress call tasks while a human owns the lead (E13, E17), and detect rep activity in the CRM (outbound text or call logged on the lead) so Vini pauses even when reps never press takeover in the Console. Today Vini reads only the CRM stage and stops only on closed or lost (E22). Scope: takeover events wired to the existing crm-core note path (E14), plus a new activity read in the DriveCentric integration, which is a negotiation with the CRM provider, not an engineering task (E16); apply to service SMS if it shares the path (Q10). Other rooftops raised the same job (E20). Angle: fewer duplicate touches, staff time saved, gross kept on internet leads, and the dealer's stated condition for doing more with Spyne (E8, E9).

## Frequency
3 other companies raised the same underlying job in the last 90 days, all in meetings: the AI must know when a salesperson owns the lead, and AI activity must show where reps work (E20). No dealer-raised tickets on it; 1 adjacent CSM-raised ticket at one of those 3 companies (E21).

## Slot status

| Slot | Status | Bar |
|---|---|---|
| Ask | SUPPORTED | at least 1 E-id from freshdesk, arali or pm, in the customer's words |
| Job | SUPPORTED | at least 1 E-id behind the inferred job |
| Customer context (30 days) | EMPTY | at least 1 dealer-side arali E-id dated within 30 days of fetched_arali |
| Who feels this | THIN | at least 1 dealer-side E-id with a known role |
| Agents affected | SUPPORTED | names the impact on both Sales and Service agents (yes, no or unknown for each), with an E-id or code reference |
| How it works today | SUPPORTED | at least 1 bluebrain E-id or `repo:path:line` reference |
| Gap | SUPPORTED | at least 1 E-id or code reference |
| Candidate directions | SUPPORTED | 2 or more directions with a P&L angle, one of them labelled **Full value:** (the path that unlocks the dealer's full value, build scoped) |
| Frequency | SUPPORTED | a count, backed by at least 1 E-id |



