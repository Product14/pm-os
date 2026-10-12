#!/usr/bin/env node
// The PM OS skill reviewer. A proposed skill change merges only if it passes a
// deterministic safety gate and beats the current version on that skill's eval
// cases, judged blind by a separate Claude. No human approval step.
//
//   node scripts/review-skills.mjs [--dry-run] [--commit] [--push] [--only proposals/skills/<skill>/<slug>]
//
// A proposal is a folder: proposals/skills/<skill>/<slug>/SKILL.md (the full
// proposed file) plus an optional WHY.md. A brand-new skill must beat plain
// Claude with no skill loaded.

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync, cpSync, appendFileSync, mkdtempSync } from "node:fs";
import { join, basename } from "node:path";
import { tmpdir } from "node:os";
import { execSync } from "node:child_process";
import { ROOT, parseEntry, today, ageDays } from "./lib.mjs";
import { scanText } from "./check.mjs";
import { claudeRun, pool } from "./claude-run.mjs";

const HOLD_DAYS = 14;
const argv = process.argv.slice(2);
const flag = (f) => argv.includes(f);
const opt = (f, d) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : d);
const JUDGE_SCHEMA = JSON.parse(readFileSync(join(ROOT, "reviewer", "skill-judge.schema.json"), "utf8"));
const NO_TOOLS = ["Bash", "Write", "Edit", "NotebookEdit", "WebFetch", "WebSearch", "Agent", "Skill", "Read", "Grep", "Glob"];

// ---------- safety gate (deterministic) ----------
const ADDED_RISK = [
  [/mcp__\w+__\w*(send|create|update|delete|post|reply|share|trash|label|schedule|upload|move|copy)\w*/i, "adds a write-capable connector tool"],
  [/\b(git push|--no-verify|curl|wget)\b/i, "adds a push, hook bypass or raw network call"],
  [/https?:\/\/(?!claude\.ai\/settings)/i, "adds an external URL"],
  [/\b(auto-?send|without (asking|approval|review|confirmation)|skip (the )?(approval|review))\b/i, "removes a human step"],
  [/\b(send|post|publish|reply)\b.{0,40}\b(slack|email|gmail|freshdesk|dealer|customer|channel)\b/i, "adds an outbound send"],
];
const REMOVED_GUARD = /\b(approv\w*|never|must not|do not|don't|draft|pm-os-allow|commercials|PII|credential)\b/i;

export function safetyGate(base, cand) {
  const bl = new Set(base.split("\n").map((l) => l.trim()).filter(Boolean));
  const cl = new Set(cand.split("\n").map((l) => l.trim()).filter(Boolean));
  const added = [...cl].filter((l) => !bl.has(l));
  const removed = [...bl].filter((l) => !cl.has(l));
  const hits = [];
  for (const l of added) for (const [re, why] of ADDED_RISK) if (re.test(l)) hits.push(`${why}: "${l.slice(0, 80)}"`);
  for (const l of removed) if (REMOVED_GUARD.test(l)) hits.push(`removes a guard line: "${l.slice(0, 80)}"`);
  for (const f of scanText(cand, "plugin/skills/x/SKILL.md")) if (f.level === "error") hits.push(f.msg);
  return hits;
}

// ---------- eval cases ----------
function cases(skill) {
  const dir = join(ROOT, "evals", skill, "cases");
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const raw = readFileSync(join(dir, f), "utf8");
    const sec = (n) => (raw.match(new RegExp(`## ${n}\\n\\n([\\s\\S]*?)(?=\\n## |$)`)) || [])[1]?.trim();
    return { name: f.replace(/\.md$/, ""), input: sec("input"), rubric: sec("rubric") };
  }).filter((c) => c.input && c.rubric);
}

async function runSkill(skillText, input) {
  let sysFile;
  if (skillText) {
    const d = mkdtempSync(join(tmpdir(), "pmos-skill-"));
    sysFile = join(d, "skill.md");
    writeFileSync(sysFile, `Follow this skill for the user's request. You have no tools; everything you need is in the request.\n\n${skillText}`);
  }
  const r = await claudeRun({ prompt: input, systemPromptFile: sysFile, cwd: tmpdir(), disallowedTools: NO_TOOLS, budgetUsd: 1 });
  return { text: r.ok ? r.json.result : `(run failed: ${r.error})`, cost: r.cost };
}

