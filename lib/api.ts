const API_BASE_URL = "https://media-api.sylphcorps.com/api"
const API_TIMEOUT = 8000

// Simple LRU Cache implementation
class LRUCache<T> {
  private cache = new Map<string, { value: T; timestamp: number }>()
  private maxSize: number
  private ttl: number

  constructor(maxSize = 100, ttl = 300000) {
    // 5 minutes TTL
    this.maxSize = maxSize
    this.ttl = ttl
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    // Move to end (most recently used)
    this.cache.delete(key)
    this.cache.set(key, item)
    return item.value
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, { value, timestamp: Date.now() })
  }

  clear(): void {
    this.cache.clear()
  }
}

const apiCache = new LRUCache(50, 300000) // 50 items, 5 minutes TTL

export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  author: string
  publishedAt: string
  slug: string
  tags: string[]
  viewCount?: number
  likeCount?: number
  readTime?: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "public, max-age=300",
        ...options.headers,
      },
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function getArticles(category?: string, page = 1, limit = 10): Promise<ApiResponse<Article[]>> {
  const cacheKey = `articles-${category || "all"}-${page}-${limit}`
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category }),
    })

    const response = await fetchWithTimeout(`${API_BASE_URL}/articles?${params}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    apiCache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error("Error fetching articles:", error)
    // Return fallback data
    return {
      data: [],
      success: false,
      message: "Failed to fetch articles",
      pagination: { page, limit, total: 0, totalPages: 0 },
    }
  }
}

export async function getFeaturedArticles(): Promise<ApiResponse<Article[]>> {
  const cacheKey = "featured-articles"
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/articles/featured`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    apiCache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return {
      data: [],
      success: false,
      message: "Failed to fetch featured articles",
    }
  }
}

export async function getArticleBySlug(slug: string): Promise<ApiResponse<Article>> {
  const cacheKey = `article-${slug}`
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/articles/${slug}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    apiCache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error)
    return {
      data: {} as Article,
      success: false,
      message: "Failed to fetch article",
    }
  }
}

export async function searchArticles(query: string, page = 1, limit = 10): Promise<ApiResponse<Article[]>> {
  if (!query.trim()) {
    return {
      data: [],
      success: true,
      pagination: { page, limit, total: 0, totalPages: 0 },
    }
  }

  const cacheKey = `search-${query}-${page}-${limit}`
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  try {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
    })

    const response = await fetchWithTimeout(`${API_BASE_URL}/articles/search?${params}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    apiCache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error("Error searching articles:", error)
    return {
      data: [],
      success: false,
      message: "Failed to search articles",
      pagination: { page, limit, total: 0, totalPages: 0 },
    }
  }
}

// Clear cache function for manual cache invalidation
export function clearApiCache(): void {
  apiCache.clear()
}
