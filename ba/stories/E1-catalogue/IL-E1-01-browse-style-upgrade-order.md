---
key: IL-E1-01
title: Browse a combat style's upgrade order
epic: E1 Upgrade catalogue
label: epic:catalogue
status: published
github_issue: 4
---

# Summary
**As an** ironman player,
**I want to** see a combat style's upgrades in PVME's recommended order,
**so that** I know which upgrades to work toward for that style.

The upgrade order comes from PVME's four upgrade-order pages ([D1](../../discovery/Discovery_Summary_IronLog_20261020.md#d1 "PVME's four upgrade order pages Melee, Ranged, Magic, Necromancy define what counts as an upgrade and in what …")), taken from `pvme/pvme-guides` at commit `7a1f15f`. **The expected list for each style is [`ba/catalogue/ironlog_catalogue_v1.csv`](../../catalogue/ironlog_catalogue_v1.csv)** (111 tracked items appearing 136 times across the four styles; columns explained in the [catalogue README](../../catalogue/README.md)). PVME data is used under CC BY-NC-SA 4.0, with no commercial use ([D9](../../discovery/Discovery_Summary_IronLog_20261020.md#d9 "PVME upgrade-order data is used under CC BY-NC-SA 4.0 with attribution. Data derived from it is shared under t…")).

# Business Value
PVME's lists are the community's reference for gear progression, but they're written for main accounts and include things an ironman can't get from a kill. This gives an ironman the same order, limited to items they can actually collect.

