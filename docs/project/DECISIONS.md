# Decisions

## 2026-04-26

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

- `Decision`: Keep project memory in `docs/project/`.
  - `Rationale`: Provides a durable, human-readable record outside chat history.
  - `Status`: Accepted
