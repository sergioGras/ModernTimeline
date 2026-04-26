import * as React from "react";

import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-12 w-full appearance-none rounded-[0.95rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,243,235,0.8))] px-4 pr-11 text-[15px] text-[hsl(var(--foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-[hsl(var(--accent))]/55 focus:ring-2 focus:ring-[hsl(var(--accent))]/10",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(45deg, transparent 50%, rgba(61,85,72,0.72) 50%), linear-gradient(135deg, rgba(61,85,72,0.72) 50%, transparent 50%)",
        backgroundPosition: "calc(100% - 18px) calc(50% - 2px), calc(100% - 12px) calc(50% - 2px)",
        backgroundSize: "6px 6px, 6px 6px",
        backgroundRepeat: "no-repeat",
      }}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = "Select";
