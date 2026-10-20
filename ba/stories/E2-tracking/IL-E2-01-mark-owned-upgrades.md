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

Marking happens on the upgrades shown by IL-E1-01 (#4), using the rows of [`ba/catalogue/ironlog_catalogue_v1.csv`](../../catalogue/ironlog_catalogue_v1.csv). Parts are covered by IL-E2-02, Shard of Genesis by IL-E2-03, and keeping progress between visits by IL-E2-04.

# Business Value
Everything IronLog recommends depends on knowing what the player already owns. This is the player's input to the whole app.

# Acceptance Criteria
- [ ] 1. The player can mark any upgrade in a style list as owned, and can unmark it again.
- [ ] 2. Each armour piece is marked on its own. Example: owning three of the five Tumeken's resplendence pieces shows those three as owned and two as missing.
- [ ] 3. An upgrade that appears in more than one style is a single item. Marking or unmarking it in one style changes it in every style that lists it, including the Free Upgrades sections. Example: marking Scripture of Jas under Melee shows it as owned under Ranged, Magic and Necromancy.
- [ ] 4. When a style needs an upgrade more than once, the player enters how many they own, from 0 up to the number needed. The listed instances count as owned in PVME order, up to that number. Example: with 1 of 2 Soulbound lanterns, the Stage 2 entry (N2-07) is owned and the Stage 3 entry (N3-05) is missing.
- [ ] 5. Each option in a "one of" entry can be marked on its own. Example: Dragon claws and Varanus' mercy.
- [ ] 6. Shard of Genesis Essence upgrades can't be marked here. They follow their weapon's "shard applied" mark (IL-E2-03).

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| D4 player marks owned drops; D48 unmarking | 1 | Confirmed |
| D30 per piece | 2 | Confirmed |
| D17, D49 shared item marked once | 3 | Confirmed |
| D15 quantity for repeated upgrades | 4 | Confirmed |
| D38 alternatives shown as separate options | 5 | Confirmed (D38 to be revisited) |
| D16, D18, D50 Genesis via weapon | 6 | Confirmed |
