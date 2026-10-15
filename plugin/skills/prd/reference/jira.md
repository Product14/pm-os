# Jira step (the PM approves; nothing is automatic)

This is the only step in the PM OS PRD flow that writes to another system. It creates exactly one issue, and only after the PM picks "create".

## 1. Know where it goes

Read `pm-os.config.json` > `jira`. If `project_key` is null, or the PM wants a different project for this one:
1. `getAccessibleAtlassianResources` for the `cloudId` (the site is spyne.atlassian.net).
2. `getVisibleJiraProjects` and show the PM the likely projects for this area with AskUserQuestion.
3. `getJiraProjectIssueTypesMetadata` for the chosen project. Pick Story for a PRD and Bug for a bug outcome, unless the PM says otherwise. Note any required fields.
4. Ask the PM with AskUserQuestion whether to save the choice as the default for this area. If yes, write `jira.areas.<area>` in `pm-os.config.json` and commit it on its own.

## 2. Build the payload

From `prd/final.md` section 12 (or the bug summary in `decide.md`):
- **summary:** under 100 characters, dealer language
- **description (markdown):** the problem in 2 lines, what changes, the acceptance criteria as a checklist, and links: the PRD path in the pm-os repo, the Freshdesk ticket number. No customer names, phones or emails. The rooftop is named only if the PM asks.
- **labels:** `pm-os`, the area, the feature slug
- any required fields from step 1.3

Write the exact payload to `jira.md` under `## Proposed`.

## 3. Ask

AskUserQuestion, with the summary and the first lines of the description in the question and the full payload in the option preview:
- **Create:** create it exactly as shown
- **Edit first:** the PM says what to change; update `jira.md` and ask again
- **Skip:** create nothing

On **Skip**: write `skipped <date>` in `jira.md` and finish the step.

## 4. Create (only on "Create")

Call `createJiraIssue` with `cloudId`, `projectKey`, `issueTypeName`, `summary`, `description` (`contentFormat: markdown`) and the labels and required fields in `additional_fields`. Then:
- write the returned key and URL to `jira.md` under `## Created`
- set `jira: <KEY>` in `case.md` frontmatter and run `node scripts/index.mjs`
- record the key in `run.json`

If the call fails, show the PM the error in one line and stop. Do not retry with a changed payload unless the PM approves the change.

## Standalone

`/pm-os:prd-to-jira <work folder>` runs this file on its own for a PRD approved earlier. It refuses if `case.md` is not `stage: approved` or the outcome is not a build or a bug.
