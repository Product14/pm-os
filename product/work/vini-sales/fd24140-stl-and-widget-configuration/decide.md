# Decide: After-hours website leads need a first text that fits the lead (confirm an appointment, acknowledge a credit app, or set an appointment), plus an SMS-only website widget

## Ladder
1. **Literal ask:** "enable the STL for his website leads": existing appointment, confirm it; no appointment, work toward one; online credit application, confirm receipt, with "Ava will not collect or discuss PII" [E1, E26]. The dealer's own words: "drive appointments when there aren't appointments and confirm appointments when there are appointments" [E5]. Second ask: "how to enable SMS-only feature on the widget" [E27]; the dealer: "I don't want it to be a call, but I do want it to, engage with SMS only" [E7].
2. **Job:** reach after-hours website leads overnight with the right first message, so the BDC does not start the morning re-calling them [E8, E9]. In P&L terms: protect online appointments that are already on the board instead of pushing a second one (show rate, front-end gross) [E6]; take next-day callback and confirmation hours off the BDC (cost removed) [E8]; shorten time to first contact on overnight inquiries (days removed from the lead, not "more cars") [E8, E9]; keep the AI out of credit and PII, which is the sales to F&I handoff (compliance exposure removed) [E5]. During business hours a caller should reach a human, so the widget texts only [E7, E27]. The dealer also needs Ava's outcomes in their own system before scaling [E12, E13].
3. **Who else has this job:** 3 other companies on calls raised the same job in different words (tailor the first text by lead type or provider, keep credit-app leads out of AI outreach, a credit-app-first flow), 2026-07-17 to 2026-10-15 [E22]. 0 other companies in tickets [E21]. Total: this rooftop plus 3 = 4 companies in 90 days. Widget channel control: 1 other company in tickets [E23].
4. **Smallest shared building block:** a first-message template on the existing STL lead-type config entry. Today `StlConfigDimension = 'source' | 'lead-type'` and each entry is only an on/off switch (`conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:13`, `resolveStlGate` :422) [E20, E36]. Extend the entry from `isEnabled` to `isEnabled` plus an opener template, keyed by the normalized lead type that `normalizeLeadTypeKey` (:396) already produces, stored through `upsertSpeedToLeadSettings` (:47) [E36]. Its input is a lead type (and appointment date, time, store) carried in `ParsedEmailData` (`integrations-backend:src/email-parsing/email-parser.service.ts:14`, `parseAdf` :315) into the lead record [E19, E35, E38]. A rooftop with no template keeps today's standard opener.
5. **What varies per store:** all of it is configuration on that entry, never a code branch for this rooftop.
   - Which lead-type keys exist and how the store's ADF or CRM values map to them (inquiry, online appointment, credit application here) [E1, E14].
   - Per type: STL on or off (exists today) [E20], and the opener template text [E1].
   - Whether the credit-app type is held out of AI outreach entirely or gets an acknowledgment [E22, E5]. The no-PII rule itself is a platform guardrail on the credit-app type, not a per-store choice [E5].
   - Which leads are sent at all: this store forwards only after-hours leads, so the window is the dealer's forward plus STL silent hours [E9, E18].
   - Write-back on or off, and the channel per store (CRM API, outbound webhook, ADF email back); this store has no API [E12], channel open (Q10).
   - Widget channels per team (call, chat, email, STL), already a switch in Vini Config [E4].
6. **Every agent it lands on:**
   - Sales STL: yes. The opener is chosen here [E36].
   - Sales inbound: unknown. Whether the reply agent sees the lead type, so it keeps confirming instead of pushing a new appointment, is open (Q12).
   - Sales outbound: unknown. Follow-up runs in the same STL service (`isFollowUpEnabled` :123) [E36]; a type-aware opener with a generic follow-up would contradict itself (Q12).
   - Sales chat: yes, widget half only; SMS-only is an existing per-team switch, no build [E4, E17].
   - Service inbound: no for the opener; unknown for the shared parser and lead store, since new `ParsedEmailData` fields land in `/leads/dealer`, which other agents read [E35, E38] (Q11).
   - Service outbound: unknown. The STL gate has no department dimension, so an opener there reaches any team running STL [E36] (Q9).
7. **Full value:** CRM-first, lead-type-aware STL first message [E32, E33]. Lead type and appointment details are read from the dealer's CRM or ADF into the lead record, STL picks the first message by type, and the conversation plus the confirmed or booked appointment are written back to the dealer's own system [E12]. Planned now as the resolution, per the fixed intent in `decisions.md` [E32], even if a first step ships before it. When: no date set (Q16). Write-back channel for a dealer with no API is open (Q10).