async function judge(c, baseOut, candOut) {
  const flip = Math.random() < 0.5;
  const [A, B] = flip ? [candOut, baseOut] : [baseOut, candOut];
  const prompt = `## Case input\n\n${c.input}\n\n## Rubric (score each line in order)\n\n${c.rubric}\n\n## Output A\n\n${A}\n\n## Output B\n\n${B}`;
  const r = await claudeRun({ prompt, systemPromptFile: join(ROOT, "reviewer", "skill-judge.md"), schema: JUDGE_SCHEMA, cwd: tmpdir(), disallowedTools: NO_TOOLS, budgetUsd: 1 });
  if (!r.ok) return { error: r.error, cost: r.cost };
  const j = r.json.structured_output;
  const [cand, base] = flip ? [j.A, j.B] : [j.B, j.A];
  return { cand, base, cost: r.cost };
}

// ---------- decision (deterministic) ----------
export function decide({ isNew, results, baseLen, candLen }) {
  const deltas = results.map((r) => r.cand.overall - r.base.overall);
  const mean = (a) => a.reduce((s, x) => s + x, 0) / a.length;
  const d = mean(deltas);
  const candMean = mean(results.map((r) => r.cand.overall));
  const growth = baseLen ? (candLen - baseLen) / baseLen : 0;
  const summary = `mean delta ${d.toFixed(2)}, candidate mean ${candMean.toFixed(2)}, size ${growth >= 0 ? "+" : ""}${(growth * 100).toFixed(0)}%`;
  if (isNew) {
    if (d >= 0.5 && candMean >= 3.5) return { action: "merge", why: `new skill beats plain Claude: ${summary}` };
    return { action: "reject", why: `new skill does not clearly beat plain Claude: ${summary}` };
  }
  const worst = Math.min(...deltas);
  if (worst < -0.5) return { action: "reject", why: `regresses a case by ${worst.toFixed(2)}: ${summary}` };
  if (growth > 0.25 && d < 0.5) return { action: "reject", why: `grows the skill over 25% without a 0.5 gain: ${summary}` };
  if (d >= 0.25) return { action: "merge", why: `improves: ${summary}` };
  if (d >= -0.1 && growth <= -0.1) return { action: "merge", why: `same quality, shorter: ${summary}` };
  return { action: "reject", why: `no meaningful improvement: ${summary}` };
}

// ---------- review one proposal ----------
async function review(propDir) {
  const skill = basename(join(propDir, ".."));
  const candText = readFileSync(join(ROOT, propDir, "SKILL.md"), "utf8");
  const basePath = join(ROOT, "plugin", "skills", skill, "SKILL.md");
  const isNew = !existsSync(basePath);
  const baseText = isNew ? "" : readFileSync(basePath, "utf8");
  const held = existsSync(join(ROOT, propDir, "HOLD.md"));

  const hits = safetyGate(baseText, candText);
  if (hits.length) {
    if (held) {
      const since = parseEntry(readFileSync(join(ROOT, propDir, "HOLD.md"), "utf8"))?.meta.held_since;
      if (ageDays(since) >= HOLD_DAYS) return { propDir, skill, action: "reject", why: `safety hold expired after ${HOLD_DAYS} days: ${hits[0]}`, cost: 0 };
    }
    return { propDir, skill, action: "hold", why: `safety gate: ${hits.join("; ")}`, cost: 0 };
  }
  const cs = cases(skill);
  if (cs.length < 3) return { propDir, skill, action: "reject", why: `skill has ${cs.length} eval case(s); add at least 3 in evals/${skill}/cases before it can change automatically`, cost: 0 };

  let cost = 0;
  const results = await pool(cs, 3, async (c) => {
    const [b, k] = await Promise.all([runSkill(isNew ? null : baseText, c.input), runSkill(candText, c.input)]);
    const j = await judge(c, b.text, k.text);
    cost += b.cost + k.cost + (j.cost || 0);
    return { case: c.name, ...j };
  });
  const bad = results.filter((r) => r.error);
  if (bad.length) return { propDir, skill, action: "hold", why: `judge failed on ${bad.map((r) => r.case).join(", ")}`, results, cost };
  const d = decide({ isNew, results, baseLen: baseText.length, candLen: candText.length });
  return { propDir, skill, isNew, ...d, results, cost };
}

// ---------- apply ----------
function bumpPatch() {
  const p = join(ROOT, "plugin", ".claude-plugin", "plugin.json");
  const j = JSON.parse(readFileSync(p, "utf8"));
  const [a, b, c] = j.version.split(".").map(Number);
  j.version = `${a}.${b}.${c + 1}`;
  writeFileSync(p, JSON.stringify(j, null, 2) + "\n");
  return j.version;
}

