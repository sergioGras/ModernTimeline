import { formatBoardDate } from "@/lib/date-utils";
import type { PositionedCluster, RowDensityConfig } from "@/lib/layout";

interface MilestoneClusterChipProps {
  cluster: PositionedCluster;
  density: RowDensityConfig;
  onClick: (cluster: PositionedCluster) => void;
}

export function MilestoneClusterChip({ cluster, density, onClick }: MilestoneClusterChipProps) {
  const extraCount = cluster.milestones.length - 1;
  const label = extraCount > 0 ? `${cluster.title} +${extraCount}` : cluster.title;

  return (
    <button
      type="button"
      onClick={() => onClick(cluster)}
      title={`${cluster.milestones.length} milestones around ${formatBoardDate(cluster.date)}`}
      className="absolute overflow-hidden rounded-[0.95rem] border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(246,243,237,0.78))] px-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_12px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-[hsl(var(--accent))]/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_16px_30px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
      style={{
        width: cluster.width,
        height: density.chipHeight,
        left: cluster.x,
        top: density.topInset + cluster.lane * density.laneOffset,
        paddingTop: density.mode === "micro" ? 8 : 9,
        paddingBottom: density.mode === "micro" ? 8 : 9,
      }}
    >
      <div className="truncate text-[13px] font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">{label}</div>
      {density.showDate ? (
        <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {cluster.milestones.length} milestones
        </div>
      ) : null}
    </button>
  );
}
