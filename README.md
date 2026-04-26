# Internal Milestone Timeline Tool

A lightweight internal roadmap app built with Next.js, TypeScript, Tailwind CSS, and `date-fns`. It renders projects as rows, time as the horizontal axis, and milestones as automatically positioned items inside each section.

Project memory, work tracking, and decisions live under `docs/project/`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Reusable UI primitives in a `shadcn/ui`-style structure
- `date-fns` for time buckets and date placement
- `localStorage` persistence for v1
- Durable project ledger in `docs/project/`

## File Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  board-settings-dialog.tsx
  milestone-chip.tsx
  milestone-cluster-chip.tsx
  milestone-cluster-dialog.tsx
  milestone-dialog.tsx
  section-column.tsx
  section-dialog.tsx
  timeline-app.tsx
  timeline-board.tsx
  timeline-header.tsx
  ui/
    button.tsx
    dialog.tsx
    input.tsx
    select.tsx
    textarea.tsx
docs/project/
  README.md
  WORKLOG.md
  TASKS.md
  DECISIONS.md
  ROADMAP.md
lib/
  date-utils.ts
  layout.ts
  sample-data.ts
  storage.ts
  types.ts
  utils.ts
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the app:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`.

## Architecture Notes

- `components/timeline-app.tsx` owns the main client state and CRUD flows.
- `lib/storage.ts` loads sample seed data on first visit and persists every change to `localStorage`.
- `lib/date-utils.ts` generates month or quarter buckets and converts milestone dates into board-relative positions.
- `lib/layout.ts` handles adaptive density and deterministic cluster-aware placement so dense milestones do not fully overlap.
- `components/timeline-board.tsx` renders the sticky header, sticky section rail, responsive scroll container, and positioned milestone chips.
- `docs/project/` records the worklog, task list, decisions, and roadmap so project context survives across sessions.

## Product Notes

- Milestones are point-in-time items, not durations.
- Section deletion removes associated milestones after confirmation.
- On narrow screens, the timeline scrolls horizontally while preserving readability.
- The visual system stays intentionally calm: one accent color, soft borders, rounded surfaces, and restrained hierarchy.
- Dense milestone groups collapse into aggregate cluster chips when the row is visually saturated.
- The board adapts row density to available height so it avoids vertical scrolling.
