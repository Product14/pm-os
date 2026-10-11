# **PM OS on Claude Code — Landscape & Reading List**

Oct 7, 2026 · @Yash

## **TL;DR**

The PM OS pattern has converged: almost every public build is a git repo of Markdown with a CLAUDE.md, a small context library, skills or slash commands, a few reviewer sub-agents, and MCP connectors. The architecture is not the hard part. The hard parts are keeping shared context fresh, stopping generic output, and making critique personas honest.

What Spyne is planning is the harder "Team OS" variant, not a personal OS. Aakash Gupta studied four builds (DoorDash, Pendo, Google, a solo builder) and found they [converged on the same architecture](https://www.news.aakashg.com/p/team-os-cc).

Read these five first:

1. [Anthropic knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) — the official product-management plugin. Best reference for structure: skills, commands, connectors in one package.  
2. [Team OS in Claude Code](https://www.news.aakashg.com/p/team-os-cc) — Aakash Gupta and Hannah Stulberg (DoorDash). Closest to what you are building.  
3. [Effective context engineering for AI agents](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents) — why less, better context beats more.  
4. [Teresa Torres on How I AI](https://www.lennysnewsletter.com/p/claude-code-for-product-managers) — the small-files context library pattern.  
5. [NN/g on synthetic users](https://www.nngroup.com/videos/ai-generated-users/) — read before building feedback personas.

## **Typical components**

Nine components show up across nearly every build. Most teams start with the first three and add the rest only when a real gap appears.

| Component | What it does | Where to see it done well |
| :---- | :---- | :---- |
| Root CLAUDE.md | Role, conventions, and pointers to context; loaded every session | [Aakash's pm-claude-code-setup](https://www.news.aakashg.com/p/carl-vellotti-3), [sevanpro PM OS](https://sevanpro.com/pm-os) |
| Context library | Small, indexed files: company, product, personas, competitors, goals, terminology, decisions log | [mySecond team setup guide](https://mysecond.ai/blog/claude-code-for-product-teams), [Teresa Torres](https://www.chatprd.ai/how-i-ai/teresa-torres-claude-code-obsdian-task-management) |
| Skills and slash commands | One per PM job: PRD, one-pager, interview synthesis, competitor scan, stakeholder update | [Anthropic PM plugin](https://github.com/anthropics/knowledge-work-plugins), [phuryn/pm-skills](https://www.productcompass.pm/p/pm-skills-2-red-team-ship) |
| Reviewer sub-agents | Critique drafts as eng lead, exec, customer, skeptic | [prd-critic](https://andrewtomin.substack.com/p/seven-claude-skills-for-product-managers), /red-team-prd in pm-skills |
| Connectors (MCP) | Pull tickets, call notes, docs, CRM, analytics into the session | Anthropic plugins ship an .mcp.json per plugin; [Dave Killeen](https://www.news.aakashg.com/p/dave-killeen-podcast) wires in Clari and Granola |
| Workflows | Chained steps, e.g. customer feedback to insights to PRD | [Ron Yang's course](https://maven.com/ron-yang/claude-code-os-product-managers), Anthropic [orchestrator-workers](https://www.anthropic.com/research/building-effective-agents) |
| Hooks and memory | Session-start hooks inject priorities and past mistakes; end-of-session prompts update context | [Dave Killeen](https://www.news.aakashg.com/p/dave-killeen-podcast), [Teresa Torres](https://www.lennysnewsletter.com/p/this-week-on-how-i-ai-claude-code) |
| Ingestion cadence | Input folders plus weekly rituals that keep context fed | [Ron Yang's course](https://maven.com/ron-yang/claude-code-os-product-managers) |
| Distribution | Shared repo with .claude/skills/, or an internal plugin marketplace | [Enterpret on sharing skills](https://www.enterpret.com/blog/how-to-share-claude-skills-across-your-product-team) |

The "driving PM agent" you described maps to an orchestrator that routes an input (ticket, call, roadmap item, CEO ask) to the right workflow. Few public builds have one; most rely on the PM picking the slash command.

## **Hard problems and how people handle them**

The failures people report are about context and judgment, not tooling. Personas and self-review are where most teams overestimate what they are getting.

| Problem | What goes wrong | How people handle it |
| :---- | :---- | :---- |
| Context bloat | Loading everything degrades recall and reasoning | Tiny focused files plus an index; load just in time; hand deep work to sub-agents with clean context ([Anthropic](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents), [Torres](https://www.teamday.ai/ai/teresa-torres-claude-code-product-managers)) |
| Generic output | PRDs with made-up metrics and "increased engagement" as success | Require evidence from context; skills that read the transcript, codebase and template before drafting ([sevanpro](https://sevanpro.com/pm-os), [cal.com PRD skill](https://designproject.io/blog/how-to-build-custom-claude-code-skills-and-why-your-team-needs-them/)) |
| Stale context | Context library drifts from reality within weeks | Input folders with weekly rituals; ask "what did you learn today that we should document?" at session end ([Torres](https://www.lennysnewsletter.com/p/this-week-on-how-i-ai-claude-code)) |
| Tribal knowledge | Decisions live in Slack threads and one PM's notes | Every function checks context into one repo; Hannah's team answered a 3-month-old question in 15 seconds ([Team OS](https://www.news.aakashg.com/p/team-os-cc)) |
| Persona sycophancy | Synthetic users praise every concept and agree with each other | Ground personas in real VoC data with citations; label synthetic output; use for pressure-testing, never validation ([NN/g](https://www.nngroup.com/videos/ai-generated-users/), [PersonaCite](https://arxiv.org/html/2601.22288v1)) |
| Self-review rubber-stamping | The drafter approves its own draft | Separate evaluator with an explicit rubric, capped loop; only works when criteria are clear ([Anthropic](https://www.anthropic.com/research/building-effective-agents)) |
| Over-engineered agents | Multi-agent setups burn tokens and break | Start with the simplest design; add agents only after a real weakness shows ([Anthropic](https://www.anthropic.com/research/building-effective-agents); Cognition's "Don't Build Multi-Agents" via [this list](https://vladg.bearblog.dev/the-best-articles-on-building-agents/)) |
| Personal vs team skills | Two PRD skills fight over which runs | Distinct names (pm-prd-format vs my-prd-style); personal layer on top of team library ([Enterpret](https://www.enterpret.com/blog/how-to-share-claude-skills-across-your-product-team)) |
| Mechanical vs judgment | LLM does work a script should do, unreliably | Deterministic logic in code, judgment in the LLM ([Dave Wascha](https://luma.com/7bbgk2ed)) |
| System bloat | Skills and context pile up unused | Periodic audit; Dave Killeen had Claude write "harsh truths" about his system ([episode](https://www.news.aakashg.com/p/dave-killeen-podcast)) |

Killeen, a CPO, still rates the outputs as strong first drafts. Plan for human sign-off on anything that ships.

## **Reading list: repos and plugins**

Clone the first two and read their structure before designing anything. The rest are skill libraries to mine for prompts and rubrics.

| Repo or kit | What it is | Why read it |
| :---- | :---- | :---- |
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | Official plugins incl. product-management (specs, roadmaps, research synthesis, competitive tracking) | Canonical layout: manifest, skills, commands, connectors. Anthropic calls them generic starting points to customize |
| [davekilleen/Dex](https://skillsllm.com/skill/davekilleen-dex) | Pendo CPO's open-source "AI chief of staff" | Best example of hooks and self-updating files |
| [phuryn/pm-skills](https://www.productcompass.pm/p/pm-skills-2-red-team-ship) | 68 skills, 9 plugins, free | Has /red-team-prd for adversarial review |
| [deanpeters/Product-Manager-Skills](https://github.com/deanpeters/Product-Manager-Skills) | 77 skills, 6 command workflows | Includes pm-skill-creator for writing new skills to a house standard |
| [euroconic/pm-claude-skills](https://andrewtomin.substack.com/p/seven-claude-skills-for-product-managers) | 7 skills incl. prd-builder and prd-critic | Small and readable; good builder-critic pair to copy |
| [vishalmdi/ai-native-pm-os](https://github.com/vishalmdi/ai-native-pm-os) | 11-module course run inside Claude Code | Useful as onboarding material for your team |
| [sevanpro PM OS](https://sevanpro.com/pm-os) | Free, 13 skills, 8 persona sub-agents | Clear before/after on generic vs grounded PRDs |
| carlvellotti/carls-product-os, aakashg/pm-claude-code-setup | Two personal OS repos ([linked here](https://www.news.aakashg.com/p/carl-vellotti-3)) | Folder layouts to compare |
| [Anthropic agent cookbook](https://scrapbox.io/nikkie-memos/Building%20Effective%20Agents%20Cookbook) | Notebooks for orchestrator-workers and evaluator-optimizer | Reference code for the driving-agent and critique loop |
| Paid: [AI PM OS](https://www.prodmgmt.world/ai-pm-os) (\$99), [mySecond kit](https://maven.com/ron-yang/claude-code-os-product-managers) | 231 skills / 12 review agents; 60+ skills / 6 reviewer agents | Scan the feature lists for scope ideas; no need to buy |

## **Reading list: write-ups, blogs, talks**

Grouped by format. Each line says what to take from it.

**Practitioner write-ups**

* [Team OS in Claude Code](https://www.news.aakashg.com/p/team-os-cc) — Aakash Gupta, Hannah Stulberg. Team-level architecture; the "what broke" section is paywalled.  
* [Claude Code for Product Teams](https://mysecond.ai/blog/claude-code-for-product-teams) — mySecond. Shared vs personal files, five-file context layout.  
* [How to share Claude skills across your product team](https://www.enterpret.com/blog/how-to-share-claude-skills-across-your-product-team) — Enterpret. Distribution and naming conventions.  
* [Claude Code for Product Managers](https://every.to/p/claude-code-for-product-managers) — Marcus Moretti, Every. One GM running research, planning and monitoring as skills.  
* [Build a PRD skill](https://designproject.io/blog/how-to-build-custom-claude-code-skills-and-why-your-team-needs-them/) — worked example that reads a transcript and the cal.com codebase before drafting.  
* [Seven Claude skills for PMs](https://andrewtomin.substack.com/p/seven-claude-skills-for-product-managers) — Andrew Tomin. Why seven skills, not seventy.

**Company and engineering blogs**

* [Building effective agents](https://www.anthropic.com/research/building-effective-agents) — Anthropic. Workflow vs agent; orchestrator-workers and evaluator-optimizer.  
* [Effective context engineering](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Anthropic. Just-in-time context, notes, sub-agents.  
* [Harness engineering](https://openai.com/index/harness-engineering/) — OpenAI. If a decision isn't discoverable to the agent, it effectively doesn't exist.  
* [Best articles on building agents](https://vladg.bearblog.dev/the-best-articles-on-building-agents/) — curated list incl. Cognition's case against multi-agent systems.

**Research on personas**

* [NN/g: Synthetic users](https://www.nngroup.com/videos/ai-generated-users/) — real studies rerun with AI participants; responses too shallow and too favorable.  
* [PersonaCite](https://arxiv.org/html/2601.22288v1) — personas grounded in VoC data with citations; treats validity as a design choice.  
* [Whose Personae?](https://neurips.cc/virtual/2025/122475) — review of 63 studies; includes a persona transparency checklist.

**Talks and podcasts**

* [Teresa Torres on How I AI](https://www.lennysnewsletter.com/p/claude-code-for-product-managers) — small-file context library, "lazy prompting".  
* [Hannah Stulberg on Product Growth](https://www.news.aakashg.com/p/how-to-build-a-team-os-in-claude) — live demo of DoorDash Team OS.  
* [Dave Killeen, Pendo](https://www.news.aakashg.com/p/dave-killeen-podcast) — hooks, connectors, PRD pipeline.  
* [Carl Vellotti](https://www.news.aakashg.com/p/carl-vellotti-3) — context management and self-checking skills.  
* [Hilary Gridley on How I AI](https://www.castfox.net/podcast/how-i-ai-7304222/episode/how-to-turn-claude-code-into-your-personal-life-operating-system-hilary-gridley-504498) — the "anti-system": learn preferences by observation, not upfront config.  
* Courses: [Ron Yang](https://maven.com/ron-yang/claude-code-os-product-managers), [Aman Khan](https://maven.com/aman-khan/claude-code-for-product-managers), [Hannah's Team OS workshop](https://maven.com/hannah-stulberg/how-to-build-your-teamos).

## **Implications for Spyne**

Since the team already uses Claude Code daily, skip onboarding material and spend the effort on shared context and grounded critique. That is where public builds are weakest.

A reasonable starting point, based on what has worked elsewhere:

1. Fork the Anthropic product-management plugin as the skeleton and ship it as an internal plugin or shared repo.  
2. Build the context library before any agents: product surfaces, dealer personas, terminology, decisions log, PRD template.  
3. Take one path end to end (ticket or call to one-pager to PRD) with one critic agent and a written rubric.  
4. Build feedback personas from real dealer calls and tickets, and make them cite the evidence behind each objection.

Open questions to settle before building:

* ☐ Where do tickets, call recordings, roadmap and analytics live, and which have MCP connectors today?  
* ☐ Who owns keeping shared context current, and on what cadence?  
* ☐ Does the "driving PM agent" route inputs automatically, or do PMs pick the workflow?  
* ☐ What does a good Spyne PRD look like? A few past PRDs could serve as the eval set.  
* ☐ What must never leave the repo (customer data, pricing) and how is that enforced?