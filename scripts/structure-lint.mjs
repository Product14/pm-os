#!/usr/bin/env node
// S8: product/ structure. Keeps work from 10 different PMs (and 10 different ways of
// asking Claude) in one shape, so skills, indexes and reviewers can rely on it.
//   node scripts/structure-lint.mjs      report problems (check.mjs runs this)
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { ROOT, parseEntry } from "./lib.mjs";

const CFG = JSON.parse(readFileSync(join(ROOT, "pm-os.config.json"), "utf8"));
const AREAS = new Set([...(CFG.areas || []), "platform"]);
const FOLDER = /^(fd\d+|idea|bug)-[a-z0-9]+(-[a-z0-9]+)*$/;
const TOP_FILES = new Set(["case.md", "evidence.md", "questions.md", "decisions.md", "requests.md", "run.json", "decide.md",
  "solution-context.md", "fit-check.md", "csm-draft.md", "jira.md", "retest-plan.md"]);
const SUBDIRS = { "one-pager": /^(v\d+|final|discovery)\.md$/, prd: /^(v\d+|final)\.md$/, reviews: /^(onepager|prd)-r\d+-[a-z-]+\.(json|md)$/ };
const GUIDE = /^(CLAUDE|README)\.md$/;
const BINARY = /\.(zip|pdf|png|jpe?g|gif|xlsx?|docx?|pptx?|csv|tsv|mp3|mp4|wav)$/i;

export function lintStructure() {
  const out = [];
  const e = (path, msg) => out.push({ level: "error", path, msg });
  const w = (path, msg) => out.push({ level: "warn", path, msg });
  const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
  const rel = (p) => relative(ROOT, p);

  const product = join(ROOT, "product");
  for (const f of existsSync(product) ? walk(product) : []) if (BINARY.test(f)) e(rel(f), "S8 binary or export file in product/; keep it out of the repo (links or .cache/)");

  const work = join(ROOT, "product", "work");
  if (existsSync(work)) for (const area of readdirSync(work)) {
    if (GUIDE.test(area)) continue;
    const ap = join(work, area);
    if (!statSync(ap).isDirectory()) { e(rel(ap), "S8 files go inside product/work/<area>/<folder>/, not loose"); continue; }
    if (!AREAS.has(area)) e(rel(ap), `S8 unknown area "${area}"; use one of pm-os.config.json areas`);
    for (const folder of readdirSync(ap)) {
      if (GUIDE.test(folder)) continue;
      const fp = join(ap, folder);
      if (!statSync(fp).isDirectory()) { e(rel(fp), "S8 loose file in an area folder; it belongs inside a work folder"); continue; }
      if (!FOLDER.test(folder)) e(rel(fp), "S8 work folder name must be fd<ticket id>-<topic>, idea-<topic> or bug-<topic> (lowercase, hyphens)");
      const cp = join(fp, "case.md");
      if (!existsSync(cp)) { e(rel(fp), "S8 work folder has no case.md; start it with /pm-os:triage or /pm-os:prd"); continue; }
      const meta = parseEntry(readFileSync(cp, "utf8"))?.meta || {};
      if (!meta.pm) e(rel(cp), "S8 case.md needs pm: <owner's Spyne username>");
      if (meta.area && meta.area !== area) e(rel(cp), `S8 case.md area "${meta.area}" does not match its folder "${area}"`);
      for (const f of walk(fp)) {
        const r = relative(fp, f).split("/");
        if (r.length === 1 && TOP_FILES.has(r[0])) continue;
        if (r.length === 2 && SUBDIRS[r[0]]?.test(r[1])) continue;
        w(rel(f), "S8 non-standard file in a work folder; put its content in the standard file (e.g. Jira text belongs in jira.md)");
      }
    }
  }
  const prds = join(ROOT, "product", "prds");
  if (existsSync(prds)) for (const f of walk(prds)) if (!GUIDE.test(f.split("/").pop()) && !/\/prds\/[a-z0-9-]+\/[a-z0-9-]+-prd\.md$/.test(f)) w(rel(f), "S8 approved PRDs are product/prds/<area>/<feature>-prd.md");
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const r = lintStructure();
  for (const x of r) console.log(`${x.level === "error" ? "ERROR" : "warn "}  ${x.path}  ${x.msg}`);
  process.exit(r.some((x) => x.level === "error") ? 1 : 0);
}
