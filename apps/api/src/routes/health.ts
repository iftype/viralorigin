import type { FastifyInstance } from "fastify";

export function registerHealthRoutes(app: FastifyInstance) {
  const response = () => ({
    service: "origin-api",
    status: "ok",
    version: process.env.APP_VERSION ?? "development",
  });
  app.get("/health", response);
  app.get("/api/v1/health", response);
}
