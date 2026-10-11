import { serverEnv } from '@/config/server-env'
import { siteConfig } from '@/config/site'
import { facebookProvider } from '@/lib/news/facebook'
import type { NewsItem } from '@/lib/news/types'

export const dynamic = 'force-dynamic'

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function renderItem(item: NewsItem): string {
  const fields = [
    `<title>${escapeXml(item.title)}</title>`,
    item.url ? `<link>${escapeXml(item.url)}</link>` : '',
    `<guid isPermaLink="false">${escapeXml(item.id)}</guid>`,
    item.excerpt ? `<description>${escapeXml(item.excerpt)}</description>` : '',
    item.publishedAt ? `<pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>` : '',
  ]
  return `<item>${fields.join('')}</item>`
}

function xmlResponse(content: string, status = 200): Response {
  return new Response(content, {
    status,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

export async function GET(): Promise<Response> {
  if (serverEnv.NEWS_SOURCE !== 'facebook' || !serverEnv.FACEBOOK_PAGE_ID || !serverEnv.FACEBOOK_PAGE_ACCESS_TOKEN) {
    const unavailable = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0"><channel>',
      `<title>${escapeXml(siteConfig.name)} — Facebook RSS</title>`,
      `<link>${escapeXml(siteConfig.facebookPageUrl ?? siteConfig.url)}</link>`,
      '<description>El feed requiere NEWS_SOURCE=facebook y credenciales Graph API de una página autorizada.</description>',
      '</channel></rss>',
    ].join('')
    return xmlResponse(unavailable, 503)
  }

  try {
    const items = await facebookProvider.getNews(20)
    const feed = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0"><channel>',
      `<title>${escapeXml(siteConfig.name)} — Facebook</title>`,
      `<link>${escapeXml(siteConfig.facebookPageUrl ?? siteConfig.url)}</link>`,
      `<description>Novedades públicas de ZAYNT publicadas en Facebook.</description>`,
      `<language>es-EC</language>`,
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      ...items.map(renderItem),
      '</channel></rss>',
    ].join('')
    return xmlResponse(feed)
  } catch (error) {
    console.error('[RSS Feed] Could not load Facebook posts.', error)
    return xmlResponse(
      '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>ZAYNT RSS temporalmente no disponible</title><description>No fue posible consultar Facebook. Revisa los permisos y credenciales de Meta Graph API.</description></channel></rss>',
      502
    )
  }
}
