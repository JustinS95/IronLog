# Story Review - E1 to E4 (full set)

Date: 2026-10-20 | Produced with the ba-super-powers `adversarial-story-review` skill | Reviewed: IL-E1-01 (#4) and IL-E1-02 (#5), both published; drafts IL-E2-01 to 04, IL-E3-01 and IL-E4-01; discovery decisions D1–D47 plus D48–D57 (answers of 2026-10-20 17:33); catalogue and data files.

## Review boundary

- **Included:** all ten stories' text, the catalogue file, `upgrade_inventory_review.csv` and `parts.csv`. The source naming check covered all 112 raw source strings used by catalogue items.
- **Excluded:** nothing.
- **Unavailable:** none. Published #4 and #5 were compared through their repo source files, whose hashes match the published payloads.

## Matrices

- **Actor and access:** one actor, no accounts, no protected data. Not applicable.
- **Record and source of truth:**

| Concept | Canonical owner | Consumers | Update | Conflicts |
|---|---|---|---|---|
| Owned state of an upgrade | E2-01 marks (shared across styles, D49) | E3-01, E4-01 | E2-01, E2-02 (all parts), E2-03 (Genesis) | **F-03**: unmarking isn't defined by D33 or D50 |
| Owned state of a part | E2-02 | E3-01 (part progress), E4-01 (counting) | E2-02, E2-01 (marking the item marks its parts) | **F-04**: parts shared across upgrades |
| Source identity | *none before this review* | E1-02, E4-01 | — | **F-01** |
| Saved progress | E2-04 (browser) | all | — | none |

- **Lifecycle:** an upgrade is missing, partly collected (parts only, still counts as missing), or owned. A Genesis upgrade is hidden until its weapon is owned, then applied or not. The transitions into these states are defined. Transitions back out are F-03.
- **Links:** outbound links to PVME and the wiki only. Not applicable.

## Dependency graph (A -> B: A before B)

- IL-E1-01 -> IL-E1-02
- IL-E1-01 -> IL-E2-01
- IL-E2-01 -> IL-E2-02, IL-E2-03, IL-E2-04
- IL-E2-01, IL-E2-02 -> IL-E3-01
- IL-E1-02, IL-E2-01, IL-E2-02 -> IL-E4-01

No cycles or reversed edges. IL-E2-03 isn't needed by IL-E3-01 to work. It only affects Genesis rows.

## Findings

### F-01 — Sources have no canonical identity
Severity: **High.** Affects published #5 and the E4 ranking.
Sources: `drop_sources` in the inventory and `part_drop_sources` in parts. These hold **112 different raw strings** for the sources of tracked upgrades. Some name the same boss in several ways ("Nakatra" vs "Nakatra, Devourer Eternal"; "Rathis (Rex Matriarchs)" vs "Rex Matriarchs (any)"). Some are fragments left by splitting notes ("Hard Mode)", "no-checkpoint run)"). Three heist upgrades had no source at all (Varanus' mercy, Nodon spike harness, Misalionar's death mask).
Impact:
- IL-E1-02 (#5) would show duplicate or garbled sources.
- IL-E4-01 would split one boss's count across several names, so its ranking would be wrong. AC 2's Rex Matriarchs example depends on how sources are grouped.

Resolution (BA artifact, done in this review):
- `ba/catalogue/ironlog_sources_v1.csv`: 76 canonical sources, each with a type (Boss, Slayer creature, Heist, Minigame, Slayer reward) and a Hard Mode flag.
- `ba/catalogue/ironlog_item_sources_v1.csv`: 239 rows mapping each upgrade, or each of its parts, to canonical sources.
- The three heist upgrades are now sourced: Asuran Arsenal (heist) and Vault of Hereditas (heist).

**Grouping proposals that need Justin (R-01):**
- Multi-boss encounters as one source: Rex Matriarchs (Orikalka, Pthentraken, Rathis, Osseous) and Dagannoth Kings (Prime, Rex, Supreme).
- Barrows Brothers includes the Strange Old Man casket.
- Glacytes count as Arch-Glacor.
- Region groups: Zamorakian Undercity creatures, Sophanem Slayer Dungeon creatures.
- "Sanctum of Rebirth bosses" is split into Vermyx, Kezalam and Nakatra.

**Published #5 (R-02):** its body names the inventory and parts files as source data, not the new canonical files. The publishing skill doesn't edit published Issues.

### F-02 — Unmarking leaves item and part state undefined
Severity: Medium. Sources: IL-E2-02 AC 5, IL-E2-03 AC 4 (both proposed). D33 and D50 define marking only. Without a rule, an upgrade could show as missing while all its parts show owned, or a hidden "shard applied" could keep a Genesis upgrade owned. Owner: Justin (R-03).

### F-03 — Parts used by more than one upgrade
Severity: Medium. Sources: IL-E2-02 Open Question 2. Examples: the Igneous stone in each igneous cape, and Glacor remnants in several Arch-Glacor items. The proposal is to track parts separately for each upgrade. Owner: Justin (R-04).

### F-04 — Free Upgrades items have no position for the E4 tie-break
Severity: Low. Sources: IL-E4-01 AC 6 and Open Question 1. Proposed: they rank after all PVME-order upgrades. Owner: Justin (R-05).

### F-05 — Telling the player where progress is saved
Severity: Low. Sources: IL-E2-04 Open Question 1. Proposed: a short on-screen note. Owner: Justin (R-06).

### F-06 — The D38 revisit touches four stories
Severity: Low (tracking). Sources: IL-E1-01 AC 10, IL-E2-01 AC 5, IL-E3-01 AC 4, IL-E4-01 AC 5. They're consistent with each other today. When D38 is revisited, all four need re-review through `requirements-change-impact`.

### Checked with no contradiction
- Genesis upgrades appear as their own rows (E1-01 AC 8), are marked only through the weapon (E2-01 AC 6, E2-03), and are counted like any other upgrade (E3, E4).
- Quantity instances: E2-01 AC 4 and E3-01 AC 5 agree.
- Free Upgrades items are never "next" (E3 AC 3) but do count in E4 (AC 5), as D53 and D55 intend.

## Decision register

| ID | Question | Owner | Affects | Status |
|---|---|---|---|---|
| R-01 | Approve the source grouping proposals (F-01) | Justin | E1-02, E4-01 | **Resolved by D63** (Strange Old Man dropped; Glacytes are Arch-Glacor) |
| R-02 | How to point published #5 at the canonical source files | Justin | #5 | **Deferred by D64**: fixed with the new Issue-update capability, as its first use |
| R-03 | Unmarking rules (F-02) | Justin | E2-02, E2-03 | **Resolved by D59** |
| R-04 | Parts tracked per upgrade (F-03) | Justin | E2-02 | **Resolved by D60** |
| R-05 | Free Upgrades in the E4 tie-break (F-04) | Justin | E4-01 | **Resolved by D61**: Free Upgrades items count as earliest |
| R-06 | Progress-location note (F-05) | Justin | E2-04 | **Resolved by D62** |

## Readiness

- **Ready within reviewed scope:** IL-E2-01, IL-E3-01.
- **Ready after the listed decisions:** IL-E2-02 (R-03, R-04), IL-E2-03 (R-03), IL-E2-04 (R-06), IL-E4-01 (R-01, R-05).
- **Published #5:** behaviour is still correct, but its source data reference is out of date (R-02).

## Re-review after decisions (2026-10-20 17:44 EDT)

- Applied D59–D64 to the drafts:
  - IL-E2-02: AC 5 confirmed, new AC 6 (parts per upgrade)
  - IL-E2-03: AC 4 confirmed
  - IL-E2-04: new AC 3 (progress note)
  - IL-E4-01: AC 6 tie-break with Free Upgrades first; context now cites the canonical source files
  - Open questions removed where resolved.
- Rechecked the connections that changed:
  - The tie-break (Free Upgrades first) doesn't affect E3, where Free Upgrades are never "next" (D53).
  - Unmarking rules agree across E2-01 AC 1, E2-02 AC 5 and E2-03 AC 4.
  - Tracking parts per upgrade (E2-02 AC 6) agrees with E4 AC 2, which counts by upgrade.
- The source mapping already sends Glacytes to Arch-Glacor. No Strange Old Man source remains (D63).
- **Readiness:** all six drafts are ready within reviewed scope. Published #5 has one known out-of-date data reference, to be fixed under D64.
