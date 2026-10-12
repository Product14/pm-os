#!/usr/bin/env node
// Applies veto requests filed by /pm-os:veto as queue/vetoes/<entry-id>.md.
// A veto is a human decision, so this is deterministic: no model call.
import { readFileSync, readdirSync, existsSync, unlinkSync, appendFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, parseEntry, today } from "./lib.mjs";
import { vetoEntry } from "./veto.mjs";

const dir = join(ROOT, "queue", "vetoes");
const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
if (!files.length) { console.log("no vetoes"); process.exit(0); }
const rows = [];
for (const f of files) {
  const meta = parseEntry(readFileSync(join(dir, f), "utf8"))?.meta || {};
  const r = meta.veto_of && meta.reason ? vetoEntry(meta.veto_of, meta.reason, meta.by || "unknown") : { ok: false, why: "veto file needs veto_of, reason and by" };
  rows.push(`| \`${meta.veto_of || f}\` | ${r.ok ? "vetoed" : "not applied"} | ${meta.by || "-"} | ${(r.ok ? meta.reason : r.why).replace(/\|/g, "/").replace(/\n/g, " ")} |`);
  unlinkSync(join(dir, f));
  console.log(r.why);
}
mkdirSync(join(ROOT, "review-log"), { recursive: true });
appendFileSync(join(ROOT, "review-log", `${today()}.md`), `## Vetoes at ${new Date().toISOString().slice(11, 16)} UTC\n\n| Entry | Result | By | Reason |\n|---|---|---|---|\n${rows.join("\n")}\n\n`);
