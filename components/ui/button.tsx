import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-[hsl(var(--accent))]/60 bg-[linear-gradient(180deg,rgba(93,143,118,0.88),rgba(44,87,67,0.96))] text-[hsl(var(--accent-foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_rgba(45,79,63,0.18)] backdrop-blur-xl hover:-translate-y-px hover:border-[hsl(var(--accent))]/75 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_14px_28px_rgba(45,79,63,0.24)]",
  secondary:
    "border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(247,243,235,0.54))] text-[hsl(var(--foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_10px_22px_rgba(15,23,42,0.06)] backdrop-blur-xl hover:-translate-y-px hover:border-white/70 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(247,243,235,0.68))] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_14px_26px_rgba(15,23,42,0.08)]",
  ghost:
    "border border-transparent bg-transparent text-[hsl(var(--foreground))] hover:border-white/55 hover:bg-white/55 hover:backdrop-blur-xl",
  danger:
    "border border-rose-200/90 bg-[linear-gradient(180deg,rgba(255,247,247,0.94),rgba(255,231,231,0.96))] text-rose-700 shadow-[0_10px_22px_rgba(190,24,24,0.08)] backdrop-blur-xl hover:-translate-y-px hover:bg-rose-50",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[1rem] px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
