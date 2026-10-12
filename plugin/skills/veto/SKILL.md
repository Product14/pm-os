---
name: veto
description: Overturn a PM OS context entry that is wrong, out of date or should never have merged. Use when the PM says an entry, a data trap, a metric definition or a fact in the PM OS is wrong, stale or misleading, or asks to remove or veto one. Any PM can veto; no approval is needed.
---

# Veto a context entry

The reviewer agent merges entries without a human step. A veto is how any PM overturns a wrong one afterwards. The entry is kept for history but marked deprecated, it leaves the index every session reads, and the reviewer learns from the veto.

1. **Find the entry.** Read `context/INDEX.md` in the repo (`repo_path` from `~/.pm-os/profile.json`). Match what the PM described. If more than one entry could be meant, ask with AskUserQuestion, showing each candidate's Rule line.
2. **Confirm.** Show the PM the entry's Rule and Why, and ask with AskUserQuestion: "Veto this entry?", with options to veto or cancel.
3. **Get the reason.** One or two sentences on what is wrong. If the PM knows what is right instead, suggest `/pm-os:capture` for the corrected entry after the veto.
4. **File it.** Write `queue/vetoes/<entry-id>.md`:

```markdown
---
veto_of: <entry-id>
by: <PM's Spyne username from the profile>
reason: <one line>
---
```

5. **Publish it** by following `../../reference/contribute.md`, with the branch `veto/<entry-id>`.
6. **Tell the PM** in two lines: what will be removed, and when (as soon as the reviewer next runs, within minutes once the repo is live).
