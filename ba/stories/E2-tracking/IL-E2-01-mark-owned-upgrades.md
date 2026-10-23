---
key: IL-E2-01
title: Mark the upgrades I own
epic: E2 Collection tracking
label: epic:tracking
status: published
github_issue: 7
---

# Summary
**As an** ironman player,
**I want to** mark the upgrades I already have,
**so that** IronLog knows what I'm still missing.

Marking happens on the upgrades shown by [IL-E1-01 (#4)](https://github.com/JustinS95/IronLog/issues/4), using the rows of [`ba/catalogue/ironlog_catalogue_v1.csv`](../../catalogue/ironlog_catalogue_v1.csv). Parts are covered by [IL-E2-02](https://github.com/JustinS95/IronLog/issues/8), Shard of Genesis by [IL-E2-03](https://github.com/JustinS95/IronLog/issues/9), and keeping progress between visits by [IL-E2-04](https://github.com/JustinS95/IronLog/issues/10).

# Business Value
Everything IronLog recommends depends on knowing what the player already owns. This is the player's input to the whole app.

# Acceptance Criteria
- [ ] 1. The player can mark any upgrade in a style list as owned, and can unmark it again.
- [ ] 2. Each armour piece is marked on its own. Example: owning three of the five Tumeken's resplendence pieces shows those three as owned and two as missing.
- [ ] 3. An upgrade that appears in more than one style is a single item. Marking or unmarking it in one style changes it in every style that lists it, including the Free Upgrades sections. Example: marking Scripture of Jas under Melee shows it as owned under Ranged, Magic and Necromancy.
- 4. **Retired 2026-10-21 ([D69](../../discovery/Discovery_Summary_IronLog_20261020.md#d69 "Necromancy needs only one Soulbound lantern. PVME's second lantern N3-05, 'Upgrade to T100 Flanking switch' is…")):** no style needs an upgrade more than once. ~~When a style needs an upgrade more than once, the player enters how many they own, from 0 up to the number needed. The listed instances count as owned in PVME order, up to that number. Example: with 1 of 2 Soulbound lanterns, the Stage 2 entry ([N2-07](../../catalogue/ironlog_catalogue_v1.csv)) is owned and the Stage 3 entry ([N3-05](../../catalogue/ironlog_catalogue_v1.csv)) is missing.~~
- [ ] 5. Each option in a "one of" entry can be marked on its own. Example: Dragon claws and Varanus' mercy.
- [ ] 6. Shard of Genesis Essence upgrades can't be marked here. They follow their weapon's "shard applied" mark ([IL-E2-03](https://github.com/JustinS95/IronLog/issues/9)).

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| [D4](../../discovery/Discovery_Summary_IronLog_20261020.md#d4 "The player marks the drops they own, and results are shown per combat style") player marks owned drops; [D48](../../discovery/Discovery_Summary_IronLog_20261020.md#d48 "The player can unmark anything they marked by mistake") unmarking | 1 | Confirmed |
| [D30](../../discovery/Discovery_Summary_IronLog_20261020.md#d30 "Armour sets are tracked and counted per piece, so partial sets are visible") per piece | 2 | Confirmed |
| [D17](../../discovery/Discovery_Summary_IronLog_20261020.md#d17 "An item on more than one style's list counts once in the cross-style total, and is shown under every style tha…"), [D49](../../discovery/Discovery_Summary_IronLog_20261020.md#d49 "An item on several style lists is marked once and shows as owned in every style") shared item marked once | 3 | Confirmed |
| [D15](../../discovery/Discovery_Summary_IronLog_20261020.md#d15 "When an item is needed more than once, show the quantity needed and let the player enter how many they own") quantity for repeated upgrades | 4 | Superseded by [D69](../../discovery/Discovery_Summary_IronLog_20261020.md#d69 "Necromancy needs only one Soulbound lantern. PVME's second lantern N3-05, 'Upgrade to T100 Flanking switch' is…"): AC retired |
| [D38](../../discovery/Discovery_Summary_IronLog_20261020.md#d38 "When a PVME entry offers a choice, every option is shown, labelled as an alternative. To be revisited") alternatives shown as separate options | 5 | Confirmed ([D38](../../discovery/Discovery_Summary_IronLog_20261020.md#d38 "When a PVME entry offers a choice, every option is shown, labelled as an alternative. To be revisited") to be revisited) |
| [D16](../../discovery/Discovery_Summary_IronLog_20261020.md#d16 "Shard of Genesis Essence: each T95 weapon it upgrades gets a 'shard applied' checkbox"), [D18](../../discovery/Discovery_Summary_IronLog_20261020.md#d18 "Shard of Genesis upgrades are counted per weapon. An owned but unapplied shard doesn't count as obtained Resol…"), [D50](../../discovery/Discovery_Summary_IronLog_20261020.md#d50 "The 'shard applied' checkbox for a T95 weapon is shown only once that weapon is marked owned") Genesis via weapon | 6 | Confirmed |

# Design
Prototype mockup from the Design step ([D44](../../discovery/Discovery_Summary_IronLog_20261020.md#d44 "Board workflow: a story moves to Design, where a page mockup is made and added to the story, before an enginee…")): [IronLog E2–E3 Collection Tracking](https://claude.ai/artifact/K83EZvH6ibNvUJRixMfuLA). One interactive page covers IL-E2-01 to [IL-E2-04](https://github.com/JustinS95/IronLog/issues/10) (#7–#10) and [IL-E3-01 (#11)](https://github.com/JustinS95/IronLog/issues/11). Press Play to mark upgrades, parts and “shard applied”; the page starts with example marks. Notes above the page map each acceptance criterion to where it's shown.

- Approved by Justin on 2026-10-21 as a prototype. Expect the layout to change. Where the mockup and the acceptance criteria differ, the acceptance criteria apply.
- The prototype doesn't save between visits. [IL-E2-04 (#10)](https://github.com/JustinS95/IronLog/issues/10) describes the real behaviour.
- A “Next upgrade” banner above the list names the highlighted upgrade and links to its row ([D68](../../discovery/Discovery_Summary_IronLog_20261020.md#d68 "The style list shows a 'Next upgrade' banner above the stages that names the highlighted next upgrade and link…")).
- Item icons come from the RuneScape Wiki, with the Jagex Fan Content Policy notice on the page ([D65](../../discovery/Discovery_Summary_IronLog_20261020.md#d65 "IronLog shows item icons from the RuneScape Wiki. These images belong to Jagex, not to the wiki's CC BY-NC-SA …")). The mockup shows placeholders.
