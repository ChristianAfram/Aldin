/**
 * Minimal in-memory rate limiter (fixed window).
 *
 * Caveat: on Vercel the counter lives per warm serverless instance, so this
 * throttles per instance rather than globally. For a single-admin login
 * endpoint that is acceptable defense-in-depth alongside bcrypt's cost
 * factor; a database-backed counter is the upgrade path if needed.
 */

type Window = { count: number; resetAt: number }

const windows = new Map<string, Window>()
const MAX_ENTRIES = 10_000

export function checkRateLimit(key: string, limit = 5, windowMs = 15 * 60_000): boolean {
  const now = Date.now()
  const entry = windows.get(key)

  if (!entry || entry.resetAt <= now) {
    if (windows.size >= MAX_ENTRIES) {
      windows.forEach((w, k) => {
        if (w.resetAt <= now) windows.delete(k)
      })
    }
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  entry.count += 1
  return entry.count <= limit
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}
