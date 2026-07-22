import type { MetadataRoute } from "next";

import { sampleMemes } from "@/data/sample-memes";
import { publicWebOrigin } from "@/features/meme-detail/lib/meme-seo";
import type { Meme } from "@/types/meme";

const seoApiOrigin = (process.env.SEO_API_ORIGIN ?? "https://meme.iftype.store/api/v1").replace(/\/$/, "");

export const revalidate = 300;

async function fetchPublishedMemes() {
  try {
    const memes: Meme[] = [];
    let page = 1;
    let hasNext = true;
    while (hasNext) {
      const response = await fetch(`${seoApiOrigin}/memes?page=${page}&pageSize=48&sort=latest`, {
        next: { revalidate },
      });
      if (!response.ok) throw new Error("sitemap source unavailable");
      const data = (await response.json()) as { items?: Meme[]; pagination?: { hasNext?: boolean } };
      memes.push(...(data.items ?? []));
      hasNext = data.pagination?.hasNext === true;
      page += 1;
    }
    return memes;
  } catch {
    return sampleMemes;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const memes = await fetchPublishedMemes();
  return [
    {
      url: publicWebOrigin,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${publicWebOrigin}/memes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...memes.map((meme) => ({
      url: `${publicWebOrigin}/memes/${encodeURIComponent(meme.slug)}`,
      lastModified: meme.origin.lastReviewedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
