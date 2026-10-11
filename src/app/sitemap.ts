import { MetadataRoute } from 'next'
import { publicEnv } from '@/config/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = publicEnv.NEXT_PUBLIC_SITE_URL

  const routes = [
    '',
    '/servicios',
    '/novedades',
    '/tecnicos',
    '/trabajos',
    '/contacto',
    '/privacidad',
    '/terminos',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}