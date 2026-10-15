---
id: fd24641-single-screen-conversation-ui
area: vini-sales
stage: confirmed
freshdesk_ticket: 24641
ticket_updated_at: 2026-10-13T17:15:13Z
rooftop_slug: bob-johnson-auto-group
rooftop_name: Bob Johnson Auto Group
freshdesk_company_id:
arali_company: Bob Johnson Automotive Group
feature:
outcome:
prd:
jira:
ledger_match:
fetched_freshdesk: 2026-10-15
fetched_arali: 2026-10-15
fetched_code: 2026-10-15
---

# Salespeople have to cross-check three screens to find and close the customer replies Vini left for them

## Ask
The ticket was raised by the account's Vini CSM on the dealer's behalf (Internal, Enhancement). Its subject is "Streamline-lining Conversation UI - Single Screen for Dealership Operations" (E1). The description, written by the CSM, asks for "a central screen where the dealership can operate from" (E27) and specifies it: five status counters (Needs a human, Customer replied, AI active, On track, AI paused or done), a list sorted by what needs a person first, and a detail panel with "Why this needs you", one Next action, and Take over, Assign, Mark resolved (E28, E29). It adds a seven-stage journey board where CRM status and human activity override the AI schedule (E30), no Customers section, action items inside the conversation (E32), and text notifications routed by rep assignment (E33). It is built on a screenshot and an Arali meeting this case has not seen (E36). The CSM then asked for an ETA (E2). Spyne support moved it from Urgent to Medium because it is an enhancement (E3). Spyne support also flagged it as "an overhaul for the current UI of Spyne Console" that needs product sign-off (E4).

In the dealer's own words, the used car manager wants "to only stay in one screen rather than have to cross reference multiple" (E5). He described the screen he expects: a view that says "unanswered", where he clicks his own unanswered items and lands on a customer page with "all of the stuff connected" (E7). He also asked for a "customers unanswered" line on the Conversations page (E11). Per the CSM, a dealer contact wants "unanswered phone call or unanswered message" on opening (E31), which extends "unanswered" from texts to missed calls.

(area conflict: Freshdesk pod is "Vini - Platform", not Vini Sales. The product field is Sales and every quote is about sales leads. Kept as vini-sales; see questions.)

## Job
The used car manager is about to add two salespeople as console members. He says he already has "trouble with them following up" (E6). The job is to get salespeople to answer the customer replies Vini creates, quickly and without switching screens. Otherwise those leads go cold in a tool the sales floor does not open. He puts the volume at about 600 leads a month (dealer-stated, not audited) (E10). He says the current flow, action items then conversations then the CRM "just to close a record", is one "there's no way that these guys would do" (E10).

P&L angle (inferred from E6, E10, E16): lost gross on AI-engaged leads that nobody follows up, plus manager time spent cross-checking. He describes Spyne as a second CRM that the floor does not watch (E16). No figure for response time or lost deals is available.

The dealer also said he does not need anything built for him: "I'm just telling you workflow" (E8). The CSM's description goes the other way: a full spec whose acceptance test is that a manager understands the opportunity "without opening Customers, Action Items or the CRM" (E35). The description adds two jobs the meetings did not show: route alerts only to the assigned rep (E33), and close the loop so VinSolutions shows the outcome with no duplicate appointment and the action item closes itself (E34). The one concrete defect he reported is an action item missing from the Customers record (E9).

## Customer context (30 days)
- 2026-09-15 meeting: the 600-leads-a-month volume and the "no way these guys would do that" objection to moving between action items, conversations and the CRM (E10).
- 2026-10-01 meeting: he screen-shared his workflow. He wants one screen (E5) and an "unanswered" view by person (E7). He is adding two salespeople (E6). He says no build is needed (E8). He found an action item missing on the Customers record (E9).
- 2026-10-06 meeting: he asked for a "customers unanswered" line (E11). The CSM said the Customers section would be removed and everything would sit under Conversations (E12).
- 2026-10-13 meeting, after the ticket: he says he lives in Conversations "because that's where the meat is". He still keeps Action Items open for its filtering, plus two CRM tabs and about three console tabs (E13). The CSM was onboarding new dealer users onto Conversations as the "go to place" (E14).
- No connection: the Studio photo-sequence and feed tickets, invoice threads, and the 2026-09-15 sold-lead STL ticket. That last one is about closing records, but it is an STL defect, not this ask.

