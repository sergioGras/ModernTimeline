import * as React from "react";

import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-[148px] w-full rounded-[0.95rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,243,235,0.8))] px-4 py-4 text-[15px] leading-6 text-[hsl(var(--foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_18px_rgba(15,23,42,0.04)] outline-none transition placeholder:text-slate-400 focus:border-[hsl(var(--accent))]/55 focus:ring-2 focus:ring-[hsl(var(--accent))]/10",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
