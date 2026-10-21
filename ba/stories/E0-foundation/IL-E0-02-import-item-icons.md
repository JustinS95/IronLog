---
key: IL-E0-02
title: Import item icons from the RuneScape Wiki
epic: E0 Foundation
label: epic:foundation
status: draft
github_issue:
---

# Summary
**Technical task.** Copy each upgrade's inventory icon from the RuneScape Wiki into the repository, so the style lists can show it (D65, D73). The app never loads images from the wiki while it runs.

Most development sandboxes can't reach the wiki, but GitHub Actions runners can. So the icons are fetched by a workflow that Justin starts by hand, and the workflow proposes the result as a pull request.

# Business Value
Icons make a long list much quicker to scan. Copying them into the repo keeps the site working if the wiki is slow or changes its file names, and avoids loading the wiki's servers on every visit.

# Done when
- [ ] 1. A GitHub Actions workflow, started by hand (`workflow_dispatch`), fetches one inventory icon for each of the 111 items in `ba/catalogue/ironlog_catalogue_v1.csv`.
- [ ] 2. The workflow finds each image through the wiki's MediaWiki API, starting from the item's `wiki_url` in `upgrade_inventory_review.csv`. It sends a descriptive User-Agent that names IronLog and the repository, and requests images one at a time.
- [ ] 3. Icons are saved in the app's static assets with stable file names. A manifest records, for each item, its icon file and the wiki file page it came from.
- [ ] 4. When an item's icon can't be found unambiguously, the workflow lists that item in its summary and leaves it without an icon. It never substitutes a guessed image.
- [ ] 5. The workflow opens a pull request with the icons, the manifest and the summary, ready for Justin to review. It doesn't push to `main`.
- [ ] 6. The style list rows show the item's icon where one exists, and the neutral placeholder otherwise. All the Shard of Genesis Essence rows use the shard's icon.
- [ ] 7. Each page that shows icons carries the Jagex Fan Content Policy notice (already in place from IL-E0-01).

# Notes
- Only the 111 upgrade items get icons in v1. Parts and sources don't.
- Icons belong to Jagex and are used under its Fan Content Policy, not the wiki's CC licence (D65, learning 2026-10-21-07).
- Do this after IL-E0-01 and before or alongside IL-E1-01. E1 works without icons, using placeholders.

# Traceability
| Requirement/source | Item | Status/decision |
|---|---|---|
| D73 icons copied into the repo, never loaded from the wiki at runtime | 1, 3, 6 | Confirmed |
| D65 Jagex Fan Content Policy notice | 7 | Confirmed |
| No guessed data (BA working rule) | 4 | Confirmed |
| D74 Justin merges; no pushes to `main` | 5 | Confirmed |
