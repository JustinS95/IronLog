---
key: IL-E3-01
title: See what I have and what's next in a style
epic: E3 Style progress
label: epic:progress
status: published
github_issue: 11
---

# Summary
**As an** ironman player,
**I want to** see which of a style's upgrades I have and which one is next,
**so that** I know my next goal for that style at a glance.

This builds on the style lists from [IL-E1-01 (#4)](https://github.com/JustinS95/IronLog/issues/4) and the marks from E2 ([IL-E2-01](https://github.com/JustinS95/IronLog/issues/7) to [IL-E2-03](https://github.com/JustinS95/IronLog/issues/9)).

# Business Value
PVME's order is only useful when it's applied to the player's own collection. This turns the order into "here's where you are, and here's what comes next".

# Acceptance Criteria
- [ ] 1. Every upgrade in a style list shows whether it's owned or missing, matching what the player has marked.
- [ ] 2. A missing upgrade with tracked parts shows how many of its parts are owned. Example: "3/4 parts". It still counts as missing until the upgrade is owned.
- [ ] 3. The first missing upgrade in PVME order (by stage, then position) is highlighted as the next upgrade. Upgrades in the Free Upgrades section are never highlighted as next.
- [ ] 4. A "one of" group counts as done when any one of its options is owned. An option made of more than one upgrade counts as owned only when all of them are owned. Example: Melee [M3-03](../../catalogue/ironlog_catalogue_v1.csv) is done when both Eclipsed Soul and Divine Rage are owned, or when Malevolence is owned; Eclipsed Soul alone doesn't complete it. While the group is done, none of its other options can be the next upgrade.
- 5. **Retired 2026-10-21 ([D69](../../discovery/Discovery_Summary_IronLog_20261020.md#d69 "Necromancy needs only one Soulbound lantern. PVME's second lantern N3-05, 'Upgrade to T100 Flanking switch' is…")):** no style needs an upgrade more than once. ~~When an upgrade is needed more than once, each listed instance is owned or missing according to the quantity marked ([IL-E2-01](https://github.com/JustinS95/IronLog/issues/7) AC 4). Example: with 1 of 2 Soulbound lanterns, the Stage 3 entry can be next.~~
- [ ] 6. When every upgrade in a style's PVME order is owned, no upgrade is highlighted as next.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| [D11](../../discovery/Discovery_Summary_IronLog_20261020.md#d11 "Each style lists upgrades in PVME order with their drop sources. A toggle switches to a single list of bosses …") per-style list; [D4](../../discovery/Discovery_Summary_IronLog_20261020.md#d4 "The player marks the drops they own, and results are shown per combat style") owned marks | 1 | Confirmed |
| [D52](../../discovery/Discovery_Summary_IronLog_20261020.md#d52 "A partly collected upgrade shows its part progress e.g. '3/4 parts' and still counts as missing") part progress, still missing | 2 | Confirmed |
| [D53](../../discovery/Discovery_Summary_IronLog_20261020.md#d53 "The next upgrade in a style is the first missing upgrade in PVME order. The Free Upgrades section is never 'ne…") next = first missing in PVME order, excluding Free Upgrades; [D68](../../discovery/Discovery_Summary_IronLog_20261020.md#d68 "The style list shows a 'Next upgrade' banner above the stages that names the highlighted next upgrade and link…") "Next upgrade" banner (Design) | 3, 6 | Confirmed |
| [D54](../../discovery/Discovery_Summary_IronLog_20261020.md#d54 "A 'one of' group is done when any one option is owned pending the D38 revisit") "one of" group done when any option is owned; [D67](../../discovery/Discovery_Summary_IronLog_20261020.md#d67 "In a 'one of' group, an option made of more than one upgrade counts as owned only when all of them are owned r…") a multi-upgrade option needs all its upgrades | 4 | Confirmed ([D38](../../discovery/Discovery_Summary_IronLog_20261020.md#d38 "When a PVME entry offers a choice, every option is shown, labelled as an alternative. To be revisited") to be revisited) |
| [D15](../../discovery/Discovery_Summary_IronLog_20261020.md#d15 "When an item is needed more than once, show the quantity needed and let the player enter how many they own") quantities | 5 | Superseded by [D69](../../discovery/Discovery_Summary_IronLog_20261020.md#d69 "Necromancy needs only one Soulbound lantern. PVME's second lantern N3-05, 'Upgrade to T100 Flanking switch' is…"): AC retired |

# Design
Prototype mockup from the Design step ([D44](../../discovery/Discovery_Summary_IronLog_20261020.md#d44 "Board workflow: a story moves to Design, where a page mockup is made and added to the story, before an enginee…")): [IronLog E2–E3 Collection Tracking](https://claude.ai/artifact/K83EZvH6ibNvUJRixMfuLA). One interactive page covers [IL-E2-01](https://github.com/JustinS95/IronLog/issues/7) to [IL-E2-04](https://github.com/JustinS95/IronLog/issues/10) (#7–#10) and IL-E3-01 (#11). Press Play to mark upgrades, parts and “shard applied”; the page starts with example marks. Notes above the page map each acceptance criterion to where it's shown.

- Approved by Justin on 2026-10-21 as a prototype. Expect the layout to change. Where the mockup and the acceptance criteria differ, the acceptance criteria apply.
- The prototype doesn't save between visits. [IL-E2-04 (#10)](https://github.com/JustinS95/IronLog/issues/10) describes the real behaviour.
- A “Next upgrade” banner above the list names the highlighted upgrade and links to its row ([D68](../../discovery/Discovery_Summary_IronLog_20261020.md#d68 "The style list shows a 'Next upgrade' banner above the stages that names the highlighted next upgrade and link…")).
- Item icons come from the RuneScape Wiki, with the Jagex Fan Content Policy notice on the page ([D65](../../discovery/Discovery_Summary_IronLog_20261020.md#d65 "IronLog shows item icons from the RuneScape Wiki. These images belong to Jagex, not to the wiki's CC BY-NC-SA …")). The mockup shows placeholders.
