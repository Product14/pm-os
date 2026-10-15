# Evidence

### E1
- source: freshdesk:24641#0
- date: 2026-10-08
- side: spyne
- role: csm
- text: "Streamline-lining Conversation UI - Single Screen for Dealership Operations" (ticket subject; type Enhancement, Internal, raised by the account's Vini CSM on the dealer's behalf; the API returned no description body)

### E2
- source: freshdesk:24641#5
- date: 2026-10-12
- side: spyne
- role: csm
- text: "Please provide an ETA on this. [...] Let me know what you need regarding this." (requester reply on an Internal ticket; requester appears to be the CSM)

### E3
- source: freshdesk:24641#3
- date: 2026-10-08
- side: spyne
- role: unknown
- text: "Please note that Urgent means 6 hours SLA - Since this is an enhancement - as per our discussion moving this to medium" (private note)

### E4
- source: freshdesk:24641#6
- date: 2026-10-13
- side: spyne
- role: unknown
- text: "This looks like an overhaul for the current UI of Spyne Console. I would need your sign-off before picking this up!" (private note to the product owner)

### E5
- source: arali:49b874ad-bc61-4762-90a0-e3b1ff052aad
- date: 2026-10-01
- side: dealer
- role: used-car-manager
- text: "I'm just trying to come up with a way to only stay in one screen rather than have to cross reference multiple."

### E6
- source: arali:49b874ad-bc61-4762-90a0-e3b1ff052aad
- date: 2026-10-01
- side: dealer
- role: used-car-manager
- text: "You know that I have a trouble with them following up. So when I add two people in, [...] if they have to look at the conversation, look at the action item, look at [VinSolutions], [...] that's just a lot of things."

### E7
- source: arali:49b874ad-bc61-4762-90a0-e3b1ff052aad
- date: 2026-10-01
- side: dealer
- role: used-car-manager
- text: "if I come in and I see a dashboard that says unanswered [...] [my] unanswered, click on it. Then I'm at the customer page, and it's just all of the stuff connected."

### E8
- source: arali:49b874ad-bc61-4762-90a0-e3b1ff052aad
- date: 2026-10-01
- side: dealer
- role: used-car-manager
- text: "You don't have to make any [...] changes for me. I'm just telling you workflow." Later: "I don't need anything to be added. I was just curious why action item wasn't under there."

### E9
- source: arali:49b874ad-bc61-4762-90a0-e3b1ff052aad
- date: 2026-10-01
- side: dealer
- role: used-car-manager
- text: "this is an action item. That's why I don't understand why there's not an action item in this one." (action item shows in Conversations but not on the Customers record; CSM called it a possible sync issue)

### E10
- source: arali:7e8f3757-4dc3-4e43-bbef-99f1dfc15c9e
- date: 2026-09-15
- side: dealer
- role: unknown
- text: "we get 600 leads a month [...] you can't go into action items, then have to go into conversations, then have to go into [VinSolutions] just to close a record [...] there's no way that these guys would do that."

### E11
- source: arali:60ae9d8f-d1aa-44e3-afe6-f1c83b951382
- date: 2026-10-06
- side: dealer
- role: used-car-manager
- text: "It'd be cool if there was a little, like, line above here that would say, customers unanswered."

### E12
- source: arali:60ae9d8f-d1aa-44e3-afe6-f1c83b951382
- date: 2026-10-06
- side: spyne
- role: csm
- text: "customer section is not relevant right now [...] just gonna remove that because everything sits under conversation this time."

### E13
- source: arali:c1a25a67-9b45-4f9b-84d2-c0482edc6566
- date: 2026-10-13
- side: dealer
- role: used-car-manager
- text: "I live in the conversations because you're right. That's where the meat is, but I also keep open action items because that filtering also helps me. [...] two [VinSolutions] tabs open and then usually three of these open too."

### E14
- source: arali:c1a25a67-9b45-4f9b-84d2-c0482edc6566
- date: 2026-10-13
- side: spyne
- role: csm
- text: "[we] have struggled to keep up with tabs [...] right now, everything is happening in conversations. This is, like, your go to place." (CSM onboarding two new dealer users)

