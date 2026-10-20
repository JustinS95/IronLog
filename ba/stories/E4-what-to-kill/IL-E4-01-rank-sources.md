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
**I want to** see every boss, slayer creature and heist ranked by how many of my missing upgrades it can give me,
**so that** I can decide what to kill next.

Sources come from IL-E1-02 (#5): an upgrade's own drop sources plus the sources of its tracked parts. The canonical source list is [`ba/catalogue/ironlog_sources_v1.csv`](../../catalogue/ironlog_sources_v1.csv) (76 sources). [`ba/catalogue/ironlog_item_sources_v1.csv`](../../catalogue/ironlog_item_sources_v1.csv) maps each upgrade, or each of its parts, to those sources. Owned state comes from E2. This is the toggle described in D11.

# Business Value
This is IronLog's core recommendation. It turns the player's collection into one answer: the activity with the most upgrades still to give.

# Acceptance Criteria
- [ ] 1. From a style list, the player can switch to a single ranked list of sources covering all styles, and switch back.
- [ ] 2. A source's count is the number of missing upgrades that the source drops itself, or drops at least one missing part of. Each missing upgrade counts once per source, however many of its parts that source drops. Example: Rex Matriarchs count Laniakea's spear once, even with all four spear parts missing.
- [ ] 3. An upgrade listed under several styles counts once in a source's total.
- [ ] 4. Each source shows how many of its counted upgrades belong to each style. An upgrade listed under several styles appears in each of those styles' numbers, so the per-style numbers can add up to more than the total.
- [ ] 5. Free Upgrades items count. A "one of" group counts only while none of its options is owned. Once one is owned, none of the group's options count for any source.
- [ ] 6. Sources are listed from the highest count to the lowest. When counts are equal, the source that drops the earliest missing upgrade comes first. Free Upgrades items count as earlier than any PVME-order upgrade. After that, upgrades are compared by stage, then position within the stage. Remaining ties are ordered alphabetically by source name.
- [ ] 7. Hard Mode variants are separate sources. An upgrade or part that drops only in Hard Mode counts only for the Hard Mode source.
- [ ] 8. Sources with no missing upgrades aren't listed.
- [ ] 9. For each listed source, the player can see the missing upgrades that make up its count.
- [ ] 10. The ranking reflects the player's current marks. After the player marks or unmarks something, the counts and order update. Drop rates, kill times and access requirements play no part in the ranking.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| D11 toggle to sources ranked by total | 1 | Confirmed |
| D40 once per upgrade; D29 parts; D63 source grouping | 2 | Confirmed |
| D17 counted once across styles | 3 | Confirmed |
| D11 per-style breakdown; D17 | 4 | Confirmed |
| D55 Free Upgrades and "one of" groups; D54 | 5 | Confirmed |
| D12, D19 tie-break; D61 Free Upgrades first | 6 | Confirmed |
| D26 Hard Mode separate | 7 | Confirmed |
| D56 hide zero | 8 | Confirmed |
| D57 see upgrades behind the count | 9 | Confirmed |
| D6, D7 no rates or requirements in ranking; D4 owned marks | 10 | Confirmed |
