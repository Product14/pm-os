#!/usr/bin/env node
// Promote a reviewed candidate from queue/ into context/ (the ladder's
// candidate -> stable step). Run by the area owner, inside a PR.
//
//   node scripts/promote.mjs queue/<file>.md [--owner <name>]
//   node scripts/promote.mjs queue/<file>.md --reject

import { readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";
import { ROOT, parseEntry, today, destDir } from "./lib.mjs";
import { renderIndex } from "./index.mjs";

const [file, ...rest] = process.argv.slice(2);
if (!file || !file.startsWith("queue/")) {
  console.error("usage: promote.mjs queue/<file>.md [--owner <name>] | --reject");
  process.exit(1);
}
const src = join(ROOT, file);
if (!existsSync(src)) { console.error(`not found: ${file}`); process.exit(1); }

if (rest.includes("--reject")) {
  unlinkSync(src);
  console.log(`rejected and removed ${file}`);
} else {
  const text = readFileSync(src, "utf8");
  const parsed = parseEntry(text);
  const dir = parsed && destDir(parsed.meta);
  if (!dir) { console.error("entry has no valid kind; fix frontmatter first"); process.exit(1); }
  const ownerIdx = rest.indexOf("--owner");
  let out = text
    .replace(/^status:.*$/m, "status: stable")
    .replace(/^verified:.*$/m, `verified: ${today()}`);
  if (ownerIdx >= 0 && rest[ownerIdx + 1]) out = out.replace(/^owner:.*$/m, `owner: ${rest[ownerIdx + 1]}`);
  mkdirSync(join(ROOT, dir), { recursive: true });
  const dest = join(ROOT, dir, basename(file).replace(/^[a-z-]+--/, ""));
  writeFileSync(dest, out);
  unlinkSync(src);
  console.log(`promoted ${file} -> ${dir}/${basename(dest)}`);
}
writeFileSync(join(ROOT, "context", "INDEX.md"), renderIndex());
console.log("index regenerated; run node scripts/check.mjs before committing");
