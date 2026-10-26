# IronLog

A free, non-commercial fan site for RuneScape ironman players. It tracks combat upgrades in [PVME](https://github.com/pvme/pvme-guides)'s upgrade order and ranks what to kill next.

**Live site:** https://justins95.github.io/IronLog/

A static TypeScript + React + Vite site with no backend. Progress is saved only in the player's browser. How it's built is described in [`ba/plans/Tech_Approach_IronLog_v1.md`](ba/plans/Tech_Approach_IronLog_v1.md); what it does is in the stories under [`ba/stories/`](ba/stories/) (published as GitHub Issues).

## Install

Needs [Node.js](https://nodejs.org/) 22.18 or later (CI uses Node 24).

```sh
npm install
```

## Run

```sh
npm run dev
```

Opens a local server at http://localhost:5173/IronLog/.

## Test

| What | Command |
|---|---|
| Unit tests (Vitest): data checks, rules, saved progress | `npm test` |
| End-to-end tests (Playwright): builds the site, serves it at http://localhost:4173/IronLog/ and checks it in a desktop browser | `npm run test:e2e` |
| Type-check | `npm run typecheck` |
| Lint | `npm run lint` |

The first time, install the Playwright browser with `npx playwright install chromium`.

CI (`.github/workflows/ci.yml`) runs all of these, plus the build, on every pull request.

## Build

```sh
npm run build
```

Writes the static site to `dist/`, with every path under `/IronLog/`. `npm run preview` serves the built site locally.

Every push to `main` deploys `dist/` to GitHub Pages (`.github/workflows/deploy.yml`).

## Where the data comes from

The app's data is built from the BA catalogue files in [`ba/`](ba/). They are the only source of truth: the app never keeps its own copy, and nothing in the app edits them.

| File | Used for |
|---|---|
| `ba/catalogue/ironlog_catalogue_v1.csv` | Each style's upgrades in PVME order, stages, alternatives, PVME notes and Free Upgrades |
| `ba/catalogue/ironlog_sources_v1.csv` | The sources, their type and Hard Mode flag |
| `ba/catalogue/ironlog_item_sources_v1.csv` | Which source drops each upgrade or tracked part |
| `ba/discovery/data/parts.csv` | How many of each tracked part an upgrade needs |
| `ba/discovery/data/upgrade_inventory_review.csv` | Requirements and RuneScape Wiki links |

`npm run data` (`scripts/build-data.ts`) reads those five files and writes `src/generated/catalogue.json`, which the app loads. It runs automatically before `dev`, `build`, `typecheck` and `test`. The generated file is not committed.

The step **fails with a clear message** if the data breaks a rule the stories rely on: for example, an upgrade with no sources, a source that isn't in the sources file, a tracked part with no quantity, a "one of" choice with only one option, or a Shard of Genesis Essence row whose weapon isn't in the catalogue. Fix the data through the BA, not in the app.

The upgrade order is derived from PVME (CC BY-NC-SA 4.0, non-commercial), and drop sources, parts and requirements from the [RuneScape Wiki](https://runescape.wiki/) (CC BY-NC-SA 3.0). The site credits both on every page, along with the Jagex Fan Content Policy notice.

## Code layout

| Folder | What it holds |
|---|---|
| `scripts/` | The data build step |
| `src/pipeline/` | CSV reading and the data checks (pure; unit-tested) |
| `src/rules/` | The rules module: the typed catalogue and the business rules. No React, storage or DOM |
| `src/storage/` | Saved progress in `localStorage` (`ironlog:progress`, versioned) |
| `src/ui/` | React components |
| `e2e/` | Playwright tests |

## Project agents

Project subagents live in `.claude/agents/`:

| Agent | Model | Role |
|---|---|---|
| story-writer | Sonnet | Turns feature ideas into user stories with acceptance criteria |
| requirements-reviewer | Opus | Reviews stories for gaps, ambiguity, untestable criteria |
| implementer | Sonnet | Implements one story at a time, with tests |
| code-reviewer | Opus | Read-only review of changes against acceptance criteria |
| test-writer | Sonnet | Writes test cases and automated tests from stories |
| test-runner | Haiku | Runs build/lint/tests and summarizes results |
