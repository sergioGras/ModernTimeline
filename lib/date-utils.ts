import {
  differenceInCalendarDays,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfQuarter,
  format,
  isAfter,
  isBefore,
  parseISO,
  startOfMonth,
  startOfQuarter,
} from "date-fns";

import type { BoardSettings, TimeScale } from "@/lib/types";

export interface TimeBucket {
  key: string;
  label: string;
  shortLabel: string;
  start: Date;
  end: Date;
}

export interface WeekGuide {
  key: string;
  percent: number;
}

export function getTimelineBounds(settings: BoardSettings) {
  const start = parseISO(settings.startDate);
  const end = parseISO(settings.endDate);

  if (isAfter(start, end)) {
    return {
      start: end,
      end: start,
    };
  }

  return { start, end };
}

export function getTimeBuckets(settings: BoardSettings): TimeBucket[] {
  const { start, end } = getTimelineBounds(settings);

  if (settings.scale === "quarter") {
    const months = eachMonthOfInterval({
      start: startOfQuarter(start),
      end,
    });

    const quarterMap = new Map<string, TimeBucket>();

    for (const month of months) {
      const quarterStart = startOfQuarter(month);
      const key = format(quarterStart, "yyyy-'Q'Q");

      if (!quarterMap.has(key)) {
        quarterMap.set(key, {
          key,
          label: format(quarterStart, "QQQ yyyy"),
          shortLabel: format(quarterStart, "'Q'Q"),
          start: quarterStart,
          end: endOfQuarter(quarterStart),
        });
      }
    }

    return Array.from(quarterMap.values());
  }

  return eachMonthOfInterval({
    start: startOfMonth(start),
    end,
  }).map((month) => ({
    key: format(month, "yyyy-MM"),
    label: format(month, "MMMM yyyy"),
    shortLabel: format(month, "MMM"),
    start: startOfMonth(month),
    end: endOfMonth(month),
  }));
}

export function getQuarterTimelineBuckets(settings: BoardSettings) {
  return settings.scale === "quarter" ? getTimeBuckets(settings) : [];
}

export function formatBoardDate(date: string) {
  return format(parseISO(date), "MMM d, yyyy");
}

export function clampDateToRange(date: Date, settings: BoardSettings) {
  const { start, end } = getTimelineBounds(settings);

  if (isBefore(date, start)) {
    return start;
  }

  if (isAfter(date, end)) {
    return end;
  }

  return date;
}

export function getDatePositionPercent(dateString: string, settings: BoardSettings) {
  const { start, end } = getTimelineBounds(settings);
  const clamped = clampDateToRange(parseISO(dateString), settings);
  const totalDays = Math.max(differenceInCalendarDays(end, start), 1);
  const offsetDays = differenceInCalendarDays(clamped, start);

  return offsetDays / totalDays;
}

export function getMinTimelineWidth(scale: TimeScale, bucketCount: number) {
  const bucketWidth = scale === "quarter" ? 320 : 240;
  return Math.max(bucketCount * bucketWidth, 1600);
}

export function getPageScrollLeft(pageIndex: number, pageWidth: number) {
  return Math.max(0, pageIndex * Math.max(pageWidth, 0));
}

export function getPageIndexFromScrollLeft(scrollLeft: number, pageWidth: number, pageCount: number) {
  if (pageWidth <= 0 || pageCount <= 0) {
    return 0;
  }

  const nextIndex = Math.round(scrollLeft / pageWidth);
  return Math.max(0, Math.min(pageCount - 1, nextIndex));
}

export function getQuarterLabelForIndex(settings: BoardSettings, quarterIndex: number) {
  const buckets = getQuarterTimelineBuckets(settings);
  return buckets[quarterIndex]?.label ?? buckets[0]?.label ?? "";
}

export function getWeekGuidesForBucket(bucket: TimeBucket): WeekGuide[] {
  const totalDays = Math.max(differenceInCalendarDays(bucket.end, bucket.start), 1);

  return eachWeekOfInterval({ start: bucket.start, end: bucket.end }, { weekStartsOn: 1 })
    .map((weekStart) => ({
      key: format(weekStart, "yyyy-MM-dd"),
      percent: (differenceInCalendarDays(weekStart, bucket.start) / totalDays) * 100,
    }))
    .filter((guide) => guide.percent > 0 && guide.percent < 100);
}
