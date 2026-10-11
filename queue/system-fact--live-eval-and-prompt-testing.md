---
id: system-fact--live-eval-and-prompt-testing
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: memory project_vini_call_eval.md (2026-08-11), project_close_quality_prd.md (2026-10-08)
verified: 2026-10-08
confidence: medium
---

**Rule:** Do not score agent quality off the STT transcript as ground truth; live eval runs from audio.

**Why:**
- An in-house live eval was killed: it treated the STT transcript as truth (transcription errors propagated into every score) and LLM-judge agreement with human review was too low.
- Spyne runs a third-party conversational-agent eval product that scores from audio with its own transcriber. Core live metric (Aug 2026): % red alert calls + top recurring issues.
- Missed tool calls were fixed with tighter tool definitions and invocation instructions, not more prompt text.
- Models copy literal prompt examples: a UAT test call (Oct 2026) offered the same two example times four times because they appeared in 11 prompt locations.

**Instead:** use the audio-based live eval for quality; keep the offline batch harness for deep dives; never put literal values in prompt examples; give every ask-more rule a stop rule; gate prompt go-live on multi-turn simulated-customer evals, not single-reply checks.
