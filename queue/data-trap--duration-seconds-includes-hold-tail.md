---
id: data-trap--duration-seconds-includes-hold-tail
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: brainstorming-flows/projects/call-analysis/abr-deepdive/ABR-DEEPDIVE.md; memory project_abr_deepdive.md (2026-08-11)
verified: 2026-08-11
confidence: high
---

**Rule:** Do not trend call `duration_seconds` across 2026.

**Why:**
- From ~June 2026 the call record includes post-transfer hold time with no transcript. Mean untranscribed tail on L2 (transfer) calls: 10s in May, 163s in July (ABR deepdive eval corpus, 10,180 calls).
- Duration looks +70% while real conversation length is flat and inter-turn gaps improved.

**Instead:** `transcript_span` (first to last transcribed turn). Audit any live dashboard that trends duration.
