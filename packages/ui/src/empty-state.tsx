import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center rounded-[var(--vo-radius-lg)] border border-dashed border-black/10 bg-white px-6 text-center">
      {icon && <span className="mb-4 text-3xl">{icon}</span>}
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-black/45">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
