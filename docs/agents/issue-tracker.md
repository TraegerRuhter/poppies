# Issue tracker: GitHub

Issues and PRDs for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either — resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies** — the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only — the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children (`gh issue list --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me` — the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.

## Sessions without the `gh` CLI

Claude Code web and mobile sessions have no `gh` binary. They reach GitHub through the GitHub MCP server instead, so read every `gh` command above as the equivalent tool call:

| Operation | `gh` | MCP tool |
| --- | --- | --- |
| Create an issue | `gh issue create` | `issue_write` with `method: "create"` |
| Read an issue | `gh issue view <n>` | `issue_read` with `method: "get"` |
| Read its comments | `gh issue view <n> --comments` | `issue_read` with `method: "get_comments"` |
| List / filter issues | `gh issue list --label ... --state ...` | `list_issues` (`state` is `OPEN`/`CLOSED`, uppercase) |
| Comment | `gh issue comment <n>` | `add_issue_comment` |
| Label, assign, retitle | `gh issue edit <n>` | `issue_write` with `method: "update"` |
| Close | `gh issue close <n>` | `issue_write` with `method: "update"`, `state: "closed"` |
| Add a sub-issue | `gh api` sub-issues endpoint | `sub_issue_write` with `method: "add"` |
| List a map's children | scoped `gh issue list` | `issue_read` with `method: "get_sub_issues"` |

Two things behave differently and will bite if assumed away:

- **`sub_issue_id` is a database id, not an issue number.** Same trap the blocking section flags for `gh api`. Get it from `issue_read` (`method: "get"`) on the child and use the `id` field — passing `#42` silently addresses a different issue.
- **`@me` doesn't exist.** MCP `assignees` takes literal usernames, so resolve the current login with `get_me` before claiming a ticket.

### Blocking is not available over MCP

There is no MCP tool for GitHub's native issue dependencies — no `blocked_by` write, and `list_issues` doesn't return `issue_dependencies_summary`. A session without `gh` therefore **cannot** create or read the canonical blocking edges, and must use the fallback the blocking section already defines: a `Blocked by: #<n>, #<n>` line at the top of the child body, with the frontier computed by checking whether each of those issues is closed.

Mixing the two representations across sessions is the failure mode to avoid — a map wired natively on a laptop looks unblocked to a web session, which reads no `Blocked by` line and takes a ticket it shouldn't. **Pick one representation per map and note it in the map's `## Notes` block.** If a map will ever be worked from web or mobile, chart it with the body convention from the start.
