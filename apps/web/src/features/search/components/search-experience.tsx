"use client";

import { CircleHelp, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Badge, EmptyState, buttonClassName } from "@origin/ui";
import { sampleMemes } from "@/data/sample-memes";
import type { Meme } from "@/types/meme";

import { CategoryTabs } from "./category-tabs";
import { MemeCard } from "./meme-card";
import {
  filterMemes,
  memeCategories,
  type MemeCategoryId,
} from "../lib/categories";

export function SearchExperience() {
  const query = useSearchParams().get("q")?.trim() ?? "";
  const [memes, setMemes] = useState<Meme[]>([]);
  const [activeCategory, setActiveCategory] = useState<MemeCategoryId>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let active = true;
    void fetch("/api/v1/memes?page=1&pageSize=48", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("dictionary unavailable");
        return (await response.json()) as { items: Meme[] };
      })
      .then((data) => {
        if (!active) return;
        setMemes(data.items);
        setIsFallback(false);
      })
      .catch(() => {
        if (!active) return;
        setMemes(sampleMemes);
        setIsFallback(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        memeCategories.map((category) => [
          category.id,
          memes.filter(category.matches).length,
        ]),
      ) as Record<MemeCategoryId, number>,
    [memes],
  );

  const visibleMemes = useMemo(
    () => filterMemes(memes, activeCategory, query),
    [activeCategory, memes, query],
  );

  return (
    <div className="page-shell pb-8 pt-6 sm:pt-8" id="explore">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge className="bg-[#fff0f3] text-[#d91d46]">
            <Sparkles className="size-3.5" aria-hidden="true" /> ORIGIN FEED
          </Badge>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.055em] sm:text-4xl">
            {query ? `“${query}” 검색 결과` : "영상부터 바로 보기"}
          </h1>
          <p className="mt-2 text-sm text-black/45">
            원본과 확산 맥락이 확인된 항목을 골라보세요.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-black/35">
          <span className={`size-2 rounded-full ${isFallback ? "bg-[#f59e0b]" : "bg-[#25c4bd]"}`} />
          {isFallback ? "기본 사전 표시 중" : "검토 완료 데이터"}
        </div>
      </section>

      <div className="mt-6">
        <CategoryTabs
          active={activeCategory}
          counts={counts}
          onChange={setActiveCategory}
        />
      </div>

      <section className="mt-4" aria-busy={isLoading} aria-live="polite">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="h-[29rem] animate-pulse rounded-[var(--vo-radius-xl)] bg-white" key={index} />
            ))}
          </div>
        ) : visibleMemes.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleMemes.map((meme, index) => (
              <MemeCard key={meme.id} meme={meme} priority={index === 0} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🫥"
            title="아직 기록이 없어요"
            description="검색어나 카테고리를 바꿔보거나, 찾는 밈을 운영자에게 알려주세요."
            action={
              <Link
                className={buttonClassName({ variant: "secondary" })}
                href="/submit?type=request"
              >
                <CircleHelp className="size-4" aria-hidden="true" /> 없는 밈 요청
              </Link>
            }
          />
        )}
      </section>

      {!isLoading && visibleMemes.length > 0 && (
        <aside className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[var(--vo-radius-lg)] bg-black p-5 text-white sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="font-black">찾는 밈이나 챌린지가 없나요?</p>
            <p className="mt-1 text-xs leading-5 text-white/50">
              이름만 알아도 요청할 수 있고, 원본 링크를 알고 있다면 함께 제보할 수 있어요.
            </p>
          </div>
          <Link className={buttonClassName({ variant: "secondary", className: "shrink-0 border-white/15 bg-white text-black" })} href="/submit?type=request">
            추가 요청
          </Link>
        </aside>
      )}
    </div>
  );
}
