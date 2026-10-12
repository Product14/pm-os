// Minimal MCP server over stdio (newline-delimited JSON-RPC 2.0), no
// dependencies. Enough for tools/list and tools/call, which is all the PM OS
// servers need.
import { createInterface } from "node:readline";

export function serve({ name, version, tools }) {
  const byName = Object.fromEntries(tools.map((t) => [t.name, t]));
  const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\n");
  const reply = (id, result) => send({ jsonrpc: "2.0", id, result });
  const fail = (id, code, message) => send({ jsonrpc: "2.0", id, error: { code, message } });

  createInterface({ input: process.stdin }).on("line", async (line) => {
    let msg;
    try { msg = JSON.parse(line); } catch { return; }
    const { id, method, params } = msg;
    if (id === undefined) return; // notifications need no reply
    if (method === "initialize") {
      return reply(id, {
        protocolVersion: params?.protocolVersion || "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: { name, version },
      });
    }
    if (method === "ping") return reply(id, {});
    if (method === "tools/list") {
      return reply(id, { tools: tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) });
    }
    if (method === "tools/call") {
      const tool = byName[params?.name];
      if (!tool) return fail(id, -32602, `unknown tool ${params?.name}`);
      try {
        const out = await tool.run(params.arguments || {});
        return reply(id, { content: [{ type: "text", text: typeof out === "string" ? out : JSON.stringify(out, null, 2) }] });
      } catch (e) {
        return reply(id, { content: [{ type: "text", text: String(e.message || e) }], isError: true });
      }
    }
    return fail(id, -32601, `method not found: ${method}`);
  });
}

// A value of the form ${user_config.x} means the PM has not filled it in yet.
export function configured(v) {
  return typeof v === "string" && v.trim() !== "" && !v.includes("${");
}
