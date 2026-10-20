# Scope Map - IronLog v1

Date: 2026-10-20 | Produced with the ba-super-powers `scope-decomposition` skill | Source: [Discovery Summary](../discovery/Discovery_Summary_IronLog_20261020.md) (decisions D1–D37)

The epic split was confirmed by Justin on 2026-10-20 (D31). Epics appear on GitHub as labels (D37). This map is not a backlog hierarchy, and stories are not sub-issues of the epics.

## Capability map

| Slice | Actor and observable outcome | Included/excluded boundary | Dependencies and evidence | Priority/status |
|---|---|---|---|---|
| **E1 Upgrade catalogue** (`epic:catalogue`) | A player browses each combat style's tracked upgrades in PVME order, sees where each comes from (bosses, slayer creatures, heists, Hard Mode variants listed separately) and the access requirements for each source, and sees attribution to PVME and the RuneScape Wiki | **In:** the four style lists, the free-upgrade additions (D22, D25), compound entries as separate items (D3), items shared across styles shown in each (D17), parts and their sources (D29, D32), requirements display (D7), attribution (D9). **Out:** excluded entries hidden (D2, D21, D24, D28); no ownership marking | Inventory and parts data in `ba/discovery/data/` (confirmed). No delivery dependency | 1st. Confirmed epic; order is a proposal |
| **E2 Collection tracking** (`epic:tracking`) | A player marks the upgrades and parts they own, enters quantities where more than one is needed, ticks "shard applied" on T95 weapons, and finds their progress still there on return | **In:** item and part marking (D29, D32, D33), per-piece armour (D30), quantities (D15), Genesis shard per weapon (D16, D18), browser-saved progress (D27). **Out:** full drop log (D10), accounts and sync (D27) | Needs E1's catalogue to mark against. Bulk-part quantities and the Elite dracolich route are open | 2nd. Confirmed epic |
| **E3 Style progress** (`epic:progress`) | For each style, a player sees owned versus missing upgrades in PVME order, with the next missing upgrade highlighted | **In:** per-style owned/missing view, next upgrade (D11). **Out:** cross-style ranking (E4) | Needs E1 and E2 | 3rd. Confirmed epic |
| **E4 What to kill next** (`epic:what-to-kill`) | A player switches to one list of sources ranked by total missing upgrades across all styles, with a count per style and tie-breaks applied | **In:** cross-style total with each item counted once (D17), per-style breakdown (D11), tie-break by stage, then position, then alphabetical (D12, D19), Hard Mode as separate sources (D26), no rate weighting (D6). **Out:** drop-rate or kill-time weighting (D6) | Needs E1 and E2. **Part-counting rule open** (proposed: once per upgrade) | 4th. Confirmed epic. Ranking AC provisional |

## Shared rules (owned by the story they govern)

| Rule | Decision | Home story |
|---|---|---|
| Upgrade definition and order = PVME's four lists | D1, D20 | E1 catalogue |
| Compound entries are separate items of equal weight | D3 | E1 catalogue; E4 counting |
| Hidden exclusions | D2, D21, D22, D24, D25, D28 | E1 catalogue |
| Finished item and its parts stay in step | D33 | E2 tracking |
| Item shared across styles counts once in totals | D17 | E4 ranking (shown per style in E1, E3) |
| PVME CC BY-NC-SA 4.0 attribution, no commercial use; RuneScape Wiki attribution | D9 | E1 catalogue |

## Future scope (left out on purpose)

- Full drop log (D10)
- PVME list refresh process (D20)
- Drop-rate and kill-time weighting (D6)
- Accounts and cross-device sync (D27)
- Verification of medium-confidence drop data. This may become a data story

## Unmapped or conflicting items

None unmapped. Two open questions affect E2 and one affects E4 (see the discovery summary). The PVME "outdated since Combat Modernization" banner stays a noted risk, accepted as current under D20.

## Recommended starting point

**E1 first.** It's valuable on its own (an ironman upgrade guide with drop sources), it has no open questions, and every other epic builds on its catalogue. Next: `writing-user-stories` for E1.
