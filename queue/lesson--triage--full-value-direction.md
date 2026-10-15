---
id: lesson--triage--full-value-direction
kind: lesson
target: triage
area: vini-sales
status: candidate
owner: yash.sharma
source: product/work/vini-sales/fd24140-stl-and-widget-configuration/decisions.md
verified: 2026-10-15
confidence: high
---

**Rule:** In every case file, label one candidate direction **Full value:**: the path that unlocks the dealer's full go-live, CRM-first, with its build scoped, even when a cheaper first step exists.

**Why:** On ticket 24140 the case offered only partial directions (hold appointment and credit-app leads out of STL). At Gate 1 the PM said that without planning the lead-type-aware first message, CRM-first, the dealership never reaches full go-live, so the resolution would be incomplete.

**Instead:** List the cheap first step and the full-value path side by side, and scope the full-value build in one or two lines: what changes, which system it touches, and whether other rooftops would use it.
