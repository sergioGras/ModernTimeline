# Tasks

## Status legend

- `[ ]` pending
- `[~]` active
- `[x]` done
- `[!]` blocked

## Done

- [x] Build the initial Next.js timeline board scaffold.
- [x] Add sample board data and `localStorage` persistence.
- [x] Implement board settings, section CRUD, and milestone CRUD.
- [x] Fix Tailwind PostCSS setup and UTF-8 parsing issues.
- [x] Add a single horizontal scrollbar for the timeline board.
- [x] Refresh buttons toward a more modern tech-glass style.
- [x] Raise and reorganize the top bar into a command-style toolbar.
- [x] Add adaptive row-height behavior so the board uses the full viewport height.
- [x] Add aggregate milestone cluster chips for dense same-row/dense-date scenarios.
- [x] Add a cluster detail dialog for selecting an individual milestone.
- [x] Establish a durable project memory system under `docs/project/`.
- [x] Implement quarter-paged timeline view with next/previous navigation and active quarter indicator.
- [x] Apply the first-pass UI layout refresh across toolbar, section rail, dialogs, timeline footer, week guides, and cluster sizing.
- [x] Switch the top-bar scale controls and footer scroll controls to the shared button system.
- [x] Add a visible page shell inset and regroup the toolbar into dedicated action, scale, and identity zones.
- [x] Flatten the workspace shell into one flatter top bar, tighter section rail, and simpler dialog headers.
- [x] Move dialog close controls into the header and rebalance footer spacing.
- [x] Reduce chip and cluster chrome so board items read less like floating cards.
- [x] Add more shell inset and card-like structure to the top bar and section rail.
- [x] Rework the shell again with a flatter header row, calmer section rail, wider dialog breathing room, and a cleaner footer strip.

## Verified

- [x] Local persistence helpers and board load/save flow are present in the codebase.
- [x] Quarter-paged navigation and scrollbar sync are present in the codebase.
- [x] Aggregate milestone clustering and the cluster selection dialog are present in the codebase.
- [x] Shared button and dialog primitives are present in the codebase.
- [x] `npm run build` passes on the current branch.

## Active Phases

### Phase 0 - Product Direction Reset

- [~] Treat the current UI as open for full redesign rather than constrained by existing primitives.
- [~] Use the swimlane timeline proposal as the main reference for future layout direction.
- [ ] Decide whether V1 remains milestone-only or expands toward duration blocks plus milestone markers.
- [ ] If duration blocks are adopted, define a migration path from `Milestone` to roadmap items before code changes.

### Phase 1 - Shell & Header

- [x] Promote the top bar to a single horizontal strip at `lg` and up.
- [x] Remove nested card language from the header zones.
- [ ] Verify the header stays on one row across common desktop widths.

### Phase 2 - Section Rail

- [x] Narrow and soften the sticky section rail.
- [x] Add a clearer inner card and more breathing room from the left border.
- [ ] Validate the rail still reads compact at `2`, `5`, and many sections.

### Phase 3 - Dialogs

- [x] Rebalance dialog widths and footer spacing.
- [x] Move close controls into the dialog header.
- [ ] Apply the dialog fix order below to remove clipping, border crowding, and uneven spacing.

#### Dialog Fix Order

1. Increase internal padding on the modal shell.
2. Rework the footer spacing into a distinct action band.
3. Increase vertical rhythm between labels and fields.
4. Reduce the visual dominance of the textarea.
5. Reposition and resize the close control.
6. Make the form hierarchy more explicit.
7. Soften the field chrome slightly.
8. Rebalance the dialog width against the content density.

### Phase 4 - Board Surface

- [x] Simplify the footer scrollbar strip.
- [x] Reduce chip and cluster chrome.
- [ ] Re-check week lines and cluster spacing in quarter mode.

### Phase 5 - QA

- [ ] Screenshot review for shell, rail, dialogs, footer, and cluster surfaces.
- [ ] Keyboard and focus review for icon-only controls and modal close actions.
- [ ] Run `npm run build` after the final visual pass.

## Current Screenshot QA Findings

### Overall Read

- [ ] The board has the right features, but the visual system still feels unfinished and inconsistent.
- [ ] The layout needs a broader spacing and hierarchy reset rather than small cosmetic tweaks.
- [ ] The current shell, dialogs, and rail feel visually cramped even when the structure is technically correct.
- [ ] Remaining screenshot feedback points to spacing and card treatment rather than missing functionality.
- [ ] Current shared primitives are not sacred; replace or rewrite them where they keep producing cramped UI.

