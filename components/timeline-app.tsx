"use client";

import { useEffect, useMemo, useState } from "react";

import { BoardSettingsDialog } from "@/components/board-settings-dialog";
import { MilestoneClusterDialog } from "@/components/milestone-cluster-dialog";
import { MilestoneDialog, type MilestoneDraft } from "@/components/milestone-dialog";
import { SectionDialog } from "@/components/section-dialog";
import { TimelineBoard } from "@/components/timeline-board";
import { Button } from "@/components/ui/button";
import type { PositionedCluster } from "@/lib/layout";
import { getQuarterLabelForIndex, getQuarterTimelineBuckets } from "@/lib/date-utils";
import { loadBoardData, saveBoardData } from "@/lib/storage";
import type { BoardData, BoardSettings, Milestone, Section } from "@/lib/types";

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function TimelineApp() {
  const [data, setData] = useState<BoardData | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [clusterDialogOpen, setClusterDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [activeCluster, setActiveCluster] = useState<PositionedCluster | null>(null);
  const [activeQuarterIndex, setActiveQuarterIndex] = useState(0);

  useEffect(() => {
    setData(loadBoardData());
  }, []);

  useEffect(() => {
    if (data) {
      saveBoardData(data);
    }
  }, [data]);

  const orderedSections = useMemo(
    () => [...(data?.sections ?? [])].sort((a, b) => a.order - b.order),
    [data?.sections],
  );
  const quarterBuckets = useMemo(
    () => (data?.settings.scale === "quarter" ? getQuarterTimelineBuckets(data.settings) : []),
    [data?.settings],
  );

  useEffect(() => {
    if (!data || data.settings.scale !== "quarter") {
      return;
    }

    setActiveQuarterIndex((current) => Math.max(0, Math.min(current, Math.max(quarterBuckets.length - 1, 0))));
  }, [data, quarterBuckets.length]);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 px-8 py-6 shadow-board">
          <div className="text-sm font-medium text-slate-600">Loading timeline board...</div>
        </div>
      </main>
    );
  }

  const updateSettings = (settings: BoardSettings) => {
    setData((current) => (current ? { ...current, settings } : current));
  };

  const updateScale = (scale: BoardSettings["scale"]) => {
    if (scale === "quarter") {
      setActiveQuarterIndex(0);
    }

    setData((current) =>
      current
        ? {
            ...current,
            settings: {
              ...current.settings,
              scale,
            },
          }
        : current,
    );
  };

  const saveSection = (title: string, sectionId?: string) => {
    setData((current) => {
      if (!current) {
        return current;
      }

      if (sectionId) {
        return {
          ...current,
          sections: current.sections.map((section) =>
            section.id === sectionId ? { ...section, title } : section,
          ),
        };
      }

      const nextOrder = current.sections.length;
      return {
        ...current,
        sections: [...current.sections, { id: createId("section"), title, order: nextOrder }],
      };
    });
  };

  const deleteSection = (section: Section) => {
    const milestoneCount = data.milestones.filter((item) => item.sectionId === section.id).length;
    const confirmed = window.confirm(
      milestoneCount > 0
        ? `Delete "${section.title}" and its ${milestoneCount} milestone(s)?`
        : `Delete "${section.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setData((current) => {
      if (!current) {
        return current;
      }

      const sections = current.sections
        .filter((item) => item.id !== section.id)
        .sort((a, b) => a.order - b.order)
        .map((item, index) => ({ ...item, order: index }));

      return {
        ...current,
        sections,
        milestones: current.milestones.filter((item) => item.sectionId !== section.id),
      };
    });
  };

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    setData((current) => {
      if (!current) {
        return current;
      }

      const sections = [...current.sections].sort((a, b) => a.order - b.order);
      const index = sections.findIndex((section) => section.id === sectionId);
      const target = direction === "up" ? index - 1 : index + 1;

      if (index < 0 || target < 0 || target >= sections.length) {
        return current;
      }

      [sections[index], sections[target]] = [sections[target], sections[index]];

      return {
        ...current,
        sections: sections.map((section, order) => ({ ...section, order })),
      };
    });
  };

  const saveMilestone = (draft: MilestoneDraft, milestoneId?: string) => {
    setData((current) => {
      if (!current) {
        return current;
      }

      if (milestoneId) {
        return {
          ...current,
          milestones: current.milestones.map((milestone) =>
            milestone.id === milestoneId ? { ...milestone, ...draft } : milestone,
          ),
        };
      }

      return {
        ...current,
        milestones: [...current.milestones, { id: createId("milestone"), ...draft }],
      };
    });
  };

  const deleteMilestone = (milestoneId: string) => {
    setData((current) =>
      current
        ? {
            ...current,
            milestones: current.milestones.filter((milestone) => milestone.id !== milestoneId),
          }
        : current,
    );
  };

  const isQuarterMode = data.settings.scale === "quarter";
  const activeQuarterLabel = isQuarterMode ? getQuarterLabelForIndex(data.settings, activeQuarterIndex) : "";
  const moveQuarter = (direction: "prev" | "next") => {
    setActiveQuarterIndex((current) => {
      const nextIndex = direction === "prev" ? current - 1 : current + 1;
      return Math.max(0, Math.min(nextIndex, Math.max(quarterBuckets.length - 1, 0)));
    });
  };

  return (
    <main className="flex h-screen flex-col gap-4 overflow-hidden px-6 py-6 sm:px-8 lg:px-10">
      <header className="flex min-h-[84px] flex-none items-center border-b border-[hsl(var(--border))]/80 pb-4">
        <div className="flex w-full flex-wrap items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" onClick={() => setSettingsOpen(true)}>
              Board settings
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setEditingSection(null);
                setSectionDialogOpen(true);
              }}
            >
              Add section
            </Button>
            <Button
              onClick={() => {
                setEditingMilestone(null);
                setMilestoneDialogOpen(true);
              }}
              disabled={orderedSections.length === 0}
            >
              Add milestone
            </Button>
          </div>

          <div className="flex items-center rounded-[1rem] border border-white/68 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,243,235,0.64))] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <Button
              type="button"
              onClick={() => updateScale("month")}
              variant={data.settings.scale === "month" ? "primary" : "secondary"}
              className="h-10 px-4 text-sm"
              aria-pressed={data.settings.scale === "month"}
            >
              Month
            </Button>
            <Button
              type="button"
              onClick={() => updateScale("quarter")}
              variant={data.settings.scale === "quarter" ? "primary" : "secondary"}
              className="h-10 px-4 text-sm"
              aria-pressed={data.settings.scale === "quarter"}
            >
              Quarter
            </Button>
          </div>

          {isQuarterMode ? (
            <div className="flex items-center rounded-[1rem] border border-white/68 bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,243,235,0.64))] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_22px_rgba(15,23,42,0.06)] backdrop-blur-xl">
              <Button
                variant="ghost"
                className="h-10 w-10 px-0"
                onClick={() => moveQuarter("prev")}
                disabled={activeQuarterIndex === 0}
                aria-label="Previous quarter"
                title="Previous quarter"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                  <path d="M12.75 4.75 7.5 10l5.25 5.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </Button>
              <div className="min-w-[92px] px-3 text-center text-sm font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">
                {activeQuarterLabel || "Quarter"}
              </div>
              <Button
                variant="ghost"
                className="h-10 w-10 px-0"
                onClick={() => moveQuarter("next")}
                disabled={activeQuarterIndex >= Math.max(quarterBuckets.length - 1, 0)}
                aria-label="Next quarter"
                title="Next quarter"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                  <path d="M7.25 4.75 12.5 10l-5.25 5.25" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                </svg>
              </Button>
            </div>
          ) : null}

          <div className="ml-auto min-w-[190px] text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Timeline board
            </div>
            <div className="mt-1 text-sm font-semibold tracking-[-0.02em] text-[hsl(var(--foreground))]">
              {data.settings.title}
            </div>
          </div>
        </div>
      </header>

      <section className="relative min-h-0 flex-1">
        <div className="h-full">
          <TimelineBoard
            data={data}
            onEditMilestone={(milestone) => {
              setEditingMilestone(milestone);
              setMilestoneDialogOpen(true);
            }}
            onOpenCluster={(cluster) => {
              setActiveCluster(cluster);
              setClusterDialogOpen(true);
            }}
            onEditSection={(section) => {
              setEditingSection(section);
              setSectionDialogOpen(true);
            }}
            onDeleteSection={deleteSection}
            onMoveSectionUp={(sectionId) => moveSection(sectionId, "up")}
            onMoveSectionDown={(sectionId) => moveSection(sectionId, "down")}
            activeQuarterIndex={activeQuarterIndex}
            onQuarterIndexChange={setActiveQuarterIndex}
          />
        </div>
      </section>

      <BoardSettingsDialog
        open={settingsOpen}
        settings={data.settings}
        onClose={() => setSettingsOpen(false)}
        onSave={updateSettings}
      />

      <SectionDialog
        open={sectionDialogOpen}
        section={editingSection}
        onClose={() => {
          setSectionDialogOpen(false);
          setEditingSection(null);
        }}
        onSave={saveSection}
      />

      <MilestoneDialog
        open={milestoneDialogOpen}
        milestone={editingMilestone}
        sections={orderedSections}
        defaultSectionId={orderedSections[0]?.id}
        onClose={() => {
          setMilestoneDialogOpen(false);
          setEditingMilestone(null);
        }}
        onSave={saveMilestone}
        onDelete={deleteMilestone}
      />

      <MilestoneClusterDialog
        open={clusterDialogOpen}
        milestones={activeCluster?.milestones ?? []}
        sectionTitle={
          activeCluster
            ? orderedSections.find((section) => section.id === activeCluster.milestones[0]?.sectionId)?.title
            : undefined
        }
        onClose={() => {
          setClusterDialogOpen(false);
          setActiveCluster(null);
        }}
        onSelect={(milestone) => {
          setClusterDialogOpen(false);
          setActiveCluster(null);
          setEditingMilestone(milestone);
          setMilestoneDialogOpen(true);
        }}
      />
    </main>
  );
}
