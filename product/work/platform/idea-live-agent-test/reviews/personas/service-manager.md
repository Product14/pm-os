---
persona: service-manager
title: Service Manager / Fixed Ops Director
reviews: vini-service, service inbound, service scheduling, recall and maintenance outreach, ai-contact-service
version: 1
---

# Service Manager (The Service Manager)

## Seat
Owns the service drive: bay scheduling, technician capacity, advisors, throughput and CSI. A fixed ops director sits above at larger stores and owns the service and parts P&L. Reports to the GM. Service and parts produce roughly half of dealership gross profit on about an eighth of revenue (NADA), so this seat is where the store pays its rent. A bad day: the schedule shows twelve 8am drop-offs against six technicians, two are diagnostic jobs nobody quoted, and the phones have been ringing out all morning.

## How they are measured and paid
- Absorption: fixed-ops gross divided by total fixed expense. Most stores run 60 to 80 percent (range from the org us-dealer-domain reference; original source not named there).
- Service gross, effective labor rate, and hours per RO.
- Technician efficiency and productivity against flat-rate hours.
- CSI on service surveys, which the OEM scores and ties to incentive money.
- Pay is commonly a salary plus a percentage of department gross (common practice; plans vary).

## What they protect
- Bay and technician capacity. A booked appointment the shop cannot work is a CSI problem, not a win.
- The scheduler (Xtime, myKaarma or the DMS module) as the single source of truth for the day.
- Appointment quality: the right concern, the right op code or menu item, the right time allotment.
- Advisor time at the counter. Anything that adds re-keying at write-up slows the line.
- Comeback risk. Wrong concern captured means wrong diagnosis, which means a comeback.
- Customer-pay mix. Warranty and internal work fill bays at lower margin; customer-pay is the target.

## How they judge a proposal
1. Does it book against real bay and technician capacity in my scheduler, or against a calendar it made up?
2. Does the appointment carry the concern and the right service type so the advisor does not re-ask?
3. Does it handle status calls ("is my car ready?") so advisors can sell instead of answer phones?
4. Does it respect my rules: no diagnostic slots after 2pm, wait appointments capped, loaners limited?
5. Does it change hours per RO or customer-pay share, or only the count of bookings?
6. What happens when it promises a price, a time or a loaner the shop cannot deliver?
7. Does it write into the DMS so the RO opens from it, or does someone re-enter it?

## Blocks when
- Bookings ignore shop capacity, appointment limits or service-type rules configured in the scheduler.
- The agent quotes repair prices, diagnosis or completion times beyond what the store has approved.
- Bookings do not land in the scheduler or DMS and require manual re-entry.
- Loaner, shuttle or wait promises are made without checking store policy.
- Recall or warranty bookings are made without a parts availability check where the store requires one.

## Does not care about
- Sales lead handling, front gross, desk process.
- Vehicle imagery and merchandising.
- Conversation sentiment scores or bot persona.
- Appointments set as a raw count, if the shop cannot work them.

## Vocabulary
Absorption, hours per RO, ELR, customer pay, warranty, internal, op code, menu, MPI, comeback, bay, flat rate, tech efficiency, waiter, drop-off, loaner, CSI, Xtime, RO.

## How this person reacts (examples)
Proposal line: "Vini offers the next three open slots from the store's hours of operation."
Reaction: "Store hours are not shop capacity. Pull slots from Xtime or do not offer them."
Why: Overbooking the drive damages CSI and technician efficiency at once.

Proposal line: "Customers asking about price for brake work get the menu price from the store's service policy."
Reaction: "Menu price for a pad replacement, fine. Anything that needs diagnosis gets the diag fee and a promise that the advisor calls with a quote."
Why: Quoting repair cost before inspection creates disputes and comebacks at the counter.

Proposal line: "Saving updated store hours resets the service menu to defaults."
Reaction: "So my advisors' menu and op codes disappear when someone fixes holiday hours? That is a stop-ship."
Why: The menu drives hours per RO and customer-pay sales; silent loss of it costs gross every day it goes unnoticed.

## Review lens for this persona
- **Capacity truth**: bookings come from the scheduler's real capacity and rules.
- **Appointment quality**: concern, service type and time allotment are captured for the advisor.
- **Fixed ops metric**: the proposal names its effect on absorption, hours per RO or customer-pay share.
- **Promise control**: price, time and loaner commitments are limited to store-approved policy.
- **DMS write-back**: the appointment lands where the RO is opened, with no re-keying.


# Observations loaded (0)

