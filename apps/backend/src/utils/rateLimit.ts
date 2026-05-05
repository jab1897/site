import { env } from "../config/env.js";

interface InMemoryEntry {
  count: number;
  resetAt: number;
}

// In-process fallback when Upstash is not configured
const inMemoryStore = new Map<string, InMemoryEntry>();

function inMemoryCheck(key: string, maxReq: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = inMemoryStore.get(key);
  if (!entry || entry.resetAt < now) {
    inMemoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  entry.count++;
  return entry.count <= maxReq;
}

async function redisCheck(key: string, maxReq: number, windowSec: number): Promise<boolean> {
  const base = env.upstashRedisUrl.replace(/\/$/, "");
  const token = env.upstashRedisToken;

  const incrRes = await fetch(`${base}/incr/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!incrRes.ok) throw new Error(`Upstash INCR failed: ${incrRes.status}`);
  const { result: count } = (await incrRes.json()) as { result: number };

  if (count === 1) {
    // Set expiry only on the first increment to avoid resetting the window
    await fetch(`${base}/expire/${encodeURIComponent(key)}/${windowSec}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  return count <= maxReq;
}

/**
 * Returns true if the request is allowed, false if it exceeds the limit.
 * Falls back to an in-process Map when Upstash is not configured.
 */
export async function checkRateLimit(
  ip: string,
  route: string,
  maxReq = 5,
  windowSec = 3600,
): Promise<boolean> {
  const key = `rl:${route}:${ip}`;

  if (env.upstashRedisUrl && env.upstashRedisToken) {
    try {
      return await redisCheck(key, maxReq, windowSec);
    } catch {
      // Degrade gracefully to in-memory on Redis failure
    }
  }

  return inMemoryCheck(key, maxReq, windowSec * 1000);
}
