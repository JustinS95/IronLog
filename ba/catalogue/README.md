# IronLog catalogue (v1)

`ironlog_catalogue_v1.csv` is the approved list of what IronLog shows for each combat style, one row per upgrade instance. It's the expected result for IL-E1-01, and it resolves review finding F-01.

Built on 2026-10-20 from `ba/discovery/data/` (PVME entries, the reviewed inventory and stakeholder decisions D1–D44). It covers 111 tracked items, which appear 136 times across the four styles. Updated 2026-10-21 (D69): Necromancy's second Soulbound lantern (N3-05) was removed.

| Column | Meaning |
|---|---|
| `style` | Melee, Ranged, Magic or Necromancy |
| `section` | `PVME order`, or `Free Upgrades` (D42, shown separately and outside PVME's order) |
| `stage`, `stage_name` | PVME stage number and PVME's own heading |
| `entry_id`, `entry_order` | PVME entry (see `pvme_entries.csv`) and its position within the stage. Rows sharing an entry are split from a compound entry (D3) or set (D30) |
| `pvme_entry_text` | PVME's entry wording |
| `upgrade` | What the player sees and tracks. Genesis shards are named per weapon (D16, D18) |
| `inventory_item` | Key into `upgrade_inventory_review.csv` (sources, requirements, wiki link) and `parts.csv` (parts) |
| `alternative_group`, `alternative_option` | Rows in the same group are "one of" choices (D38). Rows that share an option letter go together |
| `pvme_notes` | PVME's own note on the entry |
| `needed_in_style` | How many times the style needs this upgrade. Always 1 since D69, which retired the quantity rule (D15); the column is kept so the file format doesn't change |

Data is derived from PVME (CC BY-NC-SA 4.0) and the RuneScape Wiki (CC BY-NC-SA 3.0), and is shared under CC BY-NC-SA 4.0 (D9).

## Sources (v1)

`ironlog_sources_v1.csv` is the canonical list of the 76 places an upgrade can come from, with a type (Boss, Slayer creature, Heist, Minigame, Slayer reward) and a Hard Mode flag. Hard Mode variants are separate sources (D26).

`ironlog_item_sources_v1.csv` maps each tracked upgrade (`inventory_item`), or each of its tracked parts (`part`), to canonical sources. 239 rows.

Grouping follows D63:
- Rex Matriarchs and Dagannoth Kings are one source each.
- Zamorakian Undercity creatures and Sophanem Slayer Dungeon creatures are one group each.
- The Sanctum of Rebirth bosses are listed individually.
- The Strange Old Man casket is dropped, so the Amulet of the forsaken comes from Barrows Brothers only.
- Glacytes count as Arch-Glacor.

Asuran Arsenal and Vault of Hereditas are heists (D21). Built 2026-10-20 to resolve review finding F-01 (E1–E4 review).
