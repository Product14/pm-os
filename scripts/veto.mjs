#!/usr/bin/env node
// Veto an entry the reviewer merged. Any PM can do this; no approval needed.
// The entry is deprecated (kept for history) and the veto is recorded in
// reviewer/vetoes.md, which the reviewer reads as calibration on every run.
//
// PMs do not run this directly: /pm-os:veto writes queue/vetoes/<id>.md, the
// intake Action merges it, and scripts/apply-vetoes.mjs calls vetoEntry().
//
//   node scripts/veto.mjs <entry-id> "<why it was wrong>" [--by <name>]

import { writeFileSync, existsSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, entries, today } from "./lib.mjs";
import { renderIndex } from "./index.mjs";
import { setField } from "./review-context.mjs";

export function vetoEntry(id, reason, by) {
  const hit = entries("context").find((e) => e.parsed?.meta.id === id);
  if (!hit) return { ok: false, why: `no context entry with id ${id}` };
  if (hit.parsed.meta.status === "deprecated") return { ok: false, why: `${id} is already deprecated` };
  const rule = (hit.text.match(/\*\*Rule:\*\*\s*(.+)/) || [])[1] || "";
  writeFileSync(join(ROOT, hit.path), setField(setField(hit.text, "status", "deprecated"), "vetoed", `${today()} by ${by}`));
  const log = join(ROOT, "reviewer", "vetoes.md");
  if (!existsSync(log)) writeFileSync(log, "# Vetoes\n\nMerges a human overturned. The reviewer reads the last 20 as calibration.\n\n");
  appendFileSync(log, `- ${today()} \`${id}\` (${hit.parsed.meta.review_risk || "?"} risk): "${rule.replace(/"/g, "'")}" vetoed by ${by}: ${reason.replace(/\n/g, " ")}\n`);
  writeFileSync(join(ROOT, "context", "INDEX.md"), renderIndex());
  return { ok: true, why: `vetoed ${id}` };
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
  const [id, reason, ...rest] = process.argv.slice(2);
  if (!id || !reason) { console.error('usage: veto.mjs <entry-id> "<reason>" [--by <name>]'); process.exit(1); }
  const by = rest.includes("--by") ? rest[rest.indexOf("--by") + 1] : (process.env.USER || "unknown");
  const r = vetoEntry(id, reason, by);
  console.log(r.why);
  process.exit(r.ok ? 0 : 1);
}
