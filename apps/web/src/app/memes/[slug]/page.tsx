import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DynamicMemeDetail } from "@/features/meme-detail/components/dynamic-meme-detail";
import { sampleMemes } from "@/data/sample-memes";
import { buildMemeSeo } from "@/features/meme-detail/lib/meme-seo";
import type { Meme } from "@/types/meme";

const seoApiOrigin = (process.env.SEO_API_ORIGIN ?? "https://meme.iftype.store/api/v1").replace(/\/$/, "");

async function fetchMeme(slug: string) {
  try {
    const response = await fetch(`${seoApiOrigin}/memes/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return ((await response.json()) as { item?: Meme }).item ?? null;
  } catch {
    return sampleMemes.find((meme) => meme.slug === slug) ?? null;
  }
}

async function fetchPublishedSlugs() {
  try {
    const slugs: Array<{ slug: string }> = [];
    let page = 1;
    let hasNext = true;
    while (hasNext) {
      const response = await fetch(`${seoApiOrigin}/memes?page=${page}&pageSize=48&sort=latest`, {
        next: { revalidate: 300 },
      });
      if (!response.ok) throw new Error("sitemap source unavailable");
      const data = (await response.json()) as { items?: Meme[]; pagination?: { hasNext?: boolean } };
      slugs.push(...(data.items ?? []).map((meme) => ({ slug: meme.slug.toLowerCase() })));
      hasNext = data.pagination?.hasNext === true;
      page += 1;
    }
    return slugs;
  } catch {
    return sampleMemes.map((meme) => ({ slug: meme.slug.toLowerCase() }));
  }
}

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meme = await fetchMeme(slug.toLowerCase());
  if (!meme) return { title: "사전 항목", robots: { index: false, follow: false } };
  const seo = buildMemeSeo(meme);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      locale: "ko_KR",
      siteName: "ViralTimes",
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      images: seo.image ? [{ url: seo.image, alt: `${meme.title} ${meme.kind === "challenge" ? "챌린지" : "밈"} 원본` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : undefined,
    },
  };
}

// output: "export" 정적 빌드 성공을 위한 사전 경로 리스트 반환
export async function generateStaticParams() {
  return fetchPublishedSlugs();
}

export default async function DynamicMemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meme = await fetchMeme(slug.toLowerCase());
  if (!meme) notFound();
  const { jsonLd } = buildMemeSeo(meme);
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c") }} type="application/ld+json" />
      <Suspense
        fallback={
          <div className="page-shell flex min-h-[65vh] items-center justify-center text-sm font-bold text-black/35">
            사전 항목을 불러오는 중...
          </div>
        }
      >
        <DynamicMemeDetail initialMeme={meme} />
      </Suspense>
    </>
  );
}
