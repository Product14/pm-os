# plugin/: the installed PM OS plugin (owner only)

PMs do not edit this folder. To change a skill, use `/pm-os:propose-skill`; it goes through the skill reviewer.

For the PM OS owner:
- Bump `plugin/.claude-plugin/plugin.json` `version` on every change, and update `registry.json` and `CHANGELOG.md`.
- A skill change needs at least 3 eval cases in `evals/<skill>/cases/` and must pass `node scripts/review-skills.mjs`. Adding any tool that writes outside the repo (send, post, create, update) is held by the safety gate for review.
- Run `claude plugin validate ./plugin` and `node scripts/check.mjs` before committing.
- Every subagent call in a skill names its `model` (see `skills/prd/SKILL.md` > Models), at most 3 at a time.
