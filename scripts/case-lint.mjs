#!/usr/bin/env node
// Evidence bar for case files and drafts. Deterministic on purpose: the model
// cannot argue a slot into SUPPORTED. Every THIN or EMPTY slot, and every
// [ASSUMPTION] in a draft, must have an open question in questions.md.
//
//   node scripts/case-lint.mjs case <work-folder> [--fix]   label slots, check questions
//   node scripts/case-lint.mjs doc <draft.md> [--fix]       every claim tagged in Problem/Evidence/Requirements
//   node scripts/case-lint.mjs all                          every case under product/work (used by check.mjs S7)
//
// --fix writes the "Slot status" table into case.md and appends a question
// stub for every uncovered gap. It never deletes anything.

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, appendFileSync } from "node:fs";
import { join, relative, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT, parseEntry } from "./lib.mjs";

export const SLOTS = [
  ["ask", "Ask", "at least 1 E-id from freshdesk, arali or pm, in the customer's words"],
  ["job", "Job", "at least 1 E-id behind the inferred job"],
  ["context_30d", "Customer context (30 days)", "at least 1 dealer-side arali E-id dated within 30 days of fetched_arali"],
  ["who_feels_this", "Who feels this", "at least 1 dealer-side E-id with a known role"],
  ["agents_affected", "Agents affected", "names the impact on both Sales and Service agents (yes, no or unknown for each), with an E-id or code reference"],
  ["how_it_works_today", "How it works today", "at least 1 bluebrain E-id or `repo:path:line` reference"],
  ["gap", "Gap", "at least 1 E-id or code reference"],
  ["directions", "Candidate directions", "2 or more directions with a P&L angle, one of them labelled **Full value:** (the path that unlocks the dealer's full value, build scoped)"],
  ["frequency", "Frequency", "a count, backed by at least 1 E-id"],
];
const CASE_FIELDS = ["id", "area", "stage"];
const SIDES = ["dealer", "spyne", "system", "pm"];
const CODE_REF = /`[\w.-]+:[\w./@-]+:\d+`/;
const EID = /\bE(\d+)\b/g;
const PNL = /\b(days?|cost|gross|absorption|hours per RO|retention|CSI|comp(?:s|ed)?|overtime)\b/i;
const PLACEHOLDER = /^(_?none\.?_?|tbd|todo|unknown|n\/a|-|_|\(none\))$/i;

// ---------- parsing ----------
function sections(md) {
  const out = {};
  let cur = null;
  for (const line of md.split("\n")) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) { cur = h[1]; out[cur] = []; continue; }
    if (cur) out[cur].push(line);
  }
  for (const k of Object.keys(out)) out[k] = out[k].join("\n").trim();
  return out;
}

export function parseBlocks(md, prefix) {
  const out = {};
  const re = new RegExp(`^###\\s+(${prefix}\\d+)\\s*$`, "gm");
  const heads = [...md.matchAll(re)];
  heads.forEach((h, i) => {
    const end = i + 1 < heads.length ? heads[i + 1].index : md.length;
    const fields = {};
    for (const m of md.slice(h.index + h[0].length, end).matchAll(/^-\s+([a-z_]+):\s*(.*)$/gm)) fields[m[1]] = m[2].trim();
    out[h[1]] = fields;
  });
  return out;
}

const meaningful = (text) => text.split("\n").map((l) => l.replace(/^[-*\d.)\s]+/, "").trim()).filter((l) => l && !PLACEHOLDER.test(l) && !/^<!--/.test(l));
const cites = (text) => [...new Set([...text.matchAll(EID)].map((m) => `E${m[1]}`))];

// ---------- slot rules ----------
function judge(key, text, ev, meta) {
  const lines = meaningful(text);
  if (!lines.length) return "EMPTY";
  const ids = cites(text).filter((id) => ev[id]);
  const src = (id) => (ev[id].source || "").split(":")[0];
  const ref = new Date(meta.fetched_arali || new Date().toISOString().slice(0, 10));
  switch (key) {
    case "ask": return ids.some((id) => ["freshdesk", "arali", "pm"].includes(src(id))) ? "SUPPORTED" : "THIN";
    case "context_30d": {
      const arali = ids.filter((id) => src(id) === "arali" && ev[id].side === "dealer");
      if (!arali.length) return "EMPTY";
      return arali.some((id) => (ref - new Date(ev[id].date)) / 86_400_000 <= 30) ? "SUPPORTED" : "THIN";
    }
    case "who_feels_this": return ids.some((id) => ev[id].side === "dealer" && ev[id].role && ev[id].role !== "unknown") ? "SUPPORTED" : "THIN";
    case "how_it_works_today": return ids.some((id) => src(id) === "bluebrain") || CODE_REF.test(text) ? "SUPPORTED" : "EMPTY";
    case "gap": return ids.length || CODE_REF.test(text) ? "SUPPORTED" : "THIN";
    case "directions": {
      const items = text.split("\n").filter((l) => /^\s*(\d+[.)]|[-*])\s+\S/.test(l) && !/^\s{2,}/.test(l));
      return items.length >= 2 && PNL.test(text) && /\*\*Full value:\*\*/i.test(text) ? "SUPPORTED" : "THIN";
    }
    case "agents_affected": return /sales/i.test(text) && /service/i.test(text) && (ids.length || CODE_REF.test(text)) ? "SUPPORTED" : "THIN";
    case "frequency": return /\d/.test(text) && ids.length ? "SUPPORTED" : "THIN";
    default: return ids.length ? "SUPPORTED" : "THIN";
  }
}

