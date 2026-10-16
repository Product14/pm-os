# PRD round 1: resolution

Document: `prd/v1.md` · Revised to: `prd/v2.md` · Date: 2026-10-16
Panel: gm, general-sales-manager, service-manager, backend-engineer, ceo. All five verdicts: revise. No blocking issues, no intent-challenges.

## Consolidation
- Issues raised: 46 (0 blocking, 32 major, 14 minor). Discarded (quote not found in v1.md, whitespace normalised): 0.
- Merged: 32 majors plus 2 related minors fold into 26 rows below.
- Reviewer requests: 16, not yet run through the context-request flow. Those that block v2 text are carried as Open questions 1, 6 to 10.
- Weighing rule: accept what evidence, a trap or the approved one-pager supports; reject what goes beyond `one-pager/final.md` ("outside approved scope"); escalate what only the PM can settle (roadmap, Gate 2 sequencing, provider status). No fixed intent is touched.

## Blocking and major

| Issue | From | Decision | Reason |
|---|---|---|---|
| gm-r1-2, general-sales-manager-r1-2, service-manager-r1-1 | gm, general-sales-manager, service-manager | accept | A silent false clear is the worst failure. R2 now clears on CRM activity only when a store user logs an outbound call, text or email after `since`; the Spyne integration user ("AI SPYNE", `vinsolutions.ts:191`), CRM automation and status changes never clear; a provider that cannot tell the actor apart gives no CRM clears. Service clears only on a staff booking or RO action or a logged advisor message; a Vini booking never clears; a status question on an open RO stays open. ACs A9, A10 |
| service-manager-r1-2 | service-manager | accept | An advisor/RO read does not show the advisor called back (Q19). Service texts gate on an advisor-communication read (new row in section 9, not in this L) or the attestation |
| ceo-r1-4 | ceo | accept | Org fact 4 and Q19: no scheduler/DMS read is built in this L. Service ships with team view, click clears and attestation texts; service "Mine", booking/RO clears and the advisor-communication read come per provider as separately sized work. No provider read access is in evidence |
| general-sales-manager-r1-3 | general-sales-manager | accept | A CRM owner equal to the Spyne integration user is "No owner", never mapped; the read never writes the CRM salesperson. Whether the push sets the lead's salesperson is a request (Open question 8) |
| backend-engineer-r1-9 | backend-engineer | accept | One writer named: conv-ai owns `externalOwner` through one internal endpoint fed by integrations-backend; idempotent on lead + department + `syncedAt`, newest `syncedAt` wins. Acquisition leads have no dealer-leads row (`leads.service.ts:117`), so they show as "No owner" |
| general-sales-manager-r1-6, gm-r1-3, service-manager-r1-4 | general-sales-manager, gm, service-manager | accept | Once per episode is once per customer. R5 adds a P0 per-recipient cap: one summary text per recipient per window (count, oldest wait, link). Default window 30 minutes, flagged [ASSUMPTION] for the PM. AC A23 |
| gm-r1-4 | gm | accept | N and recipients now have an owner: the CSM sets them at enablement with the department manager. Proposed starting N 30 in-hours minutes once recipients exist [ASSUMPTION]. "Escalation not configured" rooftops go on the weekly watch, chased by the CSM lead |
| service-manager-r1-3 | service-manager | accept | Service uses its own hours where stored (the hours Vini Service offers slots in, storage unknown, Open question 7); no service hours, no service escalation, as v1 A19 did for an empty timezone. AC A26 |
| general-sales-manager-r1-5 | general-sales-manager | accept | R9 now states trigger (on open inside department hours, else at hours start), that no handoff text exists today to suppress (`human-transfer.service.ts:149`), and that owner texts count in the cap. AC A35 |
| gm-r1-5 | gm | accept | Restores the one-pager line "Owners without a console seat fall to the team view (sales/BDC or service manager)": a per-department unowned-queue owner, shown on No/Unmapped/Stale rows and counted against them |
| gm-r1-6 | gm | accept | An episode belongs to the department of the handoff or action item that made it human-owed (action items carry their own serviceType, E38), else the lead's serviceType (E40). AC A5 |
| general-sales-manager-r1-4, backend-engineer-r1-8 | general-sales-manager, backend-engineer | accept | Backfill is for the baseline only: rebuild rules written, rows marked `backfilled`, never in the live queue, never escalated. AC A17 covers the first flag-on day |
| gm-r1-1 | gm | accept, narrowed; part escalated | E10, E13: at CRM-reply rooftops the queue rots. R3 moves an episode with no clear past the aging cutoff into "Possibly answered in CRM", out of the badge, still counted. Phase 0 reports expected clicks per rep per day. The ask to hold sales at the requesting rooftop changes the Gate 2 decision "sales day one": escalated |
| backend-engineer-r1-1 | backend-engineer | accept | Mechanism named: a 1-minute sweeper claims each episode atomically by setting `escalatedAt`, with one shared in-hours age function; `textAttempts`, `lastTextError` added |
| backend-engineer-r1-2 | backend-engineer | accept | The cited producer swallows errors (`human-transfer-events.producer.ts:62`). Metrics now come from an append-only Mongo episode record; Kafka is best-effort with schema and key `episodeId + type`; a daily reconcile counts and fills gaps |
| backend-engineer-r1-3 | backend-engineer | accept | One shared open/clear service called by every writer; conditional update, event only when modified; a clear matches only the episode it read. AC A3 |
| backend-engineer-r1-4 | backend-engineer | accept | Only SMS has a member reply path in conv-ai (`sms.service.ts:2582`). Per-channel table added; email and chat episodes still open (one-pager: every channel) but clear by CRM activity or click and are reported apart in the median. Reply path for chat/email is Open question 9 |
| backend-engineer-r1-5, service-manager-r1-8 (minor) | backend-engineer, service-manager | accept | Trap `dealer-action-items-polymorphic`: intents normalised across both naming generations; config is a per-department allowlist; bare-string items do not open a wait on their own [ASSUMPTION]; new intents do not open until added. AC A2 |
| backend-engineer-r1-6, general-sales-manager-r1-1, gm-r1-7 (minor) | backend-engineer, general-sales-manager, gm | accept | The one-pager check is "appointments shown". The P&L row is now shows where show status is read (source unknown, Open question 1); meetings set are a labelled stand-in under `sms-booking-requires-meeting-after-30s`, `call-booking-window-plus-minus-7-days`, `exclude-demo-bookings-is-demo-meeting`, `exclude-appt-reminders-from-booking-rate`, created after `since` |
| backend-engineer-r1-7 | backend-engineer | accept | Writer kill switch, global and per rooftop, separate from the view flag; writer errors never fail inbound; latency budget [ASSUMPTION]. v1 A32 changed to match (now A14). AC A33 |
| ceo-r1-1 | ceo | accept, narrowed | Success-check rooftops are now defined by criteria (live roster, console-reply share, episode volume), picked from Phase 0 data before day one. What happens if none qualify is a PM call: listed below |
| ceo-r1-2 | ceo | accept, narrowed | Phase 0 outputs the wait-to-outcome line per department, labelled Spyne data, correlational. If no link shows, the claim stays manager time removed. The CSM pitch itself is outside approved scope (GTM) |
| ceo-r1-3 | ceo | escalate | Status of the VinSolutions salesperson and activity reads, whether the activity read is inside the L, and the date the CSM can give are not in evidence and are the PM's and Integrations PM's to give. v2 marks status "not in evidence" rather than inventing it |
| ceo-r1-5 | ceo | accept | Phase 0 lists CRM-reply rooftops; the CSM briefs each before day one. The day-one default stays as approved |
| ceo-r1-6 | ceo | escalate | What the L displaces and the VinSolutions write-back date are PM-only roadmap calls (one-pager Open question 4, still open) |
| service-manager-r1-5 | service-manager | accept | A sales result says nothing about advisors. The first confirmed service rooftop is its own pilot with its own baseline; the next waits for its 30-day review. Same stop rule as the one-pager |

