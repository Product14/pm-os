// Shared helpers for the PM OS repo scripts. Zero dependencies on purpose:
// every PM must be able to run these with plain Node.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(fileURLToPath(import.meta.url), "..", "..");

export const KINDS = {
  "data-trap": "traps",
  "metric-definition": "metrics",
  "system-fact": "facts",
  "decision": "decisions",
  "lesson": "lessons",
  "observation": "personas",
};
// Lessons and persona observations live one or two levels deeper.
export const LESSON_TARGETS = ["prd-drafting", "triage", "decide", "fit-check", "reviewer-gm", "reviewer-general-sales-manager", "reviewer-bdc-manager", "reviewer-service-manager", "reviewer-service-advisor", "reviewer-backend-engineer", "reviewer-ceo", "persona-refresh"];
export const PERSONAS = ["gm", "general-sales-manager", "bdc-manager", "service-manager", "service-advisor", "backend-engineer", "ceo"];
// Fields each kind needs on top of REQUIRED, and the body line that states it.
export const KIND_FIELDS = {
  lesson: ["target"],
  observation: ["persona", "support_rooftops", "support_mentions", "last_seen"],
};
export const KIND_BODY = { observation: "Pattern" };
// Files under context/ that are not entries.
export const NOT_ENTRIES = /\/(INDEX|README|core|watchlist)\.md$/;

export function destDir(meta) {
  const dir = KINDS[meta.kind];
  if (!dir) return null;
  if (meta.kind === "lesson") return `context/lessons/${meta.target}`;
  if (meta.kind === "observation") return `context/personas/${meta.persona}/observations`;
  return `context/${dir}`;
}
export const STATUSES = ["candidate", "stable", "deprecated"];
export const CONFIDENCE = ["high", "medium", "low"];
export const REQUIRED = ["id", "kind", "area", "status", "owner", "source", "verified", "confidence"];
export const STALE_DAYS = 90;

export function parseEntry(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, body: m[2] };
}

export function rule(body) {
  const m = body.match(/\*\*(?:Rule|Pattern):\*\*\s*(.+)/);
  return m ? m[1].trim() : "";
}

export function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".") || name === "node_modules") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

export function entries(sub) {
  const base = join(ROOT, sub);
  let files = [];
  try { files = walk(base); } catch { return []; }
  return files
    .filter(f => f.endsWith(".md") && !NOT_ENTRIES.test(f))
    .map(f => ({ path: relative(ROOT, f), text: readFileSync(f, "utf8") }))
    .map(e => ({ ...e, parsed: parseEntry(e.text) }));
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function ageDays(iso) {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? Infinity : Math.floor((Date.now() - t) / 86_400_000);
}
