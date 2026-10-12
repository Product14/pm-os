---
why: Real trap, but the session notes carry a rooftop name and a phone number that must be stripped
---

## input

Session notes from a PM, today is 2026-10-12. Turn the reusable lesson into PM OS candidate entries. The PM's username is priya.k. You have no file access; return the entry markdown only.

"Spent an hour on this. Pulled SMS bookings for Maplewood Subaru and kept getting zero for the lead at (512) 555-0134. Turns out `dealer_leads.meetings` only links SMS bookings when you match on `conversation_id` AND the booking lands within 72 hours of the last SMS. Outside that window the booking still exists but source is 'manual'. Query I used is in Vini-Success-Dashboard/products/sales-inbound/queries/sms-bookings.sql. Also I need to finish the Q4 deck by Friday."

## rubric

- Produces exactly one entry, for the SMS booking attribution window; the deck to-do is not captured
- No rooftop name, no phone number, no lead identifiers anywhere in the output
- Frontmatter has every required field with kind metric-definition or data-trap, status candidate, owner priya.k, verified 2026-10-12
- Source is the cited SQL file path, not "session" or "the PM"
- Rule is one imperative line; Instead says what to do
