import type { Meme } from "@/types/meme";

export const publicWebOrigin = "https://viraltimes.vercel.app";

export function buildMemeSeo(meme: Meme) {
  const canonicalUrl = `${publicWebOrigin}/memes/${encodeURIComponent(meme.slug)}`;
  const contentLabel = meme.kind === "challenge" ? "챌린지" : "밈";
  const aliases = meme.aliases.slice(0, 6);
  const title = `${meme.title} ${contentLabel} 원조와 처음 — 유래·뜻`;
  const description = `${meme.title} ${contentLabel}의 원조와 처음 시작된 영상, 유래와 뜻을 확인하세요. 확인된 원본과 바이럴 영상, 확산 과정을 근거와 함께 정리했습니다.`;
  const keywords = [
    `${meme.title} 원조`,
    `${meme.title} 원본`,
    `${meme.title} 최초`,
    `${meme.title} 시작`,
    `${meme.title} 유래`,
    `${meme.title} 뜻`,
    `${meme.title} 처음`,
    `${meme.title} 밈`,
    `${meme.title} 챌린지`,
    ...aliases,
    ...meme.tags,
  ];
  const image = meme.thumbnailUrl?.startsWith("http") ? meme.thumbnailUrl : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    name: `${meme.title} ${contentLabel}`,
    alternateName: aliases,
    description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: "ko-KR",
    dateModified: meme.origin.lastReviewedAt,
    image: image ? [image] : undefined,
    keywords: keywords.join(", "),
    author: { "@type": "Organization", name: "ViralTimes", alternateName: "바이럴타임즈", url: publicWebOrigin },
    publisher: { "@type": "Organization", name: "ViralTimes", alternateName: "바이럴타임즈", url: publicWebOrigin },
    isPartOf: { "@type": "WebSite", name: "ViralTimes", alternateName: ["바이럴타임즈", "바이럴 타임즈"], url: publicWebOrigin, inLanguage: "ko-KR" },
    about: {
      "@type": "Thing",
      name: meme.title,
      description: meme.summary || description,
    },
  };

  return { aliases, canonicalUrl, description, image, jsonLd, keywords, title };
}
