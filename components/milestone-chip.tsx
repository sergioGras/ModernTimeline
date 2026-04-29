import { formatBoardDate } from "@/lib/date-utils";
import type { RowDensityConfig } from "@/lib/layout";
import type { Milestone } from "@/lib/types";

interface MilestoneChipProps {
  milestone: Milestone;
  width: number;
  x: number;
  lane: number;
  density: RowDensityConfig;
  onClick: (milestone: Milestone) => void;
}

export function MilestoneChip({ milestone, width, x, lane, density, onClick }: MilestoneChipProps) {
  const compact = density.mode !== "comfortable";

  return (
    <button
      type="button"
      onClick={() => onClick(milestone)}
      title={`${milestone.title} - ${formatBoardDate(milestone.date)}`}
      className="absolute overflow-hidden rounded-[0.95rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(246,243,237,0.75))] px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_8px_18px_rgba(15,23,42,0.05)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-white/80 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,243,237,0.84))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_12px_24px_rgba(15,23,42,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
      style={{
        width,
        height: density.chipHeight,
        left: x,
        top: density.topInset + lane * density.laneOffset,
        paddingTop: compact ? 10 : 11,
        paddingBottom: compact ? 10 : 11,
      }}
    >
      <div className="truncate text-sm font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">
        {milestone.title}
      </div>
      {density.showDate ? (
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
          {formatBoardDate(milestone.date)}
        </div>
      ) : null}
    </button>
  );
}
