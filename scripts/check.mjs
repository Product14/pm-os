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
import { ROOT, KINDS, STATUSES, CONFIDENCE, REQUIRED, STALE_DAYS, walk, entries, ageDays } from "./lib.mjs";
import { renderIndex } from "./index.mjs";

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
for (const file of files()) {
  if (!TEXT.test(file) || SELF.has(file) || !existsSync(join(ROOT, file))) continue;
  const lines = readFileSync(join(ROOT, file), "utf8").split("\n");
  lines.forEach((text, i) => {
    if (text.includes("pm-os-allow:")) return;
    for (const [re, label] of SECRETS) if (re.test(text)) err(file, i + 1, `S1 secret: ${label}`);
    for (const [re, label] of PII) if (re.test(text)) err(file, i + 1, `S2 PII: ${label}`);
    for (const [re, label] of COMMERCIALS) {
      if (re.test(text)) (label.startsWith("dollar") ? warn : err)(file, i + 1, `S3 commercials: ${label}`);
    }
  });
}

// S4: entry schema, for context/ and queue/
for (const sub of ["context", "queue"]) {
  for (const e of entries(sub)) {
    if (!e.parsed) { err(e.path, 0, "S4 missing frontmatter"); continue; }
    const { meta, body } = e.parsed;
    for (const k of REQUIRED) if (!meta[k]) err(e.path, 0, `S4 missing field: ${k}`);
    if (meta.kind && !KINDS[meta.kind]) err(e.path, 0, `S4 unknown kind: ${meta.kind}`);
    if (meta.status && !STATUSES.includes(meta.status)) err(e.path, 0, `S4 unknown status: ${meta.status}`);
    if (meta.confidence && !CONFIDENCE.includes(meta.confidence)) err(e.path, 0, `S4 unknown confidence: ${meta.confidence}`);
    if (meta.verified && !/^\d{4}-\d{2}-\d{2}$/.test(meta.verified)) err(e.path, 0, "S4 verified must be YYYY-MM-DD");
    if (!/\*\*Rule:\*\*/.test(body)) err(e.path, 0, "S4 body needs a **Rule:** line");
    if (sub === "queue" && meta.status !== "candidate") err(e.path, 0, "S4 queue entries must be status: candidate");
    if (sub === "context") {
      if (meta.status === "candidate") err(e.path, 0, "S4 context entries must be stable or deprecated; promote with scripts/promote.mjs");
      const dir = KINDS[meta.kind];
      if (dir && !e.path.startsWith(`context/${dir}/`)) err(e.path, 0, `S4 kind ${meta.kind} belongs in context/${dir}/`);
      if (meta.status === "stable" && ageDays(meta.verified) > STALE_DAYS) warn(e.path, 0, `S5 stale: verified ${meta.verified}, over ${STALE_DAYS} days. Re-verify or deprecate.`);
    }
  }
}

// S6: index must match the entries
const indexPath = join(ROOT, "context", "INDEX.md");
const current = existsSync(indexPath) ? readFileSync(indexPath, "utf8") : "";
if (current !== renderIndex()) err("context/INDEX.md", 0, "S6 index out of date; run node scripts/index.mjs");

for (const w of warnings) console.log(`warn   ${w}`);
for (const e of errors) console.log(`ERROR  ${e}`);
console.log(`\npm-os check: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
