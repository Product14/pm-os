---
id: decision--crm-rep-activity-pause
kind: decision
area: vini-sales
status: candidate
owner: yash.sharma
source: product/work/vini-sales/fd23736-human-takeover-in-stl-and-chat/decide.md
verified: 2026-10-16
confidence: medium
outcome: defer
revisit_trigger: either (a) within 60 days after RETCONVAI-5165 is live, 2 or more rooftops raise a Freshdesk ticket or Arali complaint about Vini texting or calling a lead a rep already owns, or (b) DriveCentric confirms read access to rep activity on a lead
demand_rooftops: 1
work: product/work/vini-sales/fd23736-human-takeover-in-stl-and-chat
---

**Rule:** When a request asks for Vini to show or obey human ownership of a lead in the dealer's CRM, ship the handoff CRM note through RETCONVAI-5165 (worded "Vini texting paused ... calls continue as scheduled"); do not build call suppression on takeover or a CRM rep-activity pause until a revisit trigger fires.

**Why:** RETCONVAI-5165 already specifies the asked-for note on all four handoff events, so the gap was scheduling, not spec; calls stay live after takeover by design (RETCONVAI-4553), and the one call-after-takeover report was closed as "not an issue". Pausing on CRM rep activity rests on DriveCentric read access nobody has negotiated, with 0 dealer tickets asking for it and no way to count takeovers until 5165's notes create the record.

**Instead:** Point the requester to RETCONVAI-5165 and its note wording, and ask whether the store's reps press takeover in the Console or work leads only in the CRM. Count each new dealer complaint about Vini texting or calling a rep-owned lead toward trigger (a), and log any DriveCentric answer on activity read toward trigger (b). If either fires, reopen decide as build-generalised for the lead-level ownership state (call suppression plus CRM activity read), never as a branch for one rooftop.
