import type { TimeBucket } from "@/lib/date-utils";

interface TimelineHeaderProps {
  buckets: TimeBucket[];
  timelineWidth: number;
  leftColumnWidth: number;
  snapToPages?: boolean;
}

export function TimelineHeader({ buckets, timelineWidth, leftColumnWidth, snapToPages = false }: TimelineHeaderProps) {
  const bucketWidth = timelineWidth / Math.max(buckets.length, 1);

  return (
    <div
      className="sticky top-0 z-30 flex border-b border-[hsl(var(--border))]/80 bg-[rgba(252,250,245,0.94)] backdrop-blur-xl"
      style={{ height: 78 }}
    >
      <div
        className="sticky left-0 z-30 flex shrink-0 items-center border-r border-[hsl(var(--border))]/70 bg-[rgba(248,245,237,0.96)] px-6"
        style={{ width: leftColumnWidth }}
      >
        <div className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Projects</div>
      </div>
      <div className="relative" style={{ width: timelineWidth }}>
        <div className="flex h-full">
          {buckets.map((bucket) => (
            <div
              key={bucket.key}
              className="flex shrink-0 flex-col justify-center border-r border-[hsl(var(--border))]/60 px-5"
              style={{
                width: bucketWidth,
                scrollSnapAlign: snapToPages ? "start" : undefined,
              }}
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">{bucket.shortLabel}</span>
              <span className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">{bucket.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
