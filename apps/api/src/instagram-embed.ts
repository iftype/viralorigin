const cacheTtlMs = 15 * 60 * 1000;
const maxCacheEntries = 200;
const maxHtmlBytes = 256_000;

type EmbedCheck = {
  available: boolean | null;
  checkedAt: string;
  reason?: "removed" | "unreachable" | "unrecognized";
};

function parseInstagramEmbedUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("올바른 Instagram 링크를 입력해 주세요.");
  }
  const hostname = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || (hostname !== "instagram.com" && !hostname.endsWith(".instagram.com"))) {
    throw new Error("Instagram HTTPS 링크만 확인할 수 있습니다.");
  }
  const [, route, shortcode] = url.pathname.split("/");
  if (!["p", "reel", "tv"].includes(route) || !/^[a-z0-9_-]+$/i.test(shortcode ?? "")) {
    throw new Error("Instagram 게시물 또는 릴스 링크를 확인해 주세요.");
  }
  return `https://www.instagram.com/${route}/${shortcode}/embed/captioned/`;
}

async function readLimitedText(response: Response) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (length < maxHtmlBytes) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    const remaining = maxHtmlBytes - length;
    chunks.push(value.byteLength > remaining ? value.slice(0, remaining) : value);
    length += Math.min(value.byteLength, remaining);
  }
  await reader.cancel().catch(() => undefined);
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export class InstagramEmbedAvailability {
  private readonly cache = new Map<string, { result: EmbedCheck; expiresAt: number }>();

  async check(value: string): Promise<EmbedCheck> {
    const embedUrl = parseInstagramEmbedUrl(value);
    const cached = this.cache.get(embedUrl);
    if (cached && cached.expiresAt > Date.now()) return cached.result;

    let available: boolean | null = null;
    let reason: EmbedCheck["reason"] = "unreachable";
    try {
      const response = await fetch(embedUrl, {
        headers: {
          "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
          "User-Agent": "Mozilla/5.0 (compatible; ViralTimesEmbedCheck/1.0; +https://viraltimes.vercel.app)",
        },
        signal: AbortSignal.timeout(6_000),
      });
      const html = response.ok ? await readLimitedText(response) : "";
      const isBroken = html.includes("EmbedBrokenMedia")
        || html.includes("The link to this photo or video may be broken")
        || html.includes("사진 또는 동영상의 링크가 잘못되었거나 게시물이 삭제되었습니다");
      const hasEmbeddedMedia = /EmbeddedMedia|shortcode_media|video_url|display_url/.test(html);
      if (response.ok && isBroken) {
        available = false;
        reason = "removed";
      } else if (response.ok && hasEmbeddedMedia) {
        available = true;
        reason = undefined;
      } else {
        // Meta가 데이터센터 IP를 제한하거나 응답 형식을 바꾼 경우에는 게시물 삭제로
        // 단정하지 않는다. 브라우저에서 실제 임베드를 먼저 시도하게 둔다.
        available = null;
        reason = response.ok ? "unrecognized" : "unreachable";
      }
    } catch {
      available = null;
      reason = "unreachable";
    }

    const result = { available, checkedAt: new Date().toISOString(), ...(reason ? { reason } : {}) };
    this.cache.set(embedUrl, { result, expiresAt: Date.now() + cacheTtlMs });
    if (this.cache.size > maxCacheEntries) {
      const oldest = this.cache.keys().next().value;
      if (oldest) this.cache.delete(oldest);
    }
    return result;
  }
}
