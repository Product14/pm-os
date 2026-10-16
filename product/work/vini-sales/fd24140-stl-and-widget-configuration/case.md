---
id: fd24140-stl-and-widget-configuration
area: vini-sales
stage: confirmed
freshdesk_ticket: 24140
ticket_updated_at: 2026-10-12T16:56:46Z
rooftop_slug: superior-auto-inc
rooftop_name: Superior Auto, INC
freshdesk_company_id:
arali_company: Superior Auto, INC
raised_by: Deepanshu Agarwal
raised_by_role: csm
csm: abhijeet.mitra@spyne.ai
feature: lead-type-aware-stl-first-message
outcome: build-generalised
prd:
jira:
confluence: https://spyne.atlassian.net/wiki/spaces/SA/pages/1201471491/PRD+Lead-type-aware+STL+first+message+for+after-hours+website+leads
ledger_match:
fetched_freshdesk: 2026-10-15
fetched_arali: 2026-10-15
fetched_code: 2026-10-15
---

# After-hours website leads need a first text that fits the lead: confirm an existing appointment, acknowledge a credit app, or set an appointment (plus an SMS-only website widget)

## Ask
Raised internally by the Spyne CSM on the dealer's behalf; the ticket description and all 17 Freshdesk messages are Spyne-side. Two asks:

1. **STL on website leads, by lead type** (E26, E1): "enable the STL for his website leads": existing appointment, confirm it and answer basic questions; no appointment, work toward one; online credit application, confirm receipt and say the team will follow up, with no PII. The dealer's own words match (E5): "drive appointments when there aren't appointments and confirm appointments when there are appointments."
2. **Website widget without the call button** (E27, E2, E7): "Please let us know how to enable SMS-only feature on the widget" (E27). The dealer's words: "is the widget configurable so that... I don't want it to be a call, but I do want it to, engage with SMS only."

## Job
The rooftop's BDC works website leads the next business day (E8). The dealer will forward only leads that arrive outside business hours, inquiries and credit applications both (E9). The job is to reach those leads overnight without sending the wrong message. A lead with an online appointment should get a confirmation, not a new appointment push (E6). A credit-application lead should get an acknowledgment with no PII (E5). Inferred P&L angle: fewer next-morning callbacks for BDC staff, kept appointments that are already on the board, and no compliance exposure from an AI talking credit. The dealer also wants a call during business hours to reach a human, not Ava (E7). That protects the BDC's phone process, so the widget should text only (inferred from E7). The CSM's ticket gives a compatible reason: one consistent call flow in and after business hours (E27).

## Customer context (30 days)
- 2026-09-24 meeting: the VP Marketing set out the three lead types and the no-PII rule (E5, E6) and asked for an SMS-only widget (E7). Ava's after-hours inbound is live; outbound to website leads is "phase two."
- 2026-09-29 to 2026-10-13 email thread: the dealer limited forwarding to after-hours website leads, inquiries and applications (E9). They asked whether to pause their own after-hours texts to avoid duplicates (E15). They put the SMS-only widget on hold (E11). Spyne asked for ADF, one lead per email, and issued a forwarding inbox (E14). Spyne told the dealer that separate messaging for appointment and credit-app leads was "being worked on" (E10).
- Connects, but is a separate job: the dealer's software development manager wants STL conversations and booked appointments written back into their in-house system automatically. Console access and notification emails were not enough (E12, E13). This decides whether they scale STL, but it is a CRM write-back ask, not this ticket.
- Does not connect: vehicle location by store (E16) and sales-line overflow are separate threads.

## Who feels this
- VP Marketing (E5, E7, E8): owns the Ava program, listens to every call, and wrote the lead-type rules.
- BDC (named by the VP Marketing in E8): enters and calls website leads the next day. These are the hours STL would take off them.
- Dealer software development manager (E12, E13): builds the email forward, and will have to key Ava's outcomes into their system by hand until a sync exists.

## Agents affected
- Sales STL: yes. The opener change lands here. Today lead type is only an on/off gate dimension (`StlConfigDimension = 'source' | 'lead-type'`, `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:13`; `resolveStlGate` :422) with no opener selection in that file (E36).
- Sales inbound: unknown. When the customer replies to the first text, which agent carries the conversation, and whether it sees the lead type, is not visible in the graph (Q12). If it does not, a "confirm your appointment" opener could be followed by an appointment push.
- Sales outbound: unknown. Follow-up uses the same STL service (`isFollowUpEnabled` :123, E36). Per-type follow-up was not asked, but a type-aware opener with a generic follow-up would contradict itself.
- Sales chat: yes, for the widget half only. SMS-only is a per-team channel switch (E4) on the widget config route (E17). No build. Not touched by the STL opener.
- Service inbound: no for the opener. The full-value path is a shared surface, though. Appointment and lead writes go through `integrations-backend`, which `conversational-ai-backend` already calls for `/appointments` (`src/api-wrapper/cdk-connect/cdk-connect-api.service.ts:41`, E37) and which feeds `dealer-leads-backend` `/leads/dealer` (E38). New ADF fields and write-back must not change what service agents read (Q11).
- Service outbound: unknown. The STL gate keys on enterprise and team with no department dimension (E36), so an opener chosen there applies to any team running STL. The graph does not show whether service teams do (Q9).

