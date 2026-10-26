# PM OS: set it up and use it

PM OS is a Claude Code plugin for Spyne PMs. It does four jobs:

- **Triage:** reads the Freshdesk "Waiting on Product" queue and writes one evidence-backed case file per ticket (rooftop, last 30 days of customer context from Arali, how the product works today from the code graph, open questions).
- **PRD:** turns a case file, or any idea, into a one-pager and a PRD. It decides first whether to build at all, then runs reviews by dealer, engineer and CEO personas, and checks the result against what the customer actually asked.
- **Jira:** files the approved PRD or bug in Jira, only after you approve the exact issue.
- **Shared context:** data traps, metric definitions, decisions and lessons that every PM's Claude reads, reviewed automatically before they merge.

You never need a terminal. Everything below happens inside Claude Code, wherever you use it:

- **The Claude desktop app** (the **Code** tab in the Claude app for Mac or Windows). Look for the **In the Claude app** notes in each step.
- **The Claude Code panel in VS Code.**
- **The Claude Code CLI** in a terminal, if that is how you already work.

Plugins and keys are saved per computer, so whatever you set up in one of these works in the others.

Setup takes about 20 minutes, most of it connecting tools.

---

## Before you start (one time)

| You need | How to get it |
|---|---|
| Claude Code, signed in with your Spyne Claude account | The Claude desktop app from claude.com/download (use its **Code** tab), or Claude Code from claude.com/claude-code |
| Git on your computer | On a Mac, the app asks to install it the first time it needs it ("Git is required"): accept. Or ask Claude: "install git for me" |
| GitHub signed in on your computer (the plugin lives in a private repo, so the install in Step 1 fails without it) | Ask Claude: "install the GitHub CLI and sign me in to GitHub". It shows a one-time code; open github.com/login/device and enter it |
| Access to the private GitHub repo `Product14/pm-os` (read to use it, write to contribute back) | Ask the PM OS owner in `OWNERS.md`. Until one is named, ask Lakshay Narang or Devansh Hasija (they hold the Product14 account) |
| These claude.ai connectors switched on: **Arali, Slack, Gmail, Google Drive, Google Calendar, Google Sheets, Atlassian, Spyne Clickhouse** (metrics, no login of your own). Spyne Blue Brain is recommended | claude.ai > Settings > Connectors > Connect each one. Then quit and reopen Claude Code (connectors only load at start) |
| Your own **Freshdesk API key** | In Freshdesk: your profile picture > Profile settings > copy "Your API key". Never use someone else's key: notes would post under their name |

---

## Step 1. Install the plugin

In Claude Code, type:

```
/plugin marketplace add Product14/pm-os
/plugin install pm-os@spyne-pm-os
```

In VS Code you can also type `/plugins`, open **Marketplaces**, add `Product14/pm-os`, then install **pm-os** from the **Plugins** tab.

Or just ask Claude: "add the plugin marketplace Product14/pm-os and install pm-os".

Then type `/reload-plugins` (or quit and reopen Claude Code).

**In the Claude app:**
1. Open the **Code** tab and start a **Local** session (not a cloud session: plugins only run locally). Any folder is fine for now.
2. Ask Claude in that session: "add the plugin marketplace Product14/pm-os and install pm-os for my user". Approve the commands when it asks. It uses your computer's GitHub sign-in, which the private repo needs.
3. Start a new session so the plugin loads. Typing `/pm-os` should now list the PM OS commands.
4. The app may show **"This plugin includes local MCP servers"** with a warning that installing grants access to everything on your computer. Click **Continue**. The server it names, **freshdesk**, is the plugin's own small program that reads Freshdesk tickets with your key (it can add a private note to a ticket only after you approve it). The app shows this warning for any plugin that runs a program on your computer. **Disable plugin** turns PM OS off.
5. You can see the plugin under **+** > **Plugins**, on the **Code** tab, as `spyne-pm-os`.

