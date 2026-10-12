#!/usr/bin/env node
// PM OS Freshdesk server. Reads tickets and posts PRIVATE notes only. Public
// replies are deliberately not a tool: anything a dealer sees is drafted in the
// session and posted by the PM. The API key comes from the plugin's Configure
// dialog (stored in the system credential store), never from the chat.
import { serve, configured } from "./mcp-stdio.mjs";

const KEY = process.env.FRESHDESK_API_KEY;
const DOMAIN = (process.env.FRESHDESK_DOMAIN || "spyne").replace(/^https?:\/\//, "").replace(/\.freshdesk\.com.*$/, "");
const NOT_SET = "Freshdesk API key is not set. Open the plugin manager (/plugin, or /plugins in VS Code), choose Installed, pm-os, Configure, and paste your own Freshdesk API key.";

async function call(method, path, body) {
  if (!configured(KEY)) throw new Error(NOT_SET);
  const res = await fetch(`https://${DOMAIN}.freshdesk.com/api/v2${path}`, {
    method,
    headers: { Authorization: "Basic " + Buffer.from(`${KEY}:X`).toString("base64"), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30_000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Freshdesk ${method} ${path} returned HTTP ${res.status}: ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

serve({
  name: "pm-os-freshdesk",
  version: "1.0.0",
  tools: [
    {
      name: "whoami",
      description: "Show whose Freshdesk API key is configured (agent name and email). Use to confirm the key belongs to the PM before posting anything.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      run: async () => {
        const me = await call("GET", "/agents/me");
        return { agent_id: me.id, name: me.contact?.name, email: me.contact?.email };
      },
    },
    {
      name: "get_ticket",
      description: "Read one Freshdesk ticket with its fields (status, priority, tags, custom fields) and conversation, newest last.",
      inputSchema: { type: "object", properties: { ticket_id: { type: "integer", description: "Numeric Freshdesk ticket id" } }, required: ["ticket_id"], additionalProperties: false },
      run: async ({ ticket_id }) => {
        const t = await call("GET", `/tickets/${Number(ticket_id)}?include=conversations`);
        return {
          id: t.id, subject: t.subject, status: t.status, priority: t.priority, type: t.type, tags: t.tags,
          group_id: t.group_id, responder_id: t.responder_id, custom_fields: t.custom_fields,
          created_at: t.created_at, updated_at: t.updated_at,
          conversations: (t.conversations || []).map((c) => ({ private: c.private, incoming: c.incoming, created_at: c.created_at, body_text: c.body_text?.slice(0, 2000) })),
        };
      },
    },
    {
      name: "add_private_note",
      description: "Post a PRIVATE internal note on a Freshdesk ticket. Dealers never see private notes. There is no tool for public replies by design.",
      inputSchema: { type: "object", properties: { ticket_id: { type: "integer" }, body: { type: "string", description: "Note text; simple HTML allowed" } }, required: ["ticket_id", "body"], additionalProperties: false },
      run: async ({ ticket_id, body }) => {
        if (!body?.trim()) throw new Error("note body is empty");
        const n = await call("POST", `/tickets/${Number(ticket_id)}/notes`, { body, private: true });
        return { ok: true, note_id: n.id, ticket_id: Number(ticket_id), private: n.private };
      },
    },
  ],
});