## As asked vs as solved
| Customer asked | We would build | Same, generalised, or different | Why |
|---|---|---|---|
| STL on after-hours website leads [E1, E9] | Existing STL on the forwarded ADF inbox, standard opener for inquiries [E14, E20] | Same | Lead-type on/off exists today [E20]; no build needed for inquiries |
| Confirm the appointment when one exists [E1, E5, E6] | Online-appointment key on the lead-type entry with a confirm template, fed by appointment date, time and store from the parsed lead [E35, E36] | Generalised | Per-rooftop template on a shared dimension; 3 other companies want type-aware first touch [E22] |
| Credit application: confirm receipt, no PII [E1, E5] | Credit-app key with an acknowledgment template, or held out, under a platform no-PII guardrail [E5, E22] | Generalised | Other companies want credit-app leads kept out of AI outreach [E22]; the guardrail should not depend on each store writing it |
| "Ava will identify the lead type and adjust the conversation" [E26] | Lead type read as a field from the ADF or CRM, not inferred by the agent from free text [E19, E35] | Different | A routing choice with compliance weight needs a deterministic input; whether the field survives parsing is open (Q2, Q3) |
| SMS-only website widget [E7, E27] | Nothing new; existing per-team channel switch, already set for this rooftop [E4] | Same | No product gap; open items are the smartview-config bug check (Q4) and the dealer's go-ahead [E3, E11] |
| An automated record of what Ava said and any appointment booked [E12, E13] | Steps 0 and 1: a morning handoff by email or Console that staff key by hand, the arrangement the dealer declined [E13]. Step 3: write-back of conversation and appointment to the dealer's system, inside the full-value path [E32] | Different; partial until step 3 | Not in the ticket, but the dealer ties scaling STL to it [E13, E33]; steps 0 and 1 do not deliver it and the dealer message says so; channel open (Q10) |
| Ava says where each vehicle is located [E16] | Nothing in steps 0 to 3; a separate request | Different; not covered here | Step 0 is configuration with today's opener; no lot field is shown reaching the lead or reply turn [E39]; naming it changes a shared reply agent. The CSM tells the dealer it is a separate request |
| Internal: create a Spyne appointment from the ADF [E29] | Not decided | Different | The dealer asked only for confirmation [E1, E5]; duplication risk with their own system (Q7) |

## Inputs
| Input | Evidence | Reading |
|---|---|---|
| Demand breadth | [E21, E22, E23] | Opener: 4 companies in 90 days (this rooftop plus 3 on calls, 0 in tickets). Widget: 2 companies (this rooftop plus 1 in tickets) |
| Dealer P&L impact | [E6, E8, E9, E12, E5] | Named, not quantified: BDC next-day callback and confirmation hours removed [E8], online appointments protected from a second push (show rate) [E6], time to first contact on overnight leads [E9], manual keying of outcomes removed once write-back exists [E12], no AI credit or PII exposure [E5]. After-hours lead volume by type and BDC hours: unknown (Q15) |
| Strategic fit | [E12, E38]; org: us-dealer-domain `spyne.md` workstream B and the Vini AI section | Above the dealer's system: reads their ADF and writes back to it, no replacement [E12, E38]. Fits fact 4 (write-back is the first dependency; the domain pack says Vini's durable edge is write-back depth and accountability for kept appointments) and fact 5 (credit app is the sales to F&I handoff). Justified in hours and days removed, per fact 3. Vini Sales area roadmap fit: unknown (Q14) |
| Cost and risk to build | `integrations-backend:src/email-parsing/email-parser.service.ts:14`, `:315`; `conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:13`, `:47`, `:396`, `:422`; `spyne-console-backend:api/controllers/speed-to-lead/create-speed-to-lead.js:29` | Full value: L (judgment, no engineering estimate yet, Q17), three services plus an undefined write-back channel (Q10). Opener only: M (judgment). Main risk: lead type and appointment details may not survive `parseAdf` today (Q3), and both the gate and the parser are shared surfaces with no department dimension (Q9, Q11) |
| Cost of not solving | [E10, E13, E28, E31, E33] | The dealer was told separate messaging is "being worked on" [E10] with no Jira behind it [E25]; internal escalation after 9 days [E28], last message "is this done?" unanswered [E31]. The dealer wants an automated record before scaling [E13]; the PM states full go-live does not unlock without the full-value path [E33]. No churn statement from the dealer in the evidence |
| Prior decisions | `context/decisions/stl-rooftop-verdict-precedence.md`; `case.md` ledger_match empty | No prior decision on this job. The STL verdict precedence entry classifies rooftop STL coverage for audits and does not decide openers. Adjacent Jira: RETCONVAI-4403 (prior call flow for this rooftop, live) [E24], RETCONVAI-5238 (returning-customer STL, Ready For Dev) [E25] |

## Arguments
### For building (advocate)
**1. The building block:** a first-message template on the existing STL lead-type config entry, so lead type picks an opener instead of only switching STL on or off (`conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:13`, `:396`, `:422`) [E20, E36]. Input: lead type plus appointment date, time and store via `ParsedEmailData` (`integrations-backend:src/email-parsing/email-parser.service.ts:14`) [E35]. No template keeps today's opener. Credit-app type carries a platform no-PII guardrail [E5].

