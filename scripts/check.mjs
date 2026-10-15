#!/usr/bin/env node
// pm-os check: the gate every commit passes through (.githooks/pre-commit).
// Errors block the commit. Warnings print but pass.
//
//   node scripts/check.mjs            check the whole repo
//   node scripts/check.mjs --staged   check only staged files (pre-commit)
//
// A line can opt out of S1-S3 with an inline marker `pm-os-allow: <reason>`.
// Use it rarely; reviewers see every one.

import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, relative } from "node:path";
import { ROOT, KINDS, KIND_FIELDS, KIND_BODY, LESSON_TARGETS, PERSONAS, STATUSES, CONFIDENCE, REQUIRED, STALE_DAYS, walk, entries, ageDays, destDir } from "./lib.mjs";
import { renderIndex, renderProductIndexes } from "./index.mjs";
import { lintAllCases } from "./case-lint.mjs";

const TEXT = /\.(md|json|mjs|js|ts|sh|ya?ml|txt|sql|csv|html)$/;
// Files that must contain the patterns they police.
const SELF = new Set(["scripts/check.mjs", "pm-os.config.json"]);

const SECRETS = [
  [/\bsk-(ant-)?[A-Za-z0-9_-]{20,}/, "API key (sk-)"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key"],
  [/\bxox[abprs]-[A-Za-z0-9-]{10,}/, "Slack token"],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/, "GitHub token"],
  [/\bvcp_[A-Za-z0-9]{20,}/, "Vercel token"],
  [/\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\./, "JWT"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key"],
  [/\b(password|passwd|api[_-]?key|secret|auth[_-]?token)\s*[:=]\s*['"]?[^\s'"<>{}]{8,}/i, "credential assignment"],
  [/\bCookie:\s*\S{20,}/i, "cookie header"],
  [/libsql:\/\/\S+/, "database URL"],
];

const PII = [
  [/\b[A-Za-z0-9._%+-]+@(?!spyne\.ai\b|anthropic\.com\b|example\.com\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, "non-Spyne email address"],
  [/(?<![\d.])(\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}(?!\d)/, "phone number"],
  [/\b(?=[A-HJ-NPR-Z0-9]{17}\b)(?=[A-HJ-NPR-Z0-9]*\d)(?=[A-HJ-NPR-Z0-9]*[A-HJ-NPR-Z])[A-HJ-NPR-Z0-9]{17}\b/, "VIN"],
];

const COMMERCIALS = [
  [/\b[CL]?ARR\b/, "ARR (Spyne commercials are confidential)"],
  [/\bMRR\b/, "MRR (Spyne commercials are confidential)"],
  [/\bACV\b|\bcontract value\b/i, "contract value (Spyne commercials are confidential)"],
  [/\$\s?\d[\d,.]*\s?(M|K|mn|million|k)\b/, "dollar figure in K/M (check it is not a Spyne commercial)"],
];

export function scanText(text, file = "") {
  const found = [];
  const fakeOk = /^evals\/[^/]+\/(cases\/|last-run\.md$)/.test(file); // eval cases plant fake PII and commercials on purpose; eval logs quote them
  text.split("\n").forEach((line, i) => {
    if (line.includes("pm-os-allow:")) return;
    for (const [re, label] of SECRETS) if (re.test(line)) found.push({ line: i + 1, level: "error", msg: `S1 secret: ${label}` });
    if (fakeOk) return;
    for (const [re, label] of PII) if (re.test(line)) found.push({ line: i + 1, level: "error", msg: `S2 PII: ${label}` });
    for (const [re, label] of COMMERCIALS) {
      if (re.test(line)) found.push({ line: i + 1, level: label.startsWith("dollar") ? "warn" : "error", msg: `S3 commercials: ${label}` });
    }
  });
  return found;
}

export function validateEntry(parsed, sub, path = "") {
  const found = [];
  const e = (msg) => found.push({ level: "error", msg });
  if (!parsed) { e("S4 missing frontmatter"); return found; }
  const { meta, body } = parsed;
  for (const k of REQUIRED) if (!meta[k]) e(`S4 missing field: ${k}`);
  if (meta.kind && !KINDS[meta.kind]) e(`S4 unknown kind: ${meta.kind}`);
  if (meta.status && !STATUSES.includes(meta.status)) e(`S4 unknown status: ${meta.status}`);
  if (meta.confidence && !CONFIDENCE.includes(meta.confidence)) e(`S4 unknown confidence: ${meta.confidence}`);
  if (meta.verified && !/^\d{4}-\d{2}-\d{2}$/.test(meta.verified)) e("S4 verified must be YYYY-MM-DD");
  for (const k of KIND_FIELDS[meta.kind] || []) if (!meta[k]) e(`S4 ${meta.kind} needs field: ${k}`);
  if (meta.kind === "lesson" && meta.target && !LESSON_TARGETS.includes(meta.target)) e(`S4 unknown lesson target: ${meta.target}`);
  if (meta.kind === "observation") {
    if (meta.persona && !PERSONAS.includes(meta.persona)) e(`S4 unknown persona: ${meta.persona}`);
    if (Number(meta.support_rooftops) < 2) e("S4 an observation needs support_rooftops of 2 or more; single-rooftop signals go to the watchlist");
    if (!/\*\*Predicts:\*\*/.test(body)) e("S4 observation body needs a **Predicts:** line");
    if (!/\*\*Evidence:\*\*/.test(body)) e("S4 observation body needs an **Evidence:** section");
  }
  const bodyLine = KIND_BODY[meta.kind] || "Rule";
  if (!new RegExp(`\\*\\*${bodyLine}:\\*\\*`).test(body)) e(`S4 body needs a **${bodyLine}:** line`);
  if (sub === "queue" && meta.status !== "candidate") e("S4 queue entries must be status: candidate");
  if (sub === "context") {
    if (meta.status === "candidate") e("S4 context entries must be stable or deprecated");
    const dir = KINDS[meta.kind] && destDir(meta);
    if (dir && path && !path.startsWith(`${dir}/`)) e(`S4 kind ${meta.kind} belongs in ${dir}/`);
    if (meta.status === "stable" && ageDays(meta.verified) > STALE_DAYS) found.push({ level: "warn", msg: `S5 stale: verified ${meta.verified}, over ${STALE_DAYS} days. Re-verify or deprecate.` });
  }
  return found;
}

const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
const errors = [];
const warnings = [];
const err = (file, line, msg) => errors.push(`${file}${line ? `:${line}` : ""}  ${msg}`);
const warn = (file, line, msg) => warnings.push(`${file}${line ? `:${line}` : ""}  ${msg}`);

function files() {
  if (process.argv.includes("--staged")) {
    return execSync("git diff --cached --name-only --diff-filter=ACMR", { cwd: ROOT, encoding: "utf8" })
      .split("\n").filter(Boolean);
  }
  return walk(ROOT).map(f => relative(ROOT, f));
}

// S1-S3: content scan
if (isMain) for (const file of files()) {
  if (!TEXT.test(file) || SELF.has(file) || !existsSync(join(ROOT, file))) continue;
  for (const f of scanText(readFileSync(join(ROOT, file), "utf8"), file)) (f.level === "warn" ? warn : err)(file, f.line, f.msg);
}

// S4-S5: entry schema, for context/ and queue/
if (isMain) for (const sub of ["context", "queue"]) {
  for (const e of entries(sub)) {
    if (e.path.startsWith("queue/vetoes/")) continue; // veto requests are not entries
    for (const f of validateEntry(e.parsed, sub, e.path)) (f.level === "warn" ? warn : err)(e.path, 0, f.msg);
  }
}

// S6: index must match the entries
if (isMain) {
const indexPath = join(ROOT, "context", "INDEX.md");
const current = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
if (current !== renderIndex()) err("context/INDEX.md", 0, "S6 index out of date; run node scripts/index.mjs");
for (const [rel, want] of Object.entries(renderProductIndexes())) {
  const p = join(ROOT, rel);
  if ((existsSync(p) ? readFileSync(p, "utf8") : "") !== want) err(rel, 0, "S6 generated index out of date; run node scripts/index.mjs");
}

// S7: every case file meets the evidence bar, and every THIN or EMPTY slot has an open question
for (const r of lintAllCases()) for (const p of r.problems) (p.level === "warn" ? warn : err)(r.path, 0, `S7 ${p.msg}`);

for (const w of warnings) console.log(`warn   ${w}`);
for (const e of errors) console.log(`ERROR  ${e}`);
console.log(`\npm-os check: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
}
