# Discovery Summary - IronLog

Date: 2026-10-20 | Requested output/audience: discovery record behind the IronLog user stories; for Justin (stakeholder), the BA, and the development agent | Status: supported. The core scope is confirmed. Two items are still open (see Open questions)

Produced with the ba-super-powers `discovery-intake` skill. Discovery ran as a live conversation with the stakeholder on 2026-10-20. The decisions below were confirmed by him during that session.

## Evidence and coverage

| Source/version/location | Relevant facts or decisions | Coverage limits/conflicts |
|---|---|---|
| Stakeholder conversation, 2026-10-20 (Justin) | Problem statement, all confirmed decisions D1–D35 | None. Decisions are recorded with owner and date below |
| PVME upgrade order source files, `pvme/pvme-guides` @ `7a1f15f` (2026-10-20): `upgrading-info/upgrade-order/{melee,ranged,magic,necromancy,free-upgrades}.txt` | 128 style entries, transcribed to [`data/pvme_entries.csv`](data/pvme_entries.csv). Last revised: Melee 2026-05-28, Ranged 2026-04-15, Magic 2026-03-18, Necromancy 2026-03-25 | The PVME site states much of its content predates Combat Modernization (2026-03-02). The stakeholder accepted the lists as current (D20). Emoji-only references were interpreted from their emoji names |
| PVME repository `LICENSE` | CC BY-NC-SA 4.0 | Contradicted the stakeholder's initial assumption that no license was needed. Resolved by D9 |
| RuneScape Wiki item pages (runescape.wiki), read 2026-10-20 | Drop sources, components, access requirements for 142 items: [`data/sources_melee_necro.csv`](data/sources_melee_necro.csv), [`data/sources_ranged_magic.csv`](data/sources_ranged_magic.csv), merged in [`data/upgrade_inventory_review.csv`](data/upgrade_inventory_review.csv) | Pages were read through a summarizing fetch tool, not the raw text. 10 items are medium confidence (marked in the `confidence` column). Wiki content is CC BY-NC-SA 3.0 and needs attribution |
| Collection-log parts research, RuneScape Wiki log achievement pages, read 2026-10-20 | 95 part rows for 51 assembled items: [`data/parts.csv`](data/parts.csv) | Not all wiki log pages could be read in full. Pernix's quiver fragments: unknown. Some medium-confidence rows (see `confidence`) |

## Business context and outcome

- **Problem.** An RS3 ironman can't trade with other players, so every upgrade has to come from their own kills or activities. With dozens of bosses, slayer creatures and heists, it's hard to work out which activity gets them the most upgrades next.
- **Affected actor.** An RS3 ironman player. There is one actor and no roles or accounts in the first version (D27).
- **Current state.** Players compare PVME's upgrade order pages, which are written for main accounts and priced in Grand Exchange coins, against RuneScape Wiki drop tables by hand.
- **Proposed solution (IronLog).** The player marks the upgrade items and parts they already have. IronLog shows each combat style's upgrades in PVME order with their sources, and can switch to a list of sources ranked by how many missing upgrades they drop.
- **Intended outcome.** The player can see what to kill next for the most upgrades without cross-referencing pages by hand. No success metric was set, and none is invented here.

The problem investigation branch was not used. The stakeholder is a domain expert who described the problem directly, and the next decision (what to build first) did not depend on a root-cause analysis.

## Scope and boundaries

- **In scope (D8, D31).** All bosses, slayer creatures and heists that drop a tracked upgrade, for all four combat styles. Delivered as four epics: E1 Upgrade catalogue, E2 Collection tracking, E3 Style progress, E4 What to kill next.
- **Confirmed exclusions.**
  - invention perks (D2)
  - soul forge Necromancy gear, hydrix crafts, quest/minigame rewards, skill-built items, Planted Feet, Decimation and Obliteration (D21)
  - most Free Upgrades entries (D22), Asylum Surgeon's Ring (D24), Kal-Zuk cape (D25)
  - skilling materials as tracked parts (D32)
  - drop-rate and kill-time weighting (D6)
  - accounts and cross-device sync (D27)
- **Future scope (not lost).** Full drop log (D10), data refresh when PVME changes (D20), drop rate and kill time weighting (D6).
- **Constraints.**
  - Attribution and share-alike for PVME data (D9). RuneScape Wiki attribution.
  - No commercial use of PVME-derived data.
  - **Tooling fact:** this BA session can create Issues in `JustinS95/IronLog` but can't reach the user-owned Project board (HTTP 403 on GraphQL and the Projects REST API, 2026-10-20). Board membership depends on Project automation.

## Decisions and assumptions

