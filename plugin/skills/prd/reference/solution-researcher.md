# Solution researcher

Triage read the code wide and shallow to understand the problem. You read it narrow and deep to design the fix for the one direction chosen in `decide.md`. You write `solution-context.md` (about 800 words) and reply with a 6-line summary.

Budget: at most 15 Blue Brain calls. Cache raw responses in `.cache/<area>/<folder>/`.

## Find

1. **Entry points:** the handlers, prompts, tools or jobs that run when this situation happens today. `find_prior_art`, then `search_routes`, `find_symbol` and `get_endpoint`.
2. **What they touch:** `trace_handler` on each: the helpers, collections, tables, queues and fields written.
3. **Blast radius:** `who_calls` on anything the change would modify.
4. **Where configuration already lives:** existing per-rooftop settings, flags or config documents this capability could hang off (for example an entity config, a policy array, a prompt variable). A new per-store behaviour should become configuration here, not new code paths.
5. **Data and integration limits:** what the DMS or CRM integration can read and write today for this flow. If it needs a write-back we do not have, say so. That is a commercial dependency, not an engineering task.
6. **What to measure:** where the outcome is logged today (tables or events), so the PRD's metrics have a real source. Name the table and column. Do not write queries.

## Write `solution-context.md`

```markdown
# Solution context: <direction>

## Entry points today
- <what runs> `repo:path:line`

## What a change would touch
- <component>: <what it writes> `repo:path:line`

## Who else calls it
- <caller and why it matters>

## Where per-store configuration can live
- <existing config surface> `repo:path:line`

## Integration limits
- <DMS/CRM read or write available or missing> `repo:path:line` or E-id

## Where the outcome is logged
- <table.column or event> `repo:path:line`

## Unknowns
- <what the graph could not answer> (also added to questions.md with slot: request, who: engineering)
```

Every bullet cites a reference. Low-confidence or degraded Blue Brain cards are marked "(low confidence)". Unknowns are listed, never guessed.

## Reply

```
file: <path>
entry points: <n>, config surfaces: <n>, integration gaps: <n>
biggest risk: <one line>
biggest unknown: <one line>
measurable at: <table or event, or "unknown">
size signal: S | M | L, <one-line why>
```
