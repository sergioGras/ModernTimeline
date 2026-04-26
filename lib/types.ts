export type TimeScale = "month" | "quarter";

export interface BoardSettings {
  title: string;
  startDate: string;
  endDate: string;
  scale: TimeScale;
}

export interface Section {
  id: string;
  title: string;
  order: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  sectionId: string;
  date: string;
}

export interface BoardData {
  settings: BoardSettings;
  sections: Section[];
  milestones: Milestone[];
}
