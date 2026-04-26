import type { Section } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface SectionColumnProps {
  section: Section;
  rowHeight: number | string;
  density: "comfortable" | "compact" | "micro";
  onEdit: (section: Section) => void;
  onDelete: (section: Section) => void;
  onMoveUp: (sectionId: string) => void;
  onMoveDown: (sectionId: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export function SectionColumn({
  section,
  rowHeight,
  density,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: SectionColumnProps) {
  const isCompact = density !== "comfortable";

  return (
    <div
      className="sticky left-0 z-20 flex h-full min-h-full flex-col justify-between gap-4 border-r border-[hsl(var(--border))]/70 bg-[rgba(248,245,237,0.95)] px-7 py-6 backdrop-blur-xl"
      style={{ height: rowHeight }}
    >
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Section</div>
        <div className="mt-2 truncate text-[15px] font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">
          {section.title}
        </div>
      </div>
      <div className="grid max-w-[210px] grid-cols-2 gap-2">
        <Button
          variant="ghost"
          className="h-8 w-full justify-start px-2.5 text-[10px] uppercase tracking-[0.14em]"
          onClick={() => onEdit(section)}
          aria-label={`Rename ${section.title}`}
          title="Rename"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
            <path d="M4.5 13.75V15.5h1.75l7-7-1.75-1.75-7 7Zm8-8 1.75 1.75 1-1a1.237 1.237 0 0 0 0-1.75l-.25-.25a1.237 1.237 0 0 0-1.75 0l-1 1Z" fill="currentColor" />
          </svg>
          <span>Rename</span>
        </Button>
        <Button
          variant="ghost"
          className="h-8 w-full justify-start px-2.5 text-[10px] uppercase tracking-[0.14em]"
          onClick={() => onMoveUp(section.id)}
          disabled={isFirst}
          aria-label={`Move ${section.title} up`}
          title="Move up"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
            <path d="M10 4.25 5 9.25h3V15.5h4V9.25h3l-5-5Z" fill="currentColor" />
          </svg>
          <span>Up</span>
        </Button>
        <Button
          variant="ghost"
          className="h-8 w-full justify-start px-2.5 text-[10px] uppercase tracking-[0.14em]"
          onClick={() => onMoveDown(section.id)}
          disabled={isLast}
          aria-label={`Move ${section.title} down`}
          title="Move down"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
            <path d="M10 15.75 15 10.75h-3V4.5H8v6.25H5l5 5Z" fill="currentColor" />
          </svg>
          <span>Down</span>
        </Button>
        <Button
          variant="ghost"
          className="h-8 w-full justify-start px-2.5 text-[10px] uppercase tracking-[0.14em] text-rose-700 hover:border-rose-200/70 hover:bg-rose-50/85"
          onClick={() => onDelete(section)}
          aria-label={`Delete ${section.title}`}
          title="Delete"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
            <path d="M7.5 4.75h5l.5 1h2.25v1.5h-1l-.6 8.1a1.5 1.5 0 0 1-1.5 1.4h-4.3a1.5 1.5 0 0 1-1.5-1.4l-.6-8.1h-1v-1.5H7l.5-1Zm1.15 2.5.35 6h1V7.25h-1.35Zm2.7 0v6h1l.35-6h-1.35Z" fill="currentColor" />
          </svg>
          <span>Delete</span>
        </Button>
        {!isCompact ? (
          <div className="col-span-2 pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
            Row actions
          </div>
        ) : null}
      </div>
    </div>
  );
}
