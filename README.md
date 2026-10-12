# Spyne PM OS

The product team's shared Claude Code setup: one place for what we know about how Spyne works, the skills we run every week, and the rituals that keep both current.

It replaces each PM's private setup. Your personal preferences stay personal. Team knowledge, skills and weekly rituals live here.

## Install (10 minutes)

**1. Connect your tools first.** At claude.ai > Settings > Connectors, connect:

| Tool | Why |
|---|---|
| Arali | Customer calls, emails, WhatsApp, Freshdesk ticket reads |
| Slack | Threads, decisions, delivering updates |
| Gmail | Dealer and stakeholder threads, drafts |
| Google Drive | PRDs, docs |
| Google Calendar | Weekly planning |
| Google Sheets | Your quarterly goals sheet |
| Atlassian | Jira and Confluence |

And the GitHub CLI (`gh auth login`), so you can contribute with `/pm-os:capture`.

You also need:
- **ClickHouse:** your own read-only ClickHouse Cloud user. Ask data/eng. Setup gives you the exact command.
- **Freshdesk:** your own API key (Freshdesk > Profile settings). Never use someone else's: notes post under the key owner's name.

Then **quit and restart Claude Code**. Connectors load at session start.

**2. Install the plugin.** In Claude Code:

```
/plugin marketplace add Product14/pm-os
/plugin install pm-os@spyne-pm-os
```

**3. Clone this repo** (you need it to read and contribute shared context):

```
gh repo clone Product14/pm-os ~/pm-os
```

**4. Run setup:**

```
/pm-os:setup
```

Setup probes every connector, tells you exactly what is missing and how to fix it, links your goals sheet, and writes `~/.pm-os/profile.json`. Re-run it any time something stops working.

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