Do not use the app's **Add marketplace** button (the box with a **Sync** button) for this repo. It shows "Failed to add marketplace" because it cannot read a private GitHub repo.

## Step 2. Add your keys (never paste them in the chat)

1. Type `/plugin` (CLI) or `/plugins` (VS Code).
2. Choose **Installed**, then **pm-os**, then **Configure**.
3. Paste your **Freshdesk API key**. (ClickHouse needs no key: it comes from the Spyne Clickhouse connector.)
4. Save, then type `/reload-plugins`.

The keys are stored in your system credential store and only the plugin's own Freshdesk tool can read it.

The key field shows dots whether or not a key is saved, and keys stay on the computer where you entered them, so a new computer starts empty. `/pm-os:setup` tells you if the key is missing or belongs to someone else.

**In the Claude app:** click **+** next to the prompt box, then **Plugins** > **Manage plugins** > **pm-os**, and use its **Configure** option. Fill in the same fields, save, and start a new session.

If your app version shows no Configure option for pm-os, set the keys once from the Claude Code panel in VS Code (the steps above). The app uses the same keys, because they are saved for your computer, not per app. Never paste a key into the chat as a workaround.

## Step 3. Run setup

Type:

```
/pm-os:setup
```

Claude checks every tool, shows a pass/fail table, and fixes what it can with you:

- **A connector shows "not loaded":** connect it at claude.ai > Settings > Connectors, quit and reopen Claude Code, run `/pm-os:setup` again.
- **GitHub:** Claude installs the GitHub CLI if needed and shows you a one-time code. Open github.com/login/device and enter it.
- **The repo:** Claude clones `Product14/pm-os` to `~/pm-os`. That clone is where your work and the shared context live.
- **Freshdesk:** setup confirms the key is yours. If it belongs to someone else, it stops you.
- Finally it asks your area (for example vini-sales) and saves your profile to `~/.pm-os/profile.json` (no secrets in it).

Re-run `/pm-os:setup` any time something stops working.

**In the Claude app:** type `/pm-os:setup` in a Local session exactly as above.

## Step 4. Open the right folder every time

PM OS work is saved in the `pm-os` folder in your home folder (`~/pm-os`), which setup created.

- **Claude app:** when you start a session in the **Code** tab, choose the `pm-os` folder in the project folder picker next to the environment selector. Keep the session **Local**.
- **VS Code:** File > Open Folder > `pm-os` in your home folder, then open the Claude Code panel.
- **CLI:** start `claude` from that folder.
- **The first time,** Claude Code may ask whether to trust the folder. Say yes: the repo's safety hooks only run in a trusted folder (see "Working alongside other PMs").
- **The app may run each session in its own copy of the folder** (a git worktree, on its own branch). That is fine: PM OS saves your work on a branch and opens a pull request either way.

---

## Everyday use

| Type this | When | What you get |
|---|---|---|
| `/pm-os:triage` | You want to see what is waiting on product | One case file per Vini "Waiting on Product" ticket, a ranked snapshot, and a confirm/correct/park question per ticket |
| `/pm-os:prd <work folder>` | You want a PRD for a triaged ticket | Decision, one-pager, reviews, PRD, fit check. Example: `/pm-os:prd product/work/vini-sales/fd24140-stl-and-widget-configuration` |
| `/pm-os:prd <your idea in a sentence>` | You have an idea, not a ticket | Same flow, starting from an empty case that it fills with research |
| `/pm-os:prd-to-jira <work folder>` | A PRD was approved earlier and needs a Jira issue | The exact Jira payload; nothing is created until you pick "create" |
| `/pm-os:capture` | A session taught you something other PMs would hit (a data trap, a metric definition, a decision) | A candidate entry for the shared context |
| `/pm-os:status` | "Did my entry get in?", or how your PRD runs are going | Your contributions and their verdicts, PRD quality over time, persona freshness |
| `/pm-os:veto` | A shared entry is wrong or stale | The entry is withdrawn; no approval needed |
| `/pm-os:persona-refresh` | Once a week (not scheduled yet) | Updates the dealer personas from last week's Arali conversations |

