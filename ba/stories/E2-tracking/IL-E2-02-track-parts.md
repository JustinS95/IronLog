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

The parts come from [`ba/discovery/data/parts.csv`](../../discovery/data/parts.csv) and are shown by IL-E1-02 (#5). Only collection-log parts are tracked (D32).

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
| D29, D32 track collection-log parts; D48 unmarking | 1 | Confirmed |
| D43 bulk parts use a single mark | 2 | Confirmed |
| D33 item and parts stay in step | 3, 4 | Confirmed |
| D59 unmarking keeps item and parts in step | 5 | Confirmed |
| D60 parts tracked per upgrade | 6 | Confirmed |
| D32 no tracked parts | 7 | Confirmed |
