#!/usr/bin/env node
// Repairs rejected candidates so a fixable reject never waits on a person.
// The reviewer parks fixable rejects in queue/repair/ with its reasons and fix
// hint. A separate repairer agent splits, re-sources or tightens them, and the
// results go back into queue/ for a fresh review. One attempt per lineage:
// repaired entries carry repair_attempts: 1, and a second reject drops them.
//
//   node scripts/repair.mjs [--concurrency 4]

import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync, appendFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, parseEntry, today } from "./lib.mjs";
import { scanText, validateEntry } from "./check.mjs";
import { claudeRun, pool } from "./claude-run.mjs";
import { setField } from "./review-context.mjs";

const argv = process.argv.slice(2);
const opt = (f, d) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : d);
const SCHEMA = JSON.parse(readFileSync(join(ROOT, "reviewer", "repair.schema.json"), "utf8"));
const SOURCE_ROOTS = (process.env.PM_OS_SOURCE_ROOTS || "").split(":").filter((d) => d && existsSync(d));
const dir = join(ROOT, "queue", "repair");
const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
if (!files.length) { console.log("nothing to repair"); process.exit(0); }

const results = await pool(files, Number(opt("--concurrency", 4)), async (f) => {
  const text = readFileSync(join(dir, f), "utf8");
  const meta = parseEntry(text).meta;
  const prompt = [
    `<rejected path="queue/repair/${f}">\n${text}\n</rejected>`,
    `Reviewer reasons: ${meta.reject_reasons}`,
    `Reviewer fix hint: ${meta.fix_hint}`,
    `Today is ${today()}.`,
    SOURCE_ROOTS.length ? `Mounted source directories: ${SOURCE_ROOTS.join(", ")}` : "No source directories are mounted.",
  ].join("\n\n");
  const r = await claudeRun({
    prompt, schema: SCHEMA, cwd: ROOT, addDirs: SOURCE_ROOTS,
    systemPromptFile: join(ROOT, "reviewer", "repairer.md"),
    tools: ["Read", "Grep", "Glob", "Bash"],
    allowedTools: ["Read", "Grep", "Glob", "Bash(git log:*)", "Bash(git show:*)", "Bash(ls:*)"],
  });
  const out = { file: f, id: meta.id, written: [], skipped: [], cost: r.cost };
  if (!r.ok) { out.error = r.error; return out; } // leave the file; the next run retries
  for (const md of r.json.structured_output.entries) {
    let t = md.trim() + "\n";
    const p = parseEntry(t);
    if (!p?.meta.id) { out.skipped.push("no frontmatter id"); continue; }
    t = setField(setField(setField(t, "status", "candidate"), "repair_attempts", "1"), "repaired_from", meta.id);
    const path = `queue/${p.meta.id}.md`;
    const bad = [...validateEntry(parseEntry(t), "queue", path), ...scanText(t, path)].filter((x) => x.level === "error");
    if (bad.length || existsSync(join(ROOT, path))) { out.skipped.push(`${p.meta.id}: ${bad[0]?.msg || "id already queued"}`); continue; }
    writeFileSync(join(ROOT, path), t);
    out.written.push(p.meta.id);
  }
  out.dropped = r.json.structured_output.dropped_reason;
  unlinkSync(join(dir, f));
  return out;
});

mkdirSync(join(ROOT, "review-log"), { recursive: true });
const cost = results.reduce((s, r) => s + (r.cost || 0), 0);
const lines = results.map((r) => `| \`${r.id}\` | ${r.error ? `error, will retry: ${r.error.slice(0, 80)}` : r.written.map((w) => `\`${w}\``).join(", ") || "none"} | ${(r.dropped || "").replace(/\|/g, "/").replace(/\n/g, " ")} ${r.skipped.length ? `Skipped: ${r.skipped.join("; ").replace(/\|/g, "/")}` : ""} |`);
appendFileSync(join(ROOT, "review-log", `${today()}.md`), `## Repair at ${new Date().toISOString().slice(11, 16)} UTC\n\n| Rejected entry | Rewritten as | Dropped or skipped |\n|---|---|---|\n${lines.join("\n")}\n\nRepair cost: $${cost.toFixed(2)}\n\n`);
for (const r of results) console.log(`${r.id}: ${r.error ? "ERROR " + r.error : `${r.written.length} written${r.dropped ? `; dropped: ${r.dropped.slice(0, 100)}` : ""}`}`);
console.log(`repair cost $${cost.toFixed(2)}`);