### Reference Layout Direction

- [ ] Explore a strict 4-lane swimlane timeline: TreePlet Core, Learning, Personal Strategic, Optional / Sandbox.
- [ ] Preserve April to December 2026 as the main horizontal planning range, grouped by Q2, Q3, and Q4.
- [ ] Prepare for dual encoding: solid bars for commitments, dashed/lighter bars for intentions.
- [ ] Prepare for milestone markers as key delivery points separate from duration blocks.
- [ ] Keep density low: about 5 to 7 major items per lane and labels around 2 to 4 words.
- [ ] Avoid weekly task detail in the main board; the timeline should show cognitive bandwidth across the year.

### Toolbar And Shell

- [ ] The top bar should behave like one workspace chrome strip, not several stacked mini-cards.
- [ ] Toolbar actions, time-scale toggle, and board identity need one cleaner hierarchy.
- [ ] Toolbar buttons still read too much like pills and need a flatter, more deliberate treatment.
- [ ] The page shell needs more consistent inset and less border-heavy framing.

### Section Rail

- [ ] Sticky section content still feels too close to the left edge.
- [ ] The section rail uses too much width for too little useful content.
- [ ] Section titles need a clearer hierarchy and less visual clutter.
- [ ] Section action controls need to be simpler and more compact.

### Timeline Footer

- [ ] The bottom footer is cramped and collides visually with the lower-left overlay area.
- [ ] The scrollbar is not visually prominent enough as the main horizontal navigation affordance.
- [ ] The footer controls still look like secondary controls instead of a clean navigation strip.

### Timeline Grid

- [ ] Week guidance is still visually wrong; it reads like dense dotted horizontal bands instead of thin vertical week lines.
- [ ] Milestone clustering still allows overlap between aggregate chips and single milestone chips.
- [ ] Cluster chips need a more neutral grouped-summary look.

### Dialogs

- [ ] Dialog close controls need more inset and a clearer visual anchor.
- [ ] Dialog footers need more top/bottom breathing room.
- [ ] Dialog buttons need a flatter, less native look.
- [ ] Dialog inputs and selects need more internal padding and a softer radius.
- [ ] Milestone-cluster dialog cards need to be lighter and less dominant.

### Active Redesign Targets

- [~] Rebuild the shell as one coherent workspace frame with less nested chrome.
- [~] Restyle the toolbar so it feels like a single command strip.
- [~] Restyle shared buttons so they feel flatter, cleaner, and less browser-native.
- [~] Restyle dialogs so close controls, headers, form fields, and footers share one visual language.
- [~] Rework the section rail so it is compact, readable, and not wasteful.
- [~] Rework timeline footer controls and scrollbar visibility.
- [~] Rework week guides and cluster spacing so the grid is readable at a glance.

## Backlog

- [ ] Zoom scale controls beyond simple month/quarter switching.
- [ ] Duration-based roadmap blocks with commitment/intention encoding.
- [ ] Diamond-style milestone markers over duration blocks.
- [ ] Lane presets for TreePlet Core, Learning, Personal Strategic, and Optional / Sandbox.
- [ ] Export and import.
- [ ] Backend persistence.
- [ ] Auth and collaboration.
- [ ] Drag-and-drop milestone rescheduling.

## Known Issues / UX Review

- [ ] Current screenshots show the layout is not yet production-polished.
- [ ] The visual system needs one coherent direction across toolbar, dialogs, and board chrome.
- [ ] Week guide rendering still needs to become clear vertical guides.
- [ ] Cluster layout needs real collision prevention, not just grouping.
- [ ] Adaptive row density still needs validation with 2, 5, and many sections.

## Immediate Follow-up

- [ ] Revisit the dialog and board redesign without assuming the current shared primitives are correct.
- [ ] Apply the dialog fix order in `milestone-dialog.tsx` first, then mirror the same spacing system in `board-settings-dialog.tsx` and `section-dialog.tsx`.
- [ ] Re-check the redesigned header at common desktop widths, especially `lg` layouts.
- [ ] Validate the section rail spacing against screenshots with `2`, `5`, and many sections.
- [ ] Re-open the dialogs and confirm the new field rhythm and footer spacing feel correct.
- [ ] Re-run the quarter view and confirm the week guides and cluster spacing still read cleanly.
