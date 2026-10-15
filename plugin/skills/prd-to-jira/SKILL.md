---
name: prd-to-jira
description: File a Jira issue for a PRD (or a bug) that the PM already approved in /pm-os:prd. Shows the exact payload and creates the issue only when the PM picks "create". Use when the PM says "create the Jira for this PRD", "file this in Jira", or "/pm-os:prd-to-jira <folder>".
---

# Approved PRD to Jira

1. Read `repo_path` from `~/.pm-os/profile.json`. No profile: tell the PM to run `/pm-os:setup` and stop.
2. Resolve the work folder from the path, Freshdesk id or feature name the PM gave. If several match, ask with AskUserQuestion.
3. Refuse, in one line, if `case.md` is not `stage: approved` and the outcome in `decide.md` is not `bug`, or if `jira:` is already set (show the existing key instead).
4. Follow `../prd/reference/jira.md` exactly. It creates nothing unless the PM picks "create".
5. Commit `jira.md`, `case.md` and the regenerated indexes on a branch `jira/<folder>`, and publish through `../../reference/contribute.md`.
