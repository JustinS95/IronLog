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

PVME lists the Shard of Genesis Essence as an upgrade to specific weapons. The weapons in the catalogue are Ek-ZekKil, Dark Shard of Leng, Dark Sliver of Leng, Bow of the Last Guardian, Fractured Staff of Armadyl, Omni guard and Soulbound lantern. IL-E1-01 (#4) shows each as "Shard of Genesis Essence – <weapon>".

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
| D16, D50 checkbox per weapon, shown only when the weapon is owned | 1 | Confirmed |
| D16, D18, D49 applied counts as owned in every style | 2 | Confirmed |
| D18 unapplied shard doesn't count | 3 | Confirmed |
| D59 unmarking the weapon clears "shard applied" | 4 | Confirmed |
