import type { Metadata } from "next";
import { Suspense } from "react";
import { SwipeFeedDictionary } from "@/features/main-tabs/components/swipe-feed-dictionary";

export const metadata: Metadata = {
  title: "밈·챌린지 원조·유래·뜻 사전",
  description: "밈과 챌린지가 처음 시작된 원본, 원조 영상, 유래와 뜻을 항목별로 검색하세요.",
  alternates: { canonical: "https://viraltimes.vercel.app/memes" },
};

export default function MemesPage() {
  return (
    <Suspense fallback={<div className="h-[70vh] w-full bg-white" />}>
      <SwipeFeedDictionary initialTab="dictionary" />
    </Suspense>
  );
}
