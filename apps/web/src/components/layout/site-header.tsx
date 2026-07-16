import { MessageCircleMore, Plus } from "lucide-react";
import Link from "next/link";

import { BrandMark, buttonClassName } from "@origin/ui";

import { HeaderSearch } from "./header-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/92 backdrop-blur-xl">
      <div className="page-shell py-2.5">
        <div className="flex items-center gap-3">
          <Link className="flex shrink-0 items-center gap-2.5 font-black" href="/">
            <BrandMark />
            <span className="tracking-[-0.04em]">VIRALORIGIN</span>
          </Link>

          <HeaderSearch className="ml-2 hidden max-w-lg md:flex" />

          <nav className="ml-auto flex items-center gap-1.5 text-sm font-bold">
            <Link
              className={buttonClassName({ variant: "ghost", size: "sm", className: "max-sm:hidden" })}
              href="/feedback"
            >
              <MessageCircleMore className="size-4" aria-hidden="true" />
              문의·피드백
            </Link>
            <Link
              aria-label="없는 밈 제보"
              className={buttonClassName({ size: "sm", className: "max-sm:size-9 max-sm:px-0" })}
              href="/submit?type=request"
            >
              <Plus className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">없는 밈 제보</span>
            </Link>
          </nav>
        </div>
        <HeaderSearch className="mt-2.5 md:hidden" />
      </div>
    </header>
  );
}
