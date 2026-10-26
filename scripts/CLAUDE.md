# scripts/: mechanical checks and generators (owner only)

Plain Node, zero dependencies, so every PM can run them. Judgment goes in skills, not here.

| Script | Run by |
|---|---|
| `check.mjs` | pre-commit hook and CI; must exit 0 (S1 secrets, S2 PII, S3 commercials, S4 schema, S5 stale, S6 indexes, S7 case evidence, S8 structure) |
| `index.mjs` | after any change to `context/` or `product/work/`; regenerates every index |
| `case-lint.mjs`, `structure-lint.mjs` | skills and `check.mjs` |
| `claude-guard.mjs`, `claude-session.mjs` | the repo's Claude Code hooks (`.claude/settings.json`) |
| `review-context.mjs`, `review-skills.mjs`, `repair.mjs`, `apply-vetoes.mjs`, `pm-os-review.sh` | the reviewer Action or `/pm-os:reviewer run` |

Changing a check changes what every PM can commit: test it on the whole repo first, and say in the PR what it now blocks.
