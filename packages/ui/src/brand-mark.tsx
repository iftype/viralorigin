import { cn } from "./cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-xl bg-black text-sm font-black text-white shadow-[-3px_0_0_var(--vo-color-signal),3px_0_0_var(--vo-color-brand)] mx-0.5",
        className,
      )}
    >
      V
    </span>
  );
}
