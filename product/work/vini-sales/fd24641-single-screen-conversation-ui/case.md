---
id: fd24641-single-screen-conversation-ui
area: vini-sales
stage: confirmed
pm: yash.sharma
freshdesk_ticket: 24641
ticket_updated_at: 2026-10-13T17:15:13Z
rooftop_slug: bob-johnson-auto-group
rooftop_name: Bob Johnson Auto Group
freshdesk_company_id:
arali_company: Bob Johnson Automotive Group
raised_by: Tushar Srivastava
raised_by_role: csm
csm: tushar.srivastava@spyne.ai
feature: my-unanswered-queue
outcome: build-generalised
prd:
jira:
confluence: https://spyne.atlassian.net/wiki/spaces/SA/pages/1201143809/PRD+Unanswered+queue+on+Conversations+sales+and+service
ledger_match:
fetched_freshdesk: 2026-10-15
fetched_arali: 2026-10-15
fetched_code: 2026-10-15
---

# Salespeople have to cross-check three screens to find and close the customer replies Vini left for them

## Ask
Raised by the account's Vini CSM on the dealer's behalf (Internal, Enhancement): "Single Screen for Dealership Operations" (E1), "a central screen where the dealership can operate from" (E27). The CSM's spec: a command board of five status counters and a needs-a-person list with Take over, Assign, Mark resolved (E28, E29); a seven-stage journey board (E30); no Customers section (E32); alerts routed by rep (E33). Its screenshot and source meeting are unseen (E36). The CSM asked for an ETA (E2); support moved it to Medium (E3) and flagged it as a console overhaul needing product sign-off (E4).

In the dealer's words, the used car manager wants "to only stay in one screen rather than have to cross reference multiple" (E5): a view that says "unanswered", where he clicks his own and lands on a customer page with "all of the stuff connected" (E7), or a "customers unanswered" line on Conversations (E11). Per the CSM, a dealer contact wants "unanswered phone call or unanswered message" (E31).

(area conflict: Freshdesk pod is "Vini - Platform". Product field is Sales and every quote is about sales leads. Kept as vini-sales; the PM notes the surface is shared with service (E37).)

## Job
He is adding two salespeople as console members and already has "trouble with them following up" (E6). The job: salespeople answer the replies Vini creates, fast, without switching screens, so AI-engaged leads do not go cold in a tool the floor does not open (E16). About 600 leads a month (dealer-stated, not audited) (E10); action items, then conversations, then the CRM "just to close a record" is a flow "there's no way that these guys would do" (E10).

P&L angle (inferred from E6, E10, E16): lost gross on engaged leads nobody follows up, plus manager cross-checking time. No response-time or lost-deal figure is available.

The dealer said "I'm just telling you workflow" (E8); the CSM's acceptance test is one screen "without opening Customers, Action Items or the CRM" (E35). The one concrete defect: an action item missing from the Customers record (E9).

## Customer context (30 days)
- 2026-09-15: 600 leads a month; "no way these guys would do that" (E10).
- 2026-10-01: screen-shared workflow; one screen (E5), per-person unanswered (E7), two new salespeople (E6), no build needed (E8), missing action item on Customers (E9).
- 2026-10-06: asked for "customers unanswered" (E11); CSM said Customers would be removed (E12).
- 2026-10-13: lives in Conversations but keeps Action Items, two CRM tabs and three console tabs open (E13); CSM onboarding new users there (E14). Earlier: E15, E16.
- No connection: Studio photo and feed tickets, invoices, the 2026-09-15 sold-lead STL ticket.

## Who feels this
- Used car manager, who runs internet-lead follow-up and assigns leads (E5, E6, E13).
- Salespeople being added as console members; the manager speaks for them (E6, E10).
- Service advisors, service managers and service BDC agents who work service conversations and action items on the same pages (inferred from E37, E38, E39; no service-side dealer voice at this rooftop).

