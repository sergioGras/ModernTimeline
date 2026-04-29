"use client";

import { useEffect, useRef, useState } from "react";

import {
  getWeekGuidesForBucket,
  getMinTimelineWidth,
  getPageIndexFromScrollLeft,
  getPageScrollLeft,
  getTimeBuckets,
} from "@/lib/date-utils";
import { getRowDensityConfig, layoutMilestonesForSection, type PositionedCluster } from "@/lib/layout";
import type { BoardData, Milestone, Section } from "@/lib/types";
import { MilestoneChip } from "@/components/milestone-chip";
import { MilestoneClusterChip } from "@/components/milestone-cluster-chip";
import { SectionColumn } from "@/components/section-column";
import { TimelineHeader } from "@/components/timeline-header";
import { Button } from "@/components/ui/button";

const LEFT_COLUMN_WIDTH = 228;
const TIMELINE_HEADER_HEIGHT = 68;
const TIMELINE_SCROLLBAR_HEIGHT = 56;

interface TimelineBoardProps {
  data: BoardData;
  onEditMilestone: (milestone: Milestone) => void;
  onOpenCluster: (cluster: PositionedCluster) => void;
  onEditSection: (section: Section) => void;
  onDeleteSection: (section: Section) => void;
  onMoveSectionUp: (sectionId: string) => void;
  onMoveSectionDown: (sectionId: string) => void;
  activeQuarterIndex: number;
  onQuarterIndexChange: (quarterIndex: number) => void;
}

