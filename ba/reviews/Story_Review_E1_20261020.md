# Story Review - E1 Upgrade catalogue

Date: 2026-10-20 | Produced with the ba-super-powers `adversarial-story-review` skill | Reviewed: IL-E1-01, IL-E1-02 (drafts in `ba/stories/E1-catalogue/`) against the [Discovery Summary](../discovery/Discovery_Summary_IronLog_20261020.md) (D1–D44), the [Scope Map](../plans/Scope_Map_IronLog_v1.md) and the data in `ba/discovery/data/`

## Review boundary

- **Included:** both E1 stories, decisions D1–D44, the scope map's E1 row and shared rules, and the included rows of `upgrade_inventory_review.csv`, `parts.csv` and `pvme_entries.csv`.
- **Excluded:** E2–E4 stories, which aren't written yet. Connections to them are noted as forward dependencies only.
- **Unavailable:** none.

## Matrices

- **Actor and access:** not applicable. There is one actor (an ironman player), no accounts (D27) and no protected data. Both stories are read-only, and neither story claims any access restriction.
- **Record and source of truth:**

| Concept | Canonical owner | Consumers | Update | Conflicting sources |
|---|---|---|---|---|
| Upgrade list and order per style | PVME pages @ `7a1f15f`, as filtered by stakeholder decisions | IL-E1-01; later E3, E4 | BA data refresh only (D20 future) | **F-01**: the order and per-weapon instances are spread across three files and decision text |
| Item sources, parts, requirements | RuneScape Wiki research (2026-10-20) in `data/` | IL-E1-02; later E2, E4 | BA data refresh | **F-02**: some sources unknown |
| Owned state | Not in E1 | E2 | E2 | None |

- **Lifecycle / link-security:** not applicable. E1 has no record states, sharing or links beyond outbound wiki and PVME links.

## Dependency graph

- IL-E1-01 -> IL-E1-02. Sources are shown "in a style list" (IL-E1-02 AC 1), so they need the list from IL-E1-01. This is a true delivery prerequisite.
- E1 -> E2, E3, E4, per the scope map. There are no cycles and no edges pointing the wrong way.

## Findings

### F-01 — The catalogue order isn't in a form a developer can build from directly
Severity: High (delivery). Both stories are testable, but building them means reconstructing each style's list from three files plus rules held in decision text.
Sources: IL-E1-01 AC 2, 3, 7, 8, 10, 11. In the data:
- `pvme_entries.csv` holds entry positions.
- `upgrade_inventory_review.csv` holds one row per item, with entry IDs and decisions.
- Shard of Genesis is **one** inventory row, while AC 8 needs **seven** per-weapon upgrades (Ek-ZekKil, Dark Shard of Leng, Dark Sliver of Leng, Bow of the Last Guardian, Fractured Staff of Armadyl, Omni guard, Soulbound lantern).
- Alternatives (AC 10) and the Free Upgrades section (AC 11) aren't encoded anywhere.

Competing claims: AC 1 says "IronLog tracks the included rows" (108 items), but the per-style view has more instances than that, so the dataset doesn't match the AC.
Impact: two developers could build different lists, and a tester can't derive the expected list for each style without redoing the BA work.
Classification and owner: BA data artifact. No stakeholder decision needed.
Recommended resolution: the BA produces one **approved catalogue file** with one row per style × position × upgrade, holding stage, order, entry ID, upgrade name, alternative-group marker and section (stage or Free Upgrades). The stories then reference that file as the expected list.
Readiness: IL-E1-01 is provisional until the file exists.

### F-02 — No behavior defined for sources that are unknown
Severity: Medium. The source of TokHaar-Kal-Mor is "unknown", and Pernix's quiver fragments come from Elder Troves, which aren't on any confirmed collection log.
Sources: IL-E1-02 AC 1 ("shows its sources"); `parts.csv` rows for Igneous Kal-Mor and Pernix's quiver.
Impact: AC 1 can't be met for those parts, and it's unclear what the player should see.
Classification and owner: stakeholder decision (Justin).
Neutral options:
- (a) show "Source not yet confirmed" with the wiki link,
- (b) hide the part until it's verified,
- (c) verify the data before E1 is built.

Readiness: IL-E1-02 AC 1 is provisional for those two items only.

### F-03 — The exclusion list in AC 5 repeats data and could drift from it
Severity: Low. IL-E1-01 AC 5 lists the excluded categories in prose, while the authoritative record is the `justin_decision` column.
Recommended resolution: keep the categories as examples, but make the approved catalogue file (F-01) the expected list. Proposal only.

### F-04 — Quantity shown versus quantity tracked
Severity: Low (not a contradiction). IL-E1-01 AC 7 and IL-E1-02 AC 3 *show* quantities, for example "10 Black stone hearts". D43 says bulk parts are *tracked* with one mark. These are consistent, since one is display and one is tracking. Flagged so E2 doesn't add a quantity field for bulk parts. D15 quantity entry remains for repeated upgrades.

### F-05 — Stories reach engineering only through the Design column
Severity: Low (process). D44 adds a Design step, where a mockup is added to the story before engineering. Neither story has a design yet. That's expected at this stage, but it means "ready for engineering" requires the Design step first.

## Decision register

| ID | Question | Classification | Owner | Affected | Status |
|---|---|---|---|---|---|
| R-01 | Produce the approved per-style catalogue file (F-01) | BA artifact | BA | IL-E1-01, IL-E1-02, E3, E4 | **Done**: `ba/catalogue/ironlog_catalogue_v1.csv` |
| R-02 | What the player sees for a part whose source is unknown (F-02) | Stakeholder | Justin | IL-E1-02 AC 1 | Pending |

## Readiness

- **Reviewed scope:** both E1 stories and their data. No contradictions with confirmed decisions were found.
- **IL-E1-01:** ready within reviewed scope. R-01 is done and the story now names the catalogue file as its expected list.
- **IL-E1-02:** ready, except AC 1 for two parts, which waits on R-02.
- **Publishing:** the stories can be published as Issues in Todo once R-01 and R-02 are resolved. The Design step (D44) follows before engineering.

## Re-review after changes

- **R-01 applied.** While building the catalogue file, one more data defect turned up: "The First Necromancer armour set" was a single inventory row, which conflicts with D30 (per piece). It's now split into its five pieces (Crown, Robe top, Robe bottom, Hand wrap, Foot wraps of the First Necromancer; wiki-confirmed drops from Rasial).
- **IL-E1-01 updated.** AC 1 now points to the catalogue file, and AC 5 keeps the exclusions as examples (F-03). Rechecked AC 7 (Soulbound lantern ×2) and AC 8 (seven Genesis instances) against the file; both match.
- **Still pending:** R-02.
