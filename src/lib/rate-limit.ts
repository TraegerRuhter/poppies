// A fixed-window limiter held in memory. Serverless instances do not share
// memory, so this only slows a burst that lands on one instance; the real guard
// is a Vercel Firewall rate-limit rule on the enquiry route.

export interface RateLimiter {
  allow(key: string): boolean;
}

export function createRateLimiter({
  limit,
  windowMs,
  now = Date.now,
}: {
  limit: number;
  windowMs: number;
  now?: () => number;
}): RateLimiter {
  const windows = new Map<string, { start: number; count: number }>();

  return {
    allow(key) {
      const t = now();
      // Forget senders whose window has passed, so the map cannot grow forever.
      for (const [sender, window] of windows) {
        if (t - window.start > windowMs) windows.delete(sender);
      }

      const current = windows.get(key);
      if (!current) {
        windows.set(key, { start: t, count: 1 });
        return true;
      }
      current.count += 1;
      return current.count <= limit;
    },
  };
}
