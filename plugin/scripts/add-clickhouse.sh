#!/usr/bin/env bash
# Registers the PM's own read-only ClickHouse user as the clickhouse-local MCP
# server, reading credentials from ~/.pm-os/clickhouse.env. Never prints them.
set -euo pipefail
f="$HOME/.pm-os/clickhouse.env"
[ -f "$f" ] || { echo "missing $f"; exit 2; }
set -a; . "$f"; set +a
[ -n "${CLICKHOUSE_USER:-}" ] && [ -n "${CLICKHOUSE_PASSWORD:-}" ] || { echo "CLICKHOUSE_USER or CLICKHOUSE_PASSWORD is empty"; exit 2; }
command -v uvx >/dev/null || { echo "uvx not found: install uv first (brew install uv)"; exit 3; }
command -v claude >/dev/null || { echo "claude CLI not on PATH"; exit 4; }
claude mcp remove clickhouse-local --scope user >/dev/null 2>&1 || true
claude mcp add clickhouse-local --scope user \
  -e CLICKHOUSE_HOST=leio048s4j.us-east-1.aws.clickhouse.cloud -e CLICKHOUSE_PORT=8443 \
  -e CLICKHOUSE_USER="$CLICKHOUSE_USER" -e CLICKHOUSE_PASSWORD="$CLICKHOUSE_PASSWORD" \
  -e CLICKHOUSE_SECURE=true -e CLICKHOUSE_VERIFY=true \
  -- uvx --python 3.10 mcp-clickhouse >/dev/null
echo "clickhouse-local added for user $CLICKHOUSE_USER; restart Claude Code to load it"
