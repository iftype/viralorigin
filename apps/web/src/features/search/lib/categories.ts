import type { Meme } from "@/types/meme";

export type MemeCategoryId =
  | "all"
  | "internet-broadcast"
  | "league-of-legends"
  | "challenge"
  | "community-meme"
  | "video-meme";

export const memeCategories: Array<{
  id: MemeCategoryId;
  label: string;
  matches: (meme: Meme) => boolean;
}> = [
  { id: "all", label: "전체", matches: () => true },
  {
    id: "internet-broadcast",
    label: "인터넷 방송",
    matches: (meme) =>
      meme.tags.some((tag) =>
        ["인터넷 방송", "스트리머", "SOOP", "치지직"].includes(tag),
      ),
  },
  {
    id: "league-of-legends",
    label: "리그 오브 레전드",
    matches: (meme) =>
      meme.tags.some((tag) =>
        ["리그 오브 레전드", "롤", "LoL", "e스포츠"].includes(tag),
      ),
  },
  {
    id: "challenge",
    label: "챌린지",
    matches: (meme) => meme.kind === "challenge",
  },
  {
    id: "community-meme",
    label: "커뮤니티 밈",
    matches: (meme) => meme.kind === "community-meme",
  },
  {
    id: "video-meme",
    label: "영상 밈",
    matches: (meme) => meme.kind === "video-meme",
  },
];

export function filterMemes(
  memes: Meme[],
  categoryId: MemeCategoryId,
  query: string,
) {
  const category =
    memeCategories.find((candidate) => candidate.id === categoryId) ??
    memeCategories[0];
  const normalizedQuery = query.trim().toLocaleLowerCase("ko");

  return memes.filter((meme) => {
    if (!category.matches(meme)) return false;
    if (!normalizedQuery) return true;
    return [meme.title, ...meme.aliases, ...meme.tags]
      .join(" ")
      .toLocaleLowerCase("ko")
      .includes(normalizedQuery);
  });
}
