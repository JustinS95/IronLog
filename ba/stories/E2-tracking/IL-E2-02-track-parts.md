---
key: IL-E2-02
title: Track parts toward an upgrade
epic: E2 Collection tracking
label: epic:tracking
status: published
github_issue: 8
---

# Summary
**As an** ironman player,
**I want to** mark the parts I have for an upgrade that's assembled from parts,
**so that** my progress toward it is recorded before I have the finished item.

The parts come from [`ba/discovery/data/parts.csv`](../../discovery/data/parts.csv) and are shown by [IL-E1-02 (#5)](https://github.com/JustinS95/IronLog/issues/5). Only collection-log parts are tracked ([D32](../../discovery/Discovery_Summary_IronLog_20261020.md#d32 "Only collection-log parts are tracked parts dropped by bosses, slayer creatures or heists. Skilling materials …")).

# Business Value
Many upgrades take several drops, sometimes from different bosses. Tracking parts stops a nearly finished upgrade from looking the same as one the player hasn't started.

# Acceptance Criteria
- [ ] 1. For an upgrade with tracked parts, the player can mark each part as owned and unmark it again.
- [ ] 2. A part needed more than once has a single "have all I need" mark, not a quantity. Examples: 10 Black stone hearts, 2,000 vital sparks.
- [ ] 3. When every tracked part of an upgrade is marked, the upgrade shows as owned.
- [ ] 4. When the player marks the upgrade itself as owned, all of its tracked parts show as owned.
- [ ] 5. When the player unmarks an upgrade that has tracked parts, all of its parts show as not owned. When the player unmarks any part of an owned upgrade, the upgrade shows as missing.
- [ ] 6. Parts are tracked separately for each upgrade, even when two upgrades use a part with the same name. Example: marking the Igneous stone for Igneous Kal-Xil doesn't mark the Igneous stone for Igneous Kal-Mej.
- [ ] 7. An upgrade with no tracked parts is marked only as a whole. Examples: the Sirenic armour pieces, the Grasping rune pouches.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| [D29](../../discovery/Discovery_Summary_IronLog_20261020.md#d29 "Items assembled from parts are tracked part by part, not just as the finished item Changes D10: parts become m…"), [D32](../../discovery/Discovery_Summary_IronLog_20261020.md#d32 "Only collection-log parts are tracked parts dropped by bosses, slayer creatures or heists. Skilling materials …") track collection-log parts; [D48](../../discovery/Discovery_Summary_IronLog_20261020.md#d48 "The player can unmark anything they marked by mistake") unmarking | 1 | Confirmed |
| [D43](../../discovery/Discovery_Summary_IronLog_20261020.md#d43 "Parts needed in bulk e.g. 10 Black stone hearts, 2,000 vital sparks are tracked with a single 'have all I need…") bulk parts use a single mark | 2 | Confirmed |
| [D33](../../discovery/Discovery_Summary_IronLog_20261020.md#d33 "Marking a finished item marks all its parts as owned. Owning all parts counts the finished item as obtained") item and parts stay in step | 3, 4 | Confirmed |
| [D59](../../discovery/Discovery_Summary_IronLog_20261020.md#d59 "Unmarking keeps items and parts in step. Unmarking an upgrade unmarks its parts. Unmarking any part makes the …") unmarking keeps item and parts in step | 5 | Confirmed |
| [D60](../../discovery/Discovery_Summary_IronLog_20261020.md#d60 "Parts are tracked separately for each upgrade") parts tracked per upgrade | 6 | Confirmed |
| [D32](../../discovery/Discovery_Summary_IronLog_20261020.md#d32 "Only collection-log parts are tracked parts dropped by bosses, slayer creatures or heists. Skilling materials …") no tracked parts | 7 | Confirmed |

# Design
Prototype mockup from the Design step ([D44](../../discovery/Discovery_Summary_IronLog_20261020.md#d44 "Board workflow: a story moves to Design, where a page mockup is made and added to the story, before an enginee…")): [IronLog E2–E3 Collection Tracking](https://claude.ai/artifact/K83EZvH6ibNvUJRixMfuLA). One interactive page covers [IL-E2-01](https://github.com/JustinS95/IronLog/issues/7) to [IL-E2-04](https://github.com/JustinS95/IronLog/issues/10) (#7–#10) and [IL-E3-01 (#11)](https://github.com/JustinS95/IronLog/issues/11). Press Play to mark upgrades, parts and “shard applied”; the page starts with example marks. Notes above the page map each acceptance criterion to where it's shown.

- Approved by Justin on 2026-10-21 as a prototype. Expect the layout to change. Where the mockup and the acceptance criteria differ, the acceptance criteria apply.
- The prototype doesn't save between visits. [IL-E2-04 (#10)](https://github.com/JustinS95/IronLog/issues/10) describes the real behaviour.
- A “Next upgrade” banner above the list names the highlighted upgrade and links to its row ([D68](../../discovery/Discovery_Summary_IronLog_20261020.md#d68 "The style list shows a 'Next upgrade' banner above the stages that names the highlighted next upgrade and link…")).
- Item icons come from the RuneScape Wiki, with the Jagex Fan Content Policy notice on the page ([D65](../../discovery/Discovery_Summary_IronLog_20261020.md#d65 "IronLog shows item icons from the RuneScape Wiki. These images belong to Jagex, not to the wiki's CC BY-NC-SA …")). The mockup shows placeholders.
