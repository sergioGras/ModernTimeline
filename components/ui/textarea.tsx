import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[148px] w-full rounded-xl border border-[hsl(var(--border))]/90 bg-white px-5 py-4 text-[15px] leading-6 text-[hsl(var(--foreground))] outline-none transition placeholder:text-slate-400 focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent))]/10",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
