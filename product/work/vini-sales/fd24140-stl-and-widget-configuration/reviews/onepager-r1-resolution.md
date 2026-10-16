# One-pager round 1: resolution

Raised 36 (backend-engineer 9, bdc-manager 9, ceo 8, gm 10). Discarded 0: every quote is in v1.md. Merged where the same line asked for the same change. Requests went through the context-request flow first (requests.md R1 to R5 answered as E39 to E43; D1 to D11 deferred to Q12 to Q30). No issue is an intent-challenge; the two that touch step 3 (backend-engineer-r1-4, ceo-r1-3) state they do not challenge the full-value intent and only refine its design, so they are accepted and step 3 stays planned.

| Issue | From | Decision | Reason |
|---|---|---|---|
| gm-r1-1, backend-engineer-r1-1 (blocking) | gm, backend-engineer | accept | E39: whether the ADF lead type reaches external_type is not visible (Q23); E41: off switches key on external_type and an unset type falls to DEFAULT. Step 0 now relies on the dealer forwarding inquiries only, with a forwarded test lead checked against the bypass before go-live (E40, Q19). |
| bdc-manager-r1-1, gm-r1-2, ceo-r1-1 | bdc-manager, gm, ceo | accept | E12, E13: outcomes never reach the BDC's system before step 3, so callbacks are not removed until then; volume is unsized (Q15). TL;DR says so. |
| bdc-manager-r1-2 | bdc-manager | accept | E43: STL suppression cannot see the dealer's texts or BDC calls. Step 0 adds the dealer pause (Q25) and a per-lead morning handoff to a named BDC role (Q26). |
| gm-r1-7 | gm | accept | E15 unanswered; E43 confirms STL cannot detect the dealer's own texts. Pause confirmed before go-live (Q25). |
| ceo-r1-4 | ceo | accept | E10, E31: a second undated promise repeats the miss. Only the step 0 live date and step 1 answer date go to the dealer; later steps dated after Q17. |
| ceo-r1-6 | ceo | accept | Q14, Q17 open; ask line added with judgment sizes from decide.md. Step 3 stays planned per the fixed intent; only its date waits on Q10 and Q17. |
| backend-engineer-r1-2, gm-r1-5 | backend-engineer, gm | accept | Opener is LLM output from one prompt (`sequence-task-message-generation.service.ts:159`, `:441`); E5 needs credit-app text that cannot be paraphrased. Contract: credit-app literal, appointment variables, no specifics when a value is missing. |
| backend-engineer-r1-3, gm-r1-6 | backend-engineer, gm | accept | Follow-up shares the generic prompt (`:389`) and the reply path does not carry the type (Q12). Step 2 keeps follow-up off for those types until reply and follow-up carry the type. |
| bdc-manager-r1-5 | bdc-manager | accept | E41: STL off does not govern the plain FOLLOW_UP cadence, so "all follow-up off" (STL follow-up and excludeType) is stated for appointment and credit-app types. |
| bdc-manager-r1-4, ceo-r1-5 (+ backend-engineer-r1-8, gm-r1-9 minor) | bdc-manager, ceo, backend-engineer, gm | accept | E6 supports volume, not "every one"; Q12 makes "0" conditional. Row replaced by show rate on online appointments, baseline unknown (Q28). Reschedule replies go to a BDC task (Q27). |
| backend-engineer-r1-4, ceo-r1-3 | backend-engineer, ceo | accept | E12: no API, so the read is the forwarded ADF here; no outbound ADF or webhook writer exists (solution-context). Step 3 is one reusable no-API channel with failure design deferred to the PRD; certified CRMs are Q29. |
| bdc-manager-r1-8 | bdc-manager | accept | E12: dealer needs to load appointments into its system. Step 3 writes structured lead status, Ava-set appointment and opt-out, not only a summary. |
| backend-engineer-r1-5 | backend-engineer | accept | Tasks carry no lead type (`sequence-task.schema.ts:94`). Tasks record type and template key; clearing a template reverts; write-back has a per-rooftop off switch. |
| bdc-manager-r1-6, gm-r1-4 | bdc-manager, gm | accept | E5, E1: acknowledgment promises a follow-up nobody owns (Q28). Credit-app defaults to held out; acknowledged only once the store names an owner and response time. |
| bdc-manager-r1-7 | bdc-manager | accept | E42: STL checks opt-out only, no consent. Consent added to Risks and Open questions (Q24); opt-out wording is platform logic. |
| backend-engineer-r1-6 (+ gm-r1-10 minor) | backend-engineer, gm | accept | solution-context lists four gate callers; E38 shared lead store. New fields optional; Q9, Q11 answered before step 2. |
| bdc-manager-r1-3 | bdc-manager | accept | E12, E13: Ava-set appointments before step 3 live only in Console. Row now says they are keyed from the morning handoff and tagged Ava-set; added volume unsized (Q15). |
| gm-r1-3 | gm | accept | E12, E13, E10: interim handoff named (notification email to a named BDC role, Q26); step 3 gets a dated decision point once Q10 and Q17 are answered. |
| ceo-r1-2 | ceo | accept | E22 includes a credit-app-first flow, the opposite of holding out; write-back asked by this rooftop only (E12). Count split; per-company tags Q30. |

Minor (backend-engineer-r1-7, backend-engineer-r1-9, ceo-r1-7, bdc-manager-r1-9, ceo-r1-8, gm-r1-8): accept in bulk. Parser reuse is a port from another repo; Q4 added to Open questions; flywheel line no longer claims the F&I handoff; time to first contact is conditional on Q22.

Escalated: none.
