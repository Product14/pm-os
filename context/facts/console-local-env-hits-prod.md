---
id: system-fact--console-local-env-hits-prod
kind: system-fact
area: vini-platform
status: stable
owner: yash.sharma
source: spyne-console-microfrontends repo-root .env + per-app next.config; memory project_agent_demos_admin.md (2026-10-01), project_service_demo_flow_gaps.md (2026-10-05)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Assume a local spyne-console-microfrontends run reads and writes PROD unless a per-app `.env.local` overrides it.

**Why:**
- Every app's `next.config` loads the repo-root `.env` via dotenv. That file points about 10 backend URLs at the prod API, even on the uat branch.
- Deployed builds are env-specific, so "it's env-specific" is true of deploys and false of a plain local run.

**Instead:** create a gitignored `apps/<app>/.env.local` that sets the same keys to the UAT API (Next's `loadEnvConfig` runs first, and dotenv does not override). Always state which backend a local run hits.
