# Decide: Human takeover visible in the dealer's CRM (delta over RETCONVAI-5165)

## Ladder
1. **Literal ask:** "once a chat is taken over by a human, a note is added in the CRM stating that the chat is now being handled by a human and the AI has been paused, to avoid any confusion" [E25], raised by the Vini CSM, not the dealer [E1]. A Spyne product lead added the reverse case: "Consider the case of human handing over the lead back to AI as well" [E2]. Engineering filed it as RETCONVAI-5165 [E3], which already specifies this note on all 4 handoff events, both directions, STL SMS and web chat, per-rooftop on/off, DriveCentric first and CRM-agnostic [E23].
2. **Job:** one owner per lead, visible where the sales floor works, so a lead never gets two voices (Vini and a rep both texting) or no voice. "our sales team lives in the CRM" [E6]; reps and BDC "can't tell whether Vini is still texting the customer, so they double-text or aren't sure who owns the conversation" [E5, Spyne-written]. P&L terms: staff time not spent checking two systems, and fewer duplicate touches on internet leads [E5, E25]. No figure for either is available (Q13). The dealer tied doing more with Spyne to CRM visibility [E8, E9]. The ask states the job as "AI paused"; the job is only done if that statement is true in every channel and for every rep, which is where 5165 stops (rungs 4 and 7).
3. **Who else has this job:** 3 other companies in the last 90 days, all in meetings, same job in different words: the AI must know when a salesperson owns the lead, and AI activity must show where reps work [E20]. 0 dealer-raised tickets; 1 adjacent CSM-raised ticket at one of those 3 (STL texted a lead the CRM already marked sold) [E21]. One more rooftop has the call half of the gap: an outbound call fired the day after a takeover [E17]; whether it is one of the 3 is unknown. How many of these rooftops have reps who never press takeover in the Console is unknown (Q1, Q12, R3).
4. **Smallest shared building block:** the lead-level human-ownership state that already exists (`Lead.isSmsHumanTransferActive`, `conversational-ai-backend:src/sms/sms.service.ts:2884`, E11), treated as the single source of truth with three wires:
   - **Out to the CRM (5165 delivers):** a note on each handoff event through the existing note path `notifyExternalCrm` (`conversational-ai-backend:src/sms/sms-v2.service.ts:1246`, E14), from the takeover and hand-back points (`sms.service.ts:2858`, `sms.service.ts:2965`, E11, E12) and the chat handover (`chat-service:src/chat/chat.controller.ts:345`, E15) [E23].
   - **Out to every outbound channel (delta, not in 5165):** the task skip that already runs for STL, follow-up and reminder SMS while the flag is set also covers CALL-channel tasks, which today are deliberately excluded (`conversational-ai-backend:src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:659`, E13, E17). 5165 lists "changes to takeover logic" out of scope [E23], so without this wire its "AI paused" note is false for call cadences. Why calls were excluded is unknown (R2, Q15).
   - **In from the CRM (delta, not in 5165):** rep activity logged on the lead in the CRM (outbound text, call, note) sets the same flag, so Vini pauses for reps who never use the Console. Today Vini reads only the CRM lead stage and stops only on closed, delivered, lost or bad (`conversational-ai-backend:src/sms/sms-v2.service.ts:3647`, `src/outbound-tasks/outbound.constants.ts:1`, E22) and does not read CRM notes or activity [E16]. Whether DriveCentric exposes rep activity to Spyne is unknown (Q11).
