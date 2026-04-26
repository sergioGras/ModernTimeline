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
      size="md"
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
            className="rounded-[1rem] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,243,235,0.68))] px-5 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_10px_22px_rgba(15,23,42,0.05)] backdrop-blur-xl transition hover:-translate-y-px hover:border-white/75 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
          >
            <div className="text-sm font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">
              {milestone.title}
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--accent))]">
              {formatBoardDate(milestone.date)}
            </div>
            {milestone.description ? (
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{milestone.description}</p>
            ) : null}
          </button>
        ))}
      </div>
    </Dialog>
  );
}
