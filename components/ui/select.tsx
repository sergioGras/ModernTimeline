import * as React from "react";

import { cn } from "@/lib/utils";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-12 w-full appearance-none rounded-xl border border-[hsl(var(--border))]/90 bg-white px-5 pr-12 text-[15px] text-[hsl(var(--foreground))] outline-none transition focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent))]/10",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(45deg, transparent 50%, rgba(61,85,72,0.7) 50%), linear-gradient(135deg, rgba(61,85,72,0.7) 50%, transparent 50%)",
        backgroundPosition: "calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)",
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
