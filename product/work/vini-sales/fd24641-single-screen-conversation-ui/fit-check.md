# Fit check: Unanswered queue on Conversations (sales and service)

**Verdict:** fits with gaps

Checked against `prd/v3.md` (no `prd/final.md` yet), the dealer-side evidence blocks (E5 to E11, E13, E16) and the "As asked vs as solved" table in `decide.md`. Nothing else was read.

| # | Customer asked | Evidence | Classification | Where in PRD | Note |
|---|---|---|---|---|---|
| 1 | Work from one screen instead of cross-referencing Conversations, Action Items and two VinSolutions tabs | E5, E13 | partial | R2, R3, R11; metric "Fewer screens" | Action Items is partly folded in (a row opens the thread and its action items). VinSolutions stays a separate screen: write-back is out of scope and the activity read that would let reps work only in VinSolutions has unknown status (Q18). The table marks this row "Same" and answers it with setup and training in Conversations, plus "no build needed" (E8). The PRD has no setup or training requirement and builds a new system instead. The table and the PRD do not agree on how this ask is met. |
| 2 | See whether reps follow up, now that he is adding two salespeople | E6 | covered | R5, R7, A8, A23, A24, A32 | Manager view per owner, oldest wait, click clears with actor, escalation texts. Texts only where R6 passes, so at rooftops with no activity read and no attestation he gets the view without the alert. |
| 3 | A dashboard that says "[my] unanswered" he can click | E7 | partial | R3, R4, R11, R13, A13, A19 to A22 | Day one is a team view. "Mine" needs the VinSolutions salesperson read, listed as "not available today" with its fit inside this L an assumption. The success check excludes the requester until his read is live. The table promised an assignee filter on the existing team list; the PRD switched to the CRM owner and new episodes, with a stated reason (round-robin assignee is not the salesperson), but the table was not updated. |
| 4 | Click it and land on the customer with "all of the stuff connected" | E7 | partial | R3 | R3 says a row opens the thread and its action items. No acceptance criterion tests that. VinSolutions data for the customer is not shown. |
| 5 | Action item shows in Conversations but not on the Customers record | E9, E8 | deliberately different | Out of scope: "Action item missing from Customers [E9]: bug path" | Matches the table row "Keep Customers; fix the action item missing from the Customers record". The PRD names no bug ticket, so nothing yet guarantees the fix happens. |
| 6 | At about 600 leads a month, reps cannot go Action Items, then Conversations, then VinSolutions just to close a record | E10 | partial | R2, R3, A9, A11, A16 | With a VinSolutions activity read, CRM work clears the queue by itself (A9). Without it, the rep works the lead in VinSolutions and then clicks "Handled elsewhere" in the console, still two screens per lead. Closing the action item and the CRM record from one place is not built. The read's availability is unknown (Q18). |
| 7 | A "customers unanswered" line above Conversations | E11 | covered | R3, R13, A13, A14 | Live badge equal to the query total. |
| 8 | Keep the action-item filtering he uses while living in Conversations | E13 | partial | R3, R11 | The Unanswered view replaces one reason to keep Action Items open. Action-item filters (by intent or status) are not brought into Conversations; the PRD only measures Action Items page views. |
| 9 | Nobody knows when Spyne reaches out unless they are in the console; "two CRMs" | E16 | partial | R5, R9; out of scope: CRM write-back | Texts tell the owner or manager when a customer waits on a person, outside the console. Spyne's outreach still does not show in VinSolutions, and the "two CRMs" problem stays. The PRD cites E16 for leaving write-back out of scope, but the table has no row for E16, so this is not an acknowledged trade. E16 is also older than 30 days. |

Counts: covered 2, partial 6, deliberately different 1, not covered 0.

## Scope that traces to nothing
- None strictly. Every requirement traces to an ask, a table row or a stated reason.
- Service (department views, service hours, A5 to A7, A27, the service pilot) traces only to the table's generalisation ("the same page serves service"). No dealer in the evidence asked for it.
- R10 (missed calls) and R9 (owner text) trace to table rows that cite Spyne-side evidence (E31, E33), not dealer words.

## What the CSM can tell the rooftop
**Row 5, the action item missing from the Customers record.** You noticed that an action item shows up in Conversations but not on that customer's record in Customers. We are treating that as a defect and fixing it on its own, separate from the new Unanswered view, so the fix does not wait for a bigger feature. You also will not need the Customers page to see it: when you click a customer in the new Unanswered view, it opens their conversation with their action items right there.