5. **What varies per store:**
   - CRM provider for the note and the activity read: DriveCentric first, CRM-agnostic contract [E23]. Configuration on the integration, never a per-rooftop branch.
   - Note on or off per rooftop [E23].
   - Pause sources per rooftop: Console takeover only, or Console takeover plus CRM rep activity (the second only where the CRM provider grants activity read, Q11).
   - Auto-resume window: 18 hours of human inactivity per spec [E18]; whether it is configurable, and whether inactivity is measured in the Console only, is unknown (Q6). If it is Console-only, a rep who claims in the Console and keeps working in the CRM gets Vini back after 18 hours.
   - Which AI owns first response at the rooftop (Spyne STL or the CRM's own AI) is agent-type configuration, not build [E7] (Q2).
   - Note wording per reader (sales floor vs service, if service shares the path, Q10).
6. **Every agent it lands on:**
   - Sales STL and outbound SMS: **yes**. Main surface; takeover sets AI off and skips SMS tasks [E11, E13]. 5165 covers the note [E23].
   - Sales web chat: **yes**. Separate chat-service path, same missing CRM side effect [E15]; 5165 covers the note [E23]. Chat auto-releases when idle [E15], so the hand-back note must fire on auto-release too.
   - Sales inbound and outbound voice: **no on the takeover path, but affected**. Voice transfers use a separate live-call tool (`conversational-ai-backend:src/vapi/vapi-tools.controller.ts:479`, E29); call tasks keep firing after takeover [E13, E17], so this is where the "AI paused" note is false. Delta, not in 5165.
   - Service inbound and outbound SMS (reminders): **unknown, likely yes**. One SMS handover route [E28], flag on the lead [E11], appointment-reminder SMS among the skipped tasks [E13]; no department condition confirmed (Q10, R1). If yes, 5165's note lands on service leads too, and which system a service note is read in is unknown.
   - Service web chat: **unknown**. Widget takes service scheduling [E30]; chat-service card describes sales [E15] (Q10, R1).
   - Service inbound and outbound voice: **no on the takeover path**; same separate transfer tool [E29].
7. **Full value:** case direction 3: one owner per lead, visible and enforced in the CRM. Ship 5165 CRM-first [E23], suppress call tasks while a human owns the lead [E13, E17], and read rep activity from the CRM so Vini pauses even when reps never press takeover [E16, E22], applied to service SMS if it shares the path (Q10). Planned: only the first third. 5165 is specified but sits in Product Backlog with no owner reply to two chases and a missed 2026-09-24 ETA [E5, E26, E27] (Q9). The call half has a backlog bug, RETCONVAI-5190 [E17], with no scheduled date in evidence. The CRM activity read is not planned and is a negotiation with the CRM provider, not an engineering task [E16] (Q11). When: unknown for all three (Q9, R5).

## As asked vs as solved
| Customer asked | We would build | Same, generalised, or different | Why |
|---|---|---|---|
| A CRM note when a human takes over the chat [E25] | **5165 delivers:** note on takeover, STL SMS and web chat, via the existing note path [E23, E14] | Same | 5165 is the ask written as a story; no new spec needed (decisions.md Gate 1) |
| The reverse: human hands the lead back to AI [E2] | **5165 delivers:** notes on manual hand-back and on auto-resume [E23] | Same | Already in 5165 scope [E23] |
| (not asked) AI flags a lead for a human | **5165 delivers:** note on the AI-flag event [E23] | Generalised | Same handoff family; costs one more event on the same wire [E23] |
| DriveCentric, this rooftop [E5] | **5165 delivers:** CRM-agnostic, per-rooftop on/off, idempotent, failures logged [E23] | Generalised | 3 other companies have the job [E20]; per-store difference is configuration (rung 5) |
| Go live "this week" [E2]; ETA 2026-09-24 [E3] | **5165 delivers the spec; the gap is scheduling:** owner and date for 5165 | Same | Backlog since 2026-09-23, two unanswered chases [E5, E26, E27] (Q9) |
| "the AI has been paused" [E25] | **Delta, not in 5165:** CALL-channel tasks suppressed while the lead's takeover flag is set (orchestrator `:659`) | Different | Calls are deliberately not suppressed today, so the note would be false [E13, E17]; 5165 excludes takeover logic [E23] |
| "to avoid any confusion" for a floor that lives in the CRM [E6, E25] | **Delta, not in 5165:** CRM rep activity on the lead sets the same ownership flag | Different | A rep working only in DriveCentric never triggers a takeover, so no note is written and Vini keeps texting [E16, E22]; depends on CRM provider access (Q11) |
| (not asked) service SMS and service chat | **Delta, unknown:** confirm whether the takeover path and 5165's note reach service conversations, and design the note for that reader | Unknown | Shared route and lead-level flag [E28, E11]; no department condition confirmed (Q10, R1) |

## Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E20, E21, E17] | 4 rooftops with the job in 90 days: this one (CSM-raised, dealer voiced it in July, E6 to E9) plus 3 in meetings [E20]; 0 dealer tickets [E21]; 1 rooftop with the call gap [E17]. For the delta (reps who never use the Console): unknown (Q12, R3). |
| Dealer P&L impact | [E5, E8, E9, E25] | Named: BDC and sales staff time spent checking two systems, and duplicate touches on internet leads [E5, Spyne-written]. No days removed or cost removed figure exists; magnitude unknown (Q13). Not argued as more units sold. |
| Strategic fit | [E14, E16, E22], org facts 4 and 5 | Above the DMS and CRM: writes into the dealer's own CRM through the existing note path [E14]. Fits fact 5 exactly: the AI-to-human handoff is a seam nobody is paid on. CRM activity read is a data-access negotiation with the provider (fact 4) [E16]. Area roadmap fit: unknown; `product/areas/vini-sales/CLAUDE.md` lists no roadmap (Q14). |
| Cost and risk to build | `conversational-ai-backend:src/sms/sms-v2.service.ts:1246`, `src/sms/sms.service.ts:2858`, `src/sequence-workflows/services/sequence-task-execution-orchestrator.service.ts:659`, `chat-service:src/chat/chat.controller.ts:345` | 5165: S, reuses the note path [E14]; risks are the unlocated auto-resume timer [E18, Q6] and a 0.72 chat card [E15]. Call suppression: S to M; main risk is the unknown reason calls were excluded (R2, Q15). CRM activity read: L and gated on provider access, not code (Q11). Service scope: unknown (Q10). |
| Cost of not solving | [E8, E9, E10, E26, E27, E17] | No churn or escalation signal in Arali: 0 dealer interactions in 30 days [E10]. Internal pressure only: two unanswered chases [E26, E27]. The dealer conditioned doing more with Spyne on CRM visibility [E8, E9]. Another rooftop already logged a call after takeover [E17]. |
| Prior decisions | `decisions.md` (2026-10-15 Gate 1); `case.md` ledger_match jira:RETCONVAI-5165; `context/INDEX.md` decisions: none relevant | Gate 1: valid problem; no new PRD for the write-back, the gap is scheduling; the CRM-only rep case is outside 5165 and decided here [E24]. A July 2026 stop-outbound requirements doc may already define manual pause as a reason to stop outbound; not in evidence (R4, Q16). |

## Arguments
### For building (advocate)
**Recommend:** ship RETCONVAI-5165 now on one lead-level "human owns this lead" state whose CRM note names the paused channels, with a per-rooftop toggle to pause calls.

1. **Building block.** One ownership state (`Lead.isSmsHumanTransferActive`, E11) with configurable effects: a CRM note on all 4 handoff events via the live note path (E14, E23), and channel scope per rooftop. Calls were excluded by design (E34, E38), so call pause is a setting, not a reversal. The flag ignores department (E31) and has run on a service conversation (E33), so the note names the department.

2. **Why now.** 4 rooftops raised the job in 90 days (E6, E20); another logged a call after takeover (E17). The dealer tied doing more to CRM visibility (E8, E9). P&L: staff time not spent checking two systems, no double touches on internet leads (E5); no figure exists. The gap is delivery: ETA missed, two chases unanswered, no sprint (E26, E27, E37).

3. **Fit.** Writes into the dealer's own CRM, above the DMS (E14), at the unpaid AI-to-rep seam.

4. **Cheapest credible version.** 5165 as specified (E23), note reading "Vini texting paused; calls continue" unless calls are opted in. Persist claimed and released events (E11, E12); no takeover history exists today (E39).

5. **Honest weakness.** At 3 companies reps work in their CRM, not the Console (E40); if they never press takeover, nothing fires (E16, E22). Reading CRM rep activity fixes that but is a provider negotiation (E16): open it with DriveCentric in parallel.

### Against building as asked (skeptic)
**Outcome:** defer. No new PRD.

**The case for it.** The ticket asks only for the takeover note [E25]. 5165 already specs it, plus hand-back, auto-resume, SMS and web chat [E23]. It has an engineer but no sprint [E37], so the gap is scheduling, not spec [E26, E27]. Neither delta is proven:
- Call suppression: calls were excluded on purpose, since "the rep taking over the text thread says nothing about whether the lead should still be called" [E34]. Engineering called the one report "not an issue" [E38]. Word the note "AI texts paused" instead.
- CRM activity read: unsupported [E16] and gated on a provider deal (fact 4). No dealer ticket asks for it [E21]. This rooftop texted via DriveCentric AI in July [E7]; 0 interactions in 30 days [E10].
- Takeovers cannot be counted today [E39]. 5165's notes create that record.

**Revisit trigger:** 60 days after 5165 ships, if 2 or more rooftops file a dealer ticket about Vini texting or calling a rep-owned lead.

**What we lose.** At 3 companies, reps work in their own CRM, not the Console [E40]. They get no note and Vini keeps texting [E22]. Calls still fire after takeover [E13, E17]. The dealer tied doing more to CRM visibility [E8, E9]; the note covers only part of that.

**What would change my mind:** reps here never use the Console (Q1), DriveCentric grants activity read (Q11), or a dealer complains about a call after takeover.

## Outcome
**Outcome:** defer
**Feature slug:** none (not a build outcome). The asked-for note stays with RETCONVAI-5165; no new PRD.
**Why:** The ask and its reverse are fully specified in RETCONVAI-5165 (E23), and Gate 1 already ruled the gap is scheduling: an owner and a sprint (E26, E27, E37, Q9), plus one spec edit so the note reads "Vini texting paused" and stays true while calls run by design (E34). Rung 7's other two wires are not ready: call suppression reverses a deliberate design whose one report engineering called "not an issue" (E34, E38), and the CRM rep-activity read rests on DriveCentric access nobody has negotiated (E16, Q11, fact 4) with 0 dealer tickets asking for it (E21). The job is real at 4 rooftops (E20) but the delta's demand (Q12) and P&L magnitude (Q13) are unknown, and takeovers cannot be counted until 5165's notes create the record (E39).
**Strongest point from the losing side:** "At 3 companies reps work in their CRM, not the Console (E40); if they never press takeover, nothing fires (E16, E22)."
**Why it did not carry:** The only fix is reading rep activity from DriveCentric, an unnegotiated provider dependency (Q11), so a PRD now would spec a build we cannot start; open the access question, do not spec the build.
**Revisit trigger:** Either of: (a) within 60 days after RETCONVAI-5165 is live, 2 or more rooftops raise a Freshdesk ticket or Arali complaint about Vini texting or calling a lead a rep already owns; or (b) DriveCentric confirms read access to rep activity on a lead (Q11). Either reopens the delta as build-generalised.
**Rubric scores:** Job, not request: 4 · Evidence weight: 4 · Five facts: 5 · Proportion: 4 · Reversibility: 5
