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
      className="absolute overflow-hidden rounded-[1rem] border border-[hsl(var(--accent))]/30 bg-[linear-gradient(180deg,rgba(93,143,118,0.18),rgba(44,87,67,0.12))] px-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_12px_28px_rgba(45,79,63,0.12)] backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-[hsl(var(--accent))]/45 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_16px_30px_rgba(45,79,63,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
      style={{
        width: cluster.width,
        height: density.chipHeight,
        left: cluster.x,
        top: density.topInset + cluster.lane * density.laneOffset,
        paddingTop: density.mode === "micro" ? 10 : 12,
        paddingBottom: density.mode === "micro" ? 10 : 12,
      }}
    >
      <div className="truncate text-sm font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">{label}</div>
      {density.showDate ? (
        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--accent))]">
          {cluster.milestones.length} milestones
        </div>
      ) : null}
    </button>
  );
}
