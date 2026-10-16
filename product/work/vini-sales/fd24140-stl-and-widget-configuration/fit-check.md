# Fit check: Lead-type-aware STL first message for after-hours website leads

**Verdict:** fits with gaps

Inputs: dealer-side evidence (E5, E6, E7, E8, E9, E11, E12, E13, E15, E16), the as-asked vs as-solved table in decide.md, prd/v4.md.

| # | Customer asked | Evidence | Classification | Where in PRD | Note |
|---|---|---|---|---|---|
| 1 | Ava drives appointments when the lead has none | E5 | covered | R2, A4; R5 and A16 (Ava-set appointment reaches the BDC and is keyed) | Done with today's standard opener and one first text; R3 allows no chase, so a booking depends on the customer replying |
| 2 | Ava confirms appointments when one exists, including the many online appointments set via the website | E5, E6 | partial | R1, A1 exclude appointment leads from the forward; confirm template is step 2, "direction" with gates (section 4) | The harm (pushing a booked customer to rebook) is removed, but no confirmation is sent. The table promises a confirm template; the PRD does not commit to it, and step 2 is gated on six open questions and an outside pilot |
| 3 | Ava does not take credit applications | E5 | covered | R1, A1, A3; rollout "pause on a text to a credit-app lead" | Credit-app leads never reach Ava in step 0 |
| 4 | Ava does not talk about PII | E5 | partial | Credit-app exclusion (R1) removes the main PII route; the no-PII guardrail is step 2 direction (Q31, Q27) | No committed requirement or acceptance criterion stops Ava discussing PII on an inquiry lead that raises it |
| 5 | Website application leads are also sent to Spyne after hours (inquiries and applications) | E9 | partial | R1 excludes credit apps; acknowledgment template is step 2 direction; table row "Credit application: confirm receipt" | Dealer wanted applications in scope with a non-PII acknowledgment; step 0 sends them nothing and the BDC calls them next morning |
| 6 | Only leads received outside business hours go to Spyne | E9 | covered | R1, R11, A1, A5 | Window is `CUSTOM_TIME`, every day, inside 8 am to 9 pm local; later leads are skipped and called by the BDC |
| 7 | Follow up on website leads after hours, which the BDC cannot do | E8 | covered | R2, R11, A4; Goals "same-evening first contact" | Same-evening first text for leads inside the window; leads after it are unchanged from today (share unknown, Q39) |
| 8 | Website widget is SMS only, no call option | E7, E11 | covered | R8, A25 | Already configured; PRD adds a check that the smartview-config failure is fixed or filed |
| 9 | A shopper who wants to call reaches a human during business hours | E7 | covered | R8, A25 (no call option, so calls go to the store's own lines); R12, A14 (no after-hours transfer to an empty line) | Not stated as its own requirement; met as a consequence of R8 |
| 10 | An automated record of what Ava said to each customer, without staff keying it | E12, E13 | partial | R5, A15, A17 (morning handoff email or Console); write-back is out of scope, step 3 direction (section 4, section 9) | Step 0 is the manual arrangement the dealer already declined [E13]. PRD says so openly, including in the dealer message. Step 3 is gated (Q10, Q17, Q21, Q29) and undated |
| 11 | When Ava books an appointment, it loads into the dealer's system | E12 | partial | R5, A16 (BDC manager or backup keys it by hand, cancels duplicates); A19, R10 (CSM checks the board) | Same gap as row 10: manual until step 3 write-back, which has no committed date |
| 12 | Pause the dealer's own after-hours automated messages so the customer is not texted twice | E15 | covered | Section 4 go-live check (texts paused or VP Marketing accepts), A13, edge case "dealer restarts its own texts", rollout dealer message | Go-live is blocked until paused or accepted in writing |
| 13 | Ava says which location each vehicle is at | E16 | deliberately different | Section 4 "Vehicle location: out, own ticket"; rollout dealer message; table row "Ava says where each vehicle is located" | An open deferral to a separate request with a stated reason and a CSM script, not an alternative solution. The only stand-in is that the BDC sees every conversation on the handoff |

Counts: covered 7, partial 5, deliberately different 1, not covered 0.

## Scope that traces to nothing
- None. R3, R4, R6, R9, R10, R11 and R12 were not asked for, but each carries a stated reason (no chase after the first text, opt-out compliance, rollback, service untouched, CSM checks, contact window, no transfer to an empty line) and supports the after-hours follow-up job. R7 traces to the lead-type row in the table.

## What the CSM can tell the rooftop

**Vehicle location (row 13).** You asked for Ava to say which store each vehicle is at, because naming a vehicle without its location causes confusion. In this pilot Ava will not name a vehicle's location. To do that reliably she needs each vehicle's location carried from your inventory feed into her conversation, and we have not confirmed that it arrives today. Guessing would be worse than saying nothing, because a customer sent to the wrong store is a lost appointment. We have logged it as its own request so it gets built properly rather than patched in. Until then, your BDC sees every conversation Ava has on the morning handoff, so anyone who asked about a specific vehicle can be told where it is when your team calls.
