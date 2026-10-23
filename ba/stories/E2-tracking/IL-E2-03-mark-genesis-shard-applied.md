---
key: IL-E2-03
title: Mark a Shard of Genesis Essence as applied
epic: E2 Collection tracking
label: epic:tracking
status: published
github_issue: 9
---

# Summary
**As an** ironman player,
**I want to** mark which of my T95 weapons have had a Shard of Genesis Essence applied,
**so that** IronLog knows which shard upgrades I've completed.

PVME lists the Shard of Genesis Essence as an upgrade to specific weapons. The weapons in the catalogue are Ek-ZekKil, Dark Shard of Leng, Dark Sliver of Leng, Bow of the Last Guardian, Fractured Staff of Armadyl, Omni guard and Soulbound lantern. [IL-E1-01 (#4)](https://github.com/JustinS95/IronLog/issues/4) shows each as "Shard of Genesis Essence – <weapon>".

# Business Value
A shard sitting in the bank isn't an upgrade. The upgrade is the improved weapon. Tracking it on the weapon is the only accurate way to record it.

# Acceptance Criteria
- [ ] 1. A "shard applied" checkbox is shown for one of these weapons only while that weapon is marked owned. It doesn't appear for a weapon that isn't owned.
- [ ] 2. Ticking "shard applied" marks that weapon's "Shard of Genesis Essence – <weapon>" upgrade as owned in every style that lists it. Unticking marks it missing.
- [ ] 3. An owned Shard of Genesis Essence that hasn't been applied isn't tracked and doesn't count. There's no separate mark for a loose shard.
- [ ] 4. When the player unmarks the weapon, its "shard applied" mark is cleared and its Genesis upgrade shows as missing.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| [D16](../../discovery/Discovery_Summary_IronLog_20261020.md#d16 "Shard of Genesis Essence: each T95 weapon it upgrades gets a 'shard applied' checkbox"), [D50](../../discovery/Discovery_Summary_IronLog_20261020.md#d50 "The 'shard applied' checkbox for a T95 weapon is shown only once that weapon is marked owned") checkbox per weapon, shown only when the weapon is owned | 1 | Confirmed |
| [D16](../../discovery/Discovery_Summary_IronLog_20261020.md#d16 "Shard of Genesis Essence: each T95 weapon it upgrades gets a 'shard applied' checkbox"), [D18](../../discovery/Discovery_Summary_IronLog_20261020.md#d18 "Shard of Genesis upgrades are counted per weapon. An owned but unapplied shard doesn't count as obtained Resol…"), [D49](../../discovery/Discovery_Summary_IronLog_20261020.md#d49 "An item on several style lists is marked once and shows as owned in every style") applied counts as owned in every style | 2 | Confirmed |
| [D18](../../discovery/Discovery_Summary_IronLog_20261020.md#d18 "Shard of Genesis upgrades are counted per weapon. An owned but unapplied shard doesn't count as obtained Resol…") unapplied shard doesn't count | 3 | Confirmed |
| [D59](../../discovery/Discovery_Summary_IronLog_20261020.md#d59 "Unmarking keeps items and parts in step. Unmarking an upgrade unmarks its parts. Unmarking any part makes the …") unmarking the weapon clears "shard applied" | 4 | Confirmed |

# Design
Prototype mockup from the Design step ([D44](../../discovery/Discovery_Summary_IronLog_20261020.md#d44 "Board workflow: a story moves to Design, where a page mockup is made and added to the story, before an enginee…")): [IronLog E2–E3 Collection Tracking](https://claude.ai/artifact/K83EZvH6ibNvUJRixMfuLA). One interactive page covers [IL-E2-01](https://github.com/JustinS95/IronLog/issues/7) to [IL-E2-04](https://github.com/JustinS95/IronLog/issues/10) (#7–#10) and [IL-E3-01 (#11)](https://github.com/JustinS95/IronLog/issues/11). Press Play to mark upgrades, parts and “shard applied”; the page starts with example marks. Notes above the page map each acceptance criterion to where it's shown.

- Approved by Justin on 2026-10-21 as a prototype. Expect the layout to change. Where the mockup and the acceptance criteria differ, the acceptance criteria apply.
- The prototype doesn't save between visits. [IL-E2-04 (#10)](https://github.com/JustinS95/IronLog/issues/10) describes the real behaviour.
- A “Next upgrade” banner above the list names the highlighted upgrade and links to its row ([D68](../../discovery/Discovery_Summary_IronLog_20261020.md#d68 "The style list shows a 'Next upgrade' banner above the stages that names the highlighted next upgrade and link…")).
- Item icons come from the RuneScape Wiki, with the Jagex Fan Content Policy notice on the page ([D65](../../discovery/Discovery_Summary_IronLog_20261020.md#d65 "IronLog shows item icons from the RuneScape Wiki. These images belong to Jagex, not to the wiki's CC BY-NC-SA …")). The mockup shows placeholders.