export function TimelineBoard({
  data,
  onEditMilestone,
  onOpenCluster,
  onEditSection,
  onDeleteSection,
  onMoveSectionUp,
  onMoveSectionDown,
  activeQuarterIndex,
  onQuarterIndexChange,
}: TimelineBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const syncingRef = useRef<"board" | "bar" | null>(null);
  const activeQuarterRef = useRef(activeQuarterIndex);
  const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    const measure = () => {
      setBoardSize({
        width: node.clientWidth,
        height: node.clientHeight,
      });
    };

    measure();

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(node);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    activeQuarterRef.current = activeQuarterIndex;
  }, [activeQuarterIndex]);

  const buckets = getTimeBuckets(data.settings);
  const isQuarterMode = data.settings.scale === "quarter";
  const timelineViewportWidth = isQuarterMode
    ? Math.max(boardSize.width > 0 ? boardSize.width - LEFT_COLUMN_WIDTH : 260, 1)
    : 0;
  const timelineWidth = isQuarterMode
    ? timelineViewportWidth * Math.max(buckets.length, 1)
    : getMinTimelineWidth(data.settings.scale, buckets.length);
  const orderedSections = [...data.sections].sort((a, b) => a.order - b.order);
  const hasMilestones = data.milestones.length > 0;
  const availableRowsHeight = Math.max(boardSize.height - TIMELINE_HEADER_HEIGHT - TIMELINE_SCROLLBAR_HEIGHT, 0);
  const rowHeight = orderedSections.length > 0 ? availableRowsHeight / orderedSections.length : 0;
  const density = getRowDensityConfig(rowHeight);

  const syncQuarterIndex = (scrollLeft: number) => {
    if (!isQuarterMode || timelineViewportWidth <= 0) {
      return;
    }

    const nextQuarterIndex = getPageIndexFromScrollLeft(scrollLeft, timelineViewportWidth, buckets.length);
    if (nextQuarterIndex !== activeQuarterRef.current) {
      activeQuarterRef.current = nextQuarterIndex;
      onQuarterIndexChange(nextQuarterIndex);
    }
  };

  const syncScroll = (source: "board" | "bar") => {
    const board = scrollRef.current;
    const bar = scrollbarRef.current;
    if (!board || !bar) {
      syncingRef.current = null;
      return;
    }

    const scrollLeft = source === "board" ? board.scrollLeft : bar.scrollLeft;
    const shouldMirror = !(syncingRef.current && syncingRef.current !== source);

    if (shouldMirror) {
      syncingRef.current = source;

      if (source === "board") {
        bar.scrollLeft = scrollLeft;
      } else {
        board.scrollLeft = scrollLeft;
      }

      requestAnimationFrame(() => {
        syncingRef.current = null;
      });
    }

    syncQuarterIndex(scrollLeft);
  };

  useEffect(() => {
    if (!isQuarterMode || timelineViewportWidth <= 0) {
      return;
    }

    const board = scrollRef.current;
    if (!board) {
      return;
    }

    const nextScrollLeft = getPageScrollLeft(activeQuarterIndex, timelineViewportWidth);
    if (Math.abs(board.scrollLeft - nextScrollLeft) > 1) {
      board.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
    }
  }, [activeQuarterIndex, isQuarterMode, timelineViewportWidth]);

  if (orderedSections.length === 0) {
    return (
      <div
        ref={rootRef}
        className="flex h-full items-center justify-center border-y border-[hsl(var(--border))]/80 bg-white/20 px-8 py-16 text-center"
      >
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">No sections yet</div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Create your first section to start shaping the board.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Sections define the roadmap rows. Once a section exists, milestones can be placed automatically by date.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative flex h-full min-h-0 flex-col border-y border-[hsl(var(--border))]/80 bg-[rgba(252,250,245,0.48)]"
    >
      <div
        ref={scrollRef}
        className={`timeline-scroll-hidden h-full overflow-x-auto overflow-y-hidden ${isQuarterMode ? "snap-x snap-mandatory" : ""}`}
        onScroll={() => {
          const board = scrollRef.current;
          if (!board) {
            return;
          }

          syncScroll("board");
        }}
        style={{
          scrollSnapType: isQuarterMode ? "x mandatory" : undefined,
          scrollBehavior: "smooth",
        }}
      >
        <div style={{ width: timelineWidth + LEFT_COLUMN_WIDTH }}>
          <TimelineHeader
            buckets={buckets}
            timelineWidth={timelineWidth}
            leftColumnWidth={LEFT_COLUMN_WIDTH}
            snapToPages={isQuarterMode}
          />
          <div className="relative">
            {!hasMilestones ? (
              <div
                className="pointer-events-none absolute z-10 max-w-sm rounded-[1.15rem] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,243,235,0.66))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_16px_34px_rgba(15,23,42,0.08)] backdrop-blur-xl"
                style={{ left: LEFT_COLUMN_WIDTH + 28, top: 24 }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Board is ready</div>
                <div className="mt-2 text-lg font-semibold text-[hsl(var(--foreground))]">
                  Add the first milestone to bring the timeline to life.
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Milestones are automatically positioned inside their section and date range, so you can stay focused on the plan instead of the layout.
                </p>
              </div>
            ) : null}
            {orderedSections.map((section, index) => {
              const sectionMilestones = data.milestones.filter((milestone) => milestone.sectionId === section.id);
              const layout = layoutMilestonesForSection(sectionMilestones, data.settings, timelineWidth, density);

              return (
                <div
                  key={section.id}
                  className="grid border-b border-[hsl(var(--border))]/65 last:border-b-0"
                  style={{
                    gridTemplateColumns: `${LEFT_COLUMN_WIDTH}px ${timelineWidth}px`,
                    height: rowHeight,
                  }}
                >
                  <SectionColumn
                    section={section}
                    rowHeight={rowHeight}
                    onEdit={onEditSection}
                    onDelete={onDeleteSection}
                    onMoveUp={onMoveSectionUp}
                    onMoveDown={onMoveSectionDown}
                    isFirst={index === 0}
                    isLast={index === orderedSections.length - 1}
                  />
                  <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(247,243,235,0.52))]">
                    <div className="absolute inset-0 flex">
                      {buckets.map((bucket) => (
                        <div
                          key={bucket.key}
                          className="relative h-full shrink-0 border-r border-[hsl(var(--border))]/55"
                          style={{
                            width: timelineWidth / Math.max(buckets.length, 1),
                            scrollSnapAlign: isQuarterMode ? "start" : undefined,
                          }}
                        >
                          {isQuarterMode
                            ? getWeekGuidesForBucket(bucket).map((guide) => (
                                <div
                                  key={guide.key}
                                  className="absolute top-0 h-full w-px bg-[rgba(82,109,91,0.2)]"
                                  style={{ left: `${guide.percent}%` }}
                                />
                              ))
                            : null}
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
                    {layout.items.map((item) =>
                      item.kind === "cluster" ? (
                        <MilestoneClusterChip
                          key={item.id}
                          cluster={item}
                          density={density}
                          onClick={onOpenCluster}
                        />
                      ) : (
                        <MilestoneChip
                          key={item.milestone.id}
                          milestone={item.milestone}
                          width={item.width}
                          x={item.x}
                          lane={item.lane}
                          density={density}
                          onClick={onEditMilestone}
                        />
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="border-t border-[hsl(var(--border))]/70 bg-[rgba(252,250,245,0.92)] px-5 py-2.5 backdrop-blur-xl"
        style={{ height: TIMELINE_SCROLLBAR_HEIGHT }}
      >
        <div
          ref={scrollbarRef}
          className="timeline-scroll h-full overflow-x-scroll overflow-y-hidden rounded-[0.85rem] bg-white/60 px-2 py-1.5"
          onScroll={() => {
            const bar = scrollbarRef.current;
            if (!bar) {
              return;
            }

            syncScroll("bar");
          }}
        >
          <div style={{ width: timelineWidth + LEFT_COLUMN_WIDTH, height: 1 }} />
        </div>
      </div>
    </div>
  );
}