### Working alongside other PMs

- The first time you open the `~/pm-os` folder in Claude Code, it asks whether to trust the folder and its hooks. Say yes: the repo's hooks turn on the safety check and stop anyone's Claude from committing to `main`, pushing to `main`, force-pushing or sweeping in stray files.
- Every folder has a `CLAUDE.md` that tells Claude what belongs there. You can ask in your own words ("write a PRD for this ticket"); Claude routes it to the right `/pm-os:` skill so the files come out the same as everyone else's.

- `/pm-os:triage` shows only tickets in your areas (set in `/pm-os:setup`). Ask for "the whole queue" to see everything.
- Every work folder records its owner (`pm:` in `case.md`). Triage skips tickets another PM owns or has an open PR for, and `/pm-os:prd` asks before working in someone else's folder.
- Your work is saved on your own branch and reaches the shared repo as a pull request. Claude asks before publishing, and never pushes to `main`.

### How a PRD run goes

You approve at every gate; nothing is decided for you.

1. **Gate 1 (in triage):** confirm the problem for each ticket, correct it, answer open questions, or park it.
2. **Decide:** an advocate and a skeptic argue, a CEO-persona judge picks: already possible, bug, build (generalised or as asked), defer or decline. If it is not a build, you get a gate to accept or override.
3. **One-pager:** drafted, reviewed by the GM, the relevant department persona(s), a backend engineer and the CEO, revised. **Gate 2:** approve, approve with changes, redirect or park.
4. **PRD:** drafted from the approved one-pager, reviewed, then a fit check compares it with only the customer's own words. **Gate 3:** approve and rate it 1 to 5 with one line of feedback. Your feedback becomes a lesson that later runs follow.
5. **Jira:** you see the exact issue first. Only "create" creates it.

Every claim in a PRD carries a source tag ([E3] evidence, `repo:path:line` code, [PM] your decision, [ASSUMPTION] a guess that becomes an open question). Thin evidence produces questions, never invented answers.

### Where your work lives

Everything is a file in `~/pm-os/product/work/<area>/<ticket-or-idea>/`: the case, evidence, questions, your decisions, every draft and review, the fit check and the Jira payload. A run can stop at any gate and pick up later.

### Keep your Claude usage low

PM OS runs many short subagents. To stay inside your plan limits:

- **One ticket per conversation.** After a gate, start a new conversation and type `/pm-os:prd <work folder>`. It resumes from where it stopped. Long conversations re-read their whole history on every turn.
- The plugin already picks the model per step (Sonnet for research and reviews, Opus only for drafting and the decision judge, Haiku for edits) and runs at most 3 subagents at a time.
- Optional, applies to all your Claude work: ask Claude to "set CLAUDE_CODE_SUBAGENT_MODEL to sonnet in my user settings", so subagents default to Sonnet instead of your main model.

---

## Updating

When a new version is announced, type `/plugin`, open **Marketplaces**, update `spyne-pm-os`, then update **pm-os** and type `/reload-plugins`. Or ask Claude to "update the pm-os plugin". The repo itself updates every time you start Claude Code.

**In the Claude app:** **+** > **Plugins** > **Manage plugins**, update the `spyne-pm-os` marketplace and then **pm-os**, or ask Claude to "update the pm-os plugin". Then start a new session.

## Contributing back

`/pm-os:capture`, `/pm-os:veto` and your PRD work are saved as a branch and a pull request on `Product14/pm-os`. You need write access for that. A GitHub Action merges PRs that only touch `queue/`, `proposals/` or `product/` and pass the safety check, within a minute or two. The reviewer then checks new context entries on `main`. It needs a repo secret (`CLAUDE_CODE_OAUTH_TOKEN` or `ANTHROPIC_API_KEY`); until the owner adds one, it skips with a notice and the owner runs `/pm-os:reviewer run` locally.

