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
      className="absolute overflow-hidden rounded-[1.15rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(246,243,237,0.72))] px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.88),0_14px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-white/80 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,243,237,0.8))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_18px_34px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
      style={{
        width,
        height: density.chipHeight,
        left: x,
        top: density.topInset + lane * density.laneOffset,
        paddingTop: compact ? 10 : 12,
        paddingBottom: compact ? 10 : 12,
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
