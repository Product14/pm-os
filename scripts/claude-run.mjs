// Runs one headless `claude -p` call and returns its parsed JSON result.
// Known trap: `claude -p` sometimes prints its result and never exits, so we
// read stdout until the JSON parses, then kill the whole process group.

import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

export function claudeRun({ prompt, systemPromptFile, schema, model = "opus", cwd, addDirs = [], allowedTools = [], disallowedTools = [], budgetUsd = 1.5, timeoutMs = 300_000 }) {
  const args = [
    "-p", prompt,
    "--output-format", "json",
    "--model", model,
    "--no-session-persistence",
    "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}',
    "--max-budget-usd", String(budgetUsd),
  ];
  if (schema) args.push("--json-schema", JSON.stringify(schema));
  if (systemPromptFile) args.push("--append-system-prompt", readFileSync(systemPromptFile, "utf8"));
  if (allowedTools.length) args.push("--allowedTools", ...allowedTools);
  if (disallowedTools.length) args.push("--disallowedTools", ...disallowedTools);
  for (const d of addDirs) args.push("--add-dir", d);

  return new Promise((resolve) => {
    const child = spawn("claude", args, { cwd, detached: true, stdio: ["ignore", "pipe", "pipe"] });
    let out = "", errText = "", settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try { process.kill(-child.pid, "SIGTERM"); } catch {}
      resolve(result);
    };
    const tryParse = () => {
      try {
        const j = JSON.parse(out);
        finish({ ok: !j.is_error && j.subtype === "success", json: j, cost: j.total_cost_usd || 0, error: j.is_error ? (j.result || j.subtype) : null });
      } catch {}
    };
    const timer = setTimeout(() => finish({ ok: false, error: `timeout after ${timeoutMs}ms`, cost: 0 }), timeoutMs);
    child.stdout.on("data", (c) => { out += c; tryParse(); });
    child.stderr.on("data", (c) => { errText += c; });
    child.on("close", () => { tryParse(); finish({ ok: false, error: errText.slice(0, 500) || "no output", cost: 0 }); });
  });
}

// Small worker pool: run fn over items with at most n in flight.
export async function pool(items, n, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }));
  return results;
}
