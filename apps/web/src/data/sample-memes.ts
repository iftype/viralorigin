import type { Meme } from "@/types/meme";

export const sampleMemes: Meme[] = [
  {
    id: "scuba-dance",
    slug: "scuba-dance",
    title: "스쿠바 댄스",
    kind: "challenge",
    aliases: ["스쿠바 댄스 챌린지"],
    summary: "스쿠바 다이빙 장비를 차고 신나게 춤추는 인기 유행 숏폼 챌린지.",
    origin: {
      status: "verified",
      video: {
        id: "v-scuba-1",
        platform: "tiktok",
        url: "https://www.tiktok.com",
        title: "스쿠바 댄스 원본 영상",
        creator: "scuba_origin",
      },
      summary: "스쿠바 댄스 원조 챌린지 영상이 SNS에서 큰 화제를 모았습니다.",
      evidence: [],
      lastReviewedAt: "2026-07-20",
    },
    timeline: [],
    trendingVideos: [],
    relatedVideos: [],
    lifecycle: { originYear: 2026 },
    categoryIds: ["challenge"],
    tags: ["스쿠바댄스", "챌린지"],
    accent: "#fe2c55",
  },
];

export function getMemeBySlug(slug: string) {
  return sampleMemes.find((meme) => meme.slug === slug);
}
