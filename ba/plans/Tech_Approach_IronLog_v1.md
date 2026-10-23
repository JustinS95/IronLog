# Technical Approach - IronLog v1

Date: 2026-10-21 | Owner: Justin | Decisions: [Discovery Summary](../discovery/Discovery_Summary_IronLog_20261020.md) [D71](../discovery/Discovery_Summary_IronLog_20261020.md#d71 "IronLog is a static website with no backend, built in TypeScript + React + Vite. Business rules live in a pure…")–[D74](../discovery/Discovery_Summary_IronLog_20261020.md#d74 "A separate Claude Code session builds IronLog from the published Issues, one task or story per branch and PR, …")

This note tells the engineering session how IronLog is built. The **stories** (`ba/stories/`, published as Issues #4–#12) say *what* the app does; this note says *how* it's put together. Where they disagree, the stories win: raise the conflict instead of choosing.

## Shape of the app

- **A static website with no backend ([D71](../discovery/Discovery_Summary_IronLog_20261020.md#d71 "IronLog is a static website with no backend, built in TypeScript + React + Vite. Business rules live in a pure…")).** There are no accounts ([D27](../discovery/Discovery_Summary_IronLog_20261020.md#d27 "Progress is saved in the player's browser only, with no accounts first version Progress stays on one device an…")), progress lives in the player's browser, and the catalogue is fixed data. Nothing runs on a server.
- **TypeScript + React + Vite**, built as a single-page app. Use current stable versions; justify any extra dependency in the PR.
- **Hosted on GitHub Pages ([D72](../discovery/Discovery_Summary_IronLog_20261020.md#d72 "IronLog will be public and is hosted on GitHub Pages, deployed from main by GitHub Actions. The repository mus…"))**, deployed from `main` by GitHub Actions. The site lives at `https://justins95.github.io/IronLog/`, so the Vite `base` is `/IronLog/`. Pages needs the repository to be **public** on the free plan. Justin makes it public (after the privacy check below) before the first deploy.
- **Phone and desktop.** The mockups are fluid pages: at phone width, toolbars wrap and rows stack.

## The four layers

| Layer | What it does | Rules |
|---|---|---|
| **Data (build time)** | Reads the BA catalogue CSVs and writes one typed JSON file the app loads | The CSVs in `ba/` are the source of truth. The app never keeps its own copy of the data, and the build never edits `ba/` |
| **Rules** | Pure TypeScript functions: owned state, next upgrade, source ranking | No React, no storage, no DOM. Every AC rule lives here and is unit-tested |
| **Storage** | Saves and loads the player's marks in `localStorage` | Versioned format, keyed by item and part names (below) |
| **UI** | The three views in the mockups | Displays what the rules return. No business rules in components |

### Data inputs

| File | Used for |
|---|---|
| `ba/catalogue/ironlog_catalogue_v1.csv` | Every style list: stage, order, upgrade name, alternatives, PVME notes, Free Upgrades ([columns](../catalogue/README.md)) |
| `ba/catalogue/ironlog_sources_v1.csv` | The 76 sources, their type and Hard Mode flag |
| `ba/catalogue/ironlog_item_sources_v1.csv` | Which source drops each upgrade or tracked part. **The parts named here are the tracked parts**: this file already applies [D32](../discovery/Discovery_Summary_IronLog_20261020.md#d32 "Only collection-log parts are tracked parts dropped by bosses, slayer creatures or heists. Skilling materials …") (collection log only) and [D39](../discovery/Discovery_Summary_IronLog_20261020.md#d39 "Elite dracolich pieces track only the Route A part Vorkath's scale") (Elite dracolich Route A only) |
| `ba/discovery/data/parts.csv` | Part quantities (`part_quantity_needed`) for those tracked parts only |
| `ba/discovery/data/upgrade_inventory_review.csv` | `access_requirements` and `wiki_url`, joined to the catalogue by item name (`item` = `inventory_item`). Only items in the catalogue are used; the catalogue already applies the exclusions |

The build must **fail with a clear message** if the data breaks a rule the stories rely on. For example:
- a catalogue row whose `inventory_item` has no sources;
- an item-source row naming a source that isn't in the sources file;
- a part with no quantity;
- a "one of" group with only one option;
- a Genesis row whose weapon isn't an upgrade in the catalogue.

Unit tests prove each check with a small broken fixture.

### Rules worth getting exactly right

These are where the bugs will be. Each one has an AC example to test against:

- **One item, every style.** Marking an item marks it everywhere it's listed ([IL-E2-01](https://github.com/JustinS95/IronLog/issues/7) AC 3).
- **Upgrade and parts stay in step.** [IL-E2-02](https://github.com/JustinS95/IronLog/issues/8) AC 3–5, including a bulk part's single "have all" mark (AC 2).
- **Genesis follows the weapon.** "Shard applied" shows only while the weapon is owned, and unmarking the weapon clears it ([IL-E2-03](https://github.com/JustinS95/IronLog/issues/9)).
- **Next upgrade.** The first missing upgrade in PVME order. Free Upgrades are never next. A "one of" group is done once any option is fully owned, and an option with two upgrades needs both ([IL-E3-01](https://github.com/JustinS95/IronLog/issues/11) AC 3, 4, 6; [D67](../discovery/Discovery_Summary_IronLog_20261020.md#d67 "In a 'one of' group, an option made of more than one upgrade counts as owned only when all of them are owned r…")).
- **Ranking:**
  - an upgrade counts once per source, however many parts that source drops;
  - an upgrade counts once across styles;
  - Shard of Genesis counts once per source ([D70](../discovery/Discovery_Summary_IronLog_20261020.md#d70 "In the source ranking, the Shard of Genesis Essence upgrades count as one upgrade for a source, however many w…"));
  - tie-breaks run Free Upgrades first, then stage, then position, then A–Z;
  - Hard Mode sources are separate;
  - sources with nothing missing are hidden ([IL-E4-01](https://github.com/JustinS95/IronLog/issues/12)).
  The E4 mockup's numbers make a ready-made test: with its example marks it shows **74 sources and 99 missing upgrades**, with Rex Matriarchs first.

### Saved progress

- One `localStorage` entry, e.g. `ironlog:progress`. It holds a `version` number plus the owned items, the owned parts (keyed by item *and* part, because parts are tracked per upgrade, [D60](../discovery/Discovery_Summary_IronLog_20261020.md#d60 "Parts are tracked separately for each upgrade")) and the "shard applied" weapons.
- Key everything by `inventory_item` and part name, never by row or entry ID. Then a catalogue change (like [D69](../discovery/Discovery_Summary_IronLog_20261020.md#d69 "Necromancy needs only one Soulbound lantern. PVME's second lantern N3-05, 'Upgrade to T100 Flanking switch' is…") removing [N3-05](../catalogue/ironlog_catalogue_v1.csv)) doesn't scramble anyone's marks. Ignore names that no longer exist, but don't delete them.
- Wrap every read and write in error handling. A browser can block storage; the app should still work, just without saving.
- No "clear all" control in v1 ([D51](../discovery/Discovery_Summary_IronLog_20261020.md#d51 "No 'clear all progress' option in v1")). Show the "saved only in this browser" note ([IL-E2-04](https://github.com/JustinS95/IronLog/issues/10) AC 3).

## Designs

Each story's Issue has a **Design** section linking its prototype:
- E1 Upgrade Catalogue (#4, #5);
- E2–E3 Collection Tracking (#7–#11);
- E4 What to Kill Next (#12).

The prototypes show the intended layout and behaviour, built with the real catalogue data. They're prototypes, so match the behaviour and keep the layout close, but there's no need to copy them pixel for pixel. Where a prototype and the AC differ, the AC apply.

## Testing and QA

- **Unit tests (Vitest)** for the data checks and every rule above, built from the AC examples.
- **End-to-end tests (Playwright)**: at least one per story, covering its main path in a real browser.
- **CI (GitHub Actions)** runs type-check, lint, unit tests, the build and the Playwright tests on every PR. A red PR isn't ready for review.
- **Justin QAs each story by hand on the live site** after it merges (QA column), checking the behaviour against its AC. There are no per-PR preview sites, so `main` is the test environment until launch.

## Icons ([D73](../discovery/Discovery_Summary_IronLog_20261020.md#d73 "Item icons are copied into the repository fetched from the RuneScape Wiki by a manually run GitHub Actions wor…"))

Item icons are copied into the repo, never loaded from the wiki at runtime. A manually run GitHub Actions workflow fetches them ([IL-E0-02](https://github.com/JustinS95/IronLog/issues/19)). Most session sandboxes can't reach the wiki, but Actions runners can. Each icon's wiki file page is recorded for attribution. Until an icon exists, the UI shows a neutral placeholder.

## Licences and notices

Every page shows these three notices. The E1 mockup has the wording and links:
- PVME upgrade order: CC BY-NC-SA 4.0, non-commercial ([D9](../discovery/Discovery_Summary_IronLog_20261020.md#d9 "PVME upgrade-order data is used under CC BY-NC-SA 4.0 with attribution. Data derived from it is shared under t…"));
- RuneScape Wiki data: CC BY-NC-SA 3.0;
- Jagex Fan Content Policy notice, verbatim ([D65](../discovery/Discovery_Summary_IronLog_20261020.md#d65 "IronLog shows item icons from the RuneScape Wiki. These images belong to Jagex, not to the wiki's CC BY-NC-SA …")).

**Open decision (Justin):** the repository's own licence once public. The data is CC BY-NC-SA (share-alike, non-commercial). A common split is MIT for the code, CC BY-NC-SA 4.0 for the data and BA documents, and a note that item icons belong to Jagex and are used under its Fan Content Policy. Not legal advice.

## Before the repository goes public

Do a quick privacy pass. Check that `ba/` contains no personal details beyond Justin's first name. Run records (`ba/runs/`) are git-ignored and never committed ([D47](../discovery/Discovery_Summary_IronLog_20261020.md#d47 "ba-super-powers run records publication manifests, payloads, attempt logs are kept in ba/runs/ of Justin's loc…")). Check the Git history too, not only the current files.

## How the engineering session works ([D74](../discovery/Discovery_Summary_IronLog_20261020.md#d74 "A separate Claude Code session builds IronLog from the published Issues, one task or story per branch and PR, …"))

- A **separate Claude Code session** builds the app from the published Issues, starting with [IL-E0-01](https://github.com/JustinS95/IronLog/issues/18) and then the epics in order: E1 → E2 → E3 → E4.
- **One task or story per branch and PR.** Name the branch after the key (e.g. `feat/IL-E1-01-style-upgrade-order`) and reference the Issue in the PR. Justin merges.
- The engineering session **doesn't edit `ba/`**. Requirements change through the BA. Questions or conflicts go in the PR description or as a comment on the Issue, not into a guess.
- Board moves are Justin's. The cloud session can't move cards.

## Out of scope for v1

Accounts and sync, drop logs ([D10](../discovery/Discovery_Summary_IronLog_20261020.md#d10 "The player can only mark items that appear on the PVME lists. A full drop log is a possible later enhancement")), drop-rate or kill-time weighting ([D6](../discovery/Discovery_Summary_IronLog_20261020.md#d6 "Drop rates and kill effort are not used in ranking")), analytics, ads or anything commercial ([D9](../discovery/Discovery_Summary_IronLog_20261020.md#d9 "PVME upgrade-order data is used under CC BY-NC-SA 4.0 with attribution. Data derived from it is shared under t…")), and a "clear all progress" control ([D51](../discovery/Discovery_Summary_IronLog_20261020.md#d51 "No 'clear all progress' option in v1")).
