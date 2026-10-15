# Case file contract

The case file is the handoff between `/pm-os:triage` and `/pm-os:prd`. Keep the slot headings exactly as written: `scripts/case-lint.mjs` parses them. Budget: about 1,200 words for `case.md`.

## case.md

```markdown
---
id: fd<ticket id>-<topic-slug>
area: vini-sales | vini-service
stage: triaged
freshdesk_ticket: <ticket id>
ticket_updated_at: <ISO timestamp from Freshdesk>
rooftop_slug: <kebab-case rooftop name>
rooftop_name: <rooftop name as in Freshdesk>
freshdesk_company_id: <id>
arali_company: <company name as matched in Arali>
feature: <leave blank; the decide step fills it>
outcome: <leave blank>
prd: <leave blank>
jira: <leave blank>
ledger_match: <context/decisions/<file> or blank>
fetched_freshdesk: <YYYY-MM-DD>
fetched_arali: <YYYY-MM-DD>
fetched_code: <YYYY-MM-DD>
---

# <one-line problem title, in plain dealer language>

## Ask
What the customer asked for, in their words, with the E-id of the ticket message. If the ask is a solution ("add a button that..."), quote it as-is here; the job goes below.

## Job
The outcome they need and why, in dealer P&L terms (days, cost, gross, absorption, hours per RO, CSI, staff time). Cite the evidence that shows it. If you are inferring, say "inferred" and cite what you inferred from.

## Customer context (30 days)
What this rooftop said in the last 30 days that connects to the ask: calls, meetings, emails, WhatsApp, other tickets. Dealer-side quotes only, each with an E-id. Say what connects and what does not. If nothing connects, write "None found in 30 days" and nothing else.

## Who feels this
The department role or roles who feel the problem (BDC manager, service manager, service advisor, general sales manager, GM), with the E-id that shows it.

## How it works today
How the product behaves today for this exact situation, from the code graph. Every behaviour claim cites `repo:path:line` or a bluebrain E-id. If the code research found nothing, write "Not found" and nothing else.

## Gap
The difference between what the job needs and what the product does today, citing the E-ids and code references above.

## Candidate directions
2 or 3 numbered directions, each one line, each with its dealer P&L angle (days removed, cost removed, gross, absorption). At least one direction must be a non-build option (configuration, enablement, a process change, or "decline because...").

## Frequency
How many other rooftops raised the same job in the last 90 days, with the E-id of the search that found them. Give the count, not names.
```

`case-lint --fix` appends a `## Slot status` table. Never write or edit that table yourself.

## evidence.md

One block per item. Quotes are short (under 40 words) and scrubbed: no person names, phones, emails or VINs. Replace names with roles.

```markdown
### E1
- source: freshdesk:<ticket id>#<message number> | arali:<interaction id> | bluebrain:<repo>:<path>:<line> | jira:<key> | pm:<YYYY-MM-DD> | search:<tool>:<query>
- date: YYYY-MM-DD
- side: dealer | spyne | system | pm
- role: gm | general-sales-manager | bdc-manager | service-manager | service-advisor | internet-sales | owner | engineering | csm | unknown
- text: "<short scrubbed quote, or a one-line fact for code and search evidence>"
```

- `side: dealer` only for people who work at the dealership. A Spyne CSM, AM or AE is `side: spyne`.
- Code evidence is `side: system`, `role: engineering`.
- A frequency search is `source: search:search-ticket-messages:<query>`, `side: system`, and its text gives the count and the date range.
- If you cannot tell the speaker's role, write `role: unknown`. Do not guess.

## questions.md

```markdown
### Q1
- slot: ask | job | context_30d | who_feels_this | how_it_works_today | gap | directions | frequency | assumption | request
- unknown: <what is not known, in one line>
- blocks: <which decision or section it blocks>
- who: dealer | csm | engineering | pm
- how: <the fastest way to find out>
- status: open | answered (E<n>) | accepted-assumption
```

Every slot that is not SUPPORTED needs an open question. `case-lint --fix` adds a stub when one is missing. Replace the stub's `how` line with a real suggestion.

## decisions.md

```markdown
# Decisions

## Fixed intents
- <intent the PM locked; reviewers may not trade it away>

## Log
- <YYYY-MM-DD> Gate 1: <confirm | correct | park>, <one line>
```
