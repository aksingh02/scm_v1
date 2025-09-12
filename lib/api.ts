const API_BASE_URL = "https://media-api.sylphcorps.com/api"
const API_TIMEOUT = 8000

// LRU Cache implementation
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

    // Check if item has expired
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
    // Remove oldest item if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, { value, timestamp: Date.now() })
  }

  clear(): void {
    this.cache.clear()
  }
}

// Create cache instance
const apiCache = new LRUCache<any>(50, 300000) // 50 items, 5 minutes TTL

// Enhanced fetch with timeout, retry, and caching
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  // Check cache first
  const cacheKey = `${url}_${JSON.stringify(options)}`
  const cachedResponse = apiCache.get(cacheKey)
  if (cachedResponse) {
    return new Response(JSON.stringify(cachedResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Cache successful responses
    apiCache.set(cacheKey, data)

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: response.headers,
    })
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout")
    }
    throw error
  }
}

// API Response types
export interface ApiResponse<T> {
  content: T
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export interface ApiArticle {
  id: number
  title: string
  slug: string
  description: string
  excerpt: string
  content: string
  imageUrl: string
  tags: string[]
  publishedAt: string
  featured: boolean
  viewCount?: number
  likeCount?: number
}

// Fetch articles with pagination
export async function fetchArticles(page = 0, size = 20): Promise<ApiResponse<ApiArticle[]>> {
  try {
    const url = `${API_BASE_URL}/articles?page=${page}&size=${size}&sort=publishedAt,desc`
    const response = await fetchWithTimeout(url)
    const data = await response.json()

    return {
      content: Array.isArray(data.content) ? data.content : [],
      totalPages: data.totalPages || 0,
      totalElements: data.totalElements || 0,
      size: data.size || size,
      number: data.number || page,
    }
  } catch (error) {
    console.error("Error fetching articles:", error)
    return {
      content: [],
      totalPages: 0,
      totalElements: 0,
      size,
      number: page,
    }
  }
}

// Fetch single article by slug
export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    const url = `${API_BASE_URL}/articles/slug/${encodeURIComponent(slug)}`
    const response = await fetchWithTimeout(url)
    const data = await response.json()
    return data || null
  } catch (error) {
    console.error(`Error fetching article by slug ${slug}:`, error)
    return null
  }
}

// Fetch articles by category
export async function fetchArticlesByCategory(
  category: string,
  page = 0,
  size = 20,
): Promise<ApiResponse<ApiArticle[]>> {
  try {
    const url = `${API_BASE_URL}/articles/category/${encodeURIComponent(category)}?page=${page}&size=${size}`
    const response = await fetchWithTimeout(url)
    const data = await response.json()

    return {
      content: Array.isArray(data.content) ? data.content : [],
      totalPages: data.totalPages || 0,
      totalElements: data.totalElements || 0,
      size: data.size || size,
      number: data.number || page,
    }
  } catch (error) {
    console.error(`Error fetching articles by category ${category}:`, error)
    return {
      content: [],
      totalPages: 0,
      totalElements: 0,
      size,
      number: page,
    }
  }
}

// Search articles
export async function searchArticles(query: string): Promise<ApiArticle[]> {
  try {
    const url = `${API_BASE_URL}/articles/search?q=${encodeURIComponent(query)}`
    const response = await fetchWithTimeout(url)
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error(`Error searching articles with query "${query}":`, error)
    return []
  }
}

// Fetch categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const url = `${API_BASE_URL}/categories`
    const response = await fetchWithTimeout(url)
    const data = await response.json()
    return Array.isArray(data)
      ? data
      : ["Technology", "Business", "Health", "Science", "Sports", "Entertainment", "Politics", "World"]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return ["Technology", "Business", "Health", "Science", "Sports", "Entertainment", "Politics", "World"]
  }
}

// Fetch featured articles
export async function fetchFeaturedArticles(): Promise<ApiArticle[]> {
  try {
    const url = `${API_BASE_URL}/articles/featured`
    const response = await fetchWithTimeout(url)
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return []
  }
}

// Clear cache (useful for development)
export function clearApiCache(): void {
  apiCache.clear()
}

// Health check
export async function healthCheck(): Promise<boolean> {
  try {
    const url = `${API_BASE_URL}/health`
    const response = await fetchWithTimeout(url)
    return response.status === 200
  } catch (error) {
    console.error("API health check failed:", error)
    return false
  }
}
