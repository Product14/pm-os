---
id: data-trap--inventory-and-vin-metadata
kind: data-trap
area: integrations
status: candidate
owner: yash.sharma
source: memory project_demo_vins_carfax.md (2026-09-25), project_agent_personality_discovery.md (2026-08-05), project_outbound_demo_flow.md (2026-10-07)
verified: 2026-09-25
confidence: medium
reject_reasons: reviewer rejected; C1: bundles about eight independent traps (Carfax count, VDP URL key, featureSnap, color arrays, thumbnails, sold rows and 403s, search tool gaps, outbound prefetch).; C1: the Instead line lists five unrelated actions, so the Rule cannot be a single action.; C4: 'availableModels never returned' and the sparse search filters describe a current tool bug that is likely to be fixed, not a durable fact about the data.; C6: the claims trace accurately to the cited memories; the problem is how the entry is scoped, not the evidence behind it.
fix_hint: Split this into separate one-rule entries (VDP URL key by row age, featureSnap fixed keys always false, Carfax record count via JSONLength, full images from rooftopinventories), each citing the demo VINs memory, and leave out the search tool bugs or file them as issues.
---

**Rule:** Verify inventory JSON keys before use; `featureSnap` and the VDP URL key lie.

**Why:**
- Carfax: `inventory.carfaxHistory.historyData` (filter `status='success'`). "N Detailed Records" text undercounts; overview text casing varies.
- Listing: `inventory.dealerVinMapping.vinDetails` (`vehicleSnap`, `featureSnap`, `safetyDetails`). VDP URL is `vehicleSnap.vinUrl` on old rows, `websiteVdpUrl` on 2026 rows. Multi-value color arrays are decoded option lists, not the vehicle's color. `featureSnap`'s 17 fixed checkbox keys are false even on loaded vehicles; real features are dealer free-text keys set true.
- `dealerVinMapping` has thumbnails only. Many "live" rows are sold on the dealer site; many dealer sites 403 automated checks.
- Inventory search tool: `availableModels` is instructed in prompts but never returned; MPG is in the feed but not filterable; seating / safety / horsepower / towing are sparse. The outbound sales prefetch always searches the dealer's own inventory.

**Instead:** `JSONLength(detailed_history)`; read both VDP keys; case-insensitive regex on overview text; full image list from `PartnerSystem.rooftopinventories.processedImageUrls`; check VDP liveness before any demo.
