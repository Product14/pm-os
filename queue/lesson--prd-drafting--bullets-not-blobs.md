---
id: lesson--prd-drafting--bullets-not-blobs
kind: lesson
target: prd-drafting
area: vini-platform
status: candidate
owner: yash.sharma
source: product/work/vini-sales/fd24641-single-screen-conversation-ui/decisions.md
verified: 2026-10-16
confidence: high
---

**Rule:** Write each PRD requirement as a titled block of short bullets, one idea per bullet, with sub-cases nested; never as a single table cell of clauses joined by semicolons.

**Why:** On 24641 the PM reviewed the approved PRD in Confluence and said requirements like R2 ("Clears: ... Sales: ...; never ...; Service: ...") were "full text blobs" a person cannot follow, although the content was right.

**Instead:** Use `### R<n>. <plain title> (P0) [tags]` with bullets under it (for example "Clears a wait" > "Sales" > list, then "Never clears" as its own list), sentences under about 25 words, and tables only for short cells.
