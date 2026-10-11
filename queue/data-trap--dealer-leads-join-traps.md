---
id: data-trap--dealer-leads-join-traps
kind: data-trap
area: data-warehouse
status: candidate
owner: yash.sharma
source: memory project_stl_rooftop_dashboard.md (2026-09-21), project_inbound_performance_page.md (2026-08-14), project_sales_inbound_lead_funnel.md (2026-08-26), project_sales_daily_summary.md (2026-09-29)
verified: 2026-09-29
confidence: high
---

**Rule:** Read leads from `dealer_leads_raw` deduped, and collapse sequence tables to one row before joining.

**Why:**
- Curated `dealer_leads.leads` lags (was short 91 leads at one rooftop, Sep 2026). Only `dealer_leads_raw.leads` deduped by `_id` reproduced the STL audit totals.
- `sequenceWorkflows` has several rows per lead; a LEFT JOIN fans out (117 vs true 109 eligible at one rooftop).
- `sequenceTasks` rejects `FINAL`; without collapsing, ~30% of task types come back NULL.
- `conversationLeadEval` has duplicate rows sharing `updatedAt`; argMax totals drift by ~2.
- CI ClickHouse credentials may lack a grant on `dealer_leads_raw`.

**Instead:** `dealer_leads_raw.leads` with `argMax(..., _peerdb_version)` per `_id`; one row per `leadId` from `sequenceWorkflows`; `GROUP BY taskId, max(taskType)` for `sequenceTasks`; tie-break `conversationLeadEval` explicitly.
