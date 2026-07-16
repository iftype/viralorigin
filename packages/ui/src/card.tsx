import type { HTMLAttributes } from "react";

import { cn } from "./cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        "rounded-[var(--vo-radius-lg)] border border-[var(--vo-color-border)] bg-[var(--vo-color-surface)] shadow-[var(--vo-shadow-card)]",
        className,
      )}
      {...props}
    />
  );
}
