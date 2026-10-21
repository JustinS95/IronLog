---
key: IL-E1-02
title: See where an upgrade comes from
epic: E1 Upgrade catalogue
label: epic:catalogue
status: published
github_issue: 5
---

# Summary
**As an** ironman player,
**I want to** see which bosses, slayer creatures, heists, minigames or slayer rewards give each upgrade, and what it takes to get it,
**so that** I know where to go for the upgrades I want.

Upgrades are the rows of [`ba/catalogue/ironlog_catalogue_v1.csv`](../../catalogue/ironlog_catalogue_v1.csv); each row's `inventory_item` keys into the source data. **Sources to show are the canonical ones** in [`ba/catalogue/ironlog_item_sources_v1.csv`](../../catalogue/ironlog_item_sources_v1.csv) (each upgrade, or each tracked part, mapped to one of the 76 sources in [`ironlog_sources_v1.csv`](../../catalogue/ironlog_sources_v1.csv)). Research data: `drop_sources`, `access_requirements` and `wiki_url` in [`upgrade_inventory_review.csv`](../../discovery/data/upgrade_inventory_review.csv) (included rows), and the parts in [`parts.csv`](../../discovery/data/parts.csv). Both were researched from the RuneScape Wiki on 2026-10-20. Wiki content is licensed CC BY-NC-SA 3.0.

# Business Value
An ironman can only get an upgrade by going to its source. Showing the sources, parts and requirements next to each upgrade replaces cross-checking PVME against the wiki by hand.

# Acceptance Criteria
- [ ] 1. Each upgrade in a style list shows its sources: the bosses, slayer creatures, heists, minigames or slayer rewards that drop the upgrade or any of its tracked parts. Examples: Fight Kiln (minigame) for the TokHaar-Kal-Ket part of Igneous Kal-Ket; the Wilderness slayer chest (slayer reward) for Annihilation.
- [ ] 2. Hard Mode is listed as a separate source from normal mode. Example: "TzKal-Zuk" and "TzKal-Zuk (Hard Mode)". When something drops only in Hard Mode, only the Hard Mode source is listed. Example: the Ek-ZekKil parts.
- [ ] 3. For an upgrade made from parts, IronLog lists each tracked part with the quantity needed and that part's sources. Example: Laniakea's spear lists its four Savage spear parts, each from any Rex Matriarch. The Elite dracolich pieces list only the Vorkath's scale route (D39).
- [ ] 4. Only collection-log parts are listed, never skilling materials. An upgrade with no tracked parts shows only its own sources. Examples: the Sirenic armour pieces and the Grasping rune pouches.
- [ ] 5. A heist source is named as the heist (example: "Vault of Hereditas (heist)"). Annihilation's source is the Wilderness slayer chest.
- [ ] 6. Requirements recorded for an upgrade are shown with it. These are quest, skill or Slayer levels needed to reach its source or to assemble it. Requirements never hide or filter any upgrade or source.
- [ ] 7. Each upgrade links to its RuneScape Wiki page. IronLog credits the RuneScape Wiki as the source of drop information and names the CC BY-NC-SA 3.0 license.

# Open Questions
1. **Data with medium or low confidence** (marked in the data's `confidence` column), for example Vestments of havoc and the Masterwork 2h sword. These are shown as researched. Verifying them is tracked separately and doesn't block this story.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| D11 upgrades listed with what drops them; D66 minigame and slayer-reward sources included | 1 | Confirmed |
| D26 Hard Mode as separate sources | 2 | Confirmed |
| D29, D32 parts tracked, collection-log only; D39 Elite dracolich Route A only | 3, 4 | Confirmed |
| D21 heists included; D23 Annihilation kept | 5 | Confirmed |
| D7 requirements shown, never filtering | 6 | Confirmed |
| RuneScape Wiki license (discovery evidence table) | 7 | Confirmed constraint |

# Design
Prototype mockup from the Design step (D44): [IronLog E1 Upgrade Catalogue](https://claude.ai/artifact/495c6jnq2bnfxkFCjrgVSA). One interactive page covers this story and IL-E1-01 (#4) for all four combat styles. Select an upgrade to see its sources, parts and requirements. Notes above the page map each acceptance criterion to where it's shown.

- Approved by Justin on 2026-10-21 as a prototype. Expect the layout to change. Where the mockup and the acceptance criteria differ, the acceptance criteria apply.
- Item icons come from the RuneScape Wiki, with the Jagex Fan Content Policy notice on the page (D65). The mockup shows placeholders.
- The empty box at the start of each row is reserved for the owned mark (IL-E2-01, #7), which isn't part of this story.
