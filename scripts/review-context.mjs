#!/usr/bin/env node
// The PM OS context reviewer. Reviews every candidate in queue/ with a
// separate Claude reviewer against reviewer/RUBRIC.md, then applies a fixed,
// deterministic policy: auto-merge, hold, or reject. No human approval step.
// Humans keep a veto after the fact (scripts/veto.mjs).
//
//   node scripts/review-context.mjs [--dry-run] [--commit] [--push] [--only queue/<file>.md] [--concurrency 4]
//
// Source verification: the reviewer may read directories listed in
// PM_OS_SOURCE_ROOTS (colon-separated). Without them, file-cited sources are
// "unverifiable" and the policy holds anything that is not low risk.

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync, readdirSync, appendFileSync } from "node:fs";
import { join, basename } from "node:path";
import { execSync } from "node:child_process";
import { ROOT, KINDS, parseEntry, entries, today, ageDays } from "./lib.mjs";
import { renderIndex } from "./index.mjs";
import { scanText, validateEntry } from "./check.mjs";
import { claudeRun, pool } from "./claude-run.mjs";

const HOLD_DAYS = 14;
const argv = process.argv.slice(2);
const flag = (f) => argv.includes(f);
const opt = (f, d) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : d);

const RUBRIC = readFileSync(join(ROOT, "reviewer", "RUBRIC.md"), "utf8");
const RUBRIC_VERSION = (RUBRIC.match(/rubric_version:\s*(\d+)/) || [])[1] || "?";
const SCHEMA = JSON.parse(readFileSync(join(ROOT, "reviewer", "context-verdict.schema.json"), "utf8"));
const SOURCE_ROOTS = (process.env.PM_OS_SOURCE_ROOTS || "").split(":").filter((d) => d && existsSync(d));

// The reviewer may merge only if the current rubric has a clean eval on record:
// every case passed and no false merges. Otherwise it runs hold-only.
export function certified() {
  const p = join(ROOT, "evals", "reviewer", "last-run.md");
  if (!existsSync(p)) return { ok: false, why: "no reviewer eval on record" };
  const t = readFileSync(p, "utf8");
  const v = (t.match(/rubric v(\d+)/) || [])[1];
  const m = t.match(/(\d+)\/(\d+) passed\. False merges: (\d+)/);
  if (v !== RUBRIC_VERSION) return { ok: false, why: `last eval was rubric v${v}, current is v${RUBRIC_VERSION}` };
  if (!m || m[1] !== m[2] || m[3] !== "0") return { ok: false, why: "last reviewer eval did not fully pass" };
  return { ok: true };
}

// ---------- frontmatter helpers ----------
export function setField(text, key, value) {
  const re = new RegExp(`^${key}:.*$`, "m");
  const [, fm, body] = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const nextFm = re.test(fm) ? fm.replace(re, `${key}: ${value}`) : `${fm}\n${key}: ${value}`;
  return `---\n${nextFm}\n---\n${body}`;
}
const replaceBody = (text, body) => text.replace(/^(---\n[\s\S]*?\n---\n?)[\s\S]*$/, `$1\n${body.trim()}\n`);

function owners() {
  const map = {};
  const md = readFileSync(join(ROOT, "OWNERS.md"), "utf8");
  for (const m of md.matchAll(/^\|\s*([a-z-]+)\s*\|\s*([^|]+?)\s*\|$/gm)) if (m[2] !== "TODO" && m[1] !== "Area") map[m[1]] = m[2];
  return map;
}

// ---------- candidates ----------
function candidates() {
  const only = opt("--only");
  if (only) return [only];
  const top = readdirSync(join(ROOT, "queue")).filter((f) => f.endsWith(".md")).map((f) => `queue/${f}`);
  const heldDir = join(ROOT, "queue", "held");
  const expired = existsSync(heldDir)
    ? readdirSync(heldDir).filter((f) => f.endsWith(".md")).map((f) => `queue/held/${f}`).filter((p) => {
        const m = parseEntry(readFileSync(join(ROOT, p), "utf8"))?.meta || {};
        return ageDays(m.held_since) >= HOLD_DAYS;
      })
    : [];
  return [...top, ...expired];
}

