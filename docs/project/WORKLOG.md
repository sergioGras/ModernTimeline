# Worklog

## 2026-04-28

- `Docs`: Loosened `AGENT.md` so current shared UI primitives are not treated as fixed while the product is still in active redesign.
- `Docs`: Added the 4-lane swimlane timeline proposal as a reference direction in tasks, roadmap, and decisions.
- `UI/UX`: Flattened the workspace shell into a simpler top bar, lighter section rail, flatter shared buttons, and cleaner dialog headers.
- `Dialogs`: Rebalanced footer spacing and moved the close control into the dialog header instead of a floating corner chip.
- `Timeline`: Reduced chip and cluster chrome so board items read less like separate floating cards.
- `Verification`: `npm run build` passed after the redesign pass.
- `UI/UX`: Added more shell inset and introduced card-like sub-surfaces in the top bar and section rail to improve spacing and hierarchy.
- `Verification`: `npm run build` passed after the spacing and card treatment pass.
- `UI/UX`: Reworked the shell again to make the top bar a single desktop row, widen dialog breathing room, and simplify the footer scrollbar strip.
- `Docs`: Reorganized `TASKS.md` into explicit redesign phases so implementation order is clearer.
- `Verification`: `npm run build` passed after the latest stabilization pass.
- `Docs`: Added a root `AGENT.md` with architecture, UI, code, accessibility, and workflow rules for the project.
- `Docs`: Updated the dialog task plan to spell out the exact fix order for spacing, footer, field rhythm, and close control issues.

## 2026-04-26

- `UI/UX`: Compacted the section rail actions and removed the noisy bottom footer label to push the board toward a lighter control surface.
- `Verification`: `npm run build` passed after the section rail and footer cleanup pass.
- `Docs`: Reframed the task board around a broader UI redesign pass after screenshot review showed the layout still feels visually unfinished.
- `UI/UX`: Added a visible page inset and regrouped the top toolbar into dedicated action, scale, and board-identity zones.
- `Verification`: `npm run build` passed after the shell and toolbar implementation pass.
- `Docs`: Reclassified the screenshot findings from blocked to open issues and added a verified-complete section for items confirmed in code and build.
- `Docs`: Reworked `TASKS.md` into grouped screenshot findings for shell, toolbar, section rail, footer, grid, and dialogs so the next implementation pass is explicit.
- `UI/UX`: Implemented the first-pass layout refresh for the toolbar, section rail, dialogs, bottom scroll controls, week guides, and cluster sizing.
- `Verification`: `npm run build` passed after the layout implementation pass.
- `QA`: Reviewed user screenshots and reopened the UI layout pass because toolbar spacing, section rail spacing, dialog controls, week guide rendering, bottom scrollbar layout, and milestone cluster collisions are still visibly failing.
- `UI/UX`: Increased timeline page/section rail spacing, widened the sticky section column, strengthened dialog close button visibility, and added more footer breathing room.
- `Timeline`: Added subtle week-level guide lines inside quarter pages to improve date orientation without changing the persisted data model.
- `Verification`: `npm run build` passed after the layout polish implementation.
- `Docs`: Reordered the task board so the next active pass focuses on UI layout polish before further feature expansion.
- `Docs`: Added explicit tracking for section rail spacing, dialog close visibility, dialog footer spacing, and weekly timeline guide lines.
- `Timeline`: Converted quarter mode into a paged horizontal view with active quarter labeling and next/previous navigation.
- `UI/UX`: Refined the board toward a more modern product style with tech-glass buttons, a taller command bar, adaptive row density, and dense milestone cluster behavior.
- `Layout`: Reworked the board to use the full available viewport height without vertical scrolling and preserved a single horizontal scrollbar for the timeline.
- `Dialogs`: Improved shared dialog spacing and introduced size variants plus an icon-only close control.
- `Behavior`: Added aggregate cluster chips for dense milestones and a cluster selection dialog for opening individual milestones from a group.
- `Docs`: Created a project memory system under `docs/project/` to preserve context across sessions.
- `Docs`: Updated the root README to document the current app, current component structure, and the new project memory location.
- `Verification`: `npm run build` passed after the latest implementation pass.

## 2026-04-12

- `Scaffold`: Set up the Next.js App Router project with TypeScript, Tailwind CSS, and `date-fns`.
- `Data`: Added sample data, board persistence, and the core board types.
- `CRUD`: Implemented settings, section, and milestone create/edit/delete flows.
- `Layout`: Built the initial fixed-placement timeline board with month and quarter scales.
- `Repair`: Fixed Tailwind PostCSS compatibility and encoding issues that blocked startup.
- `Verification`: Confirmed the app builds successfully.
