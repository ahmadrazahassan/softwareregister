import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { headers } from "next/headers";

/**
 * POPIA: a raw IP address is personal information, so it is never stored. We
 * keep a salted SHA-256 instead, which lets us rate limit and spot abuse
 * without being able to read an address back. If IP_HASH_SALT is missing we use
 * a salt that lives only as long as the process, which is safer than none.
 */
const FALLBACK_SALT = randomBytes(16).toString("hex");

export async function visitorHash(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || h.get("x-real-ip") || "unknown";
  const salt = process.env.IP_HASH_SALT && process.env.IP_HASH_SALT !== "change-me-to-a-long-random-string" ? process.env.IP_HASH_SALT : FALLBACK_SALT;
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

const buckets = new Map<string, number[]>();

/**
 * A sliding window limiter held in memory. It is per server instance, so on a
 * serverless host it is a speed bump and not a wall. The honeypot and the
 * database constraints do the rest.
 */
export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return true;
  }
  recent.push(now);
  buckets.set(key, recent);
  return false;
}
