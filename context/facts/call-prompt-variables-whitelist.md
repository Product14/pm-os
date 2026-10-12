---
id: system-fact--call-prompt-variables-whitelist
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: conversational-ai-backend src/call/dto/call-prompt-variables.dto.ts; src/main.ts:126-130; src/demo-flow/dto/demo-web-call.dto.ts
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: system-fact--outbound-journey-routing
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Send only the promptVariables keys declared in `call-prompt-variables.dto.ts`. The API rejects any other key.

**Why:** The global ValidationPipe in `main.ts` runs with `whitelist: true, forbidNonWhitelisted: true`. The call DTOs, including the one behind `/demo-flow/call/start` (it extends `WebCallDto`), type promptVariables from `call-prompt-variables.dto.ts`. So one undeclared key returns a 400 for the whole call request. It is not silently dropped.

**Instead:** Map caller data onto the declared camelCase fields in `call-prompt-variables.dto.ts`. Put any fact that has no field into a declared free-text field such as `customerActivityHistory`.
