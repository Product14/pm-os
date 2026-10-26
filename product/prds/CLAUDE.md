# product/prds/: approved PRDs only

`/pm-os:prd` copies a PRD here at Gate 3, after the PM approves it: `product/prds/<area>/<feature>-prd.md`, where `<feature>` is the `feature:` slug in the case.

- Never write or edit a PRD here directly. Change it in its work folder (`product/work/<area>/<folder>/prd/final.md`) through `/pm-os:prd`, get it re-approved, and the skill copies it again.
- One file per feature. A later PRD for the same feature replaces it; the history is in git and the work folder.
