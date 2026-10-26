# Contributing a change to the PM OS repo

Every PM OS skill that writes to the shared repo follows these steps. The PM never runs a command: you run them and tell the PM in plain words what happened.

1. Read `repo_path` from `~/.pm-os/profile.json`. It is the root of the `Product14/pm-os` clone. If there is no profile, tell the PM to run `/pm-os:setup` first and stop.
2. In the repo, run `git switch main && git pull --ff-only`. Then create a branch named for the change, for example `capture/<id>` or `veto/<id>`.
3. Write only the files the skill names. The intake check merges these with no human review: `queue/`, `proposals/`, PM work in `product/work/`, `product/triage/` and `product/prds/`, the generated `product/*.yaml` indexes, and persona `watchlist.md` files. Touching anything else (config, skills, persona cores, scripts) means a person has to review it.
4. Run `node scripts/check.mjs`. If it reports an error, fix the file and run it again. Never commit with `--no-verify`.
5. Commit with a short message that names the change.
6. Publish it:
   - **The repo has an `origin` remote and `gh auth status` succeeds:** run `git push -u origin HEAD`, then `gh pr create --fill`, then `git switch main`. Give the PM the PR link. The intake Action merges it by itself within a minute or two when it touches only the paths in step 3 and passes the safety check; anything else waits for the PM OS owner. The reviewer then runs on `main` (nightly, or on push once its secret is set) and logs verdicts in `review-log/`. `/pm-os:status` shows them.
   - **`gh` is not signed in:** run `gh auth login --web --git-protocol https --hostname github.com` in the background. Read the one-time code and the URL from its output, and tell the PM: "Open github.com/login/device, enter this code: XXXX-XXXX". Wait for the command to finish, then publish.
   - **There is no `origin` remote** (a local test copy): stay on the branch's commit and tell the PM the change is saved locally. A maintainer runs `/pm-os:reviewer run` to review it.
7. Keep the PM's working copy on `main` when you finish.
