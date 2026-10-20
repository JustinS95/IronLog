---
key: IL-E2-04
title: Keep my progress between visits
epic: E2 Collection tracking
label: epic:tracking
status: published
github_issue: 10
---

# Summary
**As an** ironman player,
**I want** IronLog to remember what I've marked,
**so that** I don't have to re-enter my collection every time I visit.

The first version has no accounts. Progress is saved in the player's browser (D27).

# Business Value
A collection takes time to enter. If it disappears when the page closes, nobody will come back to use the recommendations.

# Acceptance Criteria
- [ ] 1. After the player closes and reopens IronLog in the same browser on the same device, everything they marked is still there: owned upgrades, quantities, parts and "shard applied" marks.
- [ ] 2. Using IronLog doesn't require an account or sign-in.
- [ ] 3. IronLog shows a short note that progress is saved only in this browser on this device, and is lost if the browser's site data is cleared.
- [ ] 4. There's no option to clear all progress in this version.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| D27 progress saved in the browser | 1 | Confirmed |
| D27 no accounts | 2 | Confirmed |
| D62 note on where progress is saved | 3 | Confirmed |
| D51 no clear-all in v1 | 4 | Confirmed |
