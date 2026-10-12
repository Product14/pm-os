---
id: data-trap--live-inventory-rows-may-be-sold
kind: data-trap
area: integrations
status: stable
owner: yash.sharma
source: /Users/yash/.claude/projects/-Users-yash-Documents-claude-code/memory/project_demo_vins_carfax.md
verified: 2026-10-12
confidence: medium
repair_attempts: 1
repaired_from: data-trap--inventory-and-vin-metadata
reviewed_by: pm-os-reviewer/rubric-v1
review_date: 2026-10-12
review_risk: low
---

**Rule:** Re-check a VDP's liveness on the dealer site before showing it in a demo.

**Why:** Many inventory rows marked "live" in the DB are already sold on the dealer site, where they return a 404 or redirect to `?vehicleStatus=unavailable`. Many dealer sites sit behind Cloudflare or Akamai and return 403 to automated checks such as curl, so liveness cannot be confirmed by script. A dead VDP in front of a prospect breaks the demo.

**Instead:** Shortly before the demo, open each VDP in a browser and swap out any VIN that 404s or redirects to unavailable. Do not trust the DB live flag or a scripted check.
