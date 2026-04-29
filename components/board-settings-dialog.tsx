"use client";

import { useEffect, useState } from "react";

import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { BoardSettings } from "@/lib/types";

interface BoardSettingsDialogProps {
  open: boolean;
  settings: BoardSettings;
  onClose: () => void;
  onSave: (settings: BoardSettings) => void;
}

export function BoardSettingsDialog({ open, settings, onClose, onSave }: BoardSettingsDialogProps) {
  const [draft, setDraft] = useState(settings);

  useEffect(() => {
    setDraft(settings);
  }, [settings, open]);

  const submit = () => {
    if (!draft.title.trim() || !draft.startDate || !draft.endDate) {
      return;
    }

    onSave({
      ...draft,
      title: draft.title.trim(),
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="md"
      title="Board settings"
      description="Set the visible date range and time scale for the roadmap board."
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>Save settings</Button>
        </div>
      }
    >
      <div className="grid gap-8">
        <label className="grid gap-2.5 text-sm font-medium text-slate-700">
          <span>Board title</span>
          <Input
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            placeholder="Board title"
          />
        </label>
        <div className="grid gap-6 border-t border-[hsl(var(--border))]/58 pt-8 sm:grid-cols-2">
          <label className="grid gap-2.5 text-sm font-medium text-slate-700">
            <span>Start date</span>
            <Input
              type="date"
              value={draft.startDate}
              onChange={(event) => setDraft((current) => ({ ...current, startDate: event.target.value }))}
            />
          </label>
          <label className="grid gap-2.5 text-sm font-medium text-slate-700">
            <span>End date</span>
            <Input
              type="date"
              value={draft.endDate}
              onChange={(event) => setDraft((current) => ({ ...current, endDate: event.target.value }))}
            />
          </label>
          <label className="grid gap-2.5 text-sm font-medium text-slate-700 sm:col-span-2">
            <span>Time scale</span>
            <Select
              value={draft.scale}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  scale: event.target.value as BoardSettings["scale"],
                }))
              }
            >
              <option value="month">Month</option>
              <option value="quarter">Quarter</option>
            </Select>
          </label>
        </div>
      </div>
    </Dialog>
  );
}
