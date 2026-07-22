import type { FastifyInstance } from "fastify";

import type { InstagramEmbedAvailability } from "../instagram-embed.js";

export function registerEmbedRoutes(app: FastifyInstance, instagramEmbeds: InstagramEmbedAvailability) {
  app.get("/api/v1/embeds/instagram", async (request, reply) => {
    const { url } = request.query as { url?: unknown };
    if (typeof url !== "string" || !url.trim() || url.length > 2_000) {
      return reply.code(400).send({ error: "확인할 Instagram 링크가 필요합니다." });
    }
    try {
      const result = await instagramEmbeds.check(url.trim());
      reply.header("Cache-Control", "public, max-age=600, stale-while-revalidate=300");
      return result;
    } catch (error) {
      return reply.code(400).send({
        error: error instanceof Error ? error.message : "Instagram 링크를 확인하지 못했습니다.",
      });
    }
  });
}