| Item | Fact / assumption / proposal / confirmed decision | Evidence or decision owner/date |
|---|---|---|
| D1: PVME's four upgrade order pages (Melee, Ranged, Magic, Necromancy) define what counts as an upgrade and in what order (Source: `pvme/pvme-guides` `upgrading-info/upgrade-order/*.txt`) | Confirmed decision | Justin, 2026-10-20 |
| D2: Entries that aren't boss drops are decided case by case with the stakeholder (Ability codices count as drops. Invention perks are likely skipped) | Confirmed decision | Justin, 2026-10-20 |
| D3: A compound entry ("A + B") counts as two upgrades of equal weight | Confirmed decision | Justin, 2026-10-20 |
| D4: The player marks the drops they own, and results are shown per combat style | Confirmed decision | Justin, 2026-10-20 |
| D5: The player is assumed to own T70 gear | Confirmed decision | Justin, 2026-10-20 |
| D6: Drop rates and kill effort are not used in ranking | Confirmed decision | Justin, 2026-10-20 |
| D7: Access requirements (quests, Slayer level) are shown next to items and bosses, but the player doesn't enter them and nothing is filtered by them | Confirmed decision | Justin, 2026-10-20 |
| D8: Scope: all bosses and slayer creatures | Confirmed decision | Justin, 2026-10-20 |
| D9: PVME upgrade-order data is used under CC BY-NC-SA 4.0 with attribution. Data derived from it is shared under the same license. No commercial use (Revised from "no license needed" after the license file was found in the PVME repo) | Confirmed decision | Justin, 2026-10-20 |
| D10: The player can only mark items that appear on the PVME lists. A full drop log is a possible later enhancement | Confirmed decision | Justin, 2026-10-20 |
| D11: Each style lists upgrades in PVME order with their drop sources. A toggle switches to a single list of bosses sorted by total upgrades across all styles, showing how many of those upgrades belong to each style (List view) | Confirmed decision | Justin, 2026-10-20 |
| D12: Bosses with the same total are ordered by which drops the earliest missing item in PVME order (Needs definition for the cross-style list. See Q3) | Confirmed decision | Justin, 2026-10-20 |
| D13: Free Upgrades page items are decided case by case | Confirmed decision | Justin, 2026-10-20 |
| D14: An Essence of Finality entry is included, and the upgrade is the weapon whose special attack goes into the amulet (usually the drop) | Confirmed decision | Justin, 2026-10-20 |
| D15: When an item is needed more than once, show the quantity needed and let the player enter how many they own | Confirmed decision | Justin, 2026-10-20 |
| D16: Shard of Genesis Essence: each T95 weapon it upgrades gets a "shard applied" checkbox | Confirmed decision | Justin, 2026-10-20 |
| D17: An item on more than one style's list counts once in the cross-style total, and is shown under every style that lists it (Resolves Q1) | Confirmed decision | Justin, 2026-10-20 |
| D18: Shard of Genesis upgrades are counted per weapon. An owned but unapplied shard doesn't count as obtained (Resolves Q2) | Confirmed decision | Justin, 2026-10-20 |
| D19: Cross-style tie-break order: PVME stage, then position within the stage, then alphabetical (Resolves Q3) | Confirmed decision | Justin, 2026-10-20 |
| D20: PVME lists are treated as current. Updating them when PVME changes is future maintenance (Resolves Q5) | Confirmed decision | Justin, 2026-10-20 |
| D21: The app is named **IronLog**. Heist rewards are included because they're collection log items. Excluded: soul forge Necromancy gear, hydrix crafts, quest/minigame rewards, skill-built items, Planted Feet, Wilderness slayer chest items (Decimation, Obliteration) (Annihilation pending confirmation (Q6)) | Confirmed decision | Justin, 2026-10-20 |
| D22: Free Upgrades: include Berserker's Fury (from the Amulet of the forsaken, a boss drop) and the Zuk igneous capes, one per style. Exclude skills/quests/unlocks, Ring of Vigour, World Wakes abilities, perks, Totem of Vitality and the dragon battleaxe/scimitar (Resolves most of Q4) | Confirmed decision | Justin, 2026-10-20 |
| D23: Annihilation is included (needed for the Melee Essence of Finality entry). Decimation and Obliteration stay excluded (Resolves Q6) | Confirmed decision | Justin, 2026-10-20 |
| D24: Asylum Surgeon's Ring is excluded (Resolves Q4b) | Confirmed decision | Justin, 2026-10-20 |
| D25: Igneous capes: Kal-Ket, Kal-Xil, Kal-Mej, Kal-Mor (one per style). Kal-Zuk excluded (Resolves Q7) | Confirmed decision | Justin, 2026-10-20 |
| D26: Hard Mode variants are separate sources in the boss ranking (Resolves Q8) | Confirmed decision | Justin, 2026-10-20 |
| D27: Progress is saved in the player's browser only, with no accounts (first version) (Progress stays on one device and is lost if browser data is cleared) | Confirmed decision | Justin, 2026-10-20 |
| D28: Excluded entries (perks, crafted gear, etc.) are hidden entirely from the style lists | Confirmed decision | Justin, 2026-10-20 |
| D29: Items assembled from parts are tracked part by part, not just as the finished item (Changes D10: parts become markable. Applies to every assembled item, not only Laniakea's spear) | Confirmed decision | Justin, 2026-10-20 |
| D30: Armour sets are tracked and counted per piece, so partial sets are visible | Confirmed decision | Justin, 2026-10-20 |
| D31: Epic structure E1 Catalogue, E2 Tracking, E3 Style progress, E4 What to kill next accepted | Confirmed decision | Justin, 2026-10-20 |
| D32: Only collection-log parts are tracked (parts dropped by bosses, slayer creatures or heists). Skilling materials are not tracked | Confirmed decision | Justin, 2026-10-20 |
| D33: Marking a finished item marks all its parts as owned. Owning all parts counts the finished item as obtained | Confirmed decision | Justin, 2026-10-20 |
| D34: BA records (this summary and its data) are kept in the IronLog repo's `/ba` folder as part of the demo | Confirmed decision | Justin, 2026-10-20 |
| D35: The ba-super-powers skills are not committed to the IronLog repo | Confirmed decision | Justin, 2026-10-20 |
| D36: ba-super-powers owns the requirements. The development agent builds from the published Issues and doesn't write its own stories. Gaps it finds are raised back to the BA | Confirmed decision | Justin, 2026-10-20 |
| D37: Epics are shown as labels `epic:catalogue`, `epic:tracking`, `epic:progress`, `epic:what-to-kill` (created by Justin). New Issues are auto-added to Project 4 by its Auto-add workflow | Confirmed decision | Justin, 2026-10-20 |
| D38: When a PVME entry offers a choice, every option is shown, labelled as an alternative. To be revisited | Confirmed decision (provisional by owner's request) | Justin, 2026-10-20 |
| D39: Elite dracolich pieces track only the Route A part (Vorkath's scale) | Confirmed decision | Justin, 2026-10-20 |
| D40: Ranking counts a source once for each missing upgrade it drops at least one missing part of, not once per part | Confirmed decision | Justin, 2026-10-20 |
| D41: Project 4 Status columns are Todo, Design, In progress, QA, Done | Fact (stakeholder) | Justin, 2026-10-20 |
| D42: The Free Upgrades items (Amulet of the forsaken; igneous capes) are kept, shown in a separate "Free Upgrades" section under each style, outside PVME's order | Confirmed decision | Justin, 2026-10-20 |
| D43: Parts needed in bulk (e.g. 10 Black stone hearts, 2,000 vital sparks) are tracked with a single "have all I need" mark, not a quantity | Confirmed decision | Justin, 2026-10-20 |
| D44: Board workflow: a story moves to **Design**, where a page mockup is made and added to the story, before an engineering agent works on it | Confirmed decision | Justin, 2026-10-20 |
| D45: The TokHaar capes for all four igneous capes come from the Fight Kiln. Pernix's quiver is excluded, because its fragments come from Elder Troves and aren't collection-log items | Confirmed decision | Justin, 2026-10-20 |
| D46: Stories are published to the board first. Mockups are made during the Design step and attached to the story outside the ba-super-powers publishing skill, which never edits a published Issue | Confirmed decision | Justin, 2026-10-20 |
| D47: ba-super-powers run records (publication manifests, payloads, attempt logs) are kept in `ba/runs/` of Justin's local clone (`C:\Users\saund\IronLog`), which is git-ignored and never committed | Confirmed decision | Justin, 2026-10-20 |
| D48: Standing rule: Issues created from this BA setup end with a footer added by the session's GitHub connection (`_Generated by Claude Code_`). It's accepted, and every publication manifest lists it as an expected effect | Confirmed decision | Justin, 2026-10-20 |
| Parts of one assembled item usually all drop from a single source group (e.g. every Rex Matriarch drops all Savage spear parts) | Fact as reported by the stakeholder ("if I remember correctly"). Exceptions to be checked against parts research | Justin, 2026-10-20; `data/parts.csv` pending |
| Wiki drop sources in the inventory are accurate | Assumption (evidence: wiki summaries; 10 items medium confidence) | Verify medium-confidence rows before release |

## Open questions

| Question | Blocking / nonblocking / optional for this output | Impact | Owner if known / evidence needed |
|---|---|---|---|
| Medium-confidence drop sources (Vestments of havoc, First Necromancer set, Masterwork weapons, Annihilation's chest sources, Enchantment components, T80/T90 Necromancy materials) | Nonblocking. Data accuracy | Catalogue data | Verify on the wiki, possibly as a story |

## Readiness and next action

- **Ready to draft now.** E1 (Upgrade catalogue) stories can be drafted against confirmed decisions. E2 and E3 can be drafted against `data/parts.csv` once the parts questions below are settled.
- **Provisional.** E4 ranking acceptance criteria stay provisional until the part-counting rule is confirmed.
- **Not implied.** This discovery doesn't approve any technical design. Storage, data format and UI layout belong to the development agent, within the behavior the stories set.
- **Next.** `scope-decomposition` records the confirmed epic map. Then `writing-user-stories` drafts E1 for Justin's review.
