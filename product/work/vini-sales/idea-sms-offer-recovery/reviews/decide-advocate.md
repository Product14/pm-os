**1. The building block.** A per-thread offer record on the SMS Conversation: pairs offered and their outcome, the stated constraint, the inventory-search outcome. The live SMS turn and the wake-up both read it. It extends `visitAskState` (`conversational-ai-backend:src/conversation/conversation.schema.ts:58`), which is voice-only today [E14], and no offered-slot field exists anywhere [E18]. Limits, hours and call-instead are rooftop settings [E27] [E35].

**2. Why now.** Wording has already failed. The "never re-offer a declined pair" rule exists [E15], yet the same pair repeats in 20 of 47 untaken offers [E2] and in 28 of 100 threads [E3]. The pattern spans 10 of 14 sampled rooftops [E42]. Three rooftops raised the job in calls [E40], and one lost a lead it never saw [E33]. P&L: fewer BDC re-touches and fewer days from lead to visit. Neither is sized [Q6] [Q7].

**3. Fit.** Spyne-side state; no DMS touched. It fixes the Vini-to-BDC handoff nobody is paid on [E33]. Lever 2a closes on units already on the lot [E24].

**4. Cheapest credible version.** Lever 1 plus 2a only: render "already offered" into the SMS arm and wake-up, no new tool, SMS-only guard [E17] [E21] [E13]. First find out why 12 threads went silent [E20]. Defer sourcing, which no dealer asked for [E40]. Proof: repeated pairs fall from 28 per 100 threads [E3].

**5. The honest weakness.** No dealer asked for this [E38]. Two stores carry 27 of the 47 threads [E42]. Extra re-offers may read as pushing [E34] [E11].