**2. Why now:** 4 companies in 90 days: this rooftop plus 3 on calls, 0 in tickets [E21, E22]. P&L, named not quantified: BDC next-day callback and confirmation hours removed [E8]; booked online appointments not pushed toward a second one [E6]; shorter overnight time to first contact [E9]; AI kept out of the sales-to-F&I credit handoff [E5]. The dealer was told this is "being worked on" [E10] with no Jira [E25]; the thread ends on an unanswered "is this done?" [E31].

**3. Fit:** reads the dealer's ADF and writes back to their own system, replacing nothing [E12, E38]. The dealer ties scaling STL to that write-back [E13].

**4. Cheapest credible version:** check lead type survives `parseAdf` (:315) [E19]. Add the template field for three keys. Keep credit-app leads at STL off until their template ships [E20]. Plan write-back now as the resolution [E32]; channel open (Q10).

**5. Honest weakness:** if the parser drops lead type or appointment time (Q3) [E19, E35], or the reply agent cannot see the type (Q12), Ava confirms in the first text and pushes a new appointment in the next.

### Against building as asked (skeptic)
**Outcome: defer** the type-aware opener and write-back build. Ship the configurable part now.

**The case**
- Available today: STL on after-hours inquiries with the standard opener. Lead type is already an on/off gate (`conversational-ai-backend:src/speed-to-lead/services/speed-to-lead-console-call.service.ts:422`) [E20, E36]. The dealer decides what gets forwarded [E9], so they can leave appointment and credit-app leads out of the forward rather than rely on a lead type that may not survive parsing [E35]. The SMS-only widget is a switch that is already set [E4]. It is waiting on the dealer, not on us [E11].
- The opener has no input yet. Nobody knows whether `parseAdf` keeps lead type or appointment details [E19, E35]. The question has gone unanswered since 2026-10-07 [E29, E30].
- Write-back has no channel: the dealer has no API [E12].
- Demand is thin: 0 tickets elsewhere and 3 adjacent asks on calls [E21, E22].

**Revisit trigger:** build when 20 forwarded leads from this rooftop show lead type and appointment fields surviving `parseAdf`, and either a write-back channel is agreed with the dealer or a second company files a ticket for this.

**What we lose:** online-appointment and credit-app leads still wait for the BDC the next morning [E6, E8]. The dealer was told this was "being worked on" [E10], and that thread is still unanswered [E28, E31]. Hand-keying outcomes may keep STL from scaling beyond inquiries [E13, E33].

**What would change my mind:** confirmation that the fields survive parsing (Q3), after-hours volume by type showing a large share of appointment and credit-app leads (Q15), or the dealer making write-back a condition for keeping STL [E13].

## Outcome
**Outcome:** build-generalised
**Feature slug:** lead-type-aware-stl-first-message
**Why:** The job is shared, not one store's: 4 companies in 90 days want a first touch that fits the lead type, and the impact is named in hours and days, not cars: BDC next-day callbacks removed, booked online appointments protected from a second push, overnight time to first contact cut, AI kept out of the sales to F&I credit handoff [Inputs: Demand breadth, Dealer P&L impact; E6, E8, E9, E22, E5]. The building block is configuration on an entry that already exists (`resolveStlGate` :422, `normalizeLeadTypeKey` :396), with today's opener as the default, so no code branch is written for this rooftop [E20, E36]. Rung 7 is the resolution and is planned now, sequenced: (0) this week, configure STL on for after-hours inquiries, credit-app and appointment types off, widget stays SMS-only with no build [E4, E20], and give the dealer a dated plan in place of "being worked on" [E10]; (1) prove lead type and appointment fields survive `parseAdf` and that the reply and follow-up agents carry the type (Q3, Q12); (2) opener templates per type with a platform no-PII guardrail on credit-app; (3) CRM-first read plus write-back of conversation and appointment to the dealer's own system, the step that unlocks full go-live [E12, E13, E33]. Date for step 3 is not set (Q16), and its channel for a dealer with no API is a per-store decision still open (Q10); that dependency is named, not assumed.
**Strongest point from the losing side:** "The opener has no input yet. Nobody knows whether `parseAdf` keeps lead type or appointment details [E19, E35]. The question has gone unanswered since 2026-10-07 [E29, E30]."
**Why it did not carry:** It is a gate on step 2, not a reason to defer a shared job; checking the parser is step 1 of this build, and step 0 delivers the skeptic's own configure-now path this week anyway.
**Revisit trigger:** Sequencing checkpoints, not a defer: if Q3 shows `parseAdf` drops lead type or appointment fields, step 2 waits on the parser change (re-size it then); if Q9 shows service teams run STL, scope the template to sales teams before step 2 ships; step 3 gets a date once a write-back channel is agreed with the dealer (Q10).
**Rubric scores:** Job, not request: 4. Evidence weight: 3. Five facts: 4. Proportion: 3. Reversibility: 4.
