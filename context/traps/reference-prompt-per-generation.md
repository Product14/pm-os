---
id: data-trap--reference-prompt-per-generation
kind: data-trap
area: vini-service
status: stable
owner: yash.sharma
source: brainstorming-flows/projects/service-inbound-analysis/READER-PROMPT.md (step 2); brainstorming-flows/projects/service-inbound-analysis/RUBRIC.md (section 0a)
verified: 2026-10-12
confidence: high
repair_attempts: 1
repaired_from: data-trap--service-inbound-extractor-traps
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** When you score Service Inbound calls against the system prompt, use the reference prompt of each call's own prompt generation, and make the week's default reference the majority generation.

**Why:** Two prompt generations (`service_new` and `service_v2`) ran side by side for a period from 24 Jul, and their section and rule names differ. If you score a call against the wrong generation, its scores shift.

**Instead:** Take the week's majority generation from live calls as `reference-prompt-voice-inbound.xml`. Put the minority generation's live prompt beside it as `reference-prompt-voice-inbound-<generation>.xml`. Score each call against the prompt its header states, and use RUBRIC section 0a to map rule names between generations.
