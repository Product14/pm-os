# Spyne PM OS

The product team's shared Claude Code setup: one place for what we know about how Spyne works, the skills we run every week, and the rituals that keep both current.

It replaces each PM's private setup. Your personal preferences stay personal. Team knowledge, skills and weekly rituals live here.

## Install (no terminal)

Everything happens inside Claude Code: the VS Code extension, the desktop app or the CLI.

**1. Connect your claude.ai tools.** At claude.ai > Settings > Connectors, connect Arali, Slack, Gmail, Google Drive, Google Calendar, Google Sheets and Atlassian. Then quit and reopen Claude Code.

**2. Get the plugin.**
- **Team rollout (recommended):** an org Owner adds this repo once under claude.ai Organization settings > Plugins & skills and marks `pm-os` Required. It then appears for every PM with nothing to install.
- **Install (VS Code or CLI):** type `/plugin marketplace add Product14/pm-os`, then `/plugin install pm-os@spyne-pm-os`.
- **Install (Claude desktop app):** in a **Local** session in the **Code** tab, ask Claude to "add the plugin marketplace Product14/pm-os and install pm-os for my user", then start a new session. The app's own **Add marketplace** button cannot read this private repo.
- GitHub must be signed in on your computer first (private repo). Full steps for every app: [QUICKSTART.md](QUICKSTART.md).

**3. Type `/pm-os:setup`.** Claude checks every tool, fixes what it can with you, and walks you through the rest:
- **ClickHouse and Freshdesk** go into the plugin's Configure dialog (`/plugins` > Installed > pm-os > Configure; in the desktop app, **+** > **Plugins** > **Manage plugins** > pm-os). They are stored in your system's credential store, never in the chat.
- **GitHub sign-in** is a one-time code you enter at github.com/login/device. Claude starts it for you.

Re-run `/pm-os:setup` any time something stops working.

## Everyday use

| Type | When |
|---|---|
| `/pm-os:capture` | You learned something another PM would hit too |
| `/pm-os:status` | See what happened to what you captured, and what is new |
| `/pm-os:veto` | A shared entry is wrong |
| `/pm-os:propose-skill` | A PM OS skill should work differently |
| `/pm-os:triage` | See what is waiting on product in Freshdesk, with a case file per ticket |
| `/pm-os:prd <folder or idea>` | Decide whether to build it, then a reviewed one-pager and PRD |
| `/pm-os:prd-to-jira <folder>` | File an approved PRD in Jira (you approve the exact issue first) |
| `/pm-os:persona-refresh` | Refresh the dealer personas from last week's customer conversations (runs weekly on its own) |

Nobody approves contributions by hand: the reviewer agent decides, and anyone can veto afterwards.

## What is in here

| Path | What |
|---|---|
| `plugin/` | The Claude Code plugin: skills, hooks, scripts. Ships to every PM |
| `context/` | Shared knowledge, one small file per entry, indexed in `context/INDEX.md` |
| `queue/` | Candidate entries waiting for an owner to review |
| `scripts/` | `check.mjs` (commit gate), `index.mjs`, `promote.mjs` |
| `registry.json` | Every team skill: owner, status, what it does |
| `pm-os.config.json` | Team-wide settings. Never secrets |

Company and dealer-domain context (the five facts, glossary, competitors) lives in the org `us-dealer-domain` skill. This repo does not duplicate it.

## Rules that are enforced, not suggested

`node scripts/check.mjs` runs on every commit (`.githooks/pre-commit`). It blocks:
- **Secrets:** keys, tokens, cookies, credentials
- **Customer PII:** non-Spyne emails, phone numbers, VINs
- **Spyne commercials:** ARR, MRR, contract values <!-- pm-os-allow: states the rule -->
- **Entries without an owner, a source or a verified date**

It warns on context not re-verified in 90 days.

See `CONTRIBUTING.md` for how knowledge gets in.
