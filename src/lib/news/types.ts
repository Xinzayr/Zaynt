export interface NewsItem {
  id: string
  title: string
  excerpt?: string
  content?: string
  image?: string
  url?: string
  source: 'static' | 'facebook'
  publishedAt?: string
  author?: string
  tags: string[]
}

export interface NewsProvider {
  getNews: (limit?: number) => Promise<NewsItem[]>
  getNewsById: (id: string) => Promise<NewsItem | null>
}

export interface FacebookPost {
  id: string
  message?: string
  story?: string
  created_time: string
  full_picture?: string
  attachments?: {
    data: Array<{
      media?: {
        image: {
          src: string
          width: number
          height: number
        }
      }
      url?: string
      title?: string
      description?: string
    }>
  }
  permalink_url?: string
}