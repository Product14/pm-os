---
id: system-fact--sales-inbound-prompt-location-and-history
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: conversational-ai-backend src/agents/agents-v2.service.ts (resolveSystemPrompt), src/agent-types-crud/schemas/agent-type-logs.schema.ts; memory reference_sales_inbound_prompt.md (2026-10-01), project_context_engineering_review.md (2026-10-11)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Find agent prompts and their history in `conversational-ai-backend` git + Mongo `AgentTypeLog`, never in ClickHouse.

**Why:**
- Prompts are assembled in code: `src/agents/agents-v2.service.ts` `resolveSystemPrompt` / `buildChatSystemPrompt`; SMS path `src/sms/vincue-sms-prompt-builder.service.ts`; roots `src/prompts/base-system-prompts/{sales_new,sales_v2}.xml` with nunjucks includes.
- Tool-level behaviour rules (e.g. transfer wording) live under `src/tools/definitions/`.
- ClickHouse has no prompt: `dealer_leads.agentTypes` has no prompt column; the audit log is not replicated; `agentTypes.updatedAt` is a bulk re-sync stamp (5 of 6 types share one timestamp), useless for dating; `endcallreports` / `smsChatCompletions` hold no system prompt.
- Branches: prod = `release`, UAT = `uat-release` (no `uat`).
- Not visible in ClickHouse either: workflow_v2 rollout share (`executionMode` absent from `teamAgentMappings`); in-call tool-result clearing lives in the LiveKit runtime repo.

**Instead:** `git log` on those paths (run `git fetch` first; local clones go stale) + MongoDB `AgentTypeLog`. To see a prompt at a commit, resolve `{% include %}` recursively via `git show <ref>:<path>` or render with nunjucks (`communication_mode=voice`). Runtime vars make real prompts larger than a static render.
