# Open questions

### Q1
- slot: ask
- unknown: Whether this ticket belongs to vini-sales or to a platform/console owner, since the Freshdesk pod is "Vini - Platform"
- blocks: who owns the decision and the PRD
- who: pm
- how: Check the console/platform owner in OWNERS.md and agree ownership with them before Gate 1
- status: open

### Q2
- slot: ask
- unknown: What the ticket description and any attachments say; the Freshdesk API returned only the subject
- blocks: Ask, whether the CSM attached mockups or a specific screen proposal
- who: csm
- how: Open ticket 24641 in the Freshdesk web UI and read the description and attachments, or ask the CSM for the original write-up
- status: answered (E27)

### Q3
- slot: job
- unknown: Whether the real job is salesperson follow-up on unanswered replies, or the manager's own convenience; the dealer said no build is needed (E8)
- blocks: Job, and whether direction 1 alone closes the ticket
- who: dealer
- how: Ask the CSM to put one question to the used car manager on the next weekly call: "If your two salespeople had one 'my unanswered' list, would that be enough?"
- status: open

### Q4
- slot: how_it_works_today
- unknown: Where the Vini Conversations, Action Items and Customers frontend lives, and exactly what Needs Attention includes (handoffs only, or every unanswered customer reply)
- blocks: How it works today, Gap
- who: engineering
- how: Ask the converse console frontend lead; or grep the console repo for the Needs Attention tab and read the query it sends (RETCONVAI-4753 PR)
- status: open

### Q5
- slot: gap
- unknown: Whether the lead carries the dealer CRM's assigned salesperson, so a per-salesperson unanswered view is possible
- blocks: Direction 2 feasibility
- who: engineering
- how: Check the crm-core lead schema and the VinSolutions lead fetch in integrations-backend for an assignee field; one Blue Brain search_columns call on "assigned" in crm-core-service
- status: open

### Q6
- slot: directions
- unknown: Whether Console v2 (RETCONVAI-2999) and the Customers-tab move (RETCONVAI-4576) are still planned and who owns them
- blocks: Direction 3, and whether to fold this ticket into existing work
- who: pm
- how: Read the epic in Jira and ask its reporter for status and target quarter
- status: open

### Q7
- slot: ask
- unknown: What the attached screenshot and the cited Arali meeting (E36) show, and whether the two-board spec is the dealer's or the CSM's own design
- blocks: Ask, and how much of the E28 to E35 spec is a customer requirement
- who: csm
- how: Read the cited meeting in Arali and open the ticket attachment in the Freshdesk web UI; ask the CSM which parts the dealer saw and agreed to
- status: open

### Q8
- slot: job
- unknown: Whether the dealer wants the full overhaul the description specifies (E35) or only workflow guidance, as he said on the call (E8)
- blocks: Job, scope, and whether direction 1 or 3 is still viable
- who: dealer
- how: CSM shows the used car manager the two-board spec on the next weekly call and asks which three pieces he would use daily
- status: open

### Q9
- slot: how_it_works_today
- unknown: Which description behaviours already work: missed calls in unanswered (E31), alerts to the assigned rep only (E33), takeover pausing the AI, VinSolutions write-back without duplicate appointments, auto-closing action items (E34)
- blocks: Gap, and the size of any build
- who: engineering
- how: Ask the Vini Sales backend lead to mark each of the five as works, partial or missing; Blue Brain find_prior_art on "notify assigned salesperson" and "action item auto close"
- status: open

### Q10
- slot: who_feels_this
- unknown: Whether this rooftop (and which others) run Vini Service on the same console, and which service roles (advisor, service manager, BDC) work Conversations and Action Items daily
- blocks: Who feels this (service rows are inferred), and whose workflow the PRD must test
- who: csm
- how: Ask the CSM whether this rooftop has Vini Service live; check console page views split by service type for the last 30 days
- status: open

### Q11
- slot: agents_affected
- unknown: Whether service leads and conversations carry an assigned advisor, so a per-assignee unanswered view and alert routing work in service as in sales (action items carry assignedTo, E38; the conversations list has no assignee filter, E41)
- blocks: Direction 2 for service, and where the assignee comes from (CRM for sales, DMS or scheduler for service)
- who: engineering
- how: Ask the Vini backend lead how assignedTo is populated on action items per department; check the crm-core lead schema for an assignee on service leads
- status: open

### Q12
- slot: agents_affected
- unknown: Whether STL and website chat conversations appear in the team conversations list and action-item queue (flowType, channel and agentType values)
- blocks: Agents affected rows for Sales STL and Sales chat
- who: engineering
- how: Ask the Vini backend lead for the flowType, channel and agentType enum values the list and queue accept
- status: open

