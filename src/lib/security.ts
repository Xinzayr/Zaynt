import { timingSafeEqual } from 'crypto'

export function verifyCronSecret(provided: string | null, expected: string): boolean {
  if (!provided || !expected) return false
  if (provided.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected))
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null
  const [scheme, token] = authHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  return token
}

export const ALLOWED_FACEBOOK_HOSTS = [
  'graph.facebook.com',
  'graph.instagram.com',
]

export function isAllowedFacebookHost(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ALLOWED_FACEBOOK_HOSTS.some((host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`))
  } catch {
    return false
  }
}

export function isAllowedImageHost(url: string): boolean {
  try {
    const parsed = new URL(url)
    const allowedHosts = [
      'scontent*.fbcdn.net',
      'platform-lookaside.fbsbx.com',
      'instagram.f*.fbcdn.net',
    ]
    return allowedHosts.some((pattern) => {
      const regex = new RegExp(`^${pattern.replace(/\*/g, '.*')}$`)
      return regex.test(parsed.hostname)
    })
  } catch {
    return false
  }
}

export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
} as const