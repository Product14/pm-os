#!/usr/bin/env node
// PM OS ClickHouse server: read-only queries over ClickHouse's HTTPS interface,
// so PMs need no Python or extra installs. Each PM uses their own read-only
// user from the plugin's Configure dialog; every query also runs with
// readonly=1, so writes are refused even if a user had write grants.
import { serve, configured } from "./mcp-stdio.mjs";

const HOST = process.env.CLICKHOUSE_HOST;
const PORT = process.env.CLICKHOUSE_PORT || "8443";
const USER = process.env.CLICKHOUSE_USER;
const PASS = process.env.CLICKHOUSE_PASSWORD;
const NOT_SET = "ClickHouse user is not set. Ask data/eng for a read-only ClickHouse Cloud user, then open the plugin manager (/plugin, or /plugins in VS Code), choose Installed, pm-os, Configure, and fill in the ClickHouse user and password.";
const MAX_ROWS = 1000;

// Read statements only, one at a time. ClickHouse's readonly=1 already refuses
// writes, but some no-op DDL (DROP ... IF EXISTS on a missing table) succeeds
// silently, so refuse anything that is not a read before it leaves the laptop.
const READ_ONLY = /^\s*(\(\s*)*(select|with|show|describe|desc|explain|exists)\b/i;
function assertReadOnly(sql) {
  const body = sql.replace(/--[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "").trim().replace(/;\s*$/, "");
  if (body.includes(";")) throw new Error("Send one statement at a time.");
  if (!READ_ONLY.test(body)) throw new Error("Only read queries are allowed (SELECT, WITH, SHOW, DESCRIBE, EXPLAIN, EXISTS).");
  return body;
}

async function query(sql, rows = MAX_ROWS) {
  if (!configured(USER) || !configured(PASS)) throw new Error(NOT_SET);
  sql = assertReadOnly(sql);
  const params = new URLSearchParams({ readonly: "1", default_format: "JSON", max_result_rows: String(rows), result_overflow_mode: "break", max_execution_time: "60" });
  const res = await fetch(`https://${HOST}:${PORT}/?${params}`, {
    method: "POST",
    headers: { "X-ClickHouse-User": USER, "X-ClickHouse-Key": PASS },
    body: sql,
    signal: AbortSignal.timeout(90_000),
  });
  const text = await res.text();
  let j; try { j = JSON.parse(text); } catch { j = null; }
  if (!res.ok || j?.exception) throw new Error(`ClickHouse error: ${(j?.exception || text).slice(0, 600)}`);
  if (!j) throw new Error("ClickHouse returned no rows.");
  return j;
}

serve({
  name: "pm-os-clickhouse",
  version: "1.0.0",
  tools: [
    {
      name: "list_databases",
      description: "List the ClickHouse databases this PM can read.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      run: async () => (await query("SELECT name FROM system.databases ORDER BY name")).data.map((r) => r.name),
    },
    {
      name: "list_tables",
      description: "List tables in one database, with row counts and comments.",
      inputSchema: { type: "object", properties: { database: { type: "string" } }, required: ["database"], additionalProperties: false },
      run: async ({ database }) => {
        if (!/^[A-Za-z0-9_\-]+$/.test(database)) throw new Error("invalid database name");
        return (await query(`SELECT name, total_rows, comment FROM system.tables WHERE database = '${database}' ORDER BY name`)).data;
      },
    },
    {
      name: "run_query",
      description: `Run one read-only SQL query and return up to ${MAX_ROWS} rows as JSON. Check the PM OS data traps in context/INDEX.md before writing metric queries.`,
      inputSchema: { type: "object", properties: { query: { type: "string" }, max_rows: { type: "integer", minimum: 1, maximum: MAX_ROWS } }, required: ["query"], additionalProperties: false },
      run: async ({ query: sql, max_rows }) => {
        const j = await query(sql.trim().replace(/;\s*$/, ""), max_rows || MAX_ROWS);
        return { rows: j.rows, truncated: j.rows_before_limit_at_least > j.rows, columns: j.meta?.map((m) => `${m.name} ${m.type}`), data: j.data };
      },
    },
  ],
});
