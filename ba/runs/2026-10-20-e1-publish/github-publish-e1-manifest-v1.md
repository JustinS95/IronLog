# GitHub publication manifest - E1 stories (v1)

Produced with the ba-super-powers `github-story-publishing` skill, using the `github-operations` run-record template. **Status: PROPOSED. Not approved, and nothing has been sent to GitHub.** Once approved, this file is immutable; any change needs a v2.

## Run

| Field | Value |
|---|---|
| Record schema | ba-super-powers GitHub MVP run records |
| Run key / version | `2026-10-20-e1-publish` / v1 |
| Resume lineage | none (first run) |
| Approval | *pending: Justin* |
| Retry bounds | no automatic retry of a create. An uncertain outcome triggers reconciliation by marker (below), then a stop for review |

## Authority

| Field | Value |
|---|---|
| Host | github.com |
| Principal | `JustinS95` (account node `MDQ6VXNlcjM0MDcwMDAw`), through this session's GitHub connection |
| Approved scope | REST create Issue and read Issues/labels in `JustinS95/IronLog` only |
| Capability evidence (2026-10-20T21:15Z) | `repos/JustinS95/IronLog` readable, `permissions.push = true`, `has_issues = true`. GraphQL and the user Projects REST API return HTTP 403 for this session |

## Targets

| Target | Value |
|---|---|
| Repository | `JustinS95/IronLog`, node `R_kgDOVRX0bQ`, **private** |
| Project | user `JustinS95`, Project **#4** (https://github.com/users/JustinS95/projects/4). Node ID and visibility are **not readable from this session**. Justin reports it as private |
| Collection time | 2026-10-20T21:15:30Z |

## Inputs

| Source key | Path | SHA-256 (source file) | Review |
|---|---|---|---|
| IL-E1-01 | `ba/stories/E1-catalogue/IL-E1-01-browse-style-upgrade-order.md` | `eff835a53ee9b2d780c01a57cd342b45043389ea537638c3767f78c3f8a9d13a` | `ba/reviews/Story_Review_E1_20261020.md`: ready within reviewed scope |
| IL-E1-02 | `ba/stories/E1-catalogue/IL-E1-02-see-upgrade-sources.md` | `de42558ae580e78866811696dedd8aa577b0edaa6b1ce37ce1283db9a453655f` | same review: ready within reviewed scope |

- **Existing remote mappings:** none.
- **Duplicate check:** a complete read of all Issues (open and closed, 1 page, 2 results) found only pull requests #1 and #2, and no Issues. No marker matches. Both stories are create candidates.

## Review

- **Body transformation.** Each story file's YAML front matter is removed. One header line is added, giving the story key, the epic and a link to the source file. Relative links are rewritten to `https://github.com/JustinS95/IronLog/blob/main/...`. A recovery marker `<!-- ironlog-story: IL-E1-0x -->` is appended. The Markdown is otherwise unchanged. The exact payloads are in `payloads/`.
- **Title:** the story's `title`.
- **Labels:** `epic:catalogue`, which already exists (node `LA_kwDOVRX0bc8AAAAC-UapvA`). No labels are created.
- **Privacy:** the repository and Project are both private. The bodies contain no personal data, @mentions, attachments, secrets or internal paths beyond repository-relative file links. The links go to github.com (this repo), pvme.io and runescape.wiki. The marker is a visible HTML comment in the raw body and is unique within this repo.
- **Link dependency:** the bodies link to `ba/catalogue/` and `ba/stories/` files on `main`. These are in the pending BA pull request. **Precondition: that PR is merged before create**, or the links will 404.
- **Known automation effects (Project #4, configured by Justin):**
  - **Auto-add to project**, filter `repo:JustinS95/IronLog is:issue`. It adds each new Issue to Project #4.
  - **Item added to project** sets Status to **Todo** (D41, D44).
  - This session can't observe either effect. Board membership and Status are reported as **expected, not verified**, until Justin confirms them on the board.
- **No-actions:** no Project add call (it's done by automation; the API is unreachable), no Status update, no assignee, milestone, Issue type or sub-issue, no comments, no edits after create, no state changes, no local writeback.
- **Status race:** not applicable, since this session sends no Status mutation.

## Storage

| Record | Path |
|---|---|
| Manifest (this file) | `ba/runs/2026-10-20-e1-publish/github-publish-e1-manifest-v1.md` |
| Payloads | `ba/runs/2026-10-20-e1-publish/payloads/` |
| Attempts / checkpoints | `ba/runs/2026-10-20-e1-publish/github-publish-e1-attempts.md` (created at first attempt) |
| Retention | kept in the repo permanently as demo evidence (D34). No cleanup |

## Integrity

SHA-256 over the exact UTF-8 bytes sent as the REST `title` and `body` fields:

| Payload | SHA-256 |
|---|---|
| `payloads/IL-E1-01.title.txt` | `91e69f3a65c7d98972e20af5a83f4d2a6fea89705c3241f6bfe4aeac1d91f9e7` |
| `payloads/IL-E1-01.body.md` | `60964c9d0382e11e52b11af7b220a7bffe77030d63f7cd21ce97735a995aff0a` |
| `payloads/IL-E1-02.title.txt` | `80d80b538e5cf1b05c737d883431b45832188b48337c150142296b5279b6b3ed` |
| `payloads/IL-E1-02.body.md` | `b39cd6aec2ddb58808a4d8d3a9258182cb750db40bed1f4421df919047a20386` |

## Operations

| Key | Kind/target | Before | Exact intended payload | Dependencies | Verification |
|---|---|---|---|---|---|
| `IL-E1-01-issue` | REST `POST /repos/JustinS95/IronLog/issues` | source hash unchanged; no Issue with marker `ironlog-story: IL-E1-01` | title + body from payload files; `labels: ["epic:catalogue"]`. Omitted fields: assignees, milestone, type | BA PR merged to `main` | re-read the Issue: number, node ID, URL, repository, `state=open`, exact title/body hash, label present |
| `IL-E1-02-issue` | same | same, for IL-E1-02 | same, for IL-E1-02 | `IL-E1-01-issue` verified (order only, so the Issue numbers follow the story order) | same |
| `IL-E1-0x-add` | **not sent by this session** | — | Project #4 Auto-add workflow | each Issue created | **unverifiable here**: Justin confirms each card is on the board in Todo |

## Recovery

- **Create times out:** mark it uncertain. List all repository Issues (open and closed, full pagination) and match on the exact marker plus the body hash. Exactly one match: recover it. Two or more, or none while the read is incomplete: stop and ask Justin. Never retry blindly.
- **Label missing after create:** the endpoint can drop labels silently. Record it as a partial outcome and ask. This MVP doesn't edit Issues afterwards.
