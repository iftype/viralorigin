import { CalendarClock } from "lucide-react";

import { Badge, cn } from "@origin/ui";

export type YearFilter = "all" | "recent" | number;

export function YearTabs({
  active,
  counts,
  onChange,
  years,
}: {
  active: YearFilter;
  counts: Record<string, number>;
  onChange: (filter: YearFilter) => void;
  years: number[];
}) {
  const tabs: Array<{ id: YearFilter; label: string }> = [
    { id: "all", label: "모든 연도" },
    { id: "recent", label: "최신 밈" },
    ...years.map((year) => ({ id: year, label: `${year}` })),
  ];

  return (
    <div aria-label="유행 시작 연도" className="w-full flex items-center gap-1 p-1 rounded-2xl bg-zinc-100/80 border border-zinc-200/50 overflow-x-auto no-scrollbar" role="tablist">
      {tabs.map((tab) => {
        const selected = tab.id === active;
        const key = String(tab.id);
        return (
          <button
            aria-selected={selected}
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-all duration-200 cursor-pointer",
              selected
                ? "bg-zinc-900 text-white font-black shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 font-bold hover:bg-black/5",
            )}
            key={key}
            onClick={() => onChange(tab.id)}
            role="tab"
            type="button"
          >
            {tab.id === "recent" && <CalendarClock className="size-3" aria-hidden="true" />}
            <span>{tab.label}</span>
            <Badge className={cn("px-1.5 py-0.2 text-[0.6rem] font-bold rounded-md", selected ? "bg-white/20 text-white" : "bg-black/8 text-zinc-600")}>
              {counts[key] ?? 0}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
