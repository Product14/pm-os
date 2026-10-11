---
id: system-fact--prompt-routing-decides-active-prompt
kind: system-fact
area: vini-sales
status: candidate
owner: yash.sharma
source: conversational-ai-backend commits 94d067d07 (2026-07-07), af1f8413d (2026-07-20); agents-v2.service.ts resolveSystemPrompt; memory project_prompt_metric_mapping.md (2026-10-01), project_prompt_lever_review.md (2026-10-01), reference_sales_inbound_prompt.md (2026-10-01)
verified: 2026-10-01
confidence: high
---

**Rule:** When dating a prompt change, diff the routing code and grep only files the active root includes.

**Why:**
- `resolveSystemPrompt` decides which XML renders; prompt-file diffs alone miss whole-prompt swaps.
- 7 Jul 2026 (`94d067d07`): SMS, outbound and web moved `sales_new` -> `sales_v2`. 20 Jul 2026 (`af1f8413d`): voice moved too, rollout gate deleted (composed voice prompt 203 KB -> 83 KB). Comparisons across these dates compare two different documents.
- Rules still in `sales.xml` / `sales/*.xml` are dead for Sales Inbound because `sales_v2` does not include them; repo-wide `git grep` misleads.
- Before 7 Jul, guardrails / escalation / operational-guidelines / voice-and-tone sat behind `{% if not is_sms_channel %}`, so voice and SMS are natural controls for each other.
- ABR fell secularly all summer, so naive pre/post makes every change look harmful. With DiD, the 7 Jul SMS swap was the largest effect (-12.5pp ABR); the 20 Jul voice swap was ~0 (Spyne internal analysis, Oct 2026).

**Instead:** diff `resolveSystemPrompt` alongside the XML; grep the composed prompt; measure with the other channel as a difference-in-differences control. Volume of instruction is not force of instruction.
