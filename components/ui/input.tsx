import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-[hsl(var(--border))]/90 bg-white px-5 text-[15px] text-[hsl(var(--foreground))] outline-none transition placeholder:text-slate-400 focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent))]/10",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
