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
    width: "min(38rem, calc(100vw - 4rem))",
    contentMaxWidth: "32rem",
  },
  md: {
    width: "min(46rem, calc(100vw - 4rem))",
    contentMaxWidth: "38rem",
  },
  lg: {
    width: "min(52rem, calc(100vw - 4rem))",
    contentMaxWidth: "42rem",
  },
} as const;

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
      <path
        d="M5.25 5.25 14.75 14.75M14.75 5.25 5.25 14.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
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
      className="fixed z-[100] flex items-center justify-center overflow-y-auto p-6 sm:p-9 lg:p-12"
      style={{
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.22)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="absolute" aria-hidden="true" onClick={onClose} style={{ inset: 0 }} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative z-10 flex flex-col overflow-hidden border border-[hsl(var(--border))]/85 bg-[rgba(252,250,245,0.99)] shadow-[0_28px_80px_rgba(15,23,42,0.16)]"
        style={{
          width: dimensions.width,
          maxHeight: "calc(100vh - 4rem)",
          borderRadius: "14px",
        }}
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,243,235,0.66))] text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_22px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-px hover:bg-white sm:right-7 sm:top-7"
        >
          <CloseIcon />
        </button>
        <div className="border-b border-[hsl(var(--border))]/70 px-8 py-8 sm:px-10 sm:py-9">
          <div className="mx-auto w-full pr-16 sm:pr-20" style={{ maxWidth: dimensions.contentMaxWidth }}>
            <div className="min-w-0">
              <h2
                id="dialog-title"
                className="text-[1.9rem] font-semibold tracking-[-0.04em] text-[hsl(var(--foreground))]"
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">{description}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="overflow-y-auto px-8 py-7 sm:px-10 sm:py-8">
          <div className="mx-auto w-full" style={{ maxWidth: dimensions.contentMaxWidth }}>
            {children}
          </div>
        </div>
        {footer ? (
          <div className="border-t border-[hsl(var(--border))]/70 px-8 pt-9 pb-8 sm:px-10 sm:pt-10 sm:pb-9">
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
