---
id: system-fact--console-local-env-hits-prod
kind: system-fact
area: vini-platform
status: candidate
owner: yash.sharma
source: spyne-console-microfrontends repo-root .env + per-app next.config; memory project_agent_demos_admin.md (2026-10-01), project_service_demo_flow_gaps.md (2026-10-05)
verified: 2026-10-01
confidence: high
---

**Rule:** Assume a local spyne-console-microfrontends run reads and writes PROD unless per-app `.env.local` overrides it.

**Why:**
- Every app's `next.config` loads the repo-root `.env`, which points ~10 backend URLs at the prod API, even on the uat branch. Deployed builds are env-specific.
- Some endpoints exist only on release/prod (e.g. `GET /conversation/demo-request`, booking-leads) and 404 on UAT, sometimes silently.
- The console's agent-demo-flow iframe URL is hard-coded to the Vercel production (`main`) build for every env, so `uat`-only work is invisible inside the console.

**Instead:** gitignored `apps/<app>/.env.local` that sets the same keys to the UAT API (Next's `loadEnvConfig` runs first; dotenv does not override). Always state which backend a local run hits.
