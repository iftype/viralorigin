import type { Metadata } from "next";
import { Suspense } from "react";
import { SwipeFeedDictionary } from "@/features/main-tabs/components/swipe-feed-dictionary";

export const metadata: Metadata = {
  alternates: { canonical: "https://viralorigin.vercel.app" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "ViralOrigin",
    title: "ViralOrigin — 밈·챌린지 원본과 원조 검색",
    description: "밈과 챌린지의 원조, 처음 시작된 원본, 유래와 뜻을 확인하는 사전입니다.",
    url: "https://viralorigin.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "ViralOrigin",
            alternateName: "바이럴 오리진",
            url: "https://viralorigin.vercel.app",
            description: "밈과 챌린지의 원조, 처음 시작된 원본, 유래와 뜻을 확인하는 사전",
          }).replaceAll("<", "\\u003c"),
        }}
        type="application/ld+json"
      />
      <Suspense fallback={<div className="h-[70vh] w-full bg-black" />}>
        <SwipeFeedDictionary initialTab="feed" />
      </Suspense>
    </>
  );
}
