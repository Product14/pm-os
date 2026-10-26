# evals/: eval cases for skills and the reviewer

`<skill>/cases/*.md` each have `## input` (all data inline: evals run with no tools) and `## rubric` (one checkable line per point). Cases may plant fake PII on purpose to test scrubbing; never use real customer data. A PRD rated 4 or more at Gate 3 can become a case once de-identified. `reviewer/last-run.md` is written by the reviewer eval; do not edit it.
