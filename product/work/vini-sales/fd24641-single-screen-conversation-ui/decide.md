# Decide: Salespeople have to cross-check three screens to find and close the customer replies Vini left for them

## Ladder
1. **Literal ask:** The used car manager wants "to only stay in one screen rather than have to cross reference multiple" [E5]: a view that says "[my] unanswered", which he clicks to land on a customer page with "all of the stuff connected" [E7], or a "customers unanswered" line above Conversations [E11]. He also said "You don't have to make any [...] changes for me. I'm just telling you workflow" [E8]. The ticket itself is the CSM's: "a central screen where the dealership can operate from" [E1, E27], specified as a five-counter command board, a seven-stage journey board, no Customers section and rep-routed alerts [E28, E30, E32, E33].
2. **Job:** Every console member answers the customer replies Vini creates, fast, from the one page they already work in, without cross-checking Action Items and the CRM [E5, E6, E13]. Today a reply waits until someone happens to look: "no one really knows when [Spyne] reaches out unless they're in there" [E16], and a three-screen flow for about 600 leads a month (dealer-stated, not audited) is one "there's no way that these guys would do" [E10]. In P&L terms: fewer hours an engaged customer sits unanswered, so fewer leads the store already paid to acquire go cold (front-end and F&I gross at risk on the sales side), and less manager time spent cross-checking two new salespeople [E6, E10]. On the service side the same page serves advisors [E37, E39], where an unanswered service customer is an RO that never opens (fixed-ops gross and absorption, inferred, no service-side dealer voice at this rooftop) [E37, E38]. No response-time, lost-deal or lost-RO figure exists in the evidence: unknown [Q15].
3. **Who else has this job:** 1 rooftop confirmed (this one) [E5, E7]. 0 other rooftops raised the single-screen ask in 90 days [E25, E26]; 2 other companies raised the adjacent job of seeing AI texts where staff already work [E25]; Spyne staff positioned Conversations as "the one place" to 3 or more others [E15, E25]. The count of rooftops with the same job (Vini-created replies left unanswered by the assigned person) is unknown; it is a question [Q14].
4. **Smallest shared building block:** An assignee filter on the team conversations list, combined with the existing unread filter and department switch, saved as a "My unanswered" view with a live count. The list today filters by serviceType, type, unreadOnly and flowType but not by assignee (`conversational-ai-backend:src/customers/customers.controller.ts:16`) [E17, E41]; unread is already held per conversation and filterable (`conversational-ai-backend:src/customers/customers.service.ts:1101`) [E19]; the action-item queue already filters by assignedTo (`conversational-ai-backend:src/action-items/action-items.controller.ts:59`) [E38]; opening a conversation already returns up to 5 open action items beside it (`conversational-ai-backend:src/customers/customers.service.ts:686`) [E18]; and a live-count quick filter pattern already ships as Needs Attention [E22]. One parameter and one view serve every rooftop and both departments. Whether a lead carries an assignee at all is unknown [Q5, Q11]. Separately, the action item missing from the Customers record is a defect, not part of the building block [E9].
5. **What varies per store:**
   - Department: the view runs per serviceType, sales or service, through the existing department switch (`spyne-console-microfrontends:apps/converse-ai/contexts/mainContext.tsx:241`) [E39].
   - Assignee source: a per-integration field mapping on the lead, the CRM's assigned salesperson for sales and the DMS or scheduler advisor for service; each CRM and DMS fetcher already resolves a lead to sales or service (`integrations-backend:src/webhook/helpers/service-type.helper.ts:22`) [E40]. Whether the fetchers read an assignee is unknown [Q5, Q11].
   - What counts as unanswered: unread customer replies always; missed calls as a rooftop setting, if call records support it [E31, Q9].
   - Who is alerted: a notification setting, assignee only or whole team, driven by the same assignee field [E33, Q9].
   - Landing view: a per-member default (My unanswered, All, Needs Attention), not a per-rooftop screen [E7, E13].
6. **Every agent it lands on:** Sales inbound: yes [E5, E17]. Sales outbound: yes [E17, E41]. Sales STL: yes (inferred, action items are one queue across agentType; STL threads in the conversations list unconfirmed) [E38, Q12]. Sales chat: unknown [E17, Q12]. Service inbound: yes [E17, E38, E39, E40]. Service outbound: yes (inferred, same serviceType split, no service outbound flow traced) [E17, E40]. Fixed intent: the change is designed for every department that uses the surface [E37]; per-assignee unanswered for service advisors depends on service leads carrying an assignee [E38, E41, Q11].
7. **Full value:** A department-aware "My unanswered" queue on Conversations: unread customer replies and missed calls, routed by assignee, with a live count and open action items inline, as the landing view for sales and service members, with alerts driven by the same assignee field [E7, E11, E31, E33, E38]. Planned: no. The nearest planned work is the Console v2 epic and the Customers-tab move, both in Product Backlog with no target date [E23, E24]; their status and owner are open [Q6].