## Minor (bulk)
- Accepted: backend-engineer-r1-10 (manager view access from a per-rooftop manager list, default the escalation recipients; conv-ai has no role guard), ceo-r1-7 (attestation set by the CSM on the department manager's request; weekly check against console-reply share), ceo-r1-8 (Phase 0 counts rooftops per department with median wait above N), general-sales-manager-r1-7 (click-cleared wait recorded as unreplied, excluded from the reply median; manager view lists click clears with actor and time), general-sales-manager-r1-8 (owner refreshed on episode open where the provider allows; AC A20), general-sales-manager-r1-9 (manager view in department hours), gm-r1-8 (P&L line named), gm-r1-9 (PM owns the weekly watch; each signal names its action), service-manager-r1-6 (Vini Service bookings as proxy if they land in `meetings`; customer-pay RO effect stated unmeasured), service-manager-r1-9 (positive and negative AC per service agent), service-manager-r1-10 (v1 A26 reconciled with A16, now A21). Also counted above: service-manager-r1-8, gm-r1-7.
- Accepted, narrowed: service-manager-r1-7: v2 says service usually falls to "No owner" before the visit and names the unowned-queue owner. The "advisor on last closed RO" setting is rejected: outside approved scope, and it needs a DMS read not in this L.

## Escalated to the PM
1. ceo-r1-6: name what the L displaces this quarter, and a VinSolutions write-back date or "none planned".
2. ceo-r1-3: status (not started, in progress, agreed) of the VinSolutions salesperson and activity reads; whether the activity read is inside the L; the date the CSM may give the requesting rooftop.
3. gm-r1-1 (part): hold sales at the requesting rooftop until its VinSolutions read is live or its manager accepts the team-view-and-click version? This changes the Gate 2 "sales day one at every rooftop" decision.
4. ceo-r1-1 (part): if no rooftop meets the success-check criteria at the end of Phase 0, what is the success check?
5. Defaults proposed as [ASSUMPTION], to confirm or replace: N 30 in-hours minutes, text window 30 minutes, attestation threshold 80% console-reply share, aging cutoff 24 hours, bare-string action items do not open a wait.

## Counts
Raised 46 · accepted 44 (4 of them narrowed: gm-r1-1, ceo-r1-1, ceo-r1-2, service-manager-r1-7) · rejected 0 whole issues (1 part, service-manager-r1-7 setting, outside approved scope) · escalated 2 issues plus 3 parts and 1 defaults list above · discarded 0.
