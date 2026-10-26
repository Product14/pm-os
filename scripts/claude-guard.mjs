#!/usr/bin/env node
// PreToolUse guard for anyone running Claude Code in this repo (wired in .claude/settings.json).
// Blocks git moves that break the shared flow, whatever plugin or habits the PM has.
// Exit 2 blocks the tool call and shows the message to Claude.
import { execSync } from "node:child_process";

let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  let cmd = "";
  try { cmd = JSON.parse(input).tool_input?.command || ""; } catch { process.exit(0); }
  const branch = (() => { try { return execSync("git rev-parse --abbrev-ref HEAD", { cwd: process.env.CLAUDE_PROJECT_DIR || process.cwd(), encoding: "utf8" }).trim(); } catch { return ""; } })();
  const parts = cmd.split(/&&|\|\||;|\n/).map((s) => s.trim());
  const why = [];
  for (const p of parts) {
    if (!/^git\b/.test(p) && !/\bgit\s/.test(p)) continue;
    if (/\bgit\s+add\b.*(\s-A\b|\s--all\b|\s\.(\s|$)|\s\*(\s|$))/.test(p)) why.push("Stage files by path (the work folder, the queue file), never `git add -A` or `git add .`.");
    if (/\bgit\s+commit\b.*(\s--no-verify\b|\s-n\b)/.test(p)) why.push("Never skip the safety check (`--no-verify`). Fix what `node scripts/check.mjs` reports.");
    if (/\bgit\s+commit\b/.test(p) && branch === "main") why.push("You are on `main`. Create a branch first (`prd/<folder>`, `triage/<date>-<you>`, `capture/<id>`); see plugin/reference/contribute.md.");
    if (/\bgit\s+push\b.*(\s--force\b|\s-f\b|\s--force-with-lease\b)/.test(p)) why.push("Never force-push.");
    if (/\bgit\s+push\b.*(\s|:)main(\s|$)/.test(p) || (/\bgit\s+push\b/.test(p) && branch === "main")) why.push("Never push to `main`. Push your branch and open a PR (plugin/reference/contribute.md).");
  }
  if (why.length) { process.stderr.write("PM OS repo guard blocked this:\n- " + [...new Set(why)].join("\n- ") + "\n"); process.exit(2); }
  process.exit(0);
});
