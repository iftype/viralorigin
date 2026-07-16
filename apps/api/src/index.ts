import cors from "@fastify/cors";
import Fastify from "fastify";

const app = Fastify({ logger: true });

const host = process.env.HOST ?? "127.0.0.1";
const port = Number(process.env.PORT ?? 4000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000";

await app.register(cors, {
  origin:
    corsOrigin === "*"
      ? true
      : corsOrigin.split(",").map((origin) => origin.trim()),
});

app.get("/health", async () => ({
  service: "origin-api",
  status: "ok",
  version: process.env.APP_VERSION ?? "development",
}));

app.get("/api/v1/health", async () => ({
  service: "origin-api",
  status: "ok",
  version: process.env.APP_VERSION ?? "development",
}));

const stop = async (signal: string) => {
  app.log.info({ signal }, "shutting down");
  await app.close();
  process.exit(0);
};

process.on("SIGINT", () => void stop("SIGINT"));
process.on("SIGTERM", () => void stop("SIGTERM"));

await app.listen({ host, port });
