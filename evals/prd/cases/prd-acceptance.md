---
why: PRD sections 6 and 7 from an approved one-pager; tests that every P0 requirement gets a happy path, stop condition, negative case and fallback, and that every requirement is tagged
---

## input

Today is 2026-10-15. You have no tools. Act as the drafter. The one-pager below is approved. Write PRD sections 6 (Requirements) and 7 (Acceptance criteria) only, nothing else. Section 6 is a table: #, Requirement, Priority, Tag. Section 7 is a table: #, Given, When, Then, Covers. The files are pasted with every heading shifted down one level (### here is ## in the file, #### is ###).

FILE one-pager/final.md (approved 2026-10-14)
# Service customers calling "is my car ready" tie up advisors
**Author:** priya.k · **Status:** Approved · **Ticket:** Freshdesk 51203 · **Area:** vini-service
**Flywheel stage:** RO
### Decision
build-generalised: asked to "have the agent answer status calls" at one rooftop; building RO status answers from the DMS read for every service rooftop with the job. [E1, E6]
### TL;DR
Advisors stop writing ROs to answer "is it ready" calls. The agent reads the open RO status and says it to a verified caller, and hands off when it cannot.
### Recommendation
Read RO status through the existing DMS read `dms-sync:src/ro/status.ts:44`. Speak only statuses the rooftop allows. Verify the caller against the phone on the RO before saying anything. Never quote a price or a promise time not on the RO. Transfer to the advisor when the read fails, is stale, or the caller is not verified. Per rooftop: speakable statuses (default: in progress, waiting on parts, ready for pickup) and a staleness window (default 60 minutes).
Not building: any write to the RO or DMS, payment, or upsell approval.
### What it removes
Advisor interruptions per day: today about 40 status calls per advisor per day [E1]; after: unknown until the pilot.
### Risks and dependencies
- DMS read covers CDK and Reynolds rooftops today; not Tekion `dms-sync:src/ro/providers.ts:19`.
- RO status in the DMS lags the floor when techs do not clock in [E3].

FILE decisions.md
Fixed intents: Never say anything about an RO to a caller who is not verified against the RO's phone. [PM]

FILE evidence.md (summary)
- E1 freshdesk:51203#1, service manager: "My advisors take 40 of these a day each. Every one pulls them off writing up the next car."
- E2 arali:int-81230, service advisor: "Half the time the answer is just 'still in the bay'."
- E3 arali:int-81230, service advisor: "If the tech didn't clock the job, the system says it hasn't started."
- E4 arali:int-81877, service manager (other rooftop): "Don't let it give a pickup time. That's my advisor's call."
- E5 bluebrain:dms-sync:src/ro/status.ts:44, engineering: returns status code, last-updated time and RO phone for an open RO.
- E6 search:search-ticket-messages:RO status calls advisors, engineering: 3 distinct companies, 2026-07-16 to 2026-10-14.

## rubric

- Returns only sections 6 and 7; no other PRD sections
- Every requirement row has a priority (P0, P1 or P2) and a tag ([E..], a `repo:path:line` reference or [PM]); none is untagged
- Caller verification against the RO phone is a P0 requirement tagged [PM], matching the fixed intent
- Every P0 requirement has acceptance rows covering the happy path, a stop condition, a negative case and a fallback; the Covers column ties each row to its R number
- At least one stop condition uses the staleness window: when the RO last-updated time is older than the rooftop's window, the agent stops quoting status and hands off
- Negative cases include: no RO detail to an unverified caller; no price or pickup promise time that is not on the RO [E4]
- Fallback covers the DMS read failing or the rooftop being on an unsupported DMS: the agent transfers to the advisor or logs a callback, and says nothing about the RO
- Per-rooftop settings (speakable statuses, staleness window) appear as requirements with their defaults, not as rooftop-specific branches
- No requirement writes to the RO or DMS; Tekion support is not in scope as a requirement
- Each Then is observable in a test call, the console or a log, not "the agent tries to"
- No numbers beyond those in the approved one-pager and evidence; no names; no em dashes