## Who feels this
- Used car manager, who runs internet-lead follow-up for this store and assigns leads (E5, E6, E13).
- Salespeople being added as console members. The manager speaks for them; none have spoken directly (E6, E10).

## How it works today
- The team conversations list can be filtered by department, channel, unread and automated flow. It cannot be filtered by assigned salesperson (`conversational-ai-backend:src/customers/customers.controller.ts:16`, E17).
- Unread is tracked per conversation and mirrored to the lead in crm-core. "Unread only" is a working list filter today (`conversational-ai-backend:src/customers/customers.service.ts:1101`, E19).
- Opening a customer's conversations returns up to 5 open action items for that lead. The CSM's "action item on the right-hand side" claim is consistent with this (`conversational-ai-backend:src/customers/customers.service.ts:686`, E18).
- A Needs Attention quick filter with a live count is live on the Conversations page (E22). The backend index behind it is keyed to human-transfer phase, which suggests it lists handoffs, not every unanswered customer reply (inferred, E20).
- The Customers page is a separate surface. It did not show an action item that Conversations showed (E9). Moving the Customers tab is in the backlog (E24).
- The console frontend for these screens was not found in Blue Brain. The card it has for the console frontend has low verification (E21).

## Gap
- The dealer wants one queue: "my unanswered customers", with the action item and lead context on the same page (E7, E11). Today he can filter unread conversations, but not by assignee (E17). Needs Attention appears to cover handoffs, not all unanswered replies (E20). So salespeople still need Action Items for "what do I owe" and the CRM for record status (E13).
- Two Spyne pages show overlapping customer data that does not agree. The Customers record lacked an action item that Conversations had (E9). The CSM's fix, retiring Customers (E12), is a backlog item, not shipped (E24).
- The ticket frames this as a console overhaul (E1, E4), and the description confirms it is a CSM-authored two-board redesign (E28, E30). The dealer framed it as workflow feedback and said no build is needed (E8). The two sources contradict each other on scope; whether to treat it as an overhaul depends on which framing the dealer actually signs up to (see questions).
- The description adds requirements the case had not tested against the code: missed calls in the unanswered count (E31), notifications routed by assignee (E33), and takeover pausing the AI, VinSolutions write-back without a duplicate appointment, and auto-closing action items (E34). Which of these already work is not established; per-assignee routing depends on the same assignee field as the unanswered view (E17).
- A broader console redesign already exists as the Console v2 epic, still in backlog (E23).

## Candidate directions
1. No build: set this rooftop up on Conversations with the Unread and Needs Attention filters and fix the missing-action-item defect (E9). Train the two salespeople on that one page. Removes manager cross-checking time and costs nothing to build.
2. Small build: a "My unanswered" view on Conversations, meaning unread plus assigned salesperson, with a live count, as the landing page for members. Fewer days a customer reply sits unanswered and less lost gross on engaged leads. Needs the assigned salesperson on the lead (see questions); the same field would let text alerts go only to the assigned rep, as the description asks (E33).
3. Decline the single-screen overhaul as a one-rooftop request and fold it into Console v2 (E23) and the Customers-tab retirement (E24). Consider pushing unanswered replies into the dealer's CRM as tasks so the floor never leaves it (E16). Avoids the cost of a one-off redesign and keeps Spyne above the CRM.

## Frequency
0 other rooftops raised the same single-screen ask on the dealer side in the last 90 days (E25, E26). 2 other companies raised the adjacent job: dealer staff want AI texts visible where they already work (E25). Spyne staff told at least 3 other rooftops in demos that Conversations is "the one place" (E25). That suggests the pain is common even if the ask is not.

## Slot status

| Slot | Status | Bar |
|---|---|---|
| Ask | SUPPORTED | at least 1 E-id from freshdesk, arali or pm, in the customer's words |
| Job | SUPPORTED | at least 1 E-id behind the inferred job |
| Customer context (30 days) | SUPPORTED | at least 1 dealer-side arali E-id dated within 30 days of fetched_arali |
| Who feels this | SUPPORTED | at least 1 dealer-side E-id with a known role |
| How it works today | SUPPORTED | at least 1 bluebrain E-id or `repo:path:line` reference |
| Gap | SUPPORTED | at least 1 E-id or code reference |
| Candidate directions | SUPPORTED | 2 or more directions, with a P&L angle (days, cost, gross, absorption, hours per RO, retention, CSI) |
| Frequency | SUPPORTED | a count, backed by at least 1 E-id |

