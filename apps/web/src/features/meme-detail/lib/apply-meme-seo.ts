import type { Meme } from "@/types/meme";

import { buildMemeSeo } from "./meme-seo";

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.dataset.viraloriginSeo = "true";
    document.head.appendChild(element);
  }
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
};

export function applyMemeSeo(meme: Meme) {
  const originalTitle = document.title;
  const existingDescription = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
  const originalDescription = existingDescription?.content;
  const existingCanonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  const originalCanonical = existingCanonical?.href;
  const { canonicalUrl, description, jsonLd: structuredData, keywords, title } = buildMemeSeo(meme);

  document.title = title;
  upsertMeta('meta[name="description"]', { name: "description", content: description });
  upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords.join(", ") });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: "article" });
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.dataset.viraloriginSeo = "true";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  document.head.querySelector('script[data-viralorigin-seo="jsonld"]')?.remove();
  const jsonLdElement = document.createElement("script");
  jsonLdElement.type = "application/ld+json";
  jsonLdElement.dataset.viraloriginSeo = "jsonld";
  jsonLdElement.text = JSON.stringify(structuredData);
  document.head.appendChild(jsonLdElement);

  return () => {
    document.title = originalTitle;
    if (existingDescription && originalDescription !== undefined) {
      existingDescription.content = originalDescription;
    }
    if (existingCanonical && originalCanonical) existingCanonical.href = originalCanonical;
    document.head.querySelectorAll('[data-viralorigin-seo="true"], script[data-viralorigin-seo="jsonld"]').forEach((element) => element.remove());
  };
}
