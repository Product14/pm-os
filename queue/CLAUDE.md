# queue/: candidates waiting for the reviewer

- New candidates (`queue/<kind>--<slug>.md`, `status: candidate`) are written by `/pm-os:capture`, the PRD retro and `/pm-os:persona-refresh`, in the format in `CONTRIBUTING.md`.
- `held/`, `repair/` and the review log are managed by the reviewer scripts. Never move or edit files there by hand.
- `vetoes/` is written by `/pm-os:veto`.
- One rule per file, a source a reviewer can open, no customer PII, no Spyne commercials. `node scripts/check.mjs` must pass.
