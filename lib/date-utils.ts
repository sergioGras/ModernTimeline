import {
  differenceInCalendarDays,
  eachMonthOfInterval,
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
