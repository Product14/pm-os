---
id: decision--sms-offer-recovery
kind: decision
area: vini-sales
status: candidate
owner: yash
source: product/work/vini-sales/idea-sms-offer-recovery/decide.md
verified: 2026-10-21
confidence: medium
outcome: build-generalised
revisit_trigger: phase 2 server-side repeat block when two consecutive weekly reads after phase 1 still show the same pair repeated in 10 or more untaken-offer SMS threads at 5 or more rooftops; phase 3 sourcing path when 2 rooftops ask unprompted for a locate or dealer-trade path
demand_rooftops: 3
work: product/work/vini-sales/idea-sms-offer-recovery
---

**Rule:** When an SMS lead does not take offered visit times, or hits an inventory miss, treat it as one shared SMS-only build (`sms-offer-recovery`): repair the wake-up and miss-ending defects and render already-offered pairs first; add a server-side repeat block or a sourcing path only when its revisit trigger fires.

**Why:** The same pair repeats or the thread goes quiet in 32 of 47 untaken-offer threads across 10 of 14 sampled rooftops, and the prompt rule alone is not holding. Value is BDC re-touches and lead-to-visit days removed, named but not sized, and sourcing has no dealer demand and needs task write-back on four of six CRMs.

**Instead:** Point the request at the `sms-offer-recovery` PRD and its phase. A store that wants text leads moved to the phone gets the call-offer rooftop setting on the same build, never a branch. A dealer asking for a locate or dealer-trade path counts toward the phase 3 trigger; do not promise sourcing before it fires.
