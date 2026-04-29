# Decisions

## 2026-04-26

- `Decision`: Treat the current UI primitives and layout as replaceable during the active redesign stage.
  - `Rationale`: Recent screenshots show structural UI issues. Hard rules that force the current shared primitives can preserve the wrong visual system.
  - `Status`: Accepted

- `Decision`: Use the 4-lane swimlane roadmap proposal as a reference direction, not an immediate schema change.
  - `Rationale`: The proposal better matches the intended strategic planning use case, but duration blocks require a deliberate data-model decision.
  - `Status`: Accepted

- `Decision`: Use `localStorage` only for V1 persistence.
  - `Rationale`: Keeps the app local-first and simple to operate.
  - `Status`: Accepted

- `Decision`: Keep month and quarter scales only.
  - `Rationale`: Covers the current roadmap use case without adding zoom complexity.
  - `Status`: Accepted

- `Decision`: Avoid backend, auth, and collaboration for V1.
  - `Rationale`: The product is a single-user internal planning surface.
  - `Status`: Accepted

- `Decision`: Keep a single accent color with a neutral palette.
  - `Rationale`: Supports the calm internal roadmap aesthetic.
  - `Status`: Accepted

- `Decision`: Use horizontal scrolling for the timeline.
  - `Rationale`: Preserves a wide time axis while keeping the board readable.
  - `Status`: Accepted

- `Decision`: Avoid vertical scroll in the board area and adapt row density instead.
  - `Rationale`: The board should always use the available viewport height.
  - `Status`: Accepted

- `Decision`: Aggregate dense milestone groups into cluster chips.
  - `Rationale`: Prevents unreadable overlap when many milestones land near one another.
  - `Status`: Accepted

- `Decision`: Treat quarter mode as a paged horizontal navigator with synchronized scrollbar and active quarter indicator.
  - `Rationale`: Makes quarter view feel like a true quarter-by-quarter timeline instead of a generic wide grid.
  - `Status`: Accepted

- `Decision`: Gate the next implementation pass on UI layout polish before more feature work.
  - `Rationale`: Current usability issues are spatial and visual: section rail margins, dialog close visibility, dialog footer spacing, and grid orientation need to be corrected before adding more behavior.
  - `Status`: Accepted

- `Decision`: Add week-level guide lines as subtle visual support inside the timeline.
  - `Rationale`: Quarter pages need finer temporal orientation while preserving the calm roadmap style.
  - `Status`: Accepted

- `Decision`: Keep project memory in `docs/project/`.
  - `Rationale`: Provides a durable, human-readable record outside chat history.
  - `Status`: Accepted
