---
id: lesson--triage--agents-affected
kind: lesson
target: triage
area: vini-platform
status: candidate
owner: yash.sharma
source: product/work/vini-sales/fd24641-single-screen-conversation-ui/decisions.md
verified: 2026-10-15
confidence: high
---

**Rule:** For every ticket, state the impact on both Sales and Service agents (inbound, outbound, STL, chat), even when the ticket names only one.

**Why:** Ticket 24641 asked for a sales-lead console view, but the Conversations surface is shared with service. On 22370 the PM ruled the fix must go into both the Sales and Service agents. Twice in one triage run, a single-agent framing hid a shared scope.

**Instead:** Fill the case's Agents affected slot with yes, no or unknown per agent, backed by a code reference (`who_calls`, `trace_handler`), and carry shared scope into Gap and the directions.
