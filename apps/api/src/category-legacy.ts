import type { Meme } from "./meme-types.js";

const categoryIdBySlug: Record<string, string> = {
  "korea-minor-meme": "category-korea-minor-meme",
  "internet-broadcast": "category-internet-broadcast",
  "league-of-legends": "category-league-of-legends",
  challenge: "category-challenge",
  "community-meme": "category-community-meme",
  "video-meme": "category-video-meme",
  "music-dance": "category-music-dance",
  game: "category-game",
  instagram: "category-instagram",
  "toon-anime": "category-toon-anime",
};

export function legacyCategoryIds(meme: Omit<Meme, "categoryIds"> & { categoryIds?: string[] }) {
  if (Array.isArray(meme.categoryIds) && meme.categoryIds.length) {
    return [...new Set(meme.categoryIds)];
  }

  const values = meme.tags.map((tag) => tag.toLocaleLowerCase("ko"));
  const ids = new Set<string>();
  if (meme.kind === "minor-meme") ids.add(categoryIdBySlug["korea-minor-meme"]);
  if (meme.kind === "challenge") ids.add(categoryIdBySlug.challenge);
  if (meme.kind === "video-meme") ids.add(categoryIdBySlug["video-meme"]);
  if (meme.kind === "community-meme") ids.add(categoryIdBySlug["community-meme"]);

  if (values.some((tag) => ["인스타", "인스타그램", "틱톡", "숏폼", "instagram", "tiktok"].includes(tag))) {
    ids.add(categoryIdBySlug.instagram);
  }
  if (values.some((tag) => ["인방", "인터넷 방송", "방송", "스트리머", "숲", "아프리카tv", "BJ", "유튜버"].includes(tag))) {
    ids.add(categoryIdBySlug["internet-broadcast"]);
  }
  if (values.some((tag) => ["커뮤", "커뮤니티", "디시", "에타", "sns"].includes(tag))) {
    ids.add(categoryIdBySlug["community-meme"]);
  }
  if (values.some((tag) => ["게임", "gaming", "롤", "league of legends", "lol", "오버워치", "e스포츠"].includes(tag))) {
    ids.add(categoryIdBySlug.game);
  }
  if (values.some((tag) => ["리그 오브 레전드", "롤", "lol", "e스포츠"].includes(tag))) {
    ids.add(categoryIdBySlug["league-of-legends"]);
  }
  if (values.some((tag) => ["댄스", "음악", "노래", "안무"].includes(tag))) {
    ids.add(categoryIdBySlug["music-dance"]);
  }
  if (values.some((tag) => ["만화", "웹툰", "애니", "애니메이션", "toon", "anime"].includes(tag))) {
    ids.add(categoryIdBySlug["toon-anime"]);
  }
  return [...ids].filter(Boolean);
}
