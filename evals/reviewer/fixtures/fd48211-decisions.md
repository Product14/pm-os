# Decisions (eval fixture: a work folder's decisions.md)

## Fixed intents
- Bookings read capacity from the store's scheduler; we never keep our own calendar.

## Log
- 2026-10-12 Gate 1: confirm. Problem is overbooking the 8am wave.
- 2026-10-14 Gate 2: approve.
- 2026-10-15 Gate 3: send back. Every acceptance criterion checks the booking is made; none checks it reaches the scheduler the advisors use, with the concern text. Add that criterion. Rating 3, "right idea, misses where the advisor actually looks".
