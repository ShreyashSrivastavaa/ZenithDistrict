/**
 * Lightweight sliding-window rate limiter for sensitive endpoints.
 * Operates in-memory for serverless/edge environments with automatic stale-entry pruning.
 */

interface RateLimitRecord {
  timestamps: number[];
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();
let lastCleanup = Date.now();

function cleanupStaleEntries(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return; // Prune at most once per minute
  lastCleanup = now;

  const threshold = now - windowMs;
  for (const [key, record] of rateLimitStore.entries()) {
    const valid = record.timestamps.filter((ts) => ts > threshold);
    if (valid.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = valid;
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 10 * 60 * 1000, maxRequests: 5 }
): RateLimitResult {
  const now = Date.now();
  cleanupStaleEntries(config.windowMs);

  const threshold = now - config.windowMs;
  let record = rateLimitStore.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter out timestamps outside the active window
  record.timestamps = record.timestamps.filter((ts) => ts > threshold);

  if (record.timestamps.length >= config.maxRequests) {
    const oldest = record.timestamps[0];
    const resetMs = oldest + config.windowMs - now;
    const resetSeconds = Math.max(1, Math.ceil(resetMs / 1000));

    return {
      allowed: false,
      limit: config.maxRequests,
      remaining: 0,
      resetSeconds,
    };
  }

  // Record this request
  record.timestamps.push(now);
  const oldest = record.timestamps[0];
  const resetMs = oldest + config.windowMs - now;
  const resetSeconds = Math.max(1, Math.ceil(resetMs / 1000));

  return {
    allowed: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - record.timestamps.length,
    resetSeconds,
  };
}

/**
 * Extract client IP safely from request headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp && firstIp.length < 64) {
      return firstIp;
    }
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp && realIp.trim().length < 64) {
    return realIp.trim();
  }

  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp && cfConnectingIp.trim().length < 64) {
    return cfConnectingIp.trim();
  }

  return '127.0.0.1';
}
