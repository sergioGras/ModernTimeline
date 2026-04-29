"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}

const dialogSizes = {
  sm: {
    width: "min(37rem, calc(100vw - 2rem))",
    contentMaxWidth: "30rem",
  },
  md: {
    width: "min(50rem, calc(100vw - 2rem))",
    contentMaxWidth: "40rem",
  },
  lg: {
    width: "min(58rem, calc(100vw - 2rem))",
    contentMaxWidth: "46rem",
  },
} as const;

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-[18px] w-[18px]">
      <path
        d="M5.25 5.25 14.75 14.75M14.75 5.25 5.25 14.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Dialog({ open, onClose, title, description, children, footer, size = "md" }: DialogProps) {
  const [mounted, setMounted] = useState(false);
  const dimensions = dialogSizes[size];

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed z-[100] flex items-center justify-center overflow-y-auto p-5 sm:p-6 lg:p-8"
      style={{
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.28)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="absolute" aria-hidden="true" onClick={onClose} style={{ inset: 0 }} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative z-10 flex flex-col overflow-hidden border border-[hsl(var(--border))]/82 bg-[rgba(252,250,245,0.98)] shadow-[0_26px_78px_rgba(15,23,42,0.18)]"
        style={{
          width: dimensions.width,
          maxHeight: "calc(100dvh - 2.5rem)",
          borderRadius: "18px",
        }}
      >
        <div className="border-b border-[hsl(var(--border))]/68 px-8 py-7 sm:px-9 sm:py-8">
          <div className="mx-auto flex w-full items-start justify-between gap-6" style={{ maxWidth: dimensions.contentMaxWidth }}>
            <div className="min-w-0">
              <h2
                id="dialog-title"
                className="text-[1.5rem] font-semibold tracking-[-0.04em] text-[hsl(var(--foreground))] sm:text-[1.65rem]"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-3 max-w-2xl text-[14px] leading-7 text-slate-600">{description}</p>
              ) : null}
            </div>
            <button
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.85rem] border border-[hsl(var(--border))]/82 bg-white/88 text-slate-700 shadow-[0_8px_16px_rgba(15,23,42,0.08)] transition hover:-translate-y-px hover:border-[hsl(var(--accent))]/25 hover:text-[hsl(var(--foreground))]"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto px-8 py-9 sm:px-9 sm:py-10">
          <div className="mx-auto w-full" style={{ maxWidth: dimensions.contentMaxWidth }}>
            {children}
          </div>
        </div>
        {footer ? (
          <div className="border-t border-[hsl(var(--border))]/68 bg-[rgba(247,243,235,0.46)] px-8 pt-8 pb-9 sm:px-9 sm:pt-8 sm:pb-10">
            <div className="mx-auto w-full" style={{ maxWidth: dimensions.contentMaxWidth }}>
              {footer}
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