function statusTable(status) {
  const rows = SLOTS.map(([k, label, bar]) => `| ${label} | ${status[k]} | ${bar} |`);
  return ["| Slot | Status | Bar |", "|---|---|---|", ...rows].join("\n");
}

// ---------- case ----------
export function lintCase(dir, { fix = false } = {}) {
  const problems = [];
  const add = (msg, level = "error") => problems.push({ msg, level });
  const casePath = join(dir, "case.md");
  const evPath = join(dir, "evidence.md");
  const qPath = join(dir, "questions.md");
  if (!existsSync(casePath)) return { path: relative(ROOT, casePath), status: {}, problems: [{ msg: "case.md missing", level: "error" }] };
  const parsed = parseEntry(readFileSync(casePath, "utf8"));
  if (!parsed) return { path: relative(ROOT, casePath), status: {}, problems: [{ msg: "case.md has no frontmatter", level: "error" }] };
  const { meta, body } = parsed;
  for (const k of CASE_FIELDS) if (!meta[k]) add(`case.md missing field: ${k}`);

  const ev = existsSync(evPath) ? parseBlocks(readFileSync(evPath, "utf8"), "E") : {};
  for (const [id, f] of Object.entries(ev)) {
    for (const k of ["source", "date", "side", "role", "text"]) if (!f[k]) add(`evidence ${id} missing ${k}`);
    if (f.side && !SIDES.includes(f.side)) add(`evidence ${id} side must be one of ${SIDES.join(", ")}`);
    if (f.date && !/^\d{4}-\d{2}-\d{2}$/.test(f.date)) add(`evidence ${id} date must be YYYY-MM-DD`);
  }

  const secs = sections(body);
  const status = {};
  for (const [key, label] of SLOTS) {
    if (!(label in secs)) { add(`case.md missing slot heading: ## ${label}`); status[key] = "EMPTY"; continue; }
    for (const id of cites(secs[label])) if (!ev[id]) add(`slot "${label}" cites ${id}, which is not in evidence.md`);
    status[key] = judge(key, secs[label], ev, meta);
  }

  const qs = existsSync(qPath) ? parseBlocks(readFileSync(qPath, "utf8"), "Q") : {};
  const covered = new Set(Object.values(qs).filter((q) => /^(open|accepted)/.test(q.status || "")).map((q) => q.slot));
  const gaps = SLOTS.filter(([k]) => status[k] !== "SUPPORTED");
  const uncovered = gaps.filter(([k]) => !covered.has(k));

  const table = statusTable(status);
  const hasTable = secs["Slot status"] === table;
  if (fix) {
    let text = readFileSync(casePath, "utf8");
    text = "Slot status" in secs
      ? text.replace(/## Slot status\n[\s\S]*?(?=\n## |\s*$)/, `## Slot status\n\n${table}\n`)
      : `${text.trimEnd()}\n\n## Slot status\n\n${table}\n`;
    writeFileSync(casePath, text);
    let n = Object.keys(qs).reduce((m, id) => Math.max(m, Number(id.slice(1))), 0);
    const stubs = uncovered.map(([k, label, bar]) => [
      `### Q${++n}`,
      `- slot: ${k}`,
      `- unknown: ${label} is ${status[k]}. Bar: ${bar}.`,
      `- blocks: which direction to take, and whether this is worth solving`,
      `- who: ${k === "how_it_works_today" || k === "gap" ? "engineering" : k === "frequency" ? "pm" : "csm"}`,
      `- how: <the researcher fills this in>`,
      `- status: open`,
      "",
    ].join("\n"));
    if (stubs.length) appendFileSync(qPath, (existsSync(qPath) ? "\n" : "# Open questions\n\n") + stubs.join("\n"));
  } else {
    if (!hasTable) add('slot status table missing or out of date; run case-lint case <folder> --fix');
    for (const [k, label] of uncovered) add(`slot "${label}" is ${status[k]} with no open question in questions.md`);
  }
  for (const [id, q] of Object.entries(qs)) for (const k of ["slot", "unknown", "who", "status"]) if (!q[k]) add(`questions ${id} missing ${k}`, "warn");
  return { path: relative(ROOT, casePath), status, gaps: gaps.map(([k]) => k), problems };
}

// ---------- draft ----------
const CLAIM_SECTIONS = /problem|evidence|requirement|acceptance|who is this for|context/i;
const TAGGED = /\[E\d+|\[ASSUMPTION|\[PM\b|`[\w.-]+:[\w./@-]+:\d+`|\[obs:/;

export function lintDoc(file, { fix = false, questions } = {}) {
  const md = readFileSync(file, "utf8");
  const untagged = [];
  const assumptions = [];
  let inClaims = false;
  let inFence = false;
  // Readable layout: a tagged "### R1 ..." heading or a tagged top-level bullet
  // covers the indented bullets under it, so one claim can be split into lines.
  let blockTagged = false;
  let parentTagged = false;
  md.split("\n").forEach((line, i) => {
    if (/^```/.test(line)) inFence = !inFence;
    if (inFence) return;
    for (const m of line.matchAll(/\[ASSUMPTION:?\s*([^\]]*)\]/g)) assumptions.push(m[1].trim() || line.trim());
    const h = line.match(/^(#{1,4})\s+(.+)/);
    if (h) {
      if (h[1].length <= 2) { inClaims = CLAIM_SECTIONS.test(h[2]); blockTagged = false; }
      else blockTagged = TAGGED.test(h[2]);
      parentTagged = blockTagged;
      return;
    }
    if (!inClaims) return;
    const t = line.trim();
    if (!t || /^\|?\s*:?-{3,}/.test(t) || /^>/.test(t) || /^\*\*[^*]+:\*\*\s*$/.test(t)) return;
    if (/^\|/.test(t) && i > 0 && /^\|?\s*:?-{3,}/.test(md.split("\n")[i + 1] || "")) return; // table header
    const nested = /^\s{2,}([-*]|\d+[.)])\s/.test(line);
    const tagged = TAGGED.test(t) || (nested ? parentTagged : blockTagged);
    if (!nested) parentTagged = tagged;
    if (meaningful(t).length && !tagged) untagged.push({ line: i + 1, text: t.slice(0, 120) });
  });
  const qPath = questions || join(dirname(dirname(file)), "questions.md");
  const qs = existsSync(qPath) ? parseBlocks(readFileSync(qPath, "utf8"), "Q") : {};
  const known = new Set(Object.values(qs).filter((q) => q.slot === "assumption").map((q) => (q.unknown || "").toLowerCase()));
  const missing = [...new Set(assumptions)].filter((a) => !known.has(a.toLowerCase()));
  if (fix && missing.length) {
    let n = Object.keys(qs).reduce((m, id) => Math.max(m, Number(id.slice(1))), 0);
    const stubs = missing.map((a) => [`### Q${++n}`, "- slot: assumption", `- unknown: ${a}`, `- blocks: ${basename(file)}`, "- who: pm", "- how: <confirm or replace with evidence>", "- status: open", ""].join("\n"));
    appendFileSync(qPath, (existsSync(qPath) ? "\n" : "# Open questions\n\n") + stubs.join("\n"));
  }
  return { file: relative(ROOT, file), untagged, assumptions: assumptions.length, missingQuestions: fix ? [] : missing };
}

// ---------- all ----------
export function lintAllCases() {
  const base = join(ROOT, "product", "work");
  if (!existsSync(base)) return [];
  const out = [];
  for (const area of readdirSync(base)) {
    const ap = join(base, area);
    if (!statSync(ap).isDirectory()) continue;
    for (const w of readdirSync(ap)) {
      const wp = join(ap, w);
      if (statSync(wp).isDirectory() && existsSync(join(wp, "case.md"))) out.push(lintCase(wp));
    }
  }
  return out;
}

// ---------- cli ----------
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [cmd, target] = process.argv.slice(2);
  const fix = process.argv.includes("--fix");
  if (cmd === "case" && target) {
    const r = lintCase(target, { fix });
    console.log(JSON.stringify({ path: r.path, status: r.status, gaps: r.gaps, problems: r.problems }, null, 2));
    process.exit(r.problems.some((p) => p.level === "error") ? 1 : 0);
  } else if (cmd === "doc" && target) {
    const r = lintDoc(target, { fix });
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.untagged.length || r.missingQuestions.length ? 1 : 0);
  } else if (cmd === "all") {
    const rs = lintAllCases();
    for (const r of rs) console.log(`${r.problems.filter((p) => p.level === "error").length ? "FAIL" : "ok  "} ${r.path}  ${JSON.stringify(r.status)}`);
    process.exit(rs.some((r) => r.problems.some((p) => p.level === "error")) ? 1 : 0);
  } else {
    console.error("usage: case-lint.mjs case <work-folder> [--fix] | doc <draft.md> [--fix] | all");
    process.exit(2);
  }
}
