# Texting shoppers who pass on the first times offered, or ask for a car the store doesn't have, leave without a visit set

**Author:** Vini Sales PM · **Date:** 2026-10-21 · **Status:** Draft v4 · **Ticket:** none (PM idea from the 21 Oct Sales Inbound weekly review) · **Area:** vini-sales
**Flywheel stage:** lead to appointment, on SMS, at the handoff from Vini to the BDC

## Decision
Fix how the SMS agent follows up after a shopper passes on the first offer, and how it handles a car that isn't in stock, so more text conversations end with a visit on the calendar. Ship it in three steps: the follow-up fixes now, the rest only if the first step falls short [decide.md] [PM].
No dealer filed a ticket; we found it reading 100 real text conversations, at 10 of the 14 stores read [E2] [E42] [E38].
**For you to decide:** ship step 1 as a bug fix this sprint instead of waiting for the PRD, and where it goes against the voice regression in RETCONVAI-5392 [PM].

## TL;DR
When a texting shopper doesn't take the first two times offered, the agent often re-sends the same two times or goes quiet. When the car isn't in stock, it often says goodbye. Step 1 teaches it to ask what works for the shopper and offer different times, keep the conversation going after "let me check", and offer a similar car instead of ending. The goal is fewer unbooked leads handed to the BDC to chase; we don't yet know how many touches that saves [Q6].

## Problem
Three things happen in text conversations today [E2] [E6] [E30]:
- **The shopper passes, and the agent repeats itself or stops.** Of 47 conversations where the shopper didn't take the offered times, the agent sent the same two times again in 20, sent nothing useful in 12, and asked what time would work in only 5 [E2].
  - Example: a shopper asking about a Civic and a trade said they would text back with a time. The agent replied "That works. I'll be here when you're ready, and we can line up a time for the Civic and take a look at your Altima then." Nothing followed [E9].
- **The car isn't there, and the conversation ends.** In 10 of 84 conversations the agent stopped at the miss: "I do not see a used SUV under $10,000 right now." or "I hope you find the right one soon." [E6] [E10]
- **The shopper says yes, and the agent keeps asking questions.** A sales director told us the agent "ruined the appointment" by asking about price after the shopper agreed to a test drive. They want "great, does today or tomorrow work better for you?" and nothing else [E30] [E31]. Their CSM says other stores have said the same [E37].

Each of these leads goes back to the BDC unbooked. Today 4 in 5 texting shoppers offered two times don't book (418 of 517, 10 to 20 Oct) [E5].

## Evidence
- **It's not that the rule is missing.** The agent is already told never to repeat a declined pair of times `conversational-ai-backend:src/prompts/base-system-prompts/sales_new/appointment-conversion.xml:19`. It breaks that rule in two places: in the automatic follow-up text, which is told to re-ask the same question `conversational-ai-backend:src/prompts/base-system-prompts/sales_new/sms-wakeup.xml:53`, and right after the shopper asks a side question such as the address, price or photos (13 of 17 live repeats) [E21] [E54] [E55].
- **Most of the silences are rules, not outages.** Of the 12 that went quiet, 6 were stopped because the shopper also asked for something else (a photo, a callback, a trade-in follow-up), 2 because the agent's last reply was saved but never sent, and 4 got a follow-up that said nothing new [E60] [E61] [E62].
- **Booking in the first conversation is faster.** Visits the agent set in the first text conversation were a median 1.6 days after the lead came in, against 5.8 days when set in a later conversation. These groups chose themselves, so this shows the gap, not what we will save [E64] [E65].
- **Visits do reach the dealer's CRM**, once, when booked, with the time but usually no salesperson assigned. On VinSolutions a visit is only a line in the notes [E79] [E80] [E87].

## Recommendation
**Step 1, SMS only, switched on per store (off means today's behaviour)** [E69]:
1. **Change the offer.** After a shopper passes, ask once what day or time works, then offer two times that haven't been offered. The overnight follow-up offers fresh times inside store hours, never last night's [E15] [E21] [E55].
2. **Close the yes.** When the shopper agrees, reply with "today or tomorrow" and nothing else [E31].
3. **Don't go quiet.** Send the agent's reply after "let me check". Don't let a photo or quote request cancel the follow-up, except where that request already became a salesperson's task in the CRM, so the shopper isn't contacted twice [E61] [E62] [E71].
4. **Don't end on a missing car.** Show a similar car that is still listed, with times, or ask one question about what matters to them [E10] [E24].

**Step 2, only if step 1 doesn't halve the repeats in two weekly reads:** the system remembers which times were offered and blocks a repeat itself, instead of relying on the agent's instructions [decide.md].
**Step 3, only when 2 stores ask for it:** a request to locate a car the store doesn't have, sent to the salesperson [decide.md] [E40].
**Not building:** voice (RETCONVAI-5392); booking times the shopper never agreed to [E23].

## What it removes
| Measure | Today | After step 1 | Source |
|---|---|---|---|
| Visits set per 100 texting shoppers offered times, per store | 19 across all stores | up over two weekly reads | [E5] |
| Same times re-sent after a shopper passes | 20 of 47 | half or fewer | [E2] |
| Conversations ending on a missing car | 10 of 84 | fewer | [E6] |
| Agent replies saved but never sent | 4 in 100 read | 0 | [E62] |
| BDC touches on an unbooked text lead | unknown | fewer | [Q6] |
| Guard: shoppers opting out after a new offer | unknown | not up | [Q46] |

## Risks and dependencies
- The same instructions also drive voice, chat and outbound, so every change is limited to SMS and tested to leave the others unchanged [E13] [E24].
- Re-offering can feel pushy. Two dealers already say the agent pushes too hard on text, so each store can switch this off [E34] [E35].
- Rewording alone has failed before; the bet is that a different offer gets more replies than the same one [ASSUMPTION: a follow-up that changes the offer gets more shopper replies than one that repeats it] [E55] [E57].
- A booked visit reaches the CRM with no salesperson on it, and on VinSolutions only as a note. Step 1 stays off at VinSolutions stores until that is fixed [E79] [E87] [Q47].

## Open questions
| # | Question | Who answers | Blocks |
|---|---|---|---|
| Q23 | How many engineer-days is step 1, and what does it push back? | Engineering, PM | The decision above |
| Q15, Q35 | Which shopper requests mean a person already owns the lead, and how does the agent see that? | PM, CSM, Engineering | Step 1 |
| Q33, Q36 | Can the agent see a visit the store booked in its own CRM? | Engineering | Step 1 |
| Q6 | How many BDC touches does an unbooked text lead get today? | CSM | Measuring the win |
| Q27 | Can we tell whether these visits show up? | Engineering | Measuring the win |
| Q47 | Can VinSolutions take a real appointment? | Engineering | Step 1 at VinSolutions stores |
| Q14 | Does a changed offer get more replies than a repeated one? | Pilot | Step 2 trigger |
