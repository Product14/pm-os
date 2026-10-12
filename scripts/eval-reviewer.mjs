#!/usr/bin/env node
// Evaluates the context reviewer against planted cases in evals/reviewer/cases.
// Each case states the outcomes it allows. The reviewer may not auto-merge
// anything until every case passes, and a false merge is always a failure.
//
//   node scripts/eval-reviewer.mjs [--only <case-name>] [--concurrency 4]

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, parseEntry, today } from "./lib.mjs";
import { review } from "./review-context.mjs";
import { pool } from "./claude-run.mjs";

const argv = process.argv.slice(2);
const opt = (f, d) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : d);
const dir = join(ROOT, "evals", "reviewer", "cases");
const only = opt("--only");

const cases = readdirSync(dir).filter((f) => f.endsWith(".md") && (!only || f === `${only}.md`)).map((f) => {
  const raw = readFileSync(join(dir, f), "utf8");
  const meta = parseEntry(raw).meta;
  const block = (name) => (raw.match(new RegExp(`## ${name}\\n\\n\`\`\`md\\n([\\s\\S]*?)\`\`\``)) || [])[1];
  const candidate = block("candidate");
  const neighbor = block("neighbor");
  return {
    name: f.replace(/\.md$/, ""),
    expect: meta.expect.split(",").map((s) => s.trim()),
    why: meta.why,
    candidate,
    neighbors: neighbor ? [{ path: `context/${parseEntry(neighbor).meta.kind}/fixture.md`, text: neighbor }] : [],
  };
});

console.log(`evaluating reviewer on ${cases.length} case(s)`);
const results = await pool(cases, Number(opt("--concurrency", 4)), async (c) => {
  const id = parseEntry(c.candidate).meta.id;
  const r = await review(`queue/${id}.md`, { text: c.candidate, neighbors: c.neighbors, index: "(eval run: no other context)", sourceRoots: [] });
  const pass = c.expect.includes(r.applied.action);
  const falseMerge = r.applied.action === "merge" && !c.expect.includes("merge");
  console.log(`${pass ? "PASS" : "FAIL"} ${c.name.padEnd(24)} got ${r.applied.action.padEnd(6)} want ${c.expect.join("|")}  (${r.applied.why})`);
  return { ...c, got: r.applied.action, applied: r.applied, verdict: r.verdict, pass, falseMerge, cost: r.cost };
});

const passed = results.filter((r) => r.pass).length;
const falseMerges = results.filter((r) => r.falseMerge);
const cost = results.reduce((s, r) => s + (r.cost || 0), 0);
const rubric = (readFileSync(join(ROOT, "reviewer", "RUBRIC.md"), "utf8").match(/rubric_version:\s*(\d+)/) || [])[1];

const md = [
  `# Reviewer eval, rubric v${rubric}, ${today()}`,
  "",
  `${passed}/${results.length} passed. False merges: ${falseMerges.length}. Cost $${cost.toFixed(2)}.`,
  "",
  "| Case | Want | Got | Pass | Reviewer said |",
  "|---|---|---|---|---|",
  ...results.map((r) => `| ${r.name} | ${r.expect.join(" or ")} | ${r.got} | ${r.pass ? "yes" : "NO"} | ${[r.applied.why, ...(r.verdict?.reasons || [])].join("; ").replace(/\|/g, "/").replace(/\n/g, " ")} |`),
  "",
].join("\n");
if (!only) writeFileSync(join(ROOT, "evals", "reviewer", "last-run.md"), md);
console.log(`\n${passed}/${results.length} passed, ${falseMerges.length} false merge(s), cost $${cost.toFixed(2)}`);
process.exit(passed === results.length ? 0 : 1);
