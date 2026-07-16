import type { FastifyInstance } from "fastify";

import type { MemeStore } from "../meme-store.js";

export function registerMemeRoutes(app: FastifyInstance, memeStore: MemeStore) {
  app.get("/api/v1/memes", async (request, reply) => {
    const query = request.query as {
      page?: string;
      pageSize?: string;
      kind?: string;
      tag?: string;
      query?: string;
    };
    const page = Math.max(1, Number.parseInt(query.page ?? "1", 10) || 1);
    const pageSize = Math.min(
      48,
      Math.max(1, Number.parseInt(query.pageSize ?? "24", 10) || 24),
    );
    const search = query.query?.trim().toLocaleLowerCase("ko") ?? "";
    const allItems = await memeStore.list();
    const filteredItems = allItems.filter((item) => {
      if (query.kind && item.kind !== query.kind) return false;
      if (query.tag && !item.tags.includes(query.tag)) return false;
      if (
        search &&
        ![item.title, ...item.aliases, ...item.tags]
          .join(" ")
          .toLocaleLowerCase("ko")
          .includes(search)
      ) {
        return false;
      }
      return true;
    });
    const total = filteredItems.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    reply.header("Cache-Control", "no-store");
    return {
      items: filteredItems.slice(start, start + pageSize),
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
      },
    };
  });

  app.get("/api/v1/memes/:slug", async (request, reply) => {
    const params = request.params as { slug: string };
    const item = await memeStore.getBySlug(params.slug.toLowerCase());
    if (!item) {
      return reply.code(404).send({ error: "사전 항목을 찾을 수 없습니다." });
    }
    reply.header("Cache-Control", "no-store");
    return { item };
  });
}