## As asked vs as solved
| Customer asked | We would build | Same, generalised, or different | Why |
|---|---|---|---|
| Stay in one screen, not cross-reference several [E5, E27] | Conversations as the single working page for sales and service, with Unread and Needs Attention set up and the two salespeople trained there [E14, E19, E22] | Same | The dealer said no build is needed for himself [E8]; the CSM already moved him there [E13, E14] |
| "[My] unanswered", click, land on the customer with everything connected [E7] | A "My unanswered" view: unreadOnly plus a new assignee filter on the team list, per department, action items inline [E17, E18, E19, E38] | Generalised | Assignee filter exists on action items, not on conversations [E38, E41]; the same page serves service [E39] |
| "Customers unanswered" line above Conversations [E11] | A live count on that view, on the Needs Attention badge pattern [E22] | Same | Pattern already live in prod [E22] |
| Unanswered phone call or unanswered message [E31] | Missed calls in the unanswered view as a rooftop setting, if call records support it | Generalised | Whether it works today is unknown [Q9] |
| Five status counters, needs-a-person list with Take over, Assign, Mark resolved [E28, E29] | Not built as specified; Needs Attention already covers handoffs [E20, E22] | Different | CSM-authored spec; the dealer asked for workflow, not a build [E8, E36, Q7, Q8]; support called it a console overhaul [E4] |
| Seven-stage journey board from lead to close [E30] | Not built here; belongs in Console v2 [E23] | Different | Sales-only stages; service stages unknown [Q13]; fixed intent requires both departments [E37] |
| No Customers section [E32] | Keep Customers; fix the action item missing from the Customers record [E9]; retirement stays in its backlog item [E24] | Different | Service teams use the same page [E39]; the missing action item is a defect [E9] |
| Alerts tied to rep assignment, not sent to everyone [E33] | Alert recipients as a notification setting driven by the same assignee field | Generalised | One field serves the view and the alert [E38]; current behaviour unknown [Q9] |
| Takeover pauses the AI, VinSolutions reflects the outcome with no duplicate appointment, action item auto-closes [E34] | Out of scope for this decision; each traced separately | Different | Current state unknown [Q9]; CRM write-back is a per-provider dependency, not a console change [E34, E40] |

## Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E25, E26] | 1 rooftop with the ask; 0 others with the same words in 90 days; 2 companies with an adjacent job. Same-job count: unknown [Q14] |
| Dealer P&L impact | [E6, E10, E16] | Unknown as a figure [Q15]. Named, not sized: hours a Vini-created reply sits unanswered, manager cross-checking time, engaged leads going cold on about 600 leads a month (dealer-stated) [E10]; service side inferred only [E37] |
| Strategic fit | [E40] and org facts 4 and 5 | Above the DMS and CRM: the console reads leads the CRM and DMS fetchers already ingest [E40]. Fits the handoff fact: the AI-to-human handoff is where engaged leads are lost and nobody is paid on it [E6, E16]. Area roadmap: Console v2 in backlog [E23] |
| Cost and risk to build | `conversational-ai-backend:src/customers/customers.controller.ts:16`, `conversational-ai-backend:src/action-items/action-items.controller.ts:59`, `spyne-console-microfrontends:apps/converse-ai/contexts/mainContext.tsx:241` | No-build setup plus the Customers defect: S. "My unanswered" view: M; main risk is the assignee source, unknown for both departments and likely different for service [Q5, Q11]. The CSM spec as asked: L, a console overhaul [E4] |
| Cost of not solving | [E2, E6, E16] | Escalation: the CSM asked for an ETA [E2]; the manager already has "trouble with them following up" as he adds two salespeople [E6]. Churn or health signal for this rooftop: unknown [Q16] |
| Prior decisions | none | No ledger match in case.md and no matching entry in `context/decisions/`. Related backlog: Console v2 [E23], Customers-tab move [E24]; Needs Attention shipped [E22] |

## Arguments
### For building (advocate)
**Building block.** A department-aware "My unanswered" view on Conversations: the existing unread filter plus a new assignee filter, with a live count. Per-rooftop settings: assignee source, alert recipients, landing view. The team list filters by serviceType, type, unreadOnly and flowType, not assignee (`conversational-ai-backend:src/customers/customers.controller.ts:16`) [E17, E41]. Action items already filter by assignedTo [E38]; unread is per conversation [E19]; conversations carry open action items [E18]; the live-count pattern ships as Needs Attention [E22].

