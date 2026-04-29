# AGENT.md

## Project

Internal Milestone Timeline is a local-first Next.js board for milestone planning. Rows are sections, the horizontal axis is time, and milestones are placed automatically from date and section.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- `date-fns`
- browser `localStorage`

## Architecture

- `app/` holds the route shell and global layout.
- `components/` holds board, dialog, and UI primitives.
- `lib/` holds types, date logic, layout logic, storage, and sample data.
- `docs/project/` is the project memory system and must stay current.

## UI Rules

- The UI is still in active redesign. Do not assume the current layout, primitives, spacing, or component styling is correct.
- Full redesigns are allowed when screenshots show structural issues. Favor coherent product UX over preserving current component shapes.
- Keep the target experience operational and roadmap-focused, not a marketing page.
- Prefer one coherent workspace surface over multiple nested cards.
- Cards are allowed only when they clarify ownership or repeated content; avoid card-in-card layouts.
- Keep horizontal scrolling for the timeline. Avoid vertical scrolling in the board body unless the product direction changes explicitly.
- Shared primitives can be reused, rewritten, or replaced when they block the redesign. Do not treat the current `Button`, `Input`, `Select`, `Textarea`, or `Dialog` styling as fixed.
- Icon-only controls should remain accessible with an `aria-label` and a visible focus state, even while the visual design is being rebuilt.
- Dialogs should be calm and spacious: clear header area, visible close affordance, consistent field rhythm, and a footer that does not sit against the edge.
- Text must fit inside controls and cards. Truncate, wrap, or redesign the container rather than allowing overlap or clipping.

## Product Direction Reference

The current strongest layout reference is a simple one-page swimlane timeline for strategic planning.

- X-axis: April to December 2026, visually grouped by Q2, Q3, and Q4.
- Y-axis: strict lane set of TreePlet Core, Learning, Personal Strategic, and Optional / Sandbox.
- Primary item type: multi-week blocks that represent cognitive bandwidth, not small weekly tasks.
- Visual encoding: solid bars for commitments, dashed or lighter bars for intentions, and diamond markers for key milestones.
- Density rule: about 5 to 7 major items per lane, with short labels of 2 to 4 words.
- Optional / Sandbox should stay invisible or very sparse unless explicitly scheduled.

This reference can justify changing the current milestone-only UI into a broader roadmap surface later. Until that decision is made, keep the existing data model stable and document any migration path before implementing duration-based blocks.

## Code Rules

- Preserve the existing persisted data model unless a change is explicitly required.
- Keep component props small and presentational where possible, but allow reshaping component boundaries during redesign work.
- Favor deterministic layout logic over heuristic visual hacks.
- Do not introduce a backend, auth, drag-and-drop, or import/export unless the task explicitly calls for it.
- Avoid editing generated artifacts unless the task requires it.

## Workflow

- Inspect before editing when the UI looks off.
- Update `docs/project/TASKS.md` and `docs/project/WORKLOG.md` when the work changes meaningfully.
- Verify with `npm run build` after code changes that affect the app.
- Keep changes focused and reversible.

## Accessibility

- Maintain keyboard access for buttons, dialogs, selects, and inputs.
- Keep visible labels for all form controls.
- Preserve focus rings and avoid removing them for visual reasons.
- Use semantic elements first: buttons for actions, links for navigation, labels for form controls.

## Out Of Scope

- Backend/database
- Authentication
- Collaboration
- Export/import
- Drag-and-drop scheduling
- Task dependencies
- Duration-based roadmap bars unless explicitly accepted as a product direction
