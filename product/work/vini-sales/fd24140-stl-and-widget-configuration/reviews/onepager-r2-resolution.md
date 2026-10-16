# One-pager round 2: resolution

Raised 33 (backend-engineer 8, bdc-manager 8, ceo 8, gm 9). Discarded 0: every quote is in v2.md. Verdicts: bdc-manager block, the other three revise. Requests went through the context-request flow first: 8 raised, deduped to 7 (requests.md R6 to R12). R6 is answered from the local code clone as E44 (follow-up cadence excludeSource and the STL silence nudge are existing per-team settings). The rest map to Q14, Q15, Q22, Q28 and new Q31 to Q33.

Weighing rule this round: accept what changes the go-live decision, the safety of a step or the honesty of a claim. Reject what adds build scope without changing the decision, or what is design detail ("belongs in PRD"). Several accepted issues are partial: the part taken and the part sent to the PRD are named in the reason. Every brevity cut named by the reviewers is taken except deleting Evidence and Decision line 1, which the template requires.

Result: accepted 29 (11 of them partial), rejected 3, escalated 1. v3 is 735 words by `wc -w` (v2 979).

| Issue | From | Decision | Reason |
|---|---|---|---|
| bdc-manager-r2-1 (blocking) | bdc-manager | accept | E43: suppression cannot see BDC calls; E41: the cadence runs unless excluded. Option (a) taken: step 0 sends the first text only, with the silence nudge off and the forwarding source excluded from the cadence, both existing settings (E44), so no build. Option (b), a per-lead stop the BDC drives, has no evidence it exists. |
| gm-r2-1, backend-engineer-r2-3 | gm, backend-engineer | accept | E9: the dealer planned to forward applications too. Step 0 now needs the CSM to confirm the forward excludes appointment and credit-app leads, with one test lead of each shown not to arrive (Q33). The catch: the BDC manager calls any lead that slips through, and the CSM spot-checks week one. The written confirmation is folded into Q33. |
| bdc-manager-r2-2 | bdc-manager | accept | E42: no consent check, and opt-out is exact "STOP" only. Q24 is on the step 0 go-live list, met by the dealer accepting the consent position and STOP-only opt-out in writing. Widening the keywords is a build, so it moves to step 2, not before step 0. |
| backend-engineer-r2-1, gm-r2-2, bdc-manager-r2-4 | backend-engineer, gm, bdc-manager | accept (partial) | Q12 open; external_type is read only at the STL gate (`conversational-ai-backend:src/sms/sms-v2.service.ts:1863`). Both type openers wait on Q12. After that, a credit-app reply gets a fixed holding text and a BDC task, and a reschedule gets a task or a handoff line if no task tool exists (Q27). Disabling credit tools per lead is logged as Q31: belongs in PRD. |
| gm-r2-3 | gm | accept (partial) | E35, E39: parsed values are unverified. The BDC manager checks Ava-confirmed date, time and store before open. Counting mismatches over two weeks is an acceptance criterion: belongs in PRD. |
| bdc-manager-r2-3, backend-engineer-r2-6 | bdc-manager, backend-engineer | accept | Q26 is open, and no scheduled digest exists (no cron in src/notifications). The handoff is "today's STL email" to the BDC manager with each lead's status. If it cannot carry that, the BDC manager uses Console until a step 2 morning list is built. |
| backend-engineer-r2-2, bdc-manager-r2-5 | backend-engineer, bdc-manager | accept (partial) | E12: no API, so Spyne cannot read shows. Show rate is dealer-reported, owned by the CSM (Q28), plus a count we can run: Ava texts proposing a new time on appointment leads, target 0. The reminder path in bdc-manager-r2-5 adds step 2 scope without changing the decision: belongs in PRD (Q32). |
| gm-r2-4 | gm | accept | Q15 open. The ask is now steps 0 and 1. The step 2 commitment waits on Q15 volume, and the show-rate baseline (Q28) sits in the step 1 and 2 row. |
| ceo-r2-1 | ceo | accept | E5, E6: without step 3, steps 0 to 2 still stop the rebook push and keep AI off credit apps. The Ask line now says step 2 stands without write-back. Hours removed stay unsized (Q15). |
| ceo-r2-2 | ceo | escalate | Q14: what the M opener displaces on the Vini Sales plan is a PM judgment, and no evidence holds it. Meanwhile the reviewer's own fallback is applied: step 2 is "direction only" until Q14 is answered. PM to name the displacement at the gate. |
| ceo-r2-5, gm-r2-6, bdc-manager-r2-7 | ceo, gm, bdc-manager | accept | E8, E12: "none before step 3" read as zero calls. The row now reads "called with status in hand; step 3: unresolved only". The "booked leads confirmed" wording is dropped, because step 0 forwards no booked leads (gm-r2-6). |
| ceo-r2-3, gm-r2-5, backend-engineer-r2-8, bdc-manager-r2-8 | ceo, gm, backend-engineer, bdc-manager | accept (partial) | Brevity: Evidence cut to 3 bullets (E41, E42/E43, E21/E22), and the code path removed from Problem. Step 0 split into short bullets. The engineering risk bullet (four callers, lead store, writers) moved to the PRD. Open questions collapsed to 3 rows. Deleting the Evidence section and Decision line 1 is rejected: the template requires both. |

Minor, in bulk:
- **Accept:**
  - backend-engineer-r2-4: Q23 moved to the step 1 and 2 row, and Q24 put on the step 0 list.
  - backend-engineer-r2-5 and ceo-r2-8 (merged, fact 4): CRM read where we have access, write-back where certified.
  - backend-engineer-r2-7: service leads are excluded in code (`conversational-ai-backend:src/sequence-workflows/services/sequence-workflow-creation.service.ts:479`), so Q9 is dropped and Q11 kept.
  - ceo-r2-4 (partial): task and template-key detail, and the failure-design sentence, moved to the PRD. A shortened "Per rooftop" line stays, because the template requires it.
  - ceo-r2-6: "Least sure" line on Q23 with its consequence.
  - ceo-r2-7: the dealer gets a date we control, live once the checks pass.
  - gm-r2-7: Q22 moved to the step 0 row and the go-live checks.
- **Reject:**
  - bdc-manager-r2-6: handoff status labels like "hold call until" belong in PRD. With follow-up off, only the first text can collide, and Q22 is now a go-live check.
  - gm-r2-8: an internal answer-by date for Q10 and Q17 needs a PM date that no evidence holds. The dealer still gets only the step 0 and step 1 dates (E10, E31). Raised for the PM at the gate, not written into the page.
  - gm-r2-9: belongs in PRD. The BDC manager as named owner is already taken under gm-r2-3 and bdc-manager-r2-3. A fixed-time email sent even with zero leads is a build (no digest exists), so it is step 2 morning-list design.

Escalated: ceo-r2-2 (Q14, displacement).
