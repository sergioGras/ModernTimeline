"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { Section } from "@/lib/types";

interface SectionDialogProps {
  open: boolean;
  section?: Section | null;
  onClose: () => void;
  onSave: (title: string, sectionId?: string) => void;
}

export function SectionDialog({ open, section, onClose, onSave }: SectionDialogProps) {
  const [title, setTitle] = useState(section?.title ?? "");

  useEffect(() => {
    setTitle(section?.title ?? "");
  }, [section, open]);

  const submit = () => {
    if (!title.trim()) {
      return;
    }

    onSave(title.trim(), section?.id);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="sm"
      title={section ? "Rename section" : "New section"}
      description="Keep section names short and clear so the left rail stays readable."
      footer={
        <div className="flex items-center justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>{section ? "Save section" : "Create section"}</Button>
        </div>
      }
    >
      <div className="grid gap-6">
        <label className="grid gap-3 text-sm font-medium text-slate-700">
          <span>Section title</span>
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Product" />
        </label>
      </div>
    </Dialog>
  );
}
