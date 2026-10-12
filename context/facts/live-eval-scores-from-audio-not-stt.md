---
id: system-fact--live-eval-scores-from-audio-not-stt
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: memory project_vini_call_eval.md (2026-08-11)
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: system-fact--live-eval-and-prompt-testing
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Do not treat the STT transcript as ground truth when you score Vini agent quality.

**Why:** An in-house live eval was tried and then killed. It scored off the STT transcript as if it were truth, so transcription errors could not be seen and carried into every score. LLM-judge agreement with human review was also too low to act on. Spyne now runs a third-party conversational-agent eval product. It scores from the audio with its own transcriber, so STT errors become a failure mode you can catch.

**Instead:** Use the audio-based live eval for agent-quality scoring. Keep the offline batch harness for deep-dive analysis only.