// ---------- neighbors: deterministic overlap on identifiers ----------
const idents = (t) => new Set([...t.matchAll(/`([^`\s]{4,})`/g)].map((m) => m[1].toLowerCase()));
function neighbors(path, text) {
  const mine = idents(text);
  const pool_ = [...entries("context").filter((e) => e.parsed?.meta.status === "stable"), ...entries("queue").filter((e) => e.path !== path)];
  return pool_
    .map((e) => ({ e, overlap: [...idents(e.text)].filter((x) => mine.has(x)).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 6)
    .map((x) => x.e);
}

function vetoes() {
  const p = join(ROOT, "reviewer", "vetoes.md");
  return existsSync(p) ? readFileSync(p, "utf8").split("\n").filter((l) => l.startsWith("- ")).slice(-20).join("\n") : "";
}

// ---------- policy: the only place a merge is decided ----------
export function policy(v) {
  const failed = Object.entries(v.tests || {}).filter(([, ok]) => !ok).map(([k]) => k);
  if (v.decision === "reject") return { action: "reject", why: "reviewer rejected" };
  if (v.source_check === "contradicted") return { action: "reject", why: "source contradicts the claim" };
  if ((v.duplicates || []).length) return { action: "reject", why: `duplicates ${v.duplicates.join(", ")}` };
  if (v.decision === "hold") return { action: "hold", why: "reviewer held" };
  if (failed.length) return { action: "hold", why: `verdict says merge but tests failed: ${failed.join(", ")}` };
  const unsupersededConflicts = (v.conflicts_with || []).filter((id) => !(v.supersedes || []).includes(id));
  if (unsupersededConflicts.length) return { action: "hold", why: `conflicts with ${unsupersededConflicts.join(", ")}` };
  if (v.risk === "high") return { action: "hold", why: "high risk" };
  if (v.risk === "medium" && v.source_check !== "verified") return { action: "hold", why: "medium risk with unverified source" };
  return { action: "merge", why: `${v.risk} risk, source ${v.source_check}` };
}

// ---------- review one ----------
export async function review(path, override = {}) {
  const text = override.text ?? readFileSync(join(ROOT, path), "utf8");
  const parsed = parseEntry(text);
  const gate = [...validateEntry(parsed, "queue", path), ...scanText(text, override.scanPath ?? path)].filter((f) => f.level === "error");
  if (gate.length) return { path, text, parsed, gateOnly: true, verdict: null, applied: { action: "reject", why: gate.map((g) => g.msg).join("; ") }, cost: 0 };

  const near = override.neighbors ?? neighbors(path, text);
  const prompt = [
    `Review this candidate. Rubric:\n\n${RUBRIC}`,
    `<vetoes>\n${vetoes() || "(none yet)"}\n</vetoes>`,
    `<index>\n${override.index ?? readFileSync(join(ROOT, "context", "INDEX.md"), "utf8")}\n</index>`,
    `<neighbors>\n${near.map((e) => `<entry path="${e.path}">\n${e.text}\n</entry>`).join("\n") || "(none)"}\n</neighbors>`,
    `<candidate path="${path}">\n${text}\n</candidate>`,
    SOURCE_ROOTS.length ? `Source roots you may read: ${SOURCE_ROOTS.join(", ")}` : "No source roots are mounted; file-cited sources are unverifiable unless they are inside this repo.",
  ].join("\n\n");

  const r = await claudeRun({
    prompt,
    systemPromptFile: join(ROOT, "reviewer", "context-reviewer.md"),
    schema: SCHEMA,
    cwd: ROOT,
    addDirs: override.sourceRoots ?? SOURCE_ROOTS,
    tools: ["Read", "Grep", "Glob", "Bash"],
    allowedTools: ["Read", "Grep", "Glob", "Bash(git log:*)", "Bash(git show:*)", "Bash(ls:*)"],
  });
  const verdict = r.ok ? r.json.structured_output : null;
  if (!verdict) return { path, text, parsed, verdict: null, applied: { action: "hold", why: `reviewer error: ${r.error}` }, cost: r.cost };

  let finalText = text;
  if (verdict.revised_body) {
    const revised = replaceBody(text, verdict.revised_body);
    const bad = [...validateEntry(parseEntry(revised), "queue", path), ...scanText(revised, path)].filter((f) => f.level === "error");
    if (!bad.length) finalText = revised;
    else verdict.decision = verdict.decision === "merge" ? "hold" : verdict.decision;
  }
  let applied = policy(verdict);
  const cert = override.text ? { ok: true } : certified();
  if (applied.action === "merge" && !cert.ok) applied = { action: "hold", why: `reviewer not certified (${cert.why}); would have merged` };
  const wasHeld = path.startsWith("queue/held/");
  if (wasHeld && applied.action === "hold" && !override.text) applied = { action: "reject", why: `still held after ${HOLD_DAYS} days: ${applied.why}` };
  return { path, text: finalText, parsed: parseEntry(finalText), verdict, applied, cost: r.cost };
}

// ---------- apply ----------
function apply(res, own) {
  const { path, applied, verdict } = res;
  const src = join(ROOT, path);
  if (applied.action === "reject") {
    // Fixable rejects go to the repairer instead of waiting on a person. Never
    // park text that failed C7 (sensitive) or a deterministic gate, and give
    // each lineage one repair attempt.
    const repairable = verdict && verdict.fix_hint && verdict.tests?.C7 !== false && !(Number(res.parsed.meta.repair_attempts) >= 1);
    if (repairable) {
      let t = setField(res.text, "reject_reasons", [applied.why, ...(verdict.reasons || [])].join("; ").replace(/\n/g, " "));
      t = setField(t, "fix_hint", verdict.fix_hint.replace(/\n/g, " "));
      mkdirSync(join(ROOT, "queue", "repair"), { recursive: true });
      writeFileSync(join(ROOT, "queue", "repair", basename(path)), t);
    }
    if (existsSync(src)) unlinkSync(src);
    res.applied.action = repairable ? "repair" : "reject";
    return;
  }
  if (applied.action === "hold") {
    let t = setField(res.text, "held_since", res.parsed.meta.held_since || today());
    t = setField(t, "hold_reason", applied.why.replace(/\n/g, " "));
    mkdirSync(join(ROOT, "queue", "held"), { recursive: true });
    const dest = join(ROOT, "queue", "held", basename(path));
    writeFileSync(dest, t);
    if (src !== dest) unlinkSync(src);
    return;
  }
  // merge
  const meta = res.parsed.meta;
  let t = res.text;
  for (const k of ["held_since", "hold_reason"]) t = t.replace(new RegExp(`^${k}:.*\\n?`, "m"), "");
  t = setField(t, "status", "stable");
  if (verdict.source_check === "verified") t = setField(t, "verified", today());
  if (!meta.author) t = setField(t, "author", meta.owner);
  if (own[meta.area]) t = setField(t, "owner", own[meta.area]);
  t = setField(t, "reviewed_by", `pm-os-reviewer/rubric-v${RUBRIC_VERSION}`);
  t = setField(t, "review_date", today());
  t = setField(t, "review_risk", verdict.risk);
  const dir = KINDS[meta.kind];
  mkdirSync(join(ROOT, "context", dir), { recursive: true });
  writeFileSync(join(ROOT, "context", dir, basename(path).replace(/^[a-z-]+--/, "")), t);
  unlinkSync(src);
  for (const id of verdict.supersedes || []) {
    const old = entries("context").find((e) => e.parsed?.meta.id === id);
    if (old) writeFileSync(join(ROOT, old.path), setField(setField(old.text, "status", "deprecated"), "superseded_by", meta.id));
  }
}

function log(results, cost) {
  mkdirSync(join(ROOT, "review-log"), { recursive: true });
  const p = join(ROOT, "review-log", `${today()}.md`);
  const head = existsSync(p) ? "" : `# Reviewer log ${today()}\n\n`;
  const rows = results.map((r) => {
    const v = r.verdict;
    const why = [r.applied.why, ...(v?.reasons || [])].join("; ").replace(/\|/g, "/").replace(/\n/g, " ");
    const fix = (v?.fix_hint || "").replace(/\|/g, "/").replace(/\n/g, " ");
    return `| \`${r.parsed?.meta.id || basename(r.path)}\` | ${r.applied.action} | ${v?.risk || "-"} | ${v?.source_check || "-"} | ${why} | ${fix} |`;
  });
  appendFileSync(p, `${head}## Run at ${new Date().toISOString().slice(11, 16)} UTC, rubric v${RUBRIC_VERSION}\n\n| Entry | Applied | Risk | Source | Why | To make it mergeable |\n|---|---|---|---|---|---|\n${rows.join("\n")}\n\nReviewer cost: $${cost.toFixed(2)}\n\n`);
}

