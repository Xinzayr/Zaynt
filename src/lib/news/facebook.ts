import { NewsProvider, NewsItem, FacebookPost } from './types'
import { serverEnv } from '@/config/server-env'
import { isAllowedImageHost } from '@/lib/security'

const GRAPH_API_BASE = 'https://graph.facebook.com'
const API_VERSION = serverEnv.FACEBOOK_GRAPH_API_VERSION || 'v20.0'
const PAGE_ID = serverEnv.FACEBOOK_PAGE_ID
const ACCESS_TOKEN = serverEnv.FACEBOOK_PAGE_ACCESS_TOKEN

function normalizePost(post: FacebookPost): NewsItem {
  const text = post.message || post.story || ''
  const excerpt = text.slice(0, 300).trim()

  let image: string | undefined
  if (post.full_picture && isAllowedImageHost(post.full_picture)) {
    image = post.full_picture
  } else if (post.attachments?.data[0]?.media?.image?.src && isAllowedImageHost(post.attachments.data[0].media.image.src)) {
    image = post.attachments.data[0].media.image.src
  }

  return {
    id: `fb-${post.id}`,
    title: text.split('\n')[0].slice(0, 100) || 'Publicación de Facebook',
    excerpt,
    content: text,
    image,
    url: post.permalink_url,
    source: 'facebook',
    publishedAt: post.created_time,
    author: PAGE_ID ? `Página ${PAGE_ID}` : 'Facebook',
    tags: ['facebook'],
  }
}

async function fetchFacebookPosts(limit = 10): Promise<FacebookPost[]> {
  if (!PAGE_ID || !ACCESS_TOKEN) {
    throw new Error('Facebook credentials not configured')
  }

  const fields = [
    'id',
    'message',
    'story',
    'created_time',
    'full_picture',
    'permalink_url',
    'attachments{media,url,title,description}',
  ].join(',')

  const url = `${GRAPH_API_BASE}/${API_VERSION}/${PAGE_ID}/posts?fields=${fields}&limit=${limit}&access_token=${ACCESS_TOKEN}`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Facebook API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.data || !Array.isArray(data.data)) {
      return []
    }

    return data.data.filter((post: FacebookPost) => {
      if (post.full_picture && !isAllowedImageHost(post.full_picture)) return false
      if (post.attachments?.data[0]?.media?.image?.src && !isAllowedImageHost(post.attachments.data[0].media.image.src)) return false
      return true
    })
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Facebook API timeout', { cause: error })
    }
    throw new Error('Facebook API request failed', { cause: error })
  }
}

export const facebookProvider: NewsProvider = {
  async getNews(limit = 10): Promise<NewsItem[]> {
    try {
      const posts = await fetchFacebookPosts(limit)
      return posts.map(normalizePost)
    } catch (error) {
      console.error('[Facebook Provider] Error fetching posts:', error)
      throw error
    }
  },

  async getNewsById(id: string): Promise<NewsItem | null> {
    if (!id.startsWith('fb-')) return null
    const fbId = id.slice(3)

    try {
      const fields = [
        'id',
        'message',
        'story',
        'created_time',
        'full_picture',
        'permalink_url',
        'attachments{media,url,title,description}',
      ].join(',')

      const url = `${GRAPH_API_BASE}/${API_VERSION}/${fbId}?fields=${fields}&access_token=${ACCESS_TOKEN}`

      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) return null

      const post = await response.json()
      return normalizePost(post)
    } catch (error) {
      console.error('[Facebook Provider] Error fetching post:', error)
      throw error
    }
  },
}