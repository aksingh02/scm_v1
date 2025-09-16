const API_BASE_URL = "https://api.sylphcorpsmedia.com/api"
const API_TIMEOUT = 10000 // 10s timeout

// ---- Types ----
export interface ApiArticle {
  id: number
  title: string
  description: string
  excerpt: string
  content: string
  slug: string
  imageUrl: string
  viewCount: number
  likeCount: number
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  trending: boolean
  featured: boolean
  published: boolean
}

export interface ApiResponse {
  content: ApiArticle[]
  pageable: {
    sort: { empty: boolean; sorted: boolean; unsorted: boolean }
    offset: number
    pageSize: number
    pageNumber: number
    unpaged: boolean
    paged: boolean
  }
  last: boolean
  totalElements: number
  totalPages: number
  number: number
  size: number
  sort: { empty: boolean; sorted: boolean; unsorted: boolean }
  first: boolean
  numberOfElements: number
  empty: boolean
}

// ---- LRU Cache ----
class LRUCache<T> {
  private cache = new Map<string, { value: T; timestamp: number }>()
  constructor(private maxSize = 100, private ttl = 300000) {} // 5 min

  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }
    this.cache.delete(key)
    this.cache.set(key, item)
    return item.value
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) this.cache.delete(firstKey)
    }
    this.cache.set(key, { value, timestamp: Date.now() })
  }

  clear() {
    this.cache.clear()
  }
}

const apiCache = new LRUCache<any>(50, 300000) // 50 items, 5 min TTL

// ---- Fetch with timeout & caching ----
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const cacheKey = `${url}_${JSON.stringify(options)}`
  const cached = apiCache.get(cacheKey)
  if (cached) return cached

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    apiCache.set(cacheKey, data)
    return data
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout")
    }
    throw error
  }
}

// ---- API Calls ----

// Articles (public)
export async function fetchArticles(
  page = 0,
  size = 20,
  sortBy = "publishedAt",
  sortDir = "desc"
): Promise<ApiResponse> {
  try {
    const url = `${API_BASE_URL}/articles/public?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    return await fetchWithTimeout(url)
  } catch (error) {
    console.error("Error fetching articles:", error)
    return {
      content: [],
      pageable: {
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        pageSize: size,
        pageNumber: page,
        unpaged: false,
        paged: true,
      },
      last: true,
      totalElements: 0,
      totalPages: 0,
      number: page,
      size,
      sort: { empty: true, sorted: false, unsorted: true },
      first: true,
      numberOfElements: 0,
      empty: true,
    }
  }
}

// Categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const url = `${API_BASE_URL}/articles/categories`
    const data = await fetchWithTimeout(url)
    return Array.isArray(data)
      ? data
      : ["Technology", "Business", "Health", "Science", "Sports", "Entertainment", "Politics", "World"]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return ["Technology", "Business", "Health", "Science", "Sports", "Entertainment", "Politics", "World"]
  }
}

// Single article by slug
export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    const articles = await fetchArticles(0, 100)
    return articles.content.find((a) => a.slug === slug) || null
  } catch (error) {
    console.error(`Error fetching article by slug ${slug}:`, error)
    return null
  }
}

// Articles by category (client-side filter)
export async function fetchArticlesByCategory(
  category: string,
  page = 0,
  size = 20
): Promise<ApiResponse> {
  try {
    const response = await fetchArticles(page, size)
    const filtered = response.content.filter((a) =>
      a.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
    )
    return {
      ...response,
      content: filtered,
      totalElements: filtered.length,
      numberOfElements: filtered.length,
    }
  } catch (error) {
    console.error("Error fetching articles by category:", error)
    return {
      ...await fetchArticles(page, size),
      content: [],
      totalElements: 0,
      numberOfElements: 0,
    }
  }
}

// Search articles (client-side filter)
export async function searchArticles(query: string): Promise<ApiArticle[]> {
  try {
    const response = await fetchArticles(0, 100)
    return response.content.filter(
      (a) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase()) ||
        a.content.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
    )
  } catch (error) {
    console.error("Error searching articles:", error)
    return []
  }
}

// ---- Utilities ----
export function clearApiCache() {
  apiCache.clear()
}
