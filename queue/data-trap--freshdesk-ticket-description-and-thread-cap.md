---
id: data-trap--freshdesk-ticket-description-and-thread-cap
kind: data-trap
area: vini-platform
status: candidate
owner: yash.sharma
source: plugin/mcp/freshdesk-server.mjs
verified: 2026-10-15
confidence: high
---

**Rule:** Read a Freshdesk ticket's `description_text` separately and page `/tickets/{id}/conversations`; never rely on `?include=conversations` alone.

**Why:** On 2026-10-15 triage built four case files with no ticket description, because the description is a ticket field, not a conversation entry. `include=conversations` also returned at most 10 entries: two tickets had 17 and 33, so the later comments were missed. The fixed `get_ticket` in `plugin/mcp/freshdesk-server.mjs` reads both and returns `conversation_count`.

**Instead:** Use the PM OS `get_ticket` tool (plugin 0.3.2 or later). Check that `conversation_count` matches the thread length shown in Freshdesk before trusting a summary.
