import { Search } from "lucide-react";

import { cn } from "@origin/ui";

export function HeaderSearch({ className }: { className?: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <form
      action={`${basePath}/`}
      className={cn(
        "flex min-w-0 flex-1 items-center gap-2 rounded-full border border-black/8 bg-[#f3f3f5] px-3.5 py-2 transition focus-within:border-black/25 focus-within:bg-white",
        className,
      )}
      role="search"
    >
      <Search className="size-4 shrink-0 text-black/35" aria-hidden="true" />
      <input
        aria-label="밈 사전 검색"
        className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-medium placeholder:text-black/30"
        name="q"
        placeholder="밈·유행어 검색"
        type="search"
      />
    </form>
  );
}
