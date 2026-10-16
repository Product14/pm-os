# Re-test plan: September callback fixes, Sales and Service lines

Step 1 of the accepted bug path (decide.md, Bug summary, Fix step 1). No code changes. Answers Q4. Owner: engineering runs it, PM records results.

What is being re-tested, all live on prod and never re-tested on this rooftop [E33]:
- Phone-lookup fallback for lead memory, 2026-09-18 [E12] (`conversational-ai-backend:src/agents/agents-v2.service.ts:3433`)
- Outbound summary exposed in the sales v2 prompt, RETCONVAI-4742 [E14]
- Outbound callback context fixes, RETCONVAI-4995 and RETCONVAI-5090 [E15]
- Service side for comparison: RETCONVAI-4925 is still in backlog [E16], so a Service failure may be known rather than new

What the code predicts before anyone dials (so a pass is a surprise worth checking, not assumed):
- Memory is written only when the call has a leadId and a non-empty post-call summary; a no-answer attempt leaves a record only if that summary exists [E35] (`conversational-ai-backend:src/conversation/conversation.service.ts:476`).
- Memory is read for the last 3 summaries, default 3-day window [E10] (`agents-v2.service.ts:3425`, `:3440`).
- Department is an exact match on write and read, "sales" or "service" [E11, E36] (`lead-memory.service.ts:178`, `agents-v2.service.ts:3458`).
- The record holds summary text and department only; no purpose of call or vehicle field [E35] (`lead-memory.service.ts:178-195`).

## Step 0: replay the reference callers (engineering, no dial)

- **Setup:** the two reference calls in Freshdesk 22370 [E1, E3]. Take caller identity from the ticket; do not copy phones or names into this folder.
- **Steps:** run the lead memory lookup (lead id, then phone fallback) for each reference caller against today's release code [E10, E12]. Note which summaries come back, their department and age at callback time.
- **Expected:** the outbound summary is returned to the agent that answered the callback.
- **Observe:** the lookup result at `agents-v2.service.ts:3440` and the stored records per `lead-memory.service.ts:178-195`. Read each call's agent type from the agent record, never from `agentCallType` (context/traps/agent-call-type-not-direction.md).
- **On failure:** no ticket yet; carry the cause into the matching live case below.

## Test lead setup (shared by cases A to C)

- One test lead per line on this rooftop's Tekion CRM, with a vehicle of interest attached **at lead creation**, so the vehicle half [E4] does not mask the callback half.
- A Sales outbound test campaign using the aged-lead journey (`Agedleadfollowup`, E34), pointed only at the test leads.
- A Service outbound test campaign pointed only at the test leads. If none can be pointed at a test lead, mark the Service-originated rows **blocked (Q8)** and run the rest.
- A tester phone that can decline an inbound call and dial the Sales and Service lines.
- Start case B first: it needs four days.

## Case A: unanswered outbound, callback within 3 days, same department

| Line | Setup | Steps | Expected result |
|---|---|---|---|
| Sales | Sales outbound dials the Sales test lead | 1. Let the call ring out (no answer, no voicemail). 2. Same day, call the Sales line back from the tester phone. 3. Ask "you called me?" | Agent says the store called about the vehicle on the lead and names it, without asking "How can I help you?" first [E22, E24] |
| Service | Service outbound dials the Service test lead | Same as Sales, calling the Service line back | Agent says why the store called and names the vehicle [E16, E36] |

- **Observe:** (1) after the missed attempt, whether a lead memory record exists for the test lead and what it says (`conversation.service.ts:476`, `lead-memory.service.ts:178-195`); (2) on the callback, what memory the agent received (`agents-v2.service.ts:3440`); (3) the callback transcript, first two agent turns.
- **File a failure against:**
  - Sales: RETCONVAI-4995 (reopen), link RETCONVAI-5090 as the QA repro [E15].
  - Service: RETCONVAI-4925 [E16].
  - **Exception:** if no memory record was written for the missed attempt, do not file a defect. That is revisit trigger 1 for `last-outreach-context`; log it in decisions.md and send the case back through decide.

## Case B: callback after day 3, same department

| Line | Setup | Steps | Expected result |
|---|---|---|---|
| Sales | Sales outbound dials the Sales test lead; answer, talk briefly, hang up (so a summary exists) | Wait until day 4. Call the Sales line back | Agent acknowledges the earlier call and names the vehicle |
| Service | Same, Service outbound and Service test lead | Wait until day 4. Call the Service line back | Same |

- **Observe:** the callback memory lookup and the age of the outbound summary against the window (`agents-v2.service.ts:3425`, `:3440`); the callback transcript.
- **Predicted from code:** fails on both lines, because the default window is 3 days [E10]. The campaign works 7-day-old leads [E21], so its follow-up cadence can exceed it.
- **File a failure against:** Sales RETCONVAI-4995; Service RETCONVAI-4925. Note in the ticket that the cause is the 3-day default at `:3425`; the PM decides whether a default change is enough or a per-campaign window (part of `last-outreach-context`) is needed.

## Case C: callback answered by the other department

| Outreach from | Callback lands on | Steps | Expected result |
|---|---|---|---|
| Sales outbound | Service line | Answer the Sales outbound, talk briefly, hang up. Same day, call the Service line | The Service agent says the store's sales team called and names the vehicle |
| Service outbound | Sales line | Answer the Service outbound, talk briefly, hang up. Same day, call the Sales line | The Sales agent says the store's service team called and why |

- **Observe:** the department stored on the outbound summary (`lead-memory.service.ts:178`) and the department used by the callback lookup (`agents-v2.service.ts:3458`, `getAgentDepartment` at `:4405-4425`); the callback transcript.
- **Predicted from code:** fails both ways, because the department match is exact [E11, E36].
- **File a failure against:** none if the cause is the department filter. That is revisit trigger 1 for `last-outreach-context`; log it in decisions.md and send the case back through decide. If the cause is anything else: Service line RETCONVAI-4925, Sales line RETCONVAI-4995.

## Recording

- Write one line per case and line into decisions.md: pass, fail with cause, or blocked, plus the call ids (no phones, no names). This is acceptance criterion 1 of the Bug summary.
- Mark Q4 answered in questions.md with the result.
- Any trigger fired: update decide.md Outcome and reopen decide for `last-outreach-context`.
