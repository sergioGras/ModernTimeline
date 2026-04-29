import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-[hsl(var(--accent))]/35 bg-[linear-gradient(180deg,rgba(65,104,82,0.96),rgba(56,92,73,0.94))] text-[hsl(var(--accent-foreground))] shadow-[0_10px_24px_rgba(45,79,63,0.16)] backdrop-blur-xl hover:-translate-y-px hover:border-[hsl(var(--accent))]/50 hover:shadow-[0_14px_28px_rgba(45,79,63,0.2)]",
  secondary:
    "border border-[hsl(var(--border))]/82 bg-[rgba(255,255,255,0.66)] text-[hsl(var(--foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl hover:-translate-y-px hover:border-[hsl(var(--border))] hover:bg-[rgba(255,255,255,0.84)]",
  ghost:
    "border border-transparent bg-transparent text-[hsl(var(--foreground))] hover:border-[hsl(var(--border))]/60 hover:bg-white/55",
  danger:
    "border border-rose-200/85 bg-rose-50/90 text-rose-700 shadow-[0_10px_22px_rgba(190,24,24,0.08)] hover:-translate-y-px hover:bg-rose-100",
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
        "inline-flex min-h-10 appearance-none items-center justify-center gap-2 rounded-[0.95rem] px-4 py-2.5 text-sm font-semibold tracking-[-0.01em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
