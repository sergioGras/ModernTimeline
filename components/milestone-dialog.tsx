"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Milestone, Section } from "@/lib/types";

export interface MilestoneDraft {
  title: string;
  description: string;
  sectionId: string;
  date: string;
}

interface MilestoneDialogProps {
  open: boolean;
  milestone?: Milestone | null;
  sections: Section[];
  defaultSectionId?: string;
  onClose: () => void;
  onSave: (draft: MilestoneDraft, milestoneId?: string) => void;
  onDelete?: (milestoneId: string) => void;
}

export function MilestoneDialog({
  open,
  milestone,
  sections,
  defaultSectionId,
  onClose,
  onSave,
  onDelete,
}: MilestoneDialogProps) {
  const [draft, setDraft] = useState<MilestoneDraft>({
    title: "",
    description: "",
    sectionId: defaultSectionId ?? "",
    date: "",
  });

  useEffect(() => {
    setDraft({
      title: milestone?.title ?? "",
      description: milestone?.description ?? "",
      sectionId: milestone?.sectionId ?? defaultSectionId ?? sections[0]?.id ?? "",
      date: milestone?.date ?? "",
    });
  }, [milestone, open, sections, defaultSectionId]);

  const submit = () => {
    if (!draft.title.trim() || !draft.sectionId || !draft.date) {
      return;
    }

    onSave(
      {
        ...draft,
        title: draft.title.trim(),
        description: draft.description.trim(),
      },
      milestone?.id,
    );
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="lg"
      title={milestone ? "Edit milestone" : "New milestone"}
      description="Milestones are point-in-time markers. Placement is handled automatically from the selected date and section."
      footer={
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {milestone && onDelete ? (
              <Button
                variant="danger"
                onClick={() => {
                  onDelete(milestone.id);
                  onClose();
                }}
              >
                Delete milestone
              </Button>
            ) : null}
          </div>
          <div className="flex items-center justify-end gap-4 pt-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit}>{milestone ? "Save changes" : "Create milestone"}</Button>
          </div>
        </div>
      }
    >
      <div className="grid gap-7">
        <label className="grid gap-3 text-sm font-medium text-slate-700">
          <span>Title</span>
          <Input
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            placeholder="Internal beta review"
          />
        </label>
        <label className="grid gap-3 text-sm font-medium text-slate-700">
          <span>Description</span>
          <Textarea
            value={draft.description}
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            placeholder="Add context that will be visible when editing this milestone."
          />
        </label>
        <div className="grid gap-6 border-t border-[hsl(var(--border))]/60 pt-7 sm:grid-cols-2">
          <label className="grid gap-3 text-sm font-medium text-slate-700">
            <span>Section</span>
            <Select
              value={draft.sectionId}
              onChange={(event) => setDraft((current) => ({ ...current, sectionId: event.target.value }))}
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </Select>
          </label>
          <label className="grid gap-3 text-sm font-medium text-slate-700">
            <span>Date</span>
            <Input
              type="date"
              value={draft.date}
              onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))}
            />
          </label>
        </div>
      </div>
    </Dialog>
  );
}
