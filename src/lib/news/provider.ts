import { NewsProvider, NewsItem } from './types'
import { news as staticNews } from '@/data/news'
import { serverEnv } from '@/config/server-env'

export const staticProvider: NewsProvider = {
  async getNews(limit = 10): Promise<NewsItem[]> {
    const sorted = [...staticNews].sort(
      (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    )
    return sorted.slice(0, limit)
  },

  async getNewsById(id: string): Promise<NewsItem | null> {
    return staticNews.find((n) => n.id === id) || null
  },
}

export async function getNewsProvider(): Promise<NewsProvider> {
  if (serverEnv.NEWS_SOURCE === 'facebook') {
    const { facebookProvider } = await import('./facebook')
    return facebookProvider
  }
  return staticProvider
}