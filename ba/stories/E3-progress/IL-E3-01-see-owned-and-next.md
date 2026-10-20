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

This builds on the style lists from IL-E1-01 (#4) and the marks from E2 (IL-E2-01 to IL-E2-03).

# Business Value
PVME's order is only useful when it's applied to the player's own collection. This turns the order into "here's where you are, and here's what comes next".

# Acceptance Criteria
- [ ] 1. Every upgrade in a style list shows whether it's owned or missing, matching what the player has marked.
- [ ] 2. A missing upgrade with tracked parts shows how many of its parts are owned. Example: "3/4 parts". It still counts as missing until the upgrade is owned.
- [ ] 3. The first missing upgrade in PVME order (by stage, then position) is highlighted as the next upgrade. Upgrades in the Free Upgrades section are never highlighted as next.
- [ ] 4. A "one of" group counts as done when any one of its options is owned. While the group is done, none of its other options can be the next upgrade.
- [ ] 5. When an upgrade is needed more than once, each listed instance is owned or missing according to the quantity marked (IL-E2-01 AC 4). Example: with 1 of 2 Soulbound lanterns, the Stage 3 entry can be next.
- [ ] 6. When every upgrade in a style's PVME order is owned, no upgrade is highlighted as next.

# Traceability
| Requirement/source | AC | Status/decision |
|---|---|---|
| D11 per-style list; D4 owned marks | 1 | Confirmed |
| D52 part progress, still missing | 2 | Confirmed |
| D53 next = first missing in PVME order, excluding Free Upgrades | 3, 6 | Confirmed |
| D54 "one of" group done when any option is owned | 4 | Confirmed (D38 to be revisited) |
| D15 quantities | 5 | Confirmed |
