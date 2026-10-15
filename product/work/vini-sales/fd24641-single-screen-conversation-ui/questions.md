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
