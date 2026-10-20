---
key: IL-E1-01
title: Browse a combat style's upgrade order
epic: E1 Upgrade catalogue
label: epic:catalogue
status: draft
---

# Summary
**As an** ironman player,
**I want to** see a combat style's upgrades in PVME's recommended order,
**so that** I know which upgrades to work toward for that style.

The upgrade order comes from PVME's four upgrade-order pages (D1), taken from `pvme/pvme-guides` at commit `7a1f15f`. IronLog tracks the included rows of [`ba/discovery/data/upgrade_inventory_review.csv`](../../discovery/data/upgrade_inventory_review.csv), meaning every row whose `justin_decision` doesn't start with "Exclude" (108 items). The PVME entry positions are in [`pvme_entries.csv`](../../discovery/data/pvme_entries.csv). PVME data is used under CC BY-NC-SA 4.0, with no commercial use (D9).

# Business Value
PVME's lists are the community's reference for gear progression, but they're written for main accounts and include things an ironman can't get from a kill. This gives an ironman the same order, limited to items they can actually collect.

# Acceptance Criteria
- [ ] 1. The player can choose Melee, Ranged, Magic or Necromancy, and IronLog shows that style's tracked upgrades.
- [ ] 2. Upgrades are grouped under PVME's stage headings for that style (Stage 1, 2, 3, using PVME's stage names) and appear in PVME's order within each stage.
- [ ] 3. Each item in a compound PVME entry appears as its own upgrade at that entry's position. Example: "Abyssal Scourge + Dark Ice Sliver" shows as two upgrades.
- [ ] 4. An armour set appears as one upgrade per piece. Example: Tumeken's resplendence shows five upgrades.
- [ ] 5. Excluded items don't appear: perks, soul forge Necromancy gear, hydrix crafts, quest/minigame rewards, skill-built items, Planted Feet, Decimation, Obliteration and Asylum Surgeon's Ring. A PVME entry whose items are all excluded doesn't appear at all.
- [ ] 6. An upgrade on more than one style's PVME list appears in each of those styles. Example: Scripture of Jas appears under all four.
- [ ] 7. When a style needs the same upgrade more than once, the upgrade shows how many are needed. Example: Necromancy needs 2 Soulbound lanterns (entries N2-07 and N3-05).
- [ ] 8. Each Shard of Genesis Essence entry appears as an upgrade to the specific weapon it's applied to, named with that weapon. Examples: "Shard of Genesis Essence – Ek-ZekKil" for Melee, and one each for the Omni guard and Soulbound lantern for Necromancy.
- [ ] 9. The Melee Essence of Finality (Annihilation) entry appears as the Annihilation upgrade.
- [ ] 10. The Free Upgrades additions appear in each style's list: the Amulet of the forsaken (for Berserker's Fury), plus the igneous cape for that style (Kal-Ket, Kal-Xil, Kal-Mej or Kal-Mor). *Provisional: position and styles depend on Open Question 1.*
- [ ] 11. Each style's list credits PVME as the source of the upgrade order, links to that style's PVME upgrade-order page, and names the CC BY-NC-SA 4.0 license.

# Open Questions
1. **Free Upgrades additions.** Where do they appear in each list, and does the Amulet of the forsaken appear under all four styles? Proposed: in all four, at the position of PVME's "All other upgrades in Free Upgrades" line (start of Stage 2). Kal-Ket keeps its own Melee position (Stage 1). *Owner: Justin. Blocks AC 10 only.*
2. **"One of" entries.** Melee has "Essence of Finality plus *one of* Dragon claws / Varanus' mercy" and "Eclipsed Soul + Divine Rage *or* Malevolence". Are both options shown? Proposed: both are shown, labelled as alternatives. How alternatives count toward totals is decided in E4. *Owner: Justin. Affects AC 3.*

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| D1 PVME defines upgrades and order; D20 lists accepted as current | 1, 2 | Confirmed |
| D3 compound entries are separate upgrades | 3 | Confirmed |
| D30 per-piece armour | 4 | Confirmed |
| D2, D21, D24, D28 exclusions hidden | 5 | Confirmed |
| D17 shared items shown in each style | 6 | Confirmed |
| D15 quantity needed | 7 | Confirmed |
| D16, D18 Genesis shard per weapon | 8 | Confirmed |
| D14, D23 Essence of Finality = stored weapon; Annihilation kept | 9 | Confirmed |
| D22, D25 Free Upgrades additions | 10 | Confirmed items; position provisional |
| D9 PVME attribution and license | 11 | Confirmed |
