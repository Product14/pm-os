---
id: system-fact--live-eval-and-prompt-testing
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: memory project_vini_call_eval.md (2026-08-11), project_close_quality_prd.md (2026-10-08)
verified: 2026-10-08
confidence: medium
reject_reasons: reviewer rejected; C1: bundles unrelated rules (audio vs STT eval ground truth, no literal values in prompt examples, stop rules on ask-more, multi-turn go-live gating, tool-definition fixes); C1: Instead line lists five independent actions, most unrelated to the Rule line; C4 note: 'core live metric (Aug 2026)' is a dated operating detail; drop it from a durable entry; C6: both cited memory files opened and support every claim
fix_hint: Split this into separate candidates. Keep the first one to the STT-ground-truth rule plus the audio-eval Instead. Submit the prompt-writing rules (no literal values in examples, a stop rule for every ask-more rule, multi-turn simulated gating) on their own, one rule per file, and drop the dated metric line.
---

**Rule:** Do not score agent quality off the STT transcript as ground truth; live eval runs from audio.

**Why:**
- An in-house live eval was killed: it treated the STT transcript as truth (transcription errors propagated into every score) and LLM-judge agreement with human review was too low.
- Spyne runs a third-party conversational-agent eval product that scores from audio with its own transcriber. Core live metric (Aug 2026): % red alert calls + top recurring issues.
- Missed tool calls were fixed with tighter tool definitions and invocation instructions, not more prompt text.
- Models copy literal prompt examples: a UAT test call (Oct 2026) offered the same two example times four times because they appeared in 11 prompt locations.

**Instead:** use the audio-based live eval for quality; keep the offline batch harness for deep dives; never put literal values in prompt examples; give every ask-more rule a stop rule; gate prompt go-live on multi-turn simulated-customer evals, not single-reply checks.
