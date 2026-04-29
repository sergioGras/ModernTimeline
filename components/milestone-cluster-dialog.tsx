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
            className="rounded-[0.95rem] border border-[hsl(var(--border))]/68 bg-[rgba(255,255,255,0.78)] px-4 py-3 text-left shadow-[0_6px_16px_rgba(15,23,42,0.035)] transition hover:-translate-y-px hover:border-[hsl(var(--accent))]/22 hover:bg-[rgba(255,255,255,0.9)] hover:shadow-[0_10px_20px_rgba(15,23,42,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="truncate text-[14px] font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">
                  {milestone.title}
                </div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {formatBoardDate(milestone.date)}
                </div>
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