## How it works today
- Website widget: a route exists to update widget config, `conversational-ai-backend:src/call/call-web-call.controller.ts:65` (E17). On 2026-09-29, disabling calling did not push that smartview-config update until engineering stepped in (E3). Ops can now switch call, chat, email or STL per team in Admin Tool > Converse AI > Vini Script > Vini Config (E4). The call option is now off for this rooftop. The dealer has not approved go-live (E11).
- Email lead intake: forwarded ADF emails are most likely parsed by `integrations-backend:src/email-parsing/email-parser.service.ts:315` (E19). The graph does not show whether a lead type, appointment time or credit-app flag survives parsing.
- STL: `conversational-ai-backend:src/speed-to-lead/speed-to-lead.controller.ts:18` covers silent hours, prefetch and outbound settings (E18; card score 0.68). Lead type and source act only as on/off switches for STL eligibility (E20). The graph shows no opening message chosen by lead type. The CSM's own reply implies one standard new-lead flow today (E10).

## Gap
- The dealer needs three different openers chosen per lead (E1, E5). STL can only turn on or off per lead type or source (E20), and no per-type opener was found (E18). Unless engineering finds one, the gap is a build: a type-aware first message plus a no-PII credit-app script.
- Lead type must reach STL in the first place. We don't know whether the forwarded email, as parsed (E19), carries "appointment with date, time and store" or "credit application" into the lead record. Spyne staff asked the same question internally on 2026-10-07 (E29) and it was still unanswered on 2026-10-12 (E30, E31).
- The CSM has already told the dealer this is in progress (E10), with no Jira behind it (E25). That is an expectation gap, and it is widening: on 2026-10-07 the Spyne side escalated that point 1 was "still not picked up" after 9 days (E28), and the last message on 2026-10-12 asks "is this done?" with no product reply in the thread (E31).
- Shared surface: the STL gate has no department dimension (E36), and the ADF parser feeds the lead store other agents read (E38). A type-aware opener and new parsed fields are scoped to every team running STL, not only this sales team.
- Widget: no product gap remains for this rooftop (E4); the 2026-10-07 escalation treats point 2 as done (E28). Open items are whether the smartview-config failure (E3) was fixed in code or worked around once, and the dealer's go-ahead (E11).

## Candidate directions
1. Configure, no build: start STL on after-hours website inquiries with the standard opener. Have the dealer's forward mark lead type, and set appointment and credit-app types to STL off (E20) until direction 3 ships. Correct the "working on separate messaging" expectation (E10) with a date. Removes the overnight wait on inquiry leads (BDC callback hours, days to first contact) with no risk of pushing a new appointment on someone who already booked one.
2. First step, opener only: parse a type field from the forwarded ADF (E19) and route to three first messages: confirm the appointment, acknowledge the credit app with no PII, or set an appointment (default). Protects show rate on booked online appointments and cuts next-day BDC confirmation calls (cost, staff hours). It still leaves every overnight outcome keyed by hand into the dealer's system (E12, E13), which the dealer said decides whether STL scales. A partial fix, not the resolution (E32, E33).
3. **Full value:** CRM-first, lead-type-aware STL first message, planned now as the resolution (E32, E33). Lead type and appointment details are read from the dealer's CRM or ADF into the lead record, the first message is chosen by type, and the conversation and confirmed or booked appointment are written back to the dealer's own system (E12). Build scope:
   - Lead type in: `ParsedEmailData` (`integrations-backend:src/email-parsing/email-parser.service.ts:14`, `parseAdf` :315) carries lead type, appointment date, time and store, and a credit-app flag into the lead via `dealer-leads-backend` `/leads/dealer` (E35, E38). Whether any of this survives today is open (Q3).
   - Opener: STL selects a first message by normalized lead type (`normalizeLeadTypeKey` :396 already exists for the gate) instead of only allowing or blocking it (`resolveStlGate` :422, E36). Per-type opener templates are per-rooftop configuration beside the STL settings (`upsertSpeedToLeadSettings` :47, E36; console `spyne-console-backend:api/controllers/speed-to-lead/create-speed-to-lead.js:29`, E34). The credit-app template carries the no-PII rule (E5).
   - Write-back: CRM first. This dealer has no API (E12), so the channel is open (Q10). The reply agent must carry the type past the first text (Q12).
   - Other rooftops: 3 other companies raised adjacent type-aware first-touch jobs on calls (E22), so per-rooftop templates are reusable configuration, not a one-off.
   P&L: kept appointments already on the board (show rate, front-end gross protected), BDC hours removed for next-day calls and manual entry, no AI credit exposure, and the dealer's full go-live, which direction 2 alone does not unlock (E13, E33).

Widget: no build. Keep the SMS-only config (E4) and get the dealer's go-ahead (E11).

## Frequency
- Lead-type-aware first touch: 0 other companies in tickets (E21). 3 other companies raised an adjacent job on calls (E22), 2026-07-17 to 2026-10-15.
- Widget channel control: 1 other company in tickets (E23), same window.

## Slot status

| Slot | Status | Bar |
|---|---|---|
| Ask | SUPPORTED | at least 1 E-id from freshdesk, arali or pm, in the customer's words |
| Job | SUPPORTED | at least 1 E-id behind the inferred job |
| Customer context (30 days) | SUPPORTED | at least 1 dealer-side arali E-id dated within 30 days of fetched_arali |
| Who feels this | SUPPORTED | at least 1 dealer-side E-id with a known role |
| Agents affected | SUPPORTED | names the impact on both Sales and Service agents (yes, no or unknown for each), with an E-id or code reference |
| How it works today | SUPPORTED | at least 1 bluebrain E-id or `repo:path:line` reference |
| Gap | SUPPORTED | at least 1 E-id or code reference |
| Candidate directions | SUPPORTED | 2 or more directions with a P&L angle, one of them labelled **Full value:** (the path that unlocks the dealer's full value, build scoped) |
| Frequency | SUPPORTED | a count, backed by at least 1 E-id |


