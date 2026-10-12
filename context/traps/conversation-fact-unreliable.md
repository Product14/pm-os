---
id: data-trap--conversation-fact-unreliable
kind: data-trap
area: data-warehouse
status: stable
owner: yash.sharma
source: appointments-30d-by-rooftop.sql header; memory project_vini_red_history.md (2026-09-11), project_inbound_performance_page.md (2026-08-14), project_sales_inbound_lead_funnel.md (2026-08-26)
verified: 2026-10-12
confidence: high
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Never use `vini_reporting.conversation_fact` for Vini reporting.

**Why:**
- Returns 12-17% fewer appointments than `dealer_leads.meetings` (measured as_of 2026-09-07; the header of `appointments-30d-by-rooftop.sql` predicts ~13%). Fewer appointments biases any band toward Red.
- `is_speed_to_lead` = 0 rows every week since 2026-07-20 (its `outboundTaskId IS NULL` clause stopped matching).
- `after_hours` buckets every rooftop in America/New_York (ClickHouse `multiIf` timezone bug, see data-trap--clickhouse-null-and-type-traps).
- `had_transfer` string-matches a destination-free "Department transfer completed", throwing the department away.

**Instead:** `dealer_leads.meetings` for appointments; the per-rooftop, per-capability spine in `Vini-Success-Dashboard/products/sales-inbound/queries/abr-trends.sql`; `dealer_leads.callTransferEvents` for transfer destination; `followupId` / `outboundTaskId` for STL.