**Why now.** Demand is thin: one rooftop, 0 others in 90 days [E25, E26]. I expect more: 2 companies raised the adjacent job of seeing AI texts where staff work, and Spyne sells Conversations as "the one place" to 3 or more [E25]. P&L: a paid-for lead Vini engaged sits unanswered until someone looks [E16], on about 600 leads a month (dealer-stated) [E10]. On service, an unanswered customer is an RO that never opens (inferred) [E37]. No sized figure exists [Q15].

**Fit.** It reads leads the CRM and DMS fetchers already ingest, no write-back [E40], and fixes the AI-to-human handoff nobody is paid on [E6, E16].

**Cheapest credible version.** One assignee parameter on the team list and a saved "My unanswered" view with count. Sales first, where the CRM assignee maps; service through the same department switch [E39] once its source is confirmed. Fix the Customers action-item defect alongside [E9]. Size M [Inputs].

**Honest weakness.** If leads carry no reliable assignee [Q5, Q11], this is "Unread" renamed, and the dealer said he needed no build [E8].

### Against building as asked (skeptic)
**1. Outcome:** already-possible (setup and training on Conversations, plus the Customers defect fixed as a bug [E9]).

**2. The case for it:**
- The dealer said he needs no build: "I'm just telling you workflow" [E8].
- Conversations already has "Unread only" [E19] and Needs Attention with a live count [E22]. Opening a conversation shows up to 5 open action items [E18].
- A per-rep view already exists. Action Items filters by assignedTo (`conversational-ai-backend:src/action-items/action-items.controller.ts:59`) [E38]. The manager keeps it open "because that filtering also helps me" [E13].
- The CSM is already onboarding the two new users on Conversations [E14].
- Demand is one rooftop. No other dealer raised the ask in 90 days [E25, E26].
- The blocker for "my unanswered" is the assignee source, unknown for both departments [E41]. Building first risks a sales-only filter on a page service shares [E37, E39].

**3. What we lose:** Salespeople cannot filter conversations to "mine" [E17, E41]. They still need two tabs plus VinSolutions [E13], across about 600 leads a month (dealer-stated) [E10]. The manager has "trouble with them following up" [E6]. The evidence has no response-time or lost-deal figure [E6, E10, E16].

**4. What would change my mind:**
- Either adjacent company [E25], or any other rooftop, asks for a per-rep unanswered view.
- After 30 days of training, this rooftop's unread conversations still pile up while the matching assignedTo action items stay open.
- Engineering confirms leads carry an assignee for both sales and service.

## Outcome
**Outcome:** already-possible
**Feature slug:** none (not a build outcome). The missing action item on the Customers record [E9] is a separate defect for the bug path, not part of this outcome.
**Why:** The dealer asked for a workflow, not a build [E8]. Conversations already gives one working page with Unread only [E19], Needs Attention with a live count [E22] and open action items inline [E18], and the CSM is onboarding the two salespeople there [E14]. Demand is 1 rooftop, 0 others in 90 days [E25, E26], P&L impact is named but not sized [Q15], and the per-rep filter depends on an assignee source unconfirmed for sales and service alike [Q5, Q11, E41], so building now would assume data we have not proven and risk a sales-only filter on a shared surface [E37, E39].
Rung 7 (Full value): not taken now and not planned. The department-aware "My unanswered" queue with assignee routing and alerts is the named full-value path; it waits on the revisit trigger below, and if it fires it is scoped as a base capability for sales and service, not folded into the unscheduled Console v2 epic [E23, Q6].
**Strongest point from the losing side:** "I expect more: 2 companies raised the adjacent job of seeing AI texts where staff work, and Spyne sells Conversations as \"the one place\" to 3 or more [E25]."
**Why it did not carry:** The adjacent asks are about seeing AI texts where staff already work, not a per-rep queue in our console, and selling Conversations as the one place is exactly what this setup tests at no build cost; zero same-job asks in 90 days [E26] is not a base.
**Revisit trigger:** Reopen as build-generalised when engineering confirms leads carry an assignee for both sales and service [Q5, Q11] AND either a second rooftop asks for a per-rep unanswered view, or this rooftop's unread conversations still pile up with matching assignedTo action items open 30 days after training (from 2026-10-13 [E13, E14]).
**Rubric scores:** Job, not request: 3 (serves the one-page job; the per-rep part of the job is left open with a trigger) · Evidence weight: 4 (demand count and current capability cited; impact unsized [Q15]) · Five facts: 4 (no build cost, no write-back assumed, above the DMS; no days-removed figure) · Proportion: 5 (S effort against 1 rooftop and unsized impact; the L overhaul [E4] avoided) · Reversibility: 5 (setup and training only; nothing locks the base into one store's process)

## PM decision
**Outcome (PM, 2026-10-16):** build-generalised, overriding the judge's already-possible. **Feature slug:** my-unanswered-queue. The judge's outcome and reasoning above stay as the record.
