#!/usr/bin/env node
// SessionStart hook for anyone running Claude Code in this repo (wired in .claude/settings.json).
// Turns on the pre-commit safety check and tells Claude what state the PM is in. Keep output short.
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const sh = (c) => { try { return execSync(c, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return ""; } };
if (sh("git config core.hooksPath") !== ".githooks") sh("git config core.hooksPath .githooks");
const branch = sh("git rev-parse --abbrev-ref HEAD");
const lines = ["PM OS repo. Follow CLAUDE.md here and in each folder you touch. Do PM OS work through the /pm-os:* skills, whatever words the PM uses."];
const profile = join(homedir(), ".pm-os", "profile.json");
if (!existsSync(profile)) lines.push("This PM has no PM OS profile: before any PM OS work, tell them to install the plugin (QUICKSTART.md) and run /pm-os:setup.");
else { try { const p = JSON.parse(readFileSync(profile, "utf8")); lines.push(`PM: ${p.email || p.name || "unknown"}; areas: ${(p.areas || []).join(", ") || "none set"}.`); } catch {} }
if (branch === "main") lines.push("On main: never commit here; create a branch before writing.");
else if (branch) lines.push(`On branch ${branch}.`);
console.log(lines.join(" "));
