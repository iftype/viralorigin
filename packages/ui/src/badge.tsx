import type { HTMLAttributes } from "react";

import { cn } from "./cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-black/5 px-2.5 py-1 text-[0.7rem] font-black text-black/55",
        className,
      )}
      {...props}
    />
  );
}