### E15
- source: arali:740584f7-0182-4397-9c2f-07980be0382c
- date: 2026-09-03
- side: spyne
- role: csm
- text: "you don't have to run between action items and conversations anymore and not even customers. You can just sit under conversations, and we have added this need attention kind of a tab" (outside 30 days)

### E16
- source: arali:dc982453-a6fe-4a68-9352-4dec4030f8a6
- date: 2026-09-10
- side: dealer
- role: used-car-manager
- text: "no one really knows when [Spyne] reaches out unless they're in there. [...] There's two CRMs, just one's a little bit more intuitive and one's AI." (outside 30 days)

### E17
- source: bluebrain:conversational-ai-backend:src/customers/customers.controller.ts:16
- date: 2026-10-15
- side: system
- role: engineering
- text: "GET /customers/conversations/team lists a team's conversations, filterable by serviceType, type, unreadOnly and flowType only. No assigned-salesperson filter. Route from Blue Brain search_routes; read on local release a2b8754c7."

### E18
- source: bluebrain:conversational-ai-backend:src/customers/customers.service.ts:686
- date: 2026-10-15
- side: system
- role: engineering
- text: "getConversationsByCustomerV2 (line 489) attaches up to 5 open action items per lead via action-items.service.ts:98, so a conversation shows its action items beside it. Blue Brain trace_handler resolved no helpers; read on local release."

### E19
- source: bluebrain:conversational-ai-backend:src/customers/customers.service.ts:1101
- date: 2026-10-15
- side: system
- role: engineering
- text: "Unread state is held per conversation (isUnread) and mirrored to the lead in crm-core (has_unread, line 1117). The unreadOnly list filter matches isUnread (line 2495)."

### E20
- source: bluebrain:conversational-ai-backend:src/conversation/conversation.schema.ts:528
- date: 2026-10-15
- side: system
- role: engineering
- text: "Index comment: 'Human transfer phase lookup, for a future Needs Attention list filter (RETCONVAI-2997)'. Needs Attention appears keyed to human-transfer phase, not to unanswered customer replies (inferred from the index)."

### E21
- source: bluebrain:spyne-console-microfrontends:apps/console/next.config.js:72
- date: 2026-10-15
- side: system
- role: engineering
- text: "Blue Brain card for the console frontend lists no Vini Conversations, Action Items or Customers capability. Card verification score 0.464 (low). Frontend location for the Vini screens not found."

### E22
- source: jira:RETCONVAI-4753
- date: 2026-08-21
- side: system
- role: engineering
- text: "Needs Attention quick filter tab with live count badge on the Conversations page. Status LIVE ON PROD."

### E23
- source: jira:RETCONVAI-2999
- date: 2026-04-26
- side: system
- role: engineering
- text: "Epic 'Console v2', Product Backlog. Children include Action Items tab (RETCONVAI-3001), Leads tab with detail panel (RETCONVAI-3003), Overview tab (RETCONVAI-3000). Overview V2 build story RETCONVAI-4857 also in backlog."

### E24
- source: jira:RETCONVAI-4576
- date: 2026-08-11
- side: system
- role: engineering
- text: "'Move Customer tab out of sales and service section', Product Backlog. Related bug RETCONVAI-4812: clicking Takeover removes the task from Need Attention, backlog."

### E25
- source: search:search-transcripts:dealer wants one screen or single inbox to work leads instead of switching between conversations, action items and customer pages
- date: 2026-10-15
- side: system
- role: engineering
- text: "Range 2026-07-17 to 2026-10-15, no company filter, 30 hits. Other companies raising the same single-screen ask on the dealer side: 0. Adjacent (dealer staff want AI texts visible where they already work): 2 companies. Spyne-side demos positioning Conversations as the one place: 3 or more."

### E26
- source: search:search-ticket-messages:consolidate console screens conversations action items customers in one view
- date: 2026-10-15
- side: system
- role: engineering
- text: "Range 2026-07-17 to 2026-10-15, no company filter, 30 hits. Other companies with the same ask: 0. Hits were unrelated console pop-ups, feed and sync tickets."
