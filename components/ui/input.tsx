import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-[0.95rem] border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.93),rgba(247,243,235,0.82))] px-4 text-[15px] text-[hsl(var(--foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_18px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[hsl(var(--accent))]/55 focus:ring-2 focus:ring-[hsl(var(--accent))]/10",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