// ---------- main ----------
if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const list = candidates();
  if (!list.length) { console.log("queue is empty"); process.exit(0); }
  console.log(`reviewing ${list.length} candidate(s), rubric v${RUBRIC_VERSION}, source roots: ${SOURCE_ROOTS.length || "none"}`);
  const results = await pool(list, Number(opt("--concurrency", 4)), async (p) => {
    const r = await review(p);
    console.log(`${r.applied.action.padEnd(6)} ${p}  (${r.applied.why})`);
    return r;
  });
  const cost = results.reduce((s, r) => s + (r.cost || 0), 0);
  const tally = results.reduce((t, r) => ((t[r.applied.action] = (t[r.applied.action] || 0) + 1), t), {});
  console.log(`\n${JSON.stringify(tally)}  cost $${cost.toFixed(2)}`);
  if (flag("--dry-run")) process.exit(0);

  const own = owners();
  for (const r of results) apply(r, own);
  for (const k of Object.keys(tally)) delete tally[k];
  for (const r of results) tally[r.applied.action] = (tally[r.applied.action] || 0) + 1;
  console.log(`applied: ${JSON.stringify(tally)}`);
  writeFileSync(join(ROOT, "context", "INDEX.md"), renderIndex());
  log(results, cost);
  try { execSync("node scripts/check.mjs", { cwd: ROOT, stdio: "inherit" }); }
  catch { console.error("check failed after applying verdicts; nothing committed"); process.exit(1); }
  if (flag("--commit") && execSync("git status --porcelain queue context review-log reviewer", { cwd: ROOT, encoding: "utf8" }).trim()) {
    execSync("git add -A queue context review-log reviewer/vetoes.md 2>/dev/null || git add -A queue context review-log", { cwd: ROOT, shell: "/bin/bash" });
    const msg = `pm-os reviewer: ${tally.merge || 0} merged, ${tally.hold || 0} held, ${tally.repair || 0} sent to repair, ${tally.reject || 0} rejected (rubric v${RUBRIC_VERSION})`;
    execSync(`git -c user.name="pm-os-reviewer" -c user.email="pm-os-reviewer@spyne.ai" commit -q -m ${JSON.stringify(msg)}`, { cwd: ROOT, stdio: "inherit" });
    if (flag("--push")) execSync("git push -q", { cwd: ROOT, stdio: "inherit" });
  }
}
