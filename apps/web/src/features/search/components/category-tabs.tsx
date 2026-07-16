import { Badge, cn } from "@origin/ui";

import {
  memeCategories,
  type MemeCategoryId,
} from "../lib/categories";

export function CategoryTabs({
  active,
  counts,
  onChange,
}: {
  active: MemeCategoryId;
  counts: Record<MemeCategoryId, number>;
  onChange: (category: MemeCategoryId) => void;
}) {
  return (
    <div
      aria-label="밈 카테고리"
      className="hide-scrollbar flex gap-2 overflow-x-auto pb-2"
      role="tablist"
    >
      {memeCategories.map((category) => {
        const selected = category.id === active;
        return (
          <button
            aria-selected={selected}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-black transition",
              selected
                ? "bg-black text-white"
                : "border border-black/5 bg-white text-black/50 hover:border-black/20 hover:text-black",
            )}
            key={category.id}
            onClick={() => onChange(category.id)}
            role="tab"
            type="button"
          >
            {category.label}
            <Badge
              className={cn(
                "min-w-5 justify-center px-1.5 py-0.5 text-[0.62rem]",
                selected ? "bg-white/20 text-white" : "bg-black/5",
              )}
            >
              {counts[category.id]}
            </Badge>
          </button>
        );
      })}
    </div>
  );
}
