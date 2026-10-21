---
key: IL-E0-01
title: Set up the IronLog app foundation
epic: E0 Foundation
label: epic:foundation
status: draft
github_issue:
---

# Summary
**Technical task.** This isn't a user story. It builds the base every story needs: the app skeleton, the data pipeline from the BA catalogue, the rules module, saved progress, tests, CI and deployment.

How the app is built is described in [`ba/plans/Tech_Approach_IronLog_v1.md`](../../plans/Tech_Approach_IronLog_v1.md) (D71–D74). Feature behaviour belongs to the E1–E4 stories. This task adds no feature behaviour beyond an empty page with the required notices.

# Business Value
Every story depends on the catalogue data loading correctly and the rules being testable on their own. Getting this right once means each story PR stays small, and Justin can QA on the live site from the first story onwards.

# Done when
- [ ] 1. The repository has a TypeScript + React + Vite app that builds as a static site, with Vite `base` set to `/IronLog/`.
- [ ] 2. A build step reads the five data files listed in the Technical Approach and produces one data file the app loads. It doesn't modify anything in `ba/`.
- [ ] 3. The build fails with a clear message when the data breaks one of the checks listed in the Technical Approach. Each check has a unit test with a small broken fixture.
- [ ] 4. A rules module exists with no UI or storage code in it. It exposes the typed catalogue (styles, stages, upgrades, alternatives, parts, sources) for the stories to build on. Unit tests confirm the row counts against the catalogue: 136 rows; Melee 39, Ranged 34, Magic 39 and Necromancy 17 in PVME order, plus each style's Free Upgrades.
- [ ] 5. Saved progress has a versioned format in `localStorage`, keyed by item and part names as described in the Technical Approach. Reads and writes survive storage being blocked, and the app still loads. Unit tests cover save, load, an unknown name, and blocked storage.
- [ ] 6. The page shows the IronLog header and the three notices: PVME (CC BY-NC-SA 4.0, non-commercial), RuneScape Wiki (CC BY-NC-SA 3.0) and the Jagex Fan Content Policy notice, verbatim, as in the E1 mockup.
- [ ] 7. Unit tests (Vitest) and at least one end-to-end test (Playwright) run locally with one documented command each. The end-to-end test opens the built site and checks that the notices are shown.
- [ ] 8. GitHub Actions runs type-check, lint, unit tests, build and end-to-end tests on every pull request.
- [ ] 9. On every push to `main`, GitHub Actions deploys the site to GitHub Pages. The live URL is in the README.
- [ ] 10. The README explains how to install, run, test and build the app, and where its data comes from.

# Notes
- **Repository visibility:** GitHub Pages needs a public repository on the free plan. If the repository is still private when this is ready, item 9 is blocked. Leave the workflow in place and say so in the PR. Justin makes the repository public.
- **Repository licence:** Justin hasn't chosen one yet (open decision in the Technical Approach). Don't add a LICENSE file in this task.
- **Icons:** not part of this task (see IL-E0-02). Use a neutral placeholder where an icon will go.

# Traceability
| Requirement/source | Item | Status/decision |
|---|---|---|
| D71 static site, TypeScript + React + Vite, rules module, tests | 1, 4, 7 | Confirmed |
| BA catalogue is the source of truth; D69 row counts | 2, 3, 4 | Confirmed |
| D27, D51, D60 browser storage, no clear-all, parts per upgrade | 5 | Confirmed |
| D9, D65 notices | 6 | Confirmed |
| D72 GitHub Pages from `main`; D74 one PR per task | 8, 9 | Confirmed |
