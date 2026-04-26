"use client";

import { formatBoardDate } from "@/lib/date-utils";
import type { Milestone } from "@/lib/types";
import { Dialog } from "@/components/ui/dialog";

interface MilestoneClusterDialogProps {
  open: boolean;
  milestones: Milestone[];
  sectionTitle?: string;
  onClose: () => void;
  onSelect: (milestone: Milestone) => void;
}

export function MilestoneClusterDialog({
  open,
  milestones,
  sectionTitle,
  onClose,
  onSelect,
}: MilestoneClusterDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="lg"
      title="Milestone cluster"
      description={
        sectionTitle
          ? `${milestones.length} milestones are grouped in ${sectionTitle}. Select one to edit its details.`
          : `${milestones.length} milestones are grouped in the same area. Select one to edit its details.`
      }
    >
      <div className="grid gap-3">
        {milestones.map((milestone) => (
          <button
            key={milestone.id}
            type="button"
            onClick={() => onSelect(milestone)}
            className="rounded-[0.95rem] border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(246,243,237,0.8))] px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_20px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-px hover:border-[hsl(var(--accent))]/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_14px_24px_rgba(15,23,42,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">
                  {milestone.title}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {formatBoardDate(milestone.date)}
                </div>
              </div>
              <div className="rounded-full border border-white/75 bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Open
              </div>
            </div>
            {milestone.description ? (
              <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-slate-600">{milestone.description}</p>
            ) : null}
          </button>
        ))}
      </div>
    </Dialog>
  );
}
