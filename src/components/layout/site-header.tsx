import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/15">
      <div className="page-shell flex h-20 items-center justify-between">
        <Link
          className="flex items-center gap-3 font-black tracking-[-0.04em]"
          href="/"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-[#1b1b18] text-xs text-white">
            O
          </span>
          <span>ORIGIN</span>
          <span className="text-xs font-medium tracking-normal text-black/35">
            BETA
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-semibold sm:gap-8">
          <Link className="hidden transition-opacity hover:opacity-50 sm:block" href="/#explore">
            밈 탐색
          </Link>
          <a
            className="flex items-center gap-1 border-b border-black pb-1"
            href="https://github.com/iftype/meme-origin-timeline/issues/new"
            target="_blank"
            rel="noreferrer"
          >
            제보하기
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