# Acceptance Criteria
- [ ] 1. The player can choose Melee, Ranged, Magic or Necromancy, and IronLog shows exactly that style's rows from the approved catalogue file. No upgrades are missing and none are added.
- [ ] 2. Upgrades are grouped under PVME's stage headings for that style (Stage 1, 2, 3, using PVME's stage names) and appear in PVME's order within each stage.
- [ ] 3. Each item in a compound PVME entry appears as its own upgrade at that entry's position. Example: "Abyssal Scourge + Dark Ice Sliver" shows as two upgrades.
- [ ] 4. An armour set appears as one upgrade per piece. Example: Tumeken's resplendence shows five upgrades.
- [ ] 5. Excluded items don't appear. Examples: perks, soul forge Necromancy gear, hydrix crafts, quest/minigame rewards, skill-built items, Planted Feet, Decimation, Obliteration and Asylum Surgeon's Ring. A PVME entry whose items are all excluded doesn't appear at all.
- [ ] 6. An upgrade on more than one style's PVME list appears in each of those styles. Example: Scripture of Jas appears under all four.
- 7. **Retired 2026-10-21 ([D69](../../discovery/Discovery_Summary_IronLog_20261020.md#d69 "Necromancy needs only one Soulbound lantern. PVME's second lantern N3-05, 'Upgrade to T100 Flanking switch' is…")):** no style needs an upgrade more than once. ~~When a style needs the same upgrade more than once, the upgrade shows how many are needed. Example: Necromancy needs 2 Soulbound lanterns (entries [N2-07](../../catalogue/ironlog_catalogue_v1.csv) and [N3-05](../../catalogue/ironlog_catalogue_v1.csv)).~~
- [ ] 8. Each Shard of Genesis Essence entry appears as an upgrade to the specific weapon it's applied to, named with that weapon. Examples: "Shard of Genesis Essence – Ek-ZekKil" for Melee, and one each for the Omni guard and Soulbound lantern for Necromancy.
- [ ] 9. The Melee Essence of Finality (Annihilation) entry appears as the Annihilation upgrade.
- [ ] 10. When a PVME entry offers a choice ("one of" or "or"), every option appears at that entry's position, labelled as an alternative. Examples: Dragon claws / Varanus' mercy; Eclipsed Soul + Divine Rage / Malevolence.
- [ ] 11. Each style also shows a separate "Free Upgrades" section, outside PVME's stage order. It contains the Amulet of the forsaken (for Berserker's Fury) and that style's igneous cape: Kal-Xil (Ranged), Kal-Mej (Magic) or Kal-Mor (Necromancy). Melee's section contains only the Amulet of the forsaken, because Igneous Kal-Ket is already in Melee's Stage 1.
- [ ] 12. Each style's list credits PVME as the source of the upgrade order, links to that style's PVME upgrade-order page, and names the CC BY-NC-SA 4.0 license.

# Open Questions
1. **"One of" entries, revisit later.** AC 10 reflects the current decision ([D38](../../discovery/Discovery_Summary_IronLog_20261020.md#d38 "When a PVME entry offers a choice, every option is shown, labelled as an alternative. To be revisited")). Justin wants to come back to how alternatives behave. How they count toward totals is decided in E4.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| [D1](../../discovery/Discovery_Summary_IronLog_20261020.md#d1 "PVME's four upgrade order pages Melee, Ranged, Magic, Necromancy define what counts as an upgrade and in what …") PVME defines upgrades and order; [D20](../../discovery/Discovery_Summary_IronLog_20261020.md#d20 "PVME lists are treated as current. Updating them when PVME changes is future maintenance Resolves Q5") lists accepted as current; the approved [catalogue file](../../catalogue/ironlog_catalogue_v1.csv) | 1, 2 | Confirmed |
| [D3](../../discovery/Discovery_Summary_IronLog_20261020.md#d3 "A compound entry 'A + B' counts as two upgrades of equal weight") compound entries are separate upgrades | 3 | Confirmed |
| [D30](../../discovery/Discovery_Summary_IronLog_20261020.md#d30 "Armour sets are tracked and counted per piece, so partial sets are visible") per-piece armour | 4 | Confirmed |
| [D2](../../discovery/Discovery_Summary_IronLog_20261020.md#d2 "Entries that aren't boss drops are decided case by case with the stakeholder Ability codices count as drops. I…"), [D21](../../discovery/Discovery_Summary_IronLog_20261020.md#d21 "The app is named IronLog. Heist rewards are included because they're collection log items. Excluded: soul forg…"), [D24](../../discovery/Discovery_Summary_IronLog_20261020.md#d24 "Asylum Surgeon's Ring is excluded Resolves Q4b"), [D28](../../discovery/Discovery_Summary_IronLog_20261020.md#d28 "Excluded entries perks, crafted gear, etc. are hidden entirely from the style lists") exclusions hidden | 5 | Confirmed |
| [D17](../../discovery/Discovery_Summary_IronLog_20261020.md#d17 "An item on more than one style's list counts once in the cross-style total, and is shown under every style tha…") shared items shown in each style | 6 | Confirmed |
| [D15](../../discovery/Discovery_Summary_IronLog_20261020.md#d15 "When an item is needed more than once, show the quantity needed and let the player enter how many they own") quantity needed | 7 | Superseded by [D69](../../discovery/Discovery_Summary_IronLog_20261020.md#d69 "Necromancy needs only one Soulbound lantern. PVME's second lantern N3-05, 'Upgrade to T100 Flanking switch' is…"): AC retired |
| [D16](../../discovery/Discovery_Summary_IronLog_20261020.md#d16 "Shard of Genesis Essence: each T95 weapon it upgrades gets a 'shard applied' checkbox"), [D18](../../discovery/Discovery_Summary_IronLog_20261020.md#d18 "Shard of Genesis upgrades are counted per weapon. An owned but unapplied shard doesn't count as obtained Resol…") Genesis shard per weapon | 8 | Confirmed |
| [D14](../../discovery/Discovery_Summary_IronLog_20261020.md#d14 "An Essence of Finality entry is included, and the upgrade is the weapon whose special attack goes into the amu…"), [D23](../../discovery/Discovery_Summary_IronLog_20261020.md#d23 "Annihilation is included needed for the Melee Essence of Finality entry. Decimation and Obliteration stay excl…") Essence of Finality = stored weapon; Annihilation kept | 9 | Confirmed |
| [D38](../../discovery/Discovery_Summary_IronLog_20261020.md#d38 "When a PVME entry offers a choice, every option is shown, labelled as an alternative. To be revisited") alternatives shown as alternatives (to revisit) | 10 | Confirmed for now |
| [D22](../../discovery/Discovery_Summary_IronLog_20261020.md#d22 "Free Upgrades: include Berserker's Fury from the Amulet of the forsaken, a boss drop and the Zuk igneous capes…"), [D25](../../discovery/Discovery_Summary_IronLog_20261020.md#d25 "Igneous capes: Kal-Ket, Kal-Xil, Kal-Mej, Kal-Mor one per style. Kal-Zuk excluded Resolves Q7"), [D42](../../discovery/Discovery_Summary_IronLog_20261020.md#d42 "The Free Upgrades items Amulet of the forsaken; igneous capes are kept, shown in a separate 'Free Upgrades' se…") Free Upgrades additions in a separate section per style | 11 | Confirmed |
| [D9](../../discovery/Discovery_Summary_IronLog_20261020.md#d9 "PVME upgrade-order data is used under CC BY-NC-SA 4.0 with attribution. Data derived from it is shared under t…") PVME attribution and license | 12 | Confirmed |

# Design
Prototype mockup from the Design step ([D44](../../discovery/Discovery_Summary_IronLog_20261020.md#d44 "Board workflow: a story moves to Design, where a page mockup is made and added to the story, before an enginee…")): [IronLog E1 Upgrade Catalogue](https://claude.ai/artifact/495c6jnq2bnfxkFCjrgVSA). One interactive page covers this story and [IL-E1-02 (#5)](https://github.com/JustinS95/IronLog/issues/5) for all four combat styles. Select an upgrade to see its sources, parts and requirements. Notes above the page map each acceptance criterion to where it's shown.

- Approved by Justin on 2026-10-21 as a prototype. Expect the layout to change. Where the mockup and the acceptance criteria differ, the acceptance criteria apply.
- Item icons come from the RuneScape Wiki, with the Jagex Fan Content Policy notice on the page ([D65](../../discovery/Discovery_Summary_IronLog_20261020.md#d65 "IronLog shows item icons from the RuneScape Wiki. These images belong to Jagex, not to the wiki's CC BY-NC-SA …")). The mockup shows placeholders.
- The empty box at the start of each row is reserved for the owned mark ([IL-E2-01](https://github.com/JustinS95/IronLog/issues/7), #7), which isn't part of this story.
