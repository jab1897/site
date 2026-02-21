import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import helmet from "helmet";
import { env } from "./config/env.js";
import { initDb } from "./db/client.js";
import { publicRoutes } from "./routes/public.js";
import { adminRoutes } from "./routes/admin.js";

const app = Fastify();

app.addHook("onRequest", async (req, reply) => {
  await new Promise<void>((resolve, reject) => helmet()(req.raw, reply.raw, (err) => (err ? reject(err) : resolve())));
});

await app.register(cors, { origin: true });
await app.register(jwt, { secret: env.jwtSecret });
await app.register(rateLimit, { max: 100, timeWindow: "1 minute" });

await app.register(publicRoutes);
await app.register(adminRoutes);

app.get("/health", async () => ({ ok: true }));
app.get("/admin", async (_, reply) => {
  return reply.type("text/html").send(`<!doctype html><html><body style="font-family:sans-serif;max-width:860px;margin:2rem auto;padding:1rem"><h1>Campaign Admin Dashboard</h1><p>Login and metrics:</p><ol><li>POST /api/admin/login with {email,passwordHash}</li><li>Use Bearer token for /api/admin/metrics, /api/admin/leads, /api/admin/leads.csv</li></ol></body></html>`);
});

await initDb();
app.listen({ port: env.port, host: "0.0.0.0" }).then(() => {
  console.log(`Backend listening on ${env.port}`);
});
