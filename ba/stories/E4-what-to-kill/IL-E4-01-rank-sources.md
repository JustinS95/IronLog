---
key: IL-E4-01
title: See which source gives me the most upgrades
epic: E4 What to kill next
label: epic:what-to-kill
status: published
github_issue: 12
---

# Summary
**As an** ironman player,
**I want to** see every boss, slayer creature, heist, minigame and slayer reward ranked by how many of my missing upgrades it can give me,
**so that** I can decide what to kill next.

Sources come from [IL-E1-02 (#5)](https://github.com/JustinS95/IronLog/issues/5): an upgrade's own drop sources plus the sources of its tracked parts. The canonical source list is [`ba/catalogue/ironlog_sources_v1.csv`](../../catalogue/ironlog_sources_v1.csv) (76 sources). [`ba/catalogue/ironlog_item_sources_v1.csv`](../../catalogue/ironlog_item_sources_v1.csv) maps each upgrade, or each of its parts, to those sources. Owned state comes from E2. This is the toggle described in [D11](../../discovery/Discovery_Summary_IronLog_20261020.md#d11 "Each style lists upgrades in PVME order with their drop sources. A toggle switches to a single list of bosses …").

# Business Value
This is IronLog's core recommendation. It turns the player's collection into one answer: the activity with the most upgrades still to give.

# Acceptance Criteria
- [ ] 1. From a style list, the player can switch to a single ranked list of sources covering all styles, and switch back.
- [ ] 2. A source's count is the number of missing upgrades that the source drops itself, or drops at least one missing part of. Each missing upgrade counts once per source, however many of its parts that source drops. Example: Rex Matriarchs count Laniakea's spear once, even with all four spear parts missing. The Shard of Genesis Essence upgrades count as one upgrade for a source, however many weapons still need a shard, and the source shows which weapons need one.
- [ ] 3. An upgrade listed under several styles counts once in a source's total.
- [ ] 4. Each source shows how many of its counted upgrades belong to each style. An upgrade listed under several styles appears in each of those styles' numbers, so the per-style numbers can add up to more than the total.
- [ ] 5. Free Upgrades items count. A "one of" group counts only while none of its options is owned. Once one option is fully owned (all of its upgrades), none of the group's options count for any source.
- [ ] 6. Sources are listed from the highest count to the lowest. When counts are equal, the source that drops the earliest missing upgrade comes first. Free Upgrades items count as earlier than any PVME-order upgrade. After that, upgrades are compared by stage, then position within the stage. Remaining ties are ordered alphabetically by source name.
- [ ] 7. Hard Mode variants are separate sources. An upgrade or part that drops only in Hard Mode counts only for the Hard Mode source.
- [ ] 8. Sources with no missing upgrades aren't listed.
- [ ] 9. For each listed source, the player can see the missing upgrades that make up its count.
- [ ] 10. The ranking reflects the player's current marks. After the player marks or unmarks something, the counts and order update. Drop rates, kill times and access requirements play no part in the ranking.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| [D11](../../discovery/Discovery_Summary_IronLog_20261020.md#d11 "Each style lists upgrades in PVME order with their drop sources. A toggle switches to a single list of bosses …") toggle to sources ranked by total | 1 | Confirmed |
| [D40](../../discovery/Discovery_Summary_IronLog_20261020.md#d40 "Ranking counts a source once for each missing upgrade it drops at least one missing part of, not once per part") once per upgrade; [D29](../../discovery/Discovery_Summary_IronLog_20261020.md#d29 "Items assembled from parts are tracked part by part, not just as the finished item Changes D10: parts become m…") parts; [D63](../../discovery/Discovery_Summary_IronLog_20261020.md#d63 "Source grouping: Rex Matriarchs and Dagannoth Kings are one source each. Zamorakian Undercity creatures and So…") source grouping; [D70](../../discovery/Discovery_Summary_IronLog_20261020.md#d70 "In the source ranking, the Shard of Genesis Essence upgrades count as one upgrade for a source, however many w…") Genesis counted once per source | 2 | Confirmed |
| [D17](../../discovery/Discovery_Summary_IronLog_20261020.md#d17 "An item on more than one style's list counts once in the cross-style total, and is shown under every style tha…") counted once across styles | 3 | Confirmed |
| [D11](../../discovery/Discovery_Summary_IronLog_20261020.md#d11 "Each style lists upgrades in PVME order with their drop sources. A toggle switches to a single list of bosses …") per-style breakdown; [D17](../../discovery/Discovery_Summary_IronLog_20261020.md#d17 "An item on more than one style's list counts once in the cross-style total, and is shown under every style tha…") | 4 | Confirmed |
| [D55](../../discovery/Discovery_Summary_IronLog_20261020.md#d55 "The source ranking counts Free Upgrades items. A 'one of' group stops counting once any option is owned") Free Upgrades and "one of" groups; [D54](../../discovery/Discovery_Summary_IronLog_20261020.md#d54 "A 'one of' group is done when any one option is owned pending the D38 revisit"); [D67](../../discovery/Discovery_Summary_IronLog_20261020.md#d67 "In a 'one of' group, an option made of more than one upgrade counts as owned only when all of them are owned r…") multi-upgrade options | 5 | Confirmed |
| [D12](../../discovery/Discovery_Summary_IronLog_20261020.md#d12 "Bosses with the same total are ordered by which drops the earliest missing item in PVME order Needs definition…"), [D19](../../discovery/Discovery_Summary_IronLog_20261020.md#d19 "Cross-style tie-break order: PVME stage, then position within the stage, then alphabetical Resolves Q3") tie-break; [D61](../../discovery/Discovery_Summary_IronLog_20261020.md#d61 "In the ranking tie-break, Free Upgrades items count as earlier than any PVME-order upgrade") Free Upgrades first | 6 | Confirmed |
| [D26](../../discovery/Discovery_Summary_IronLog_20261020.md#d26 "Hard Mode variants are separate sources in the boss ranking Resolves Q8") Hard Mode separate | 7 | Confirmed |
| [D56](../../discovery/Discovery_Summary_IronLog_20261020.md#d56 "Sources with no missing upgrades are hidden from the ranking") hide zero | 8 | Confirmed |
| [D57](../../discovery/Discovery_Summary_IronLog_20261020.md#d57 "The player can see which missing upgrades make up a source's count") see upgrades behind the count | 9 | Confirmed |
| [D6](../../discovery/Discovery_Summary_IronLog_20261020.md#d6 "Drop rates and kill effort are not used in ranking"), [D7](../../discovery/Discovery_Summary_IronLog_20261020.md#d7 "Access requirements quests, Slayer level are shown next to items and bosses, but the player doesn't enter them…") no rates or requirements in ranking; [D4](../../discovery/Discovery_Summary_IronLog_20261020.md#d4 "The player marks the drops they own, and results are shown per combat style") owned marks | 10 | Confirmed |
| [D66](../../discovery/Discovery_Summary_IronLog_20261020.md#d66 "Sources include minigames and slayer rewards as well as bosses, slayer creatures and heists e.g. Fight Kiln fo…") minigame and slayer-reward sources (Summary) | — | Confirmed |

# Design
Prototype mockup from the Design step ([D44](../../discovery/Discovery_Summary_IronLog_20261020.md#d44 "Board workflow: a story moves to Design, where a page mockup is made and added to the story, before an enginee…")): [IronLog E4 What to Kill Next](https://claude.ai/artifact/AkbPsziHRmRuiYCcXQphUQ). It opens on the ranked list; the “Upgrade order” switch goes back to the E2–E3 style list, and marks made there update the ranking. The page starts with example marks. Notes above the page map each acceptance criterion to where it's shown.

- Approved by Justin on 2026-10-21 as a prototype. Expect the layout to change. Where the mockup and the acceptance criteria differ, the acceptance criteria apply.
- The prototype doesn't save between visits. [IL-E2-04 (#10)](https://github.com/JustinS95/IronLog/issues/10) describes the real behaviour.
- Item icons come from the RuneScape Wiki, with the Jagex Fan Content Policy notice on the page ([D65](../../discovery/Discovery_Summary_IronLog_20261020.md#d65 "IronLog shows item icons from the RuneScape Wiki. These images belong to Jagex, not to the wiki's CC BY-NC-SA …")). The mockup shows placeholders.
