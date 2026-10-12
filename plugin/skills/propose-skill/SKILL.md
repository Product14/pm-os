---
name: propose-skill
description: Propose an improvement to a PM OS skill, or a new skill, for the automatic skill reviewer. Use when the PM says a PM OS skill should work differently, wants to change how a skill behaves, or wants to add a new team skill.
---

# Propose a skill change

The skill reviewer merges a change only if it passes a safety gate and beats the current version on that skill's eval cases. Write proposals that can win on that test.

1. **Understand the change.** Ask what went wrong or what should be different, with one concrete example from a real session. One improvement per proposal.
2. **Read the current skill** at `plugin/skills/<skill>/SKILL.md` in the repo (`repo_path` from `~/.pm-os/profile.json`), and its eval cases in `evals/<skill>/cases/`.
3. **Check the evals.** A skill with fewer than 3 cases cannot change automatically. If the PM's example is not covered by a case, write a new case first: an `## input` section with the realistic request, and a `## rubric` section with one line per thing a good answer must do. Use made-up names and numbers, never real customer data.
4. **Write the proposal:**
   - `proposals/skills/<skill>/<short-slug>/SKILL.md`: the complete new file, not a diff
   - `proposals/skills/<skill>/<short-slug>/WHY.md`: one line on what it improves
   - any new eval cases in `proposals/skills/<skill>/<short-slug>/cases/`
5. **Stay inside the safety gate.** Do not add send, post, reply, create, update or delete actions, external URLs, or wording that skips approval. Do not remove approval, "never", draft, PII or commercials rules. A proposal that needs one of those is a policy change: tell the PM to raise it with the PM OS owner instead.
6. **Publish it** by following `../../reference/contribute.md`, with the branch `skill/<skill>-<short-slug>`.
7. **Tell the PM** what happens next: a safety check, then both versions run on the eval cases and are scored blind. It merges only if it scores better. `/pm-os:status` shows the verdict.
