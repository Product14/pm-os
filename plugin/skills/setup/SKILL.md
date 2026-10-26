---
name: setup
description: Install or re-check the Spyne PM OS for this PM. Connects and verifies every required tool first (Arali, Slack, Gmail, Drive, Calendar, Google Sheets, Atlassian, Spyne Clickhouse, Freshdesk), then links the PM's quarterly goals sheet and the shared repo, and writes the PM's profile. Use on first install, when the session-start hook says the OS is not set up, when a PM OS skill reports a missing connector, or when asked to "check my connections" or "re-run setup".
---

# PM OS setup

Paths below are relative to this skill's base directory. The plugin root is `../..`. Steps 1 and 2 need only the plugin. Everything after step 2 reads team settings from `pm-os.config.json` in the repo clone.

**Connect tools first. Nothing else in the OS works without them, so do not skip ahead to the profile or the goals sheet while a required connector is failing.**

## Rules

- **The PM never uses a terminal.** You run every command. Explain each step in plain words, never as a command for them to type.
- **Never ask for a password, API key or token in the chat**, and never read a secrets file's contents into the conversation. Keys and passwords go only into the plugin's Configure dialog, which keeps them in the system credential store and hands them only to the plugin's own Freshdesk server. ClickHouse needs no key: it is the org's Spyne Clickhouse connector. If a PM pastes a secret into the chat anyway, tell them to rotate it.
- Every probe is a tiny read. Never write anything to a connected system during setup.
- Ask every question with the AskUserQuestion tool, with concrete options.
- Report each result plainly: pass, fail, or not loaded. Do not round "not loaded" up to "probably fine".

## Step 1. Connectors (blocking)

Read `../../connectors.json`. For every connector, in file order:

1. **Find the tool.**
   - If the probe has `find`, check whether that exact tool name is available. If it is a deferred tool, load it with ToolSearch (`select:<name>`).
   - If the probe has `search`, run ToolSearch with that query and keep only tools whose name contains `match`. Pick the cheapest read-only tool (a list, get-current-user, or accessible-resources call).
   - If the probe has `run`, run that shell command with Bash, replacing `${CLAUDE_PLUGIN_ROOT}` with the plugin root.
2. **Call the probe** with the given arguments, or the smallest valid arguments for a `search` match.
3. **Classify:**
   - `pass`: the call returned data.
   - `not loaded`: no tool was found. For a claude.ai connector this nearly always means it was connected after this session started, or it was never connected.
   - `fail`: the tool exists but errored (auth expired, permission denied, wrong database).

Extra checks:
- **ClickHouse:** after `list_databases` passes, confirm every database in the probe's `expect_databases` appears. Any missing database is a `fail` with the message "ask data/eng to add <db> to the Spyne Clickhouse connector".
- **Freshdesk:** the `whoami` tool returns the name and email the key belongs to. If that email is not the PM's own, mark it `fail`. Say: "This key belongs to <name>. Notes would be posted under their name. Use your own key." Never accept a borrowed key.

Show one table:

| Tool | Status | What it unlocks | Fix |
|---|---|---|---|

For anything not `pass`, the Fix column is the `connect` text from `connectors.json`.

Then:
- If any required claude.ai connector is `not loaded`, tell the PM to connect it at claude.ai > Settings > Connectors, then **quit and restart Claude Code** (connectors load at session start) and run `/pm-os:setup` again. Stop here.
- Fix the rest with the PM right now, one at a time, in plain words:
  - **Freshdesk** lives in the plugin's Configure dialog. Walk the PM through the `connect` text. When they say they have saved it, ask them to type `/reload-plugins` (or quit and reopen Claude Code if the tools still do not appear; in the Claude desktop app, start a new Local session), then re-run that probe. If the desktop app shows no Configure option, point them to QUICKSTART Step 2: set the keys once from the VS Code panel; never take a key in the chat.
  - **GitHub:** if `gh` is missing, install it with `brew install gh`. If Homebrew is missing too, point them to the GitHub CLI download page and wait. Then run `gh auth login --web --git-protocol https --hostname github.com` in the background, read the one-time code from its output, and tell the PM: "Open github.com/login/device and enter this code." Wait for it to finish.
- Freshdesk can be finished later. Mark them `pending` and continue. Re-run `/pm-os:setup` any time to retry.
- Optional connectors (`required: false`) never block. List them as "recommended".

Continue to Step 2 when every claude.ai connector and GitHub pass. Freshdesk may be pending.

## Step 2. Shared repo

PM OS has its own private repo, `Product14/pm-os`. A clone of it is the PM OS repo for every skill: `repo_path` points at the clone root.

1. Find a clone. Check `~/pm-os`, then `~/Documents/pm-os`, then ask. A clone has `pm-os.config.json` and `scripts/check.mjs` at its root.
2. If there is no clone, run `gh repo clone Product14/pm-os ~/pm-os` yourself. If it fails with "not found", the PM has no access yet: tell them to ask the PM OS owner (see `OWNERS.md` in the repo; until one is named, the Product14 account holders) to add their GitHub username, then re-run `/pm-os:setup`.
3. In the clone, run `git config core.hooksPath .githooks` so the safety check runs on every commit.
4. Run `node scripts/check.mjs` once and report the result.

## Step 3. Goals sheet (after the repo is found)

1. If `goals_sheet.template_url` in `pm-os.config.json` is `TODO`, skip this step: record the goals sheet as `pending` and tell the PM the planning skills will ask for it once the template ships. Otherwise ask for the URL of the PM's own copy of the template.
2. Read it with Google Sheets and identify the tab and the rows this PM owns.
3. Show the PM the first 3 goal rows (item, current state, target, owner). Do not show any column matching `goals_sheet.never_copy_columns_matching`. Ask "Are these your goals?"
4. Store only the sheet ID, the tab name and the owner name as written in the sheet. Never store sheet contents.

## Step 4. Profile

Ask with AskUserQuestion:
- **Area:** options from `pm-os.config.json` `areas`. Allow multiSelect.
- **Name and Spyne email:** offer the values found from the Freshdesk `whoami` and `git config user.email` as options. The PM can correct them.

## Step 5. Write the profile

Write `~/.pm-os/profile.json` with `chmod 600`. No secrets go in this file.

```json
{
  "setup_version": 1,
  "name": "", "email": "", "areas": [],
  "repo_path": "",
  "goals_sheet": { "id": "", "tab": "", "owner_label": "" },
  "connectors": { "<id>": { "status": "pass|fail|not loaded", "checked": "YYYY-MM-DD" } }
}
```

## Step 6. Close

Show what now works and what each connector unlocks, using `used_by` from `connectors.json`. End with the three things to try first, written as what to type in Claude Code: `/pm-os:capture` at the end of a session that taught them something, `/pm-os:status` to see what happened to it, and `/pm-os:veto` when an entry is wrong. Only name skills that exist in the plugin's `skills/` directory.
