# Issue tracker: Local Markdown

Issues and specs (you may know a spec as a PRD) for this repo live as markdown files in `.scratch/`. `poppies` is a scratch project — work is planned in-repo rather than on the GitHub tracker.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` — never a single combined tickets file
- Triage state is recorded as a `Status:` line near the top of each issue file. The `triage` skill isn't installed here, so there's no `triage-labels.md` yet; until there is, use the five canonical role strings directly: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create a new file under `.scratch/<feature-slug>/` (creating the directory if needed).

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a file with one **child** file per ticket.

- **Map**: `.scratch/<effort>/map.md` — the Notes / Decisions-so-far / Fog body.
- **Child ticket**: `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/`task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every file it lists is `resolved`.
- **Frontier**: scan `.scratch/<effort>/issues/` for files that are open, unblocked, and unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a context pointer (gist + link) to the map's Decisions-so-far in `map.md`.

## Every session reads and writes the same way

A local-markdown tracker needs no `gh` binary and no GitHub MCP server, so laptop, web, and mobile sessions all use plain file reads and writes. This sidesteps the split that a GitHub tracker has to document — where web and mobile sessions cannot create GitHub's native issue-dependency edges and have to fall back to a `Blocked by:` line in the body.

Here there is only one representation of blocking, in the ticket file itself, and it is the same one everywhere. A map charted on a laptop reads identically from the web.

## `.scratch/` is committed

Plans, specs, and tickets are tracked in git rather than ignored, so the reasoning behind a change lands in the same history as the change. If a particular effort shouldn't be shared, keep it out of `.scratch/` rather than adding an ignore rule that would hide every effort.
