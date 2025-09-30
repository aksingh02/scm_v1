import { env } from "./env"

// ---- Config ----
export const API_BASE_URL = env.baseUrl
const API_TIMEOUT = env.apiTimeOut
const API_KEY = env.apiKey

// ---- Updated Types to match backend API ----
export interface ApiAuthor {
  id: number
  username: string
  email: string
  fullName: string
  bio: string
  role: string
  createdAt: string
  updatedAt: string
  active: boolean
}

export interface ApiCategory {
  id: number
  name: string
  description: string
  slug: string
  color: string
  icon: string | null
  articleCount: number
  createdAt?: string
  updatedAt?: string
  active?: boolean
}

export interface ApiArticle {
  id: number
  title: string
  excerpt: string
  content: string
  slug: string
  imageUrl: string
  status: string
  viewCount: number
  likeCount: number
  tags: string[]
  author: ApiAuthor
  categories: ApiCategory[]
  createdAt: string
  updatedAt: string
  publishedAt: string
  featured: boolean
  trending: boolean
  published: boolean
  inEditorialWorkflow: boolean
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
  constructor(
    private maxSize = 100,
    private ttl = 300000,
  ) {} // 5 min

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
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<any> {
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
        "X-API-Key": API_KEY,
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

// Get all articles with pagination
export async function fetchArticles(
  page = 0,
  size = 20,
  sortBy = "publishedAt",
  sortDir = "desc",
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

// Get featured articles
export async function fetchFeaturedArticles(): Promise<ApiResponse> {
  try {
    const url = `${API_BASE_URL}/articles/featured`
    return await fetchWithTimeout(url)
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return {
      content: [],
      pageable: {
        sort: { empty: true, sorted: false, unsorted: true },
        offset: 0,
        pageSize: 10,
        pageNumber: 0,
        unpaged: false,
        paged: true,
      },
      last: true,
      totalElements: 0,
      totalPages: 0,
      number: 0,
      size: 10,
      sort: { empty: true, sorted: false, unsorted: true },
      first: true,
      numberOfElements: 0,
      empty: true,
    }
  }
}

// Get categories with full details
export async function fetchCategoriesWithDetails(): Promise<ApiCategory[]> {
  try {
    const url = `${API_BASE_URL}/articles/category`
    const data = await fetchWithTimeout(url)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching categories with details:", error)
    return []
  }
}

// Get simple category names (fallback)
export async function fetchCategories(): Promise<string[]> {
  try {
    const url = `${API_BASE_URL}/articles/categories`
    const data = await fetchWithTimeout(url)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Search articles using the dedicated search endpoint
export async function searchArticles(query: string, page = 0, size = 20): Promise<ApiResponse> {
  try {
    const url = `${API_BASE_URL}/articles/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`
    return await fetchWithTimeout(url)
  } catch (error) {
    console.error("Error searching articles:", error)
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

// Get articles by category slug - filter from all articles
export async function fetchArticlesByCategory(categorySlug: string, page = 0, size = 20): Promise<ApiResponse> {
  try {
    // Get all articles and filter by category
    const response = await fetchArticles(0, 100) // Get more articles to filter
    const filtered = response.content.filter((article) =>
      article.categories.some((category) => category.slug === categorySlug),
    )

    // Apply pagination to filtered results
    const startIndex = page * size
    const endIndex = startIndex + size
    const paginatedFiltered = filtered.slice(startIndex, endIndex)

    return {
      ...response,
      content: paginatedFiltered,
      totalElements: filtered.length,
      numberOfElements: paginatedFiltered.length,
      totalPages: Math.ceil(filtered.length / size),
      last: endIndex >= filtered.length,
      first: page === 0,
      number: page,
      size,
    }
  } catch (error) {
    console.error("Error fetching articles by category:", error)
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

// Get single article by slug
export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    const articles = await fetchArticles(0, 100)
    return articles.content.find((a) => a.slug === slug) || null
  } catch (error) {
    console.error(`Error fetching article by slug ${slug}:`, error)
    return null
  }
}

// ---- Utilities ----
export function clearApiCache() {
  apiCache.clear()
}
