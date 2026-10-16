# CSM draft (not sent)

To: the rooftop's Spyne onboarding manager who raised Freshdesk 22370 (cc the rooftop's Vini CSM)
From: PM, Vini Sales and Service
Status: draft for PM review. Send only after the PM approves.

---

Hi,

Thanks for raising this the day after go-live, and sorry it has taken this long to come back with a plan.

**What we found**
- **Vehicle not named on outbound calls.** The agent is built to name the vehicle on every outbound call. It had nothing to name because Tekion only tells us about the vehicle when the lead is first created. If the vehicle is added to the lead later, Tekion sends us no update, so the call goes out without it. This likely affects other Tekion stores too, and we are checking how many.
- **Callbacks with no context.** We shipped fixes in September, after your ticket, so a returned call should know why we called. Nobody has re-tested them on your account. We also found two cases they may not cover: a callback that comes in more than 3 days after our call, and a callback that lands on the other department's line (sales call, service line or the reverse).

**What happens next**
1. We re-test the callback on both the Sales and Service lines: a missed call, a callback after day 3, and a callback to the other department. We will share the result with you.
2. We change the outbound call to check Tekion for the lead's current vehicle right before each dial, for both Sales and Service calls. If Tekion has no vehicle, the call still goes out and the agent explains why the store is calling without guessing a vehicle.
3. Anything the re-test shows is still broken gets fixed as a defect. If it is the 3-day limit or the other-department case, we will tell you what it takes to fix and when.

**What we need from Tekion before step 2 ships**
- Confirmation that their lead-vehicles API returns vehicles added after the lead was created.
- Confirmation that calling it once before every outbound dial is allowed under our agreement and within their rate limits.
- Any date for the lead-level webhooks they released and pulled back in September. When those return, we switch to them.

**What would help from you**
- Has anyone at the store raised this directly, and in what role (BDC, internet sales)? Today we only have Spyne's side of it.
- Is the 7-day-old lead campaign still running at full volume, or was it paused because of this?

Thanks,
