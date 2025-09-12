const API_BASE_URL = "https://media-api.sylphcorps.com/api"
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const REQUEST_TIMEOUT = 8000 // 8 seconds

interface CacheEntry<T> {
  data: T
  timestamp: number
  compressed?: boolean
}

class LRUCache<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private maxSize: number

  constructor(maxSize = 100) {
    this.maxSize = maxSize
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > CACHE_TTL) {
      this.cache.delete(key)
      return null
    }

    // Move to end (most recently used)
    this.cache.delete(key)
    this.cache.set(key, entry)
    return entry.data
  }

  set(key: string, data: T, compressed = false): void {
    if (this.cache.size >= this.maxSize) {
      // Remove least recently used
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      compressed,
    })
  }

  clear(): void {
    this.cache.clear()
  }
}

const cache = new LRUCache<any>(50)

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
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

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cacheKey = `${endpoint}-${JSON.stringify(options)}`

  // Check cache first
  const cachedData = cache.get(cacheKey)
  if (cachedData) {
    return cachedData
  }

  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      next: { revalidate: 300 }, // 5 minutes
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Cache the response
    cache.set(cacheKey, data, response.headers.get("content-encoding") === "gzip")

    return data
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error)

    // Return fallback data if available
    const fallbackData = getFallbackData(endpoint)
    if (fallbackData) {
      return fallbackData
    }

    throw error
  }
}

function getFallbackData(endpoint: string): any {
  // Provide fallback data for critical endpoints
  if (endpoint === "/articles") {
    return []
  }
  return null
}

export async function getArticles(): Promise<any[]> {
  try {
    return await apiRequest("/articles")
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<any> {
  try {
    return await apiRequest(`/articles/${slug}`)
  } catch (error) {
    console.error(`Failed to fetch article ${slug}:`, error)
    throw error
  }
}

export async function getArticlesByCategory(category: string): Promise<any[]> {
  try {
    return await apiRequest(`/articles/category/${category}`)
  } catch (error) {
    console.error(`Failed to fetch articles for category ${category}:`, error)
    return []
  }
}

export async function searchArticles(query: string): Promise<any[]> {
  if (!query.trim()) return []

  try {
    return await apiRequest(`/articles/search?q=${encodeURIComponent(query)}`)
  } catch (error) {
    console.error(`Failed to search articles for query ${query}:`, error)
    return []
  }
}

// Clear cache function for manual cache invalidation
export function clearApiCache(): void {
  cache.clear()
}
