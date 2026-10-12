# Contributing a change to the PM OS repo

Every PM OS skill that writes to the shared repo follows these steps. The PM never runs a command: you run them and tell the PM in plain words what happened.

1. Read `repo_path` from `~/.pm-os/profile.json`. If there is no profile, tell the PM to run `/pm-os:setup` first and stop.
2. In the repo, run `git switch main && git pull --ff-only`. Then create a branch named for the change, for example `capture/<id>` or `veto/<id>`.
3. Write only the files the skill names. Every contribution stays inside `queue/` or `proposals/`, and the intake check merges those with no human review. Touching anything else means a person has to review it.
4. Run `node scripts/check.mjs`. If it reports an error, fix the file and run it again. Never commit with `--no-verify`.
5. Commit with a short message that names the change.
6. Publish it:
   - **The repo has an `origin` remote and `gh auth status` succeeds:** run `git push -u origin HEAD`, then `gh pr create --fill`, then `git switch main`. Give the PM the PR link. Say it merges by itself within a minute or two, and that the verdict lands in the review log a few minutes later. `/pm-os:status` shows it.
   - **`gh` is not signed in:** run `gh auth login --web --git-protocol https --hostname github.com` in the background. Read the one-time code and the URL from its output, and tell the PM: "Open github.com/login/device, enter this code: XXXX-XXXX". Wait for the command to finish, then publish.
   - **There is no `origin` remote** (a local test copy): stay on the branch's commit and tell the PM the change is saved locally. A maintainer runs `/pm-os:reviewer run` to review it.
7. Keep the PM's working copy on `main` when you finish.
