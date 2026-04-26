import { addMonths, format, startOfMonth } from "date-fns";

import type { BoardData } from "@/lib/types";

const baseDate = startOfMonth(new Date());

export const sampleBoardData: BoardData = {
  settings: {
    title: "Internal Milestone Timeline",
    startDate: format(baseDate, "yyyy-MM-dd"),
    endDate: format(addMonths(baseDate, 8), "yyyy-MM-dd"),
    scale: "month",
  },
  sections: [
    { id: "section-product", title: "Product", order: 0 },
    { id: "section-design", title: "Design", order: 1 },
    { id: "section-growth", title: "Growth", order: 2 },
  ],
  milestones: [
    {
      id: "ms-editorial-direction",
      title: "Editorial direction locked",
      description: "Finalize board framing, language hierarchy, and presentation tone.",
      sectionId: "section-design",
      date: format(addMonths(baseDate, 1), "yyyy-MM-dd"),
    },
    {
      id: "ms-v1-shell",
      title: "Board shell complete",
      description: "Header, time scale controls, and sticky structure ready for milestone placement.",
      sectionId: "section-product",
      date: format(addMonths(baseDate, 2), "yyyy-MM-dd"),
    },
    {
      id: "ms-internal-pilot",
      title: "Internal pilot begins",
      description: "Collect feedback from roadmap owners and validate readability on smaller screens.",
      sectionId: "section-growth",
      date: format(addMonths(baseDate, 4), "yyyy-MM-dd"),
    },
    {
      id: "ms-polish",
      title: "UI polish and responsiveness",
      description: "Refine density, card behavior, and spacing before the first internal release.",
      sectionId: "section-design",
      date: format(addMonths(baseDate, 5), "yyyy-MM-dd"),
    },
    {
      id: "ms-v1-release",
      title: "V1 internal release",
      description: "Ship the timeline board with simple CRUD flows and local persistence.",
      sectionId: "section-product",
      date: format(addMonths(baseDate, 6), "yyyy-MM-dd"),
    },
  ],
};