### Q13
- slot: directions
- unknown: Whether the spec's status counters and seven-stage sales journey (E28, E30) mean anything for service customers, or need service-specific stages
- blocks: Directions 2 and 3, and the PRD's service scope
- who: pm
- how: Walk the spec with a Vini Service CSM and one service manager persona review before the decide step
- status: open

### Q14
- slot: request
- unknown: How many rooftops have the same job: Vini-created customer replies left unread by the assigned person, in sales or service, over the last 90 days
- blocks: decide.md Ladder rung 3 and Inputs, Demand breadth
- who: pm
- how: Count rooftops with unread conversations older than one business day, split by serviceType, from the conversations store; cross-check with CSM accounts that coach "live in Conversations" (E25)
- status: open

### Q15
- slot: request
- unknown: How long a Vini-created customer reply waits before a human answers, per rooftop and department, and how many such leads or service customers go cold
- blocks: decide.md Ladder rung 2 and Inputs, Dealer P&L impact
- who: pm
- how: Measure time from customer reply to first human message on unread conversations for this rooftop and a sample of others, by serviceType; read context/metrics and context/traps first
- status: open

### Q16
- slot: request
- unknown: Whether this rooftop shows a churn or health risk tied to follow-up or console usability, beyond the CSM's ETA request (E2)
- blocks: decide.md Inputs, Cost of not solving
- who: csm
- how: Read the rooftop's Arali health trend and open signals for the last 30 days; ask the CSM whether this ticket is tied to renewal or adoption risk
- status: open

### Q17
- slot: request
- unknown: Whether the local `leads.assigned_to` field (conversational-ai-backend:src/leads/schemas/lead.schema.ts:42) is populated for sales and service leads when crm-core is enabled, and whether it equals crm-core's round-robin assignee; the team conversations list reads local leads (customers.service.ts:2452)
- blocks: solution-context, the assignee filter on the "My unanswered" view
- who: engineering
- how: Ask the Vini backend lead; sample local leads vs crm-core sales_lead assigned_to for one rooftop
- status: open

### Q18
- slot: request
- unknown: Whether any CRM fetcher in integrations-backend (VinSolutions, eLeads, Tekion, DriveCentric) reads the dealer CRM's assigned salesperson, and whether that owner differs from Spyne's round-robin assignee (crm-core-service:src/assignment/assignment.service.ts:90)
- blocks: solution-context, whether "mine" means the CRM owner or the Spyne assignee; per-provider read is a commercial dependency
- who: engineering
- how: Ask the integrations-backend owner which providers expose a salesperson or owner field on lead fetch today
- status: open

### Q19
- slot: request
- unknown: Where a service advisor for a service lead or appointment comes from (DMS, Xtime or other scheduler), and what writes meetings.assigned_to (conversational-ai-backend:src/meetings/appointment-alert.service.ts:160)
- blocks: solution-context, the service half of "My unanswered" and assignee-routed alerts
- who: engineering
- how: Ask the integrations-backend and crm-core owners which DMS and scheduler integrations return an advisor id
- status: open

### Q20
- slot: request
- unknown: How to define "unanswered": isUnread flips true on conversation create, call updates, dealer-sent email and AI outbound (conversation.service.ts:520, :650, :777; sms.service.ts:753), and read state is one shared lastReadAt per conversation (conversation.schema.ts:183). Is there an existing "last inbound customer message with no reply after it" field, and should read state become per member?
- blocks: solution-context, the queue definition, its count and its metric
- who: engineering
- how: Ask the Vini backend lead whether smsChatCompletions or the inbound handler (sms.service.ts:1924) can stamp lastInboundAt and lastHumanReplyAt, and the cost of per-user read state
- status: open

### Q21
- slot: request
- unknown: With crm-core enabled, has_unread is written only to crm-core (leads.service.ts:135) while the Customers list unreadCount and team list read local leads; does local unread go stale for crm-core rooftops?
- blocks: solution-context, trusting any unread count as the live count or as a metric
- who: engineering
- how: Ask the crm-core owner whether crm-core writes back to the shared leads collection; compare counts for one crm-core rooftop
- status: open

### Q22
- slot: assumption
- unknown: team view is an acceptable fallback for service
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q23
- slot: assumption
- unknown: reps stop opening Action Items
- blocks: v1.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q24
- slot: assumption
- unknown: the VinSolutions read fits inside the L
- blocks: v3.md
- who: pm
- how: <confirm or replace with evidence>
- status: open

### Q25
- slot: assumption
- unknown: 2-week target, 30-day review
- blocks: v3.md
- who: pm
- how: <confirm or replace with evidence>
- status: open
