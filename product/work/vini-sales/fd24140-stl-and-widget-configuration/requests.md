# Context requests

Stage: onepager, round 1. 23 requests raised across 4 reviewer files (backend-engineer, bdc-manager, ceo, gm), deduped to 16. The 5 that decide a blocking issue are R1 to R5. The rest are deferred (cap reached) and each has a matching question in questions.md.

### R1
- question: Does the dealer's lead type (inquiry, online appointment, credit application) survive parseAdf and the email consumer into the lead's external_type, and is the appointment time kept?
- blocks: Step 1 (input to the opener); Step 2 template lookup; Q18
- why: The STL gate and any per-type opener key on external_type only; if the email path never sets it, nothing can route by type.
- source: bluebrain
- merged: backend-engineer "sample forwarded email per type through POST /email-parsing/test-parse"
- status: unanswerable (E39) -> Q23

### R2
- question: Do forwarded website email leads hit isAlwaysAllowStlLead (speed-to-lead-console-call.service.ts:406), which bypasses the per-type config?
- blocks: Step 0 safety (r1-1); Step 2 template lookup placement; gm-r1-1; Q19
- why: If they do, turning a type off or adding a per-type template never takes effect for this rooftop.
- source: bluebrain
- merged: backend-engineer "prod values of STL_ALWAYS_ALLOW_SOURCE / STL_ALWAYS_ALLOW_LEAD_TYPES"; gm "do test leads stop at the STL gate or hit the bypass"
- status: answered (E40)

### R3
- question: Does turning a lead type off in speedToLeadByLeadType actually stop every STL touch for that type, and does it stop follow-up too?
- blocks: Direction 1 (hold appointment and credit-app leads out of STL); Step 2 scope for appointment and credit-app types
- why: Direction 1 is only a configuration if the off switch holds at every gate.
- source: bluebrain
- merged: bdc-manager "can follow-up be switched off per lead-type entry (isFollowUpEnabled scope)"
- status: answered (E41)

### R4
- question: How does STL handle STOP and opt-out today, and does it check SMS consent before the first text?
- blocks: Step 0 and Step 2 (contact compliance)
- why: An after-hours first text to a forwarded lead is the riskiest touch for TCPA exposure.
- source: bluebrain
- merged: bdc-manager "do the dealer's forms capture SMS consent and does the ADF carry it"
- status: answered (E42); dealer-side consent capture -> Q24

### R5
- question: What stops STL from duplicating a contact the dealer's BDC or the dealer's own after-hours automation already made?
- blocks: Step 0 go-live (duplicate contact); gm-r1-7
- why: The dealer asked about duplication on 2026-09-29 (E15) and has no API to tell us what it sent (E12).
- source: bluebrain
- status: answered (E43)

## Deferred: cap reached

### D1
- question: On the SMS reply path (sms-v2.service.ts around :1955) and STL_FOLLOW_UP generation, which lead fields reach the agent or prompt context?
- from: backend-engineer
- status: deferred: cap reached -> Q12

### D2
- question: Does any team with department=service have STL enabled (speedToLeadByLeadType populated)?
- from: backend-engineer
- status: deferred: cap reached -> Q9

### D3
- question: Has the dealer paused its own after-hours automated texts for leads it forwards to Spyne, and will it before STL starts?
- from: bdc-manager, gm
- status: deferred: cap reached -> Q25

### D4
- question: What does today's STL notification email contain, who at the rooftop receives it, and when is it sent relative to BDC open?
- from: bdc-manager
- status: deferred: cap reached -> Q26

### D5
- question: Can the reply agent create an assigned callback task after hours? (The per-type follow-up part is answered in E41.)
- from: bdc-manager
- status: deferred: cap reached -> Q27

### D6
- question: Show rate today on online-appointment website leads, and who follows up on credit applications (BDC or F&I) with what committed response time?
- from: bdc-manager, gm
- status: deferred: cap reached -> Q28

### D7
- question: Weekly after-hours website leads at this rooftop by type, BDC hours, and minutes per next-day callback.
- from: ceo, gm
- status: deferred: cap reached -> Q15

### D8
- question: Which CRMs and DMS providers have certified write-back today for STL conversations and appointments, and how many active Vini Sales rooftops sit on each versus on no-API systems?
- from: ceo
- status: deferred: cap reached -> Q29

### D9
- question: For each of the 3 companies in E22: same per-type opener job, credit-app hold-out or credit-app-first flow, and did any ask for STL outcome write-back?
- from: ceo
- status: deferred: cap reached -> Q30

### D10
- question: Engineering size for steps 1 to 3 and the target quarter.
- from: ceo
- status: deferred: cap reached -> Q16, Q17

### D11
- question: What is this team's STL silent-hours setting, and when would a lead forwarded at 11 pm get its first text?
- from: gm
- status: deferred: cap reached -> Q22

## Round 2

Stage: onepager, round 2. 8 requests across 4 reviewer files, deduped to 7. One answered from the local code clone; the rest map to open questions.

### R6
- question: Can the STL follow-up and the FOLLOW_UP cadence be stopped for the forwarding inbox's leads without a build?
- blocks: Step 0 go-live (bdc-manager-r2-1)
- from: bdc-manager
- status: answered (E44): excludeSource and the team silence-nudge switch are existing settings

### R7
- question: Which tools does the SMS reply agent have for this team (credit tools), and can they be disabled per lead or type?
- from: backend-engineer
- status: open -> Q31

### R8
- question: Do Vini or the dealer send reminders for Ava-confirmed or Ava-set appointments?
- from: bdc-manager
- status: open -> Q32 (PRD)

### R9
- question: Can the dealer's forward exclude appointment and credit-app leads, and by what rule?
- from: gm
- status: open -> Q33

### R10
- question: After-hours website leads per week by type, BDC hours on them, and today's show rate on online appointments.
- from: gm
- status: open -> Q15, Q28

### R11
- question: This team's STL silent-hours setting and the first-text time for a lead forwarded at 11 pm.
- from: gm
- status: open -> Q22

### R12
- question: What on the current Vini Sales plan moves if the M-size opener is taken this quarter?
- from: ceo
- status: open -> Q14 (PM, escalated as ceo-r2-2)
