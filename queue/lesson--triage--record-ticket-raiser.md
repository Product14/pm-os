---
id: lesson--triage--record-ticket-raiser
kind: lesson
target: triage
area: vini-platform
status: candidate
owner: yash.sharma
source: plugin/mcp/freshdesk-server.mjs
verified: 2026-10-15
confidence: high
---

**Rule:** Record who raised each ticket (`raised_by`, `raised_by_role`) and its CSM (`csm`) in the case frontmatter.

**Why:** At Gate 1 the PM asked for the ticket raiser in every case, because the raiser and the CSM are who the PM comments to or messages to close the loop. Freshdesk `/agents/{id}` is not readable with a PM's key, so `get_ticket` resolves Spyne staff through the agent list in `ticket_fields`.

**Instead:** Use the `requester` field from `get_ticket` (plugin 0.3.4 or later) and `custom_fields.cf_csm_name`. For a dealer contact, write `dealer (<role>)`, never their name.