function apply(r) {
  const src = join(ROOT, r.propDir);
  if (r.action === "reject") { rmSync(src, { recursive: true, force: true }); return; }
  if (r.action === "hold") {
    const p = join(src, "HOLD.md");
    const since = existsSync(p) ? parseEntry(readFileSync(p, "utf8"))?.meta.held_since : today();
    writeFileSync(p, `---\nheld_since: ${since}\n---\n\n${r.why}\n\nThis proposal is rejected automatically if still held after ${HOLD_DAYS} days. Split the risky part into its own proposal.\n`);
    return;
  }
  const dest = join(ROOT, "plugin", "skills", r.skill);
  mkdirSync(dest, { recursive: true });
  for (const f of readdirSync(src)) if (!["WHY.md", "HOLD.md"].includes(f)) cpSync(join(src, f), join(dest, f), { recursive: true });
  const version = bumpPatch();
  const why = existsSync(join(src, "WHY.md")) ? readFileSync(join(src, "WHY.md"), "utf8").trim().split("\n")[0] : basename(src);
  appendFileSync(join(ROOT, "CHANGELOG.md"), `- ${today()} v${version} \`${r.skill}\`: ${why} (${r.why})\n`);
  const reg = JSON.parse(readFileSync(join(ROOT, "registry.json"), "utf8"));
  const entry = reg.skills.find((s) => s.name === r.skill);
  if (entry) { entry.status = entry.status === "planned" ? "candidate" : entry.status; entry.last_change = today(); }
  else reg.skills.push({ name: r.skill, status: "candidate", owner: "unassigned", track: "community", path: `plugin/skills/${r.skill}`, does: why, last_change: today() });
  writeFileSync(join(ROOT, "registry.json"), JSON.stringify(reg, null, 2) + "\n");
  rmSync(src, { recursive: true, force: true });
}

function log(results, cost) {
  mkdirSync(join(ROOT, "review-log"), { recursive: true });
  const p = join(ROOT, "review-log", `skills-${today()}.md`);
  const head = existsSync(p) ? "" : `# Skill reviewer log ${today()}\n\n`;
  const rows = results.map((r) => {
    const per = (r.results || []).map((x) => `${x.case} ${x.base?.overall ?? "?"}->${x.cand?.overall ?? "?"}`).join(", ");
    return `| \`${r.propDir}\` | ${r.action} | ${r.why.replace(/\|/g, "/")} | ${per || "-"} |`;
  });
  appendFileSync(p, `${head}## Run at ${new Date().toISOString().slice(11, 16)} UTC\n\n| Proposal | Applied | Why | Per case (current -> proposed) |\n|---|---|---|---|\n${rows.join("\n")}\n\nCost: $${cost.toFixed(2)}\n\n`);
}

// ---------- main ----------
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const base = join(ROOT, "proposals", "skills");
  const only = opt("--only");
  const props = only ? [only] : existsSync(base)
    ? readdirSync(base).flatMap((s) => readdirSync(join(base, s)).filter((p) => existsSync(join(base, s, p, "SKILL.md"))).map((p) => `proposals/skills/${s}/${p}`))
    : [];
  if (!props.length) { console.log("no skill proposals"); process.exit(0); }
  const results = [];
  for (const p of props) { // sequential: two proposals to one skill must not both merge against a stale baseline
    const r = await review(p);
    console.log(`${r.action.padEnd(6)} ${p}  (${r.why})`);
    for (const x of r.results || []) console.log(`        ${x.case}: current ${x.base?.overall} -> proposed ${x.cand?.overall}`);
    if (!flag("--dry-run")) apply(r);
    results.push(r);
  }
  const cost = results.reduce((s, r) => s + (r.cost || 0), 0);
  console.log(`cost $${cost.toFixed(2)}`);
  if (flag("--dry-run")) process.exit(0);
  log(results, cost);
  try { execSync("node scripts/check.mjs", { cwd: ROOT, stdio: "inherit" }); }
  catch { console.error("check failed after applying; nothing committed"); process.exit(1); }
  if (flag("--commit")) {
    execSync("git add -A proposals plugin registry.json CHANGELOG.md review-log", { cwd: ROOT });
    const t = results.reduce((a, r) => ((a[r.action] = (a[r.action] || 0) + 1), a), {});
    execSync(`git -c user.name="pm-os-reviewer" -c user.email="pm-os-reviewer@spyne.ai" commit -q -m ${JSON.stringify(`pm-os skill reviewer: ${t.merge || 0} merged, ${t.hold || 0} held, ${t.reject || 0} rejected`)}`, { cwd: ROOT, stdio: "inherit" });
    if (flag("--push")) execSync("git push -q", { cwd: ROOT, stdio: "inherit" });
  }
}