## Agents affected
The Conversations, Action Items and Customers pages and the Unread and Needs Attention filters are one console surface switched by department (E39), over one conversations list with a serviceType filter (E17) and one action-item queue filtered by serviceType and agentType (E38). Leads are typed sales or service at ingest (E40).
- Sales inbound: yes. The requesting flow (E5, E17).
- Sales outbound: yes. Same list, separated only by the flowType filter (E17, E41).
- Sales STL: yes (inferred). Action items are one queue across agentType (E38); whether STL threads appear in the conversations list is unconfirmed.
- Sales chat: unknown. The list has a channel filter (E17); chat as a value is unconfirmed.
- Service inbound: yes. Same pages and endpoints with serviceType=service (E17, E38, E39, E40).
- Service outbound: yes (inferred). Same serviceType split; no service outbound flow traced.
- Per-assignee "unanswered" for service advisors: applies if service conversations carry an assignee. Action items do (assignedTo, E38); the conversations list has no assignee filter for either department (E41).

## How it works today
- Team conversations list: filters for department, channel, unread and flow; no assignee filter (`conversational-ai-backend:src/customers/customers.controller.ts:16`, E17, E41).
- Unread is per conversation, mirrored to the crm-core lead; "Unread only" works (`conversational-ai-backend:src/customers/customers.service.ts:1101`, E19).
- Opening a customer returns up to 5 open action items (`conversational-ai-backend:src/customers/customers.service.ts:686`, E18).
- Action items: one team queue with assignedTo, serviceType, agentType, pastSla filters (`conversational-ai-backend:src/action-items/action-items.controller.ts:59`, E38).
- Needs Attention quick filter with a live count is live (E22); its index is keyed to human-transfer phase, so it likely lists handoffs, not every unanswered reply (inferred, E20).
- Customers is a separate page that missed an action item Conversations showed (E9); moving it is backlog (E24).
- Console frontend: `spyne-console-microfrontends:apps/converse-ai`, with one department switch (E39). The earlier console card had low verification (E21).

## Gap
- The dealer wants one "my unanswered customers" queue with action item and lead context on one page (E7, E11). Unread can be filtered but not by assignee (E17, E41); Needs Attention appears to cover handoffs only (E20). So the floor still needs Action Items and the CRM (E13).
- The change lands on a shared surface. The same pages, list and action-item queue serve service departments (E37, E38, E39, E40). A sales-only design (sales journey stages, VinSolutions status, salesperson routing, removing Customers) would break or confuse service advisors unless built department-aware (E30, E32, E34).
- Customers and Conversations disagree on action items (E9); the Customers retirement is backlog (E12, E24).
- Scope conflict: CSM-authored two-board overhaul (E1, E4, E28, E30) versus the dealer's "no build needed" (E8).
- Untested spec items: missed calls in unanswered (E31), assignee-routed alerts (E33), takeover pause, CRM write-back, auto-closing action items (E34). Assignee routing needs the same field as the unanswered view (E17, E38).
- Console v2 epic already covers a broader redesign, in backlog (E23).

## Candidate directions
1. No build: set this rooftop up on Conversations with Unread and Needs Attention, fix the missing-action-item defect (E9), train the two salespeople on one page. Removes manager cross-checking time at no build cost. Service: no change, so no risk; the defect fix also helps service teams on the same Customers page.
2. **Full value:** a department-aware "My unanswered" queue on Conversations: unread customer replies and missed calls, routed by assignee, with a live count and the open action items inline, as the landing view for sales and service members. Fewer days a reply sits unanswered, less lost gross on sales leads and fewer unanswered service customers who never become an RO (absorption, inferred). Build: add an assignee filter to the team conversations list (action items already carry assignedTo, E38), source the assignee from the CRM for sales and the DMS or scheduler for service advisors, and drive alerts from the same field (E33). Reusable by every rooftop on either agent.
3. Decline the single-screen overhaul as a one-rooftop request; fold it into Console v2 (E23) and the Customers-tab retirement (E24), with a brief that both departments use the surface. Consider pushing unanswered replies into the dealer's CRM as tasks (E16). Avoids one-off redesign cost. Service: Console v2 must then specify service stages and statuses too, or ship a sales-only board that service ignores.

## Frequency
0 other rooftops raised the same single-screen ask on the dealer side in 90 days (E25, E26). 2 other companies raised the adjacent job of seeing AI texts where staff already work (E25); Spyne staff positioned Conversations as "the one place" to at least 3 others (E25). The pain looks common even if the ask is not.

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

