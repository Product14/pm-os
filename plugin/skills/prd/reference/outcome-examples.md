# Outcome examples for the decide step

Worked examples help the judge apply the rubric consistently. These are patterns, not real tickets. Replace or extend them with de-identified real cases once triage has produced decided runs: when a PM confirms a decision at the gate, add it here as a new example through `/pm-os:propose-skill`.

| Ticket pattern | Ladder (job) | Outcome | Why |
|---|---|---|---|
| "Your agent says the model name wrong" | Customers trust an agent that sounds like it knows the product | **bug** or **already-possible** (pronunciation config) | It describes the product's behaviour, not a new job. Never a PRD. |
| "Book appointments with a specific advisor the customer names" | Customers want continuity with someone they trust; the store cannot guarantee schedules | **build-generalised** as "advisor preference captured as a note" if 2 or more rooftops share the job; otherwise **defer** with trigger "2 rooftops" | Committing to a named advisor breaks when schedules change. A preference note serves the job without a promise the store cannot keep. |
| "Push appointments straight into our CRM's calendar" for a CRM that only allows its own system to create appointments | Appointments must land where the BDC works | **decline** as asked, **already-possible** for the note sync; dependency logged | The CRM provider controls appointment writes. That is a commercial negotiation, not something we route around. |
| "Stop booking more than the shop can handle" | Bookings must respect per-slot capacity, because overbooking costs comps and CSI | **build-generalised** (read capacity from the scheduler, per-store limits as config) | Shared job across service rooftops, and it removes cost, not just adds bookings. |
| "Send our customers a survey after service" | OEM CSI scores tie to the store's incentive money | **defer** or **decline** unless several rooftops ask; check whether the OEM or DMS already runs the survey | Often duplicates an OEM or vendor program the store already has. |
| "Add our weekend hours to the agent" | Agent answers with the right hours | **already-possible** (hours config) | Configuration the CSM can change today. |
