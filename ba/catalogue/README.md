# IronLog catalogue (v1)

`ironlog_catalogue_v1.csv` is the approved list of what IronLog shows for each combat style, one row per upgrade instance. It's the expected result for IL-E1-01, and it resolves review finding F-01.

Built on 2026-10-20 from `ba/discovery/data/` (PVME entries, the reviewed inventory and stakeholder decisions D1–D44). It covers 111 tracked items, which appear 137 times across the four styles.

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
| `needed_in_style` | How many times the style needs this upgrade (D15) |

Data is derived from PVME (CC BY-NC-SA 4.0) and the RuneScape Wiki (CC BY-NC-SA 3.0), and is shared under CC BY-NC-SA 4.0 (D9).
