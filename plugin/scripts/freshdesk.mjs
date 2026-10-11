#!/usr/bin/env node
// Freshdesk write path for the PM OS. Reads go through Arali; this script exists
// only for what Arali cannot do: confirm the key works, read one ticket's raw
// fields, and post PRIVATE notes. Public replies are intentionally unsupported:
// anything a dealer sees is drafted in-session and posted by the PM.
//
// Usage:
//   node freshdesk.mjs whoami
//   node freshdesk.mjs ticket <id>
//   node freshdesk.mjs note <id> <file-with-note-body>    (HTML or plain text)
//
// Credentials: FRESHDESK_API_KEY and FRESHDESK_DOMAIN from the environment, else
// from ~/.pm-os/secrets.env. Never pass the key on the command line.

import { readFileSync, existsSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

function loadCreds() {
  const env = { ...process.env };
  const file = join(homedir(), ".pm-os", "secrets.env");
  if ((!env.FRESHDESK_API_KEY || !env.FRESHDESK_DOMAIN) && existsSync(file)) {
    const mode = statSync(file).mode & 0o077;
    if (mode) console.error(`warning: ${file} is readable by others; run chmod 600 ${file}`);
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    }
  }
  if (!env.FRESHDESK_API_KEY) fail("FRESHDESK_API_KEY not set. Run /pm-os:setup and follow the Freshdesk step.", 2);
  const domain = (env.FRESHDESK_DOMAIN || "spyne").replace(/^https?:\/\//, "").replace(/\.freshdesk\.com.*$/, "");
  return { key: env.FRESHDESK_API_KEY, domain };
}

function fail(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

async function call(creds, method, path, body) {
  const res = await fetch(`https://${creds.domain}.freshdesk.com/api/v2${path}`, {
    method,
    headers: {
      Authorization: "Basic " + Buffer.from(`${creds.key}:X`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30_000),
  });
  const text = await res.text();
  if (!res.ok) fail(`Freshdesk ${method} ${path} -> HTTP ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

const [cmd, id, file] = process.argv.slice(2);
const creds = loadCreds();

if (cmd === "whoami") {
  const me = await call(creds, "GET", "/agents/me");
  console.log(JSON.stringify({ ok: true, agent_id: me.id, name: me.contact?.name, email: me.contact?.email }));
} else if (cmd === "ticket") {
  if (!/^\d+$/.test(id || "")) fail("usage: ticket <numeric id>");
  const t = await call(creds, "GET", `/tickets/${id}?include=conversations`);
  console.log(JSON.stringify({
    id: t.id, subject: t.subject, status: t.status, priority: t.priority, type: t.type,
    tags: t.tags, group_id: t.group_id, responder_id: t.responder_id, custom_fields: t.custom_fields,
    created_at: t.created_at, updated_at: t.updated_at,
    conversations: (t.conversations || []).map(c => ({ private: c.private, incoming: c.incoming, created_at: c.created_at, body_text: c.body_text?.slice(0, 2000) })),
  }, null, 2));
} else if (cmd === "note") {
  if (!/^\d+$/.test(id || "") || !file) fail("usage: note <numeric id> <file-with-note-body>");
  const body = readFileSync(file, "utf8").trim();
  if (!body) fail("note body is empty");
  const n = await call(creds, "POST", `/tickets/${id}/notes`, { body, private: true });
  console.log(JSON.stringify({ ok: true, note_id: n.id, ticket_id: Number(id), private: n.private }));
} else if (cmd === "reply") {
  fail("Public replies are not supported by design. Draft the reply in-session and let the PM post it.", 3);
} else {
  fail("usage: freshdesk.mjs whoami | ticket <id> | note <id> <file>");
}
