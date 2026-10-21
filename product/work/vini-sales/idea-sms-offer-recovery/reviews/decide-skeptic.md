# Skeptic: decide

**Outcome: bug.** Fix the prompt defects and the silence cause. Defer the offer record and sourcing.

**The case for it**
- The intended behaviour is already specified, and the shipped text works against it. The rule "a declined pair is never offered again" exists [E15]. But the wake-up drops AppointmentConversion, and its own examples re-offer the same visit (`sms-wakeup.xml:18`, `:53`) [E21]. That is a defect to fix in two prompts, not a new capability.
- Silence (12 of 47 [E2]) happens even though a nudge fires 10 minutes after the last reply, up to 2 per thread [E19]. Five skip rules can suppress it [E20]. Find which one fired before building anything.
- The similar-unit path is already built [E24]. The dead ends [E10] are an ending-wording bug.
- Sourcing has 0 dealer voices [E40] and 0 tickets [E38], and it needs task write-back on four of six CRMs [E49]-[E52]. Defer it until 2 rooftops ask for it.
- Demand is thin and concentrated: 0 tickets [E38], and two stores carry 27 of the 47 threads [E42]. More re-offers risk the pushing dealers already object to [E34] [E35], while close per attempt is sliding without explanation [E11].

**What we lose:** the prompt rule did not hold [E15] against E2, and nothing enforces it server-side [E8]. A prompt fix may leave repeats at today's 28 of 100 [E3]. Meanwhile 4 in 5 offered leads stay unbooked [E5], and stores keep losing visits they never see [E33].

**What would change my mind:** after the fix ships, two consecutive weekly reads still show the same pair repeated in 10 or more untaken-offer threads, at 5 or more rooftops. Then build the offer record. For sourcing: 2 dealers ask for it, unprompted.
