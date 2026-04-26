import { sampleBoardData } from "@/lib/sample-data";
import type { BoardData } from "@/lib/types";

const STORAGE_KEY = "milestone-timeline-board-v1";

export function loadBoardData(): BoardData {
  if (typeof window === "undefined") {
    return sampleBoardData;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return sampleBoardData;
  }

  try {
    const parsed = JSON.parse(stored) as BoardData;
    if (!parsed.settings || !Array.isArray(parsed.sections) || !Array.isArray(parsed.milestones)) {
      return sampleBoardData;
    }

    return parsed;
  } catch {
    return sampleBoardData;
  }
}

export function saveBoardData(data: BoardData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
