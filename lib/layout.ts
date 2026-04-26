import { getDatePositionPercent } from "@/lib/date-utils";
import type { BoardSettings, Milestone } from "@/lib/types";

export type RowDensityMode = "comfortable" | "compact" | "micro";

export interface RowDensityConfig {
  mode: RowDensityMode;
  chipWidth: number;
  chipHeight: number;
  clusterWidth: number;
  laneLimit: number;
  laneOffset: number;
  topInset: number;
  horizontalGap: number;
  showDate: boolean;
  clusterThreshold: number;
}

export interface PositionedMilestone {
  kind: "milestone";
  milestone: Milestone;
  x: number;
  lane: number;
  width: number;
}

export interface PositionedCluster {
  kind: "cluster";
  id: string;
  milestones: Milestone[];
  x: number;
  lane: number;
  width: number;
  title: string;
  date: string;
}

export type LayoutItem = PositionedMilestone | PositionedCluster;

export interface SectionLayout {
  items: LayoutItem[];
  laneCount: number;
}

interface PreparedMilestone {
  milestone: Milestone;
  x: number;
}

export function getRowDensityConfig(rowHeight: number): RowDensityConfig {
  if (rowHeight >= 170) {
    return {
      mode: "comfortable",
      chipWidth: 172,
      chipHeight: 48,
      clusterWidth: 148,
      laneLimit: 3,
      laneOffset: 52,
      topInset: 16,
      horizontalGap: 14,
      showDate: true,
      clusterThreshold: 36,
    };
  }

  if (rowHeight >= 110) {
    return {
      mode: "compact",
      chipWidth: 150,
      chipHeight: 44,
      clusterWidth: 132,
      laneLimit: 2,
      laneOffset: 48,
      topInset: 12,
      horizontalGap: 12,
      showDate: true,
      clusterThreshold: 30,
    };
  }

  return {
    mode: "micro",
    chipWidth: 126,
    chipHeight: 38,
    clusterWidth: 108,
    laneLimit: 1,
    laneOffset: 42,
    topInset: 8,
    horizontalGap: 8,
    showDate: false,
    clusterThreshold: 24,
  };
}

function buildPreparedMilestones(
  milestones: Milestone[],
  settings: BoardSettings,
  boardWidth: number,
  density: RowDensityConfig,
) {
  return [...milestones]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((milestone) => {
      const rawX = getDatePositionPercent(milestone.date, settings) * boardWidth;
      const x = Math.max(0, Math.min(rawX, Math.max(boardWidth - density.chipWidth, 0)));

      return { milestone, x };
    });
}

function shouldAggregateGroup(group: PreparedMilestone[], density: RowDensityConfig) {
  if (group.length <= 1) {
    return false;
  }

  const span = Math.max(0, group[group.length - 1].x - group[0].x);
  const veryTight = span <= density.chipWidth * 0.45;
  const tight = span <= density.chipWidth * 0.7;

  if (group.length > density.laneLimit) {
    return true;
  }

  if (density.mode === "micro" && group.length >= 2 && tight) {
    return true;
  }

  if (group.length >= 3 && tight) {
    return true;
  }

  if (group.length >= 2 && veryTight && density.mode !== "comfortable") {
    return true;
  }

  return false;
}

function groupDenseMilestones(items: PreparedMilestone[], density: RowDensityConfig) {
  const groups: PreparedMilestone[][] = [];

  for (const item of items) {
    const current = groups[groups.length - 1];

    if (!current) {
      groups.push([item]);
      continue;
    }

    const previous = current[current.length - 1];
    if (item.x - previous.x <= density.clusterThreshold) {
      current.push(item);
      continue;
    }

    groups.push([item]);
  }

  return groups;
}

function materializeItems(
  groups: PreparedMilestone[][],
  density: RowDensityConfig,
  boardWidth: number,
) {
  const materialized: Array<Omit<PositionedMilestone, "lane"> | Omit<PositionedCluster, "lane">> = [];

  for (const group of groups) {
    if (shouldAggregateGroup(group, density)) {
      const first = group[0];
      const averageX = group.reduce((sum, item) => sum + item.x, 0) / group.length;
      const x = Math.max(0, Math.min(averageX, Math.max(boardWidth - density.clusterWidth, 0)));

      materialized.push({
        kind: "cluster",
        id: `cluster-${first.milestone.id}`,
        milestones: group.map((item) => item.milestone),
        x,
        width: density.clusterWidth,
        title: first.milestone.title,
        date: first.milestone.date,
      });
      continue;
    }

    for (const item of group) {
      materialized.push({
        kind: "milestone",
        milestone: item.milestone,
        x: item.x,
        width: density.chipWidth,
      });
    }
  }

  return materialized;
}

export function layoutMilestonesForSection(
  milestones: Milestone[],
  settings: BoardSettings,
  boardWidth: number,
  density: RowDensityConfig,
) {
  const prepared = buildPreparedMilestones(milestones, settings, boardWidth, density);
  const groups = groupDenseMilestones(prepared, density);
  const items = materializeItems(groups, density, boardWidth);

  const laneLastX = Array<number>(density.laneLimit).fill(-Infinity);
  const positioned: LayoutItem[] = [];

  for (const item of items) {
    let lane = density.laneLimit - 1;

    for (let index = 0; index < density.laneLimit; index += 1) {
      if (item.x >= laneLastX[index] + item.width + density.horizontalGap) {
        lane = index;
        break;
      }
    }

    laneLastX[lane] = item.x;
    positioned.push({
      ...item,
      lane,
    });
  }

  const laneCount = Math.max(1, positioned.reduce((maxLane, item) => Math.max(maxLane, item.lane + 1), 1));

  return {
    items: positioned,
    laneCount,
  } satisfies SectionLayout;
}
