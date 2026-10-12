---
id: data-trap--transfer-from-agent-wording
kind: data-trap
area: vini-sales
status: stable
owner: yash.sharma
source: conversational-ai-backend commits 9a3926d34, 3cb5c33ee, a73a80677 in src/tools/definitions/communication/communication-transfer-call-v3.tool.ts; memory project_abr_sep_refresh.md (2026-10-01), project_prompt_lever_review.md (2026-10-01)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never measure transfers (or any agent behaviour) by phrase-matching what the agent says.

**Why:**
- 21-23 Sep 2026 the transfer tool prompt banned "I'm connecting you" / "connecting you now" and mandated "I'm trying to connect you now". Six commits 17-23 Sep changed only the spoken phrase.
- Phrase-matched transfer metrics fell to ~0-10% on 2026-09-24 while the structural transfer rate stayed 46-69%. Looks like a fix; is not.
- A phrase proxy also misdated the summer transfer surge (8 Jul) vs the structural break (week of 20 Jul).

**Instead:** endcallreports `callDetails_endedReason IN ('transferred','assistant-forwarded-call')` (locked definition in `abr-trends.sql`), or transfer tool invocation. Same failure class as the `SALES_SCHEDULE_APPOINTMENT` allowlist drift.
