---
id: decision--last-outreach-context
kind: decision
area: vini-service
status: candidate
owner: yash.sharma
source: product/work/vini-service/fd22370-vin-details-on-outbound-calls/decide.md
verified: 2026-10-16
confidence: medium
outcome: bug
revisit_trigger: reopen as build-generalised when any one holds (1) the re-test shows a missed outbound attempt writes no lead memory record, (2) a callback answered by the other department's agent has no context, (3) a second rooftop raises the same job, (4) 3 or more Tekion rooftops show the late-attached vehicle gap and Tekion rules out per-dial polling
demand_rooftops: 1
work: product/work/vini-service/fd22370-vin-details-on-outbound-calls
---

**Rule:** When a returned outbound call lacks the reason for the call or the vehicle, treat it as a bug: re-test the September callback fixes on Sales and Service first, then fill the vehicle with a pre-dial CRM fetch; do not build a new last-outreach record until a revisit trigger fires.

**Why:** Both halves are meant to work today: every outbound call renders the vehicle block for Sales and Service, and callback context is shipped work live on prod with a Service defect in backlog. Demand is 1 rooftop, Tekion-wide exposure is unchecked and dealer P&L impact is unknown, so a new shared build did not clear the bar.

**Instead:** Run the work folder's retest-plan.md on both lines and file failures against the existing callback Jira tickets; send the vehicle half through the pre-dial fetch bug. If any revisit trigger fires, reopen decide as build-generalised `last-outreach-context` for Sales and Service together, never as a branch for one rooftop.