## When something goes wrong

| Symptom | Fix |
|---|---|
| `/pm-os:...` commands do not appear | Type `/reload-plugins`, or quit and reopen Claude Code. In the Claude app, start a new **Local** session: plugins do not run in cloud sessions |
| Typing `/plugin` in the Claude app says it "isn't available in this environment" | Ask Claude in a Local session to run the install (Step 1, In the Claude app) |
| The app's **Add marketplace** box says "Failed to add marketplace" | Expected for this private repo. Close it and ask Claude in a Local session to install instead (Step 1) |
| Adding the marketplace fails with "not found", "authentication" or "permission denied" | GitHub is not signed in on this computer, or you have no access yet. Ask Claude: "sign me in to GitHub", and check access with the owner in `OWNERS.md` |
| "Freshdesk API key is not set" | Step 2 above, then `/reload-plugins` |
| A ticket's description or later comments are missing | Make sure you are on pm-os 0.4.0 or later (Updating, above). Older versions read only the first 10 comments |
| Setup says a connector is "not loaded" | Connect it on claude.ai, then quit and reopen Claude Code. Connectors added mid-session do not load |
| "not found" when cloning the repo | You have no access to `Product14/pm-os` yet. Ask the owner in `OWNERS.md` (or Lakshay Narang or Devansh Hasija) |
| ClickHouse shows a missing database, or Spyne Clickhouse is not in your connectors | Ask the claude.ai org admin or data/eng. Everything else works without ClickHouse |
| You hit your usage limit | Start a new conversation per ticket (see "Keep your Claude usage low") |

## Rules the plugin enforces

- Read-only everywhere except: Jira (only after you pick "create"), and private Freshdesk notes (only when a skill asks and you approve). There is no tool for public replies to dealers.
- No customer PII in any file: dealer staff are named by role. Rooftop names appear only in case headers and triage snapshots.
- No Spyne commercials (revenue, pricing, contract values) anywhere.
- Justify work in dealer days removed and cost removed, never "sell more cars".

## Work in progress at handover (26 Oct 2026)

| Work folder | Where it stands | Next step |
|---|---|---|
| `vini-sales/fd24140-stl-and-widget-configuration` (Superior Auto: STL first text by lead type) | PRD final, all 4 reviewers approve, fit check "fits with gaps". Confluence: https://spyne.atlassian.net/wiki/spaces/SA/pages/1201471491/ | Gate 3 (approve, rate), then Jira |
| `vini-sales/fd24641-single-screen-conversation-ui` (Bob Johnson: "Unanswered" queue, sales and service) | PRD approved at Gate 3 with changes applied, restructured for readability. Confluence: https://spyne.atlassian.net/wiki/spaces/SA/pages/1201143809/ | PM rating, then Jira |
| `vini-service/fd22370-vin-details-on-outbound-calls` (Bill Wright Toyota) | Decided as a bug. Re-test plan for both agents and a Jira bug draft are ready (`retest-plan.md`, `jira.md`) | Run the re-test; approve the Jira bug |
| `vini-sales/fd23736-human-takeover-in-stl-and-chat` (Lucki Mazda) | Deferred: RETCONVAI-5165 already specs it. Proposed Jira change drafted: reassign to Ankit Singh, add to CI Sprint 13, post the decision comment | Agree a date with Ankit, then approve the Jira change |
| `platform/idea-live-agent-test` | Filed as RETCONVAI-5409 | Follow the Jira |
| `vini-sales/idea-sms-offer-recovery` | In the PRD stage | Resume with `/pm-os:prd` |

Not live yet: the weekly persona refresh is not scheduled, the reviewer Action waits for its secret, and PM OS has no named owner yet (Yash's sign-off checklist).
