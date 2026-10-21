# IronLog: notes for the engineering session

IronLog is a free, non-commercial fan site for RuneScape ironman players. It tracks combat upgrades in PVME's order and ranks what to kill next.

## Read first
- **Technical approach:** `ba/plans/Tech_Approach_IronLog_v1.md`. How the app is built: static React + TypeScript + Vite site, rules module, storage, tests, deployment.
- **The task or story you're given.** Each is a GitHub Issue (#4–#12, plus the E0 tasks) with acceptance criteria and a Design section linking its prototype. The same text lives in `ba/stories/`.

## Ground rules
- **One task or story per branch and PR.** Branch `feat/<KEY>-<short-name>`, and reference the Issue in the PR. Never push to `main`. Justin merges.
- **Requirements come from the BA.** Don't edit anything under `ba/`. If the AC are unclear, contradict each other, or don't match the prototype, say so in the PR description or on the Issue and stop rather than guess. Where a prototype and the AC differ, the AC apply.
- **The BA catalogue is the data.** Build from the CSVs in `ba/`. Never hand-copy or hand-edit catalogue data in the app.
- **Business rules live in the rules module**, not in components, and each AC example gets a unit test.
- **Keep CI green.** Type-check, lint, unit tests, build and Playwright end-to-end tests run on every PR. Don't weaken or delete a test to make it pass.
- **Notices stay on every page:** PVME (CC BY-NC-SA 4.0), RuneScape Wiki (CC BY-NC-SA 3.0) and the Jagex Fan Content Policy notice, verbatim.
- **No new dependencies without a reason** in the PR. No analytics, ads or tracking.

## Finish each PR with
Files changed, how each acceptance criterion (or "Done when" item) is met, test results, and anything left open. Justin QAs the behaviour on the live site after merge.

Project subagents are in `.claude/agents/` (see `README.md`).
