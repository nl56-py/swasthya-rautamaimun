// In-memory store for rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

/**
 * Checks if the request from a specific IP exceeds the limit.
 * @param ip Client IP address
 * @param limit Maximum number of allowed requests in the window
 * @param windowMs Time window in milliseconds
 */
export function checkRateLimit(ip: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // If no record or the window has passed, reset the count
  if (!record || now > record.resetTime) {
    const resetTime = now + windowMs;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return { success: true, remaining: limit - 1, reset: resetTime };
  }

  // If limit reached, deny access
  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetTime };
  }

  // Increment the request count
  record.count += 1;
  return { success: true, remaining: limit - record.count, reset: record.resetTime };
}
