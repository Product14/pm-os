#!/usr/bin/env node
// PreToolUse hook on the Skill tool. Appends {ts, skill} to ~/.pm-os/usage.jsonl
// so the weekly digest and quarterly audit can see which skills earn their keep.
// Logs the skill name only: never arguments, never conversation content.
import { appendFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

let raw = "";
process.stdin.on("data", c => (raw += c));
process.stdin.on("end", () => {
  try {
    const skill = JSON.parse(raw)?.tool_input?.skill;
    if (skill) {
      const dir = join(homedir(), ".pm-os");
      mkdirSync(dir, { recursive: true });
      appendFileSync(join(dir, "usage.jsonl"), JSON.stringify({ ts: new Date().toISOString(), skill }) + "\n");
    }
  } catch {}
  process.exit(0); // never block a skill
});
