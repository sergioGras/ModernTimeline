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

## In Progress

- [~] Validate the refreshed UI against screenshots and tune any remaining layout regressions.
- [~] Review dialog body spacing after the latest footer changes.

## Current Screenshot QA Findings

- [!] Top toolbar controls are too close to the left viewport edge; the first button starts at `x=0` and the toolbar has no safe page inset.
- [!] Toolbar buttons still read as old/native pills with heavy dark outlines; the intended tech-glass button system is not visually consistent in the screenshots.
- [!] Toolbar grouping is weak: primary actions, scale toggle, and board identity feel disconnected across the full width.
- [!] Sticky section rail content is still too close to the left viewport edge; `Projects`, `Section`, and section titles begin visually at the screen border.
- [!] Sticky section rail has too much empty width relative to the visible content while still lacking internal breathing room at the left edge.
- [!] Section row actions are not visible in the current row-density state, leaving no obvious edit/reorder/delete affordance from the board.
- [!] Weekly guide lines are not visible as thin vertical lines; the visible result is a dense dotted horizontal band at row boundaries.
- [!] Milestone clustering still allows visual collisions: aggregate chips and individual milestone chips overlap in the same row.
- [!] Cluster chips and milestone chips have inconsistent visual weight; cluster chips appear as selected green cards rather than neutral grouped summaries.
- [!] Bottom timeline footer is cramped at the lower-left edge; `Timeline`, `Left`, and `Right` collide visually with the viewport/plugin overlay area.
- [!] Bottom timeline controls still look like old text buttons; they should be icon or compact controls with the same modern button language.
- [!] Horizontal scrollbar affordance is too subtle and visually detached; it should be easier to discover with a single clear gutter.
- [!] Add-section dialog close control is effectively invisible or misplaced; only a tiny mark appears near the top-left edge instead of a clear close affordance.
- [!] Dialog footer buttons sit on the lower border with insufficient bottom/right padding.
- [!] Dialog primary/secondary buttons still look like old bordered native pills in screenshots, inconsistent with the intended app style.
- [!] Dialog inputs look flat/native and cramped; spacing and radius do not match the rest of the product UI.
- [!] Milestone-cluster dialog list cards are oversized, heavily outlined, and too close together; they need lighter borders, better spacing, and cleaner hierarchy.
- [!] Milestone-cluster dialog also lacks a visible close control.

## Next

- [ ] Add a real shell inset around the whole app surface so no control or label starts at the viewport edge.
- [ ] Rebuild toolbar layout as three stable zones: left actions, center scale/window controls, right board identity.
- [ ] Replace bottom `Left`/`Right` text buttons with compact icon controls or a cleaner scrollbar-only footer pattern.
- [ ] Redesign the bottom timeline footer with enough left padding, a visible scrollbar track, and no clipped labels.
- [ ] Rework section rail spacing: consistent left padding, tighter but usable width, and visible compact row actions.
- [ ] Rework week guides as low-contrast vertical lines spanning the timeline body, not repeated horizontal dotted bands.
- [ ] Fix milestone/cluster layout so clusters reserve space and do not overlap neighboring single chips.
- [ ] Restyle aggregate cluster chips as neutral summary chips with clear count hierarchy.
- [ ] Fix shared dialog close control placement and contrast across all dialogs.
- [ ] Increase dialog footer padding and ensure actions are visually detached from the modal edge.
- [ ] Restyle dialog form controls so inputs/selects/textareas match the app's modern rounded/glass language.
- [ ] Restyle milestone-cluster dialog list items with lighter borders, better internal spacing, and no heavy black outlines.
- [ ] Validate board behavior with 2, 5, and many sections after the layout rewrite.
- [ ] Validate quarter paging, active quarter indicator, and manual scrollbar sync after grid/footer changes.
- [ ] Tune row density and chip sizing across comfortable, compact, and micro states.
- [ ] Tune cluster thresholds against realistic dense milestone data.
- [ ] Run `npm run build` after the visual/layout implementation pass.

## Backlog

- [ ] Zoom scale controls beyond simple month/quarter switching.
- [ ] Export and import.
- [ ] Backend persistence.
- [ ] Auth and collaboration.
- [ ] Drag-and-drop milestone rescheduling.

## Known Issues / UX Review

- [!] Current screenshots show layout fixes are not visually successful yet.
- [!] Controls and labels are still too close to viewport edges.
- [!] Multiple controls still look browser-native or old-style, especially buttons and dialog actions.
- [!] Dialog close controls are not discoverable enough.
- [!] Dialog footer spacing remains too tight.
- [!] Week guide implementation needs visual correction.
- [!] Cluster layout needs collision prevention, not only grouping.
- [!] Adaptive row density still needs validation with 2, 5, and many sections.
