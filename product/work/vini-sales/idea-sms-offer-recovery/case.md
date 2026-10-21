---
id: idea-sms-offer-recovery
area: vini-sales
stage: triaged
freshdesk_ticket:
ticket_updated_at:
rooftop_slug:
rooftop_name:
freshdesk_company_id:
arali_company:
raised_by: pm (Sales Inbound PM)
raised_by_role: unknown
csm:
feature: sms-offer-recovery
outcome: build-generalised
prd:
jira:
ledger_match:
fetched_freshdesk:
fetched_arali:
fetched_code:
---

# SMS leads who don't take the first offered times, or whose car isn't in stock, get no second path to a visit

## Ask
PM idea from the 21 Oct Sales Inbound weekly review, not a dealer ticket. Cover both SMS levers the review ranked next, in one PRD [E1]: (1) after an offered visit time is not taken, change the offer instead of repeating it or going quiet [E2] [E3]; (2) when the requested car is not in stock, offer a sourcing or similar-unit path that still ends in a visit time [E6].

## Job
Turn more engaged SMS leads into a set visit so the BDC is not chasing them for days. Today 4 in 5 SMS leads offered two times do not book (99 of 517, 10 to 20 Oct) [E5], and a lead with no set visit is a lead the store's BDC has to work again, adding days to the deal. Dealer P&L angle: fewer BDC follow-up touches per lead and fewer days from lead to visit [ASSUMPTION: a visit set inside the first SMS thread shortens lead-to-sale; not measured here].

## Customer context (30 days)
Connects:
- Lever 1, a yes or a near-yes not closed: a sales director says the SMS agent "ruined the appointment" by asking about price after the customer agreed to a test drive, and wants the next turn to be "today or tomorrow" with nothing else [E30] [E31]. The CSM says other stores gave the same feedback [E37] (Spyne-side).
- Hand-back of unbooked text leads: a store lost an aged lead because the agent's intended 12PM test drive never reached the CRM and nobody was alerted [E33]. Another store wants the raw SMS thread in its CRM close to live, so a salesperson can stop the AI's follow-ups and take over [E32].
- Changing the approach rather than pushing the same ask: a used car manager says the text follow-up has "the AI goal" of setting the appointment when a different angle would fit the lead [E34].

Does not connect, or pushes the other way:
- A GM wants re-engaged text leads moved to a phone call, because booking by text is "too much commitment" [E35]. That was a dead-deal campaign at a Canadian rooftop, not inbound SMS, but it argues against forcing a second time offer.
- No dealer named repeated time pairs or silence after an offer [E40]. That evidence is only from our transcript read [E2] [E3].
- No dealer raised the inventory-miss dead end on Vini [E40]. The only stock remark was a prospect describing another vendor's AI booking cars they no longer had [E36]. Lever 2 has no dealer voice yet.
- 0 dealer tickets on either lever in 90 days [E38]. 0 relevant emails or Slack threads in 30 days [E39].

## Who feels this
- Sales director: sees appointments lost when the agent does not close an agreed visit [E30] [E31].
- Used car manager: reviews the text follow-ups and wants the approach to change with the lead [E34].
- The manager who runs the follow-up team (exact title unknown): absorbs unbooked text leads the CRM never flagged [E33].
- General manager: wants unbooked text leads moved to a phone call, not pushed again by text [E35].
- Not heard directly: the BDC manager and the internet sales manager. Their stake in hand-back is inferred from E32 and E33.

## Agents affected
- Sales inbound SMS: yes, this is where both patterns were measured [E2] [E6].
- Sales inbound voice: yes for a prompt change. Voice renders the same sales_v2 fragments (appointment-conversion.xml, unavailable-vehicle-discovery.xml) [E13] [E24], but voice already has the visit-ask gate [E14]; its own regression is RETCONVAI-5392 [E12].
- Sales STL: yes. speed_to_lead SMS runs the same prompt root [E13] and is in the pencil-booking sources [E22]; wake-ups arm on any inbound SMS reply [E19].
- Sales chat: yes for a prompt change. Chat builds from the raw sales_v2 root (conversational-ai-backend:src/agents/agents-v2.service.ts:1581); wake-up and pencil are SMS-only [E22].
- Sales outbound: yes for a prompt change on voice (same sales_v2 root for any sales agent type [E13]); outbound SMS campaigns unknown.
- Service inbound and outbound: no, different agent and prompt.

## How it works today
SMS renders the sales_v2 prompt [E13].

**After offered times are not taken**
- Repeat protection is prompt text only: a declined pair is never re-offered, and a times-only rejection gets one "what day and time suit you" question [E15] [E16]. The SMS arm adds only a one-tap two-time ask [E17].
- No server-side memory or gate: `visit_ask_gate` is set only on voice, so the gate tool never reaches SMS [E14] (`conversational-ai-backend:src/agents/agents-v2.service.ts:2905`), and no offered-slot store exists [E18].
- Silence: a wake-up nudge fires 10 minutes after the last reply, at most 2 per thread, skipped once a meeting, a non-scheduling action item or a concluded message exists [E19] [E20]. The wake-up drops the appointment-conversion rules and re-asks the open question; its example re-offers the same visit, with no rule to change the pair [E21].
- Pencil: after a wake-up plus about 15 minutes of silence, a gate pencils a visit only if the customer named a day and a daypart or time; agent-offered times do not count [E22] [E23].

**Inventory miss**
States the miss once, asks one use question, searches alternatives and shows at most two verified units; if none, one visit invite [E24]. No sourcing or locate instruction exists [E25], and action items have no sourcing intent [E26].

**Booking and notes**
Booking is sales_create_meeting and sales_confirm_tentative_meeting [E41]. The canonical inbound toolset has no note or task tool [E27]; remember_sales_details is workflow_v2 only [E28]. "I'll note that" is wording only; the CRM gets an idle-time summary note [E29].

## Gap
After an untaken offer, the agent repeats the same pair (20 of 47) or sends nothing further (12 of 47), and asks what stands in the way in 5 [E2]. Repeated pairs appear in 28 of 100 SMS threads [E3]. When the car is not in stock, 10 of 84 winnable threads end with no sourcing or similar-unit offer [E6]. Both persist after the 9 Oct release, which raised the first ask to 68% of winnable SMS threads [E4].

## Candidate directions
1. **Prompt only:** add SMS rules for the turn after an untaken offer (ask the constraint, then offer a different day or time) and for the inventory miss (offer similar units or a sourcing request, then times). Cheap; the same "never repeat a declined pair" rule already exists and is not holding [E8].
2. **Server-side offer memory for SMS:** store the pairs offered in the thread and block a repeat, the way the voice gate counts asks [E8]. Removes repeated pairs regardless of model wording.
3. **Full value:** offer memory plus a structured next step: the constraint question, a different pair from live hours, and for an inventory miss a sourcing request written to the dealer's CRM as a task with a visit time attached. Touches the SMS agent, the meeting tools and CRM write-back; every SMS rooftop would use it.
4. **Non-build:** enablement for BDC managers to pick up untaken-offer and inventory-miss threads from the console. No product change; relies on staff time.

## Frequency
Measured in the transcript read, not in tickets: untaken offers on 47 of 84 winnable SMS threads in one week [E2]; inventory miss with no sourcing offer on 10 of 84 [E6]. Dealer tickets asking for this: 0 in 90 days [E38]. In customer calls, 3 rooftops raised the underlying job in the last 90 days (unbooked text leads lost or not handed back) and 1 pushed the other way; 0 raised the inventory miss [E40].

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


