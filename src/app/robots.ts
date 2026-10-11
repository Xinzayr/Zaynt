import { MetadataRoute } from 'next'
import { publicEnv } from '@/config/env'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = publicEnv.NEXT_PUBLIC_SITE_URL

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/privacidad'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}