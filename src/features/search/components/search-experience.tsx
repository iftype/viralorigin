"use client";

import {
  ArrowRight,
  Check,
  CircleHelp,
  Clock3,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { sampleMemes } from "@/data/sample-memes";
import type { OriginStatus } from "@/types/meme";

const statusMeta: Record<
  OriginStatus,
  { label: string; icon: typeof Check; className: string }
> = {
  verified: {
    label: "출처 확인",
    icon: Check,
    className: "bg-[#d9ead8] text-[#245b2d]",
  },
  likely: {
    label: "유력",
    icon: Clock3,
    className: "bg-[#f5dfb5] text-[#7d5017]",
  },
  "needs-review": {
    label: "검토 필요",
    icon: CircleHelp,
    className: "bg-[#e6dfef] text-[#60477b]",
  },
};

export function SearchExperience() {
  const [query, setQuery] = useState("");

  const filteredMemes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko");
    if (!normalizedQuery) return sampleMemes;

    return sampleMemes.filter((meme) =>
      [meme.title, ...meme.aliases, ...meme.tags]
        .join(" ")
        .toLocaleLowerCase("ko")
        .includes(normalizedQuery),
    );
  }, [query]);

  return (
    <>
      <section className="page-shell grid min-h-[680px] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-black/45">
            <span className="h-px w-10 bg-black/35" />
            The meme origin index
          </p>
          <h1 className="display-serif max-w-4xl text-[clamp(4rem,10vw,8.5rem)] leading-[0.83] tracking-[-0.075em]">
            그 밈,
            <br />
            <span className="italic text-[#f05a28]">어디서</span>
            <br />
            시작됐을까?
          </h1>
        </div>

        <div className="lg:pt-32">
          <p className="max-w-md text-lg leading-8 text-black/60">
            밈과 챌린지의 현재까지 확인된 원본, 판단 근거, 퍼져나간
            순간을 한곳에서 확인하세요.
          </p>

          <label className="mt-9 block" htmlFor="meme-search">
            <span className="sr-only">밈 검색</span>
            <span className="flex items-center gap-4 border-b-2 border-black py-4">
              <Search className="size-6 shrink-0" aria-hidden="true" />
              <input
                id="meme-search"
                className="min-w-0 flex-1 bg-transparent text-xl font-semibold outline-none placeholder:text-black/35"
                type="search"
                placeholder="밈 이름을 입력하세요"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  className="rounded-full p-1 hover:bg-black/10"
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="검색어 지우기"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              )}
            </span>
          </label>

          <div className="mt-6 flex gap-8 text-xs font-bold uppercase tracking-[0.14em] text-black/45">
            <span>{sampleMemes.length} records</span>
            <span>community sourced</span>
          </div>
        </div>
      </section>

      <section className="border-y border-black/15 bg-[#1b1b18] py-4 text-[#f3f0e8]">
        <div className="page-shell flex items-center gap-5 overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em]">
          <span className="text-[#ff7849]">Prototype data</span>
          <span className="text-white/25">◆</span>
          <span className="text-white/65">
            현재 콘텐츠는 화면 검증용 샘플이며 공개 전 출처 재검토가 필요합니다
          </span>
        </div>
      </section>

      <section className="page-shell py-20" id="explore">
        <div className="mb-10 flex items-end justify-between border-b border-black/15 pb-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-black/40">
              Explore / {String(filteredMemes.length).padStart(2, "0")}
            </p>
            <h2 className="display-serif text-4xl tracking-[-0.045em] sm:text-5xl">
              {query ? `“${query}” 검색 결과` : "지금 확인해 볼 기록"}
            </h2>
          </div>
          {query && (
            <button
              className="hidden text-sm font-semibold underline underline-offset-4 sm:block"
              type="button"
              onClick={() => setQuery("")}
            >
              전체 보기
            </button>
          )}
        </div>

        {filteredMemes.length ? (
          <div className="grid gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-2 xl:grid-cols-3">
            {filteredMemes.map((meme, index) => {
              const status = statusMeta[meme.origin.status];
              const StatusIcon = status.icon;

              return (
                <Link
                  className="group flex min-h-[390px] flex-col bg-[#f3f0e8] p-7 transition-colors hover:bg-white sm:p-9"
                  href={`/memes/${meme.slug}`}
                  key={meme.id}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tabular-nums text-black/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.68rem] font-bold ${status.className}`}
                    >
                      <StatusIcon className="size-3" aria-hidden="true" />
                      {status.label}
                    </span>
                  </div>

                  <div className="my-auto py-10">
                    <div
                      className="mb-6 h-1 w-14 transition-all duration-300 group-hover:w-24"
                      style={{ backgroundColor: meme.accent }}
                    />
                    <h3 className="display-serif text-4xl leading-none tracking-[-0.055em] sm:text-5xl">
                      {meme.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 max-w-sm text-sm leading-6 text-black/55">
                      {meme.summary}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-5 border-t border-black/10 pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {meme.tags.slice(0, 3).map((tag) => (
                        <span
                          className="rounded-full border border-black/10 px-2.5 py-1 text-[0.65rem] font-semibold text-black/50"
                          key={tag}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-black/15 transition-colors group-hover:bg-black group-hover:text-white">
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center border border-dashed border-black/25 px-6 text-center">
            <p className="display-serif text-3xl">아직 기록이 없어요.</p>
            <p className="mt-3 text-sm text-black/50">
              다른 이름이나 태그로 검색해 보세요.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
