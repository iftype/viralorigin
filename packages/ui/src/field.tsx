import type { ReactNode } from "react";

import { cn } from "./cn";

export function Field({
  label,
  hint,
  wide = false,
  className,
  children,
}: {
  label: string;
  hint?: string;
  wide?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block text-xs font-black text-black/60", wide && "sm:col-span-2", className)}>
      <span className="flex items-center justify-between gap-3">
        {label}
        {hint && <span className="font-medium text-black/30">{hint}</span>}
      </span>
      <span className="vo-field-control mt-2 block">{children}</span>
    </label>
  );
}
