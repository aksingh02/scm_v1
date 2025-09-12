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
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
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
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

//local development URL
// const API_BASE_URL = "http://localhost:8081/api"

//production-ready URL
const API_BASE_URL = "https://media-api.sylphcorps.com/api"

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

function getCachedData(key: string) {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

function setCachedData(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() })
}

// Fetch articles with pagination
export async function fetchArticles(
  page = 0,
  size = 20,
  sortBy = "publishedAt",
  sortDir = "desc",
): Promise<ApiResponse> {
  const cacheKey = `articles-${page}-${size}-${sortBy}-${sortDir}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(
      `${API_BASE_URL}/articles/public?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Error fetching articles:", error)
    throw error
  }
}

// Fetch categories
export async function fetchCategories(): Promise<string[]> {
  const cacheKey = "categories"
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(`${API_BASE_URL}/articles/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 600 }, // Cache for 10 minutes
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    setCachedData(cacheKey, data)
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Fetch article by slug
export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  const cacheKey = `article-${slug}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const response = await fetchArticles(0, 100) // Get more articles to find by slug
    const article = response.content.find((article) => article.slug === slug)
    const result = article || null
    setCachedData(cacheKey, result)
    return result
  } catch (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
}

// Fetch articles by category
export async function fetchArticlesByCategory(category: string, page = 0, size = 20): Promise<ApiResponse> {
  const cacheKey = `category-${category}-${page}-${size}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    // For now, fetch all articles and filter by category
    // In a real implementation, the API should support category filtering
    const response = await fetchArticles(page, size)
    const filteredContent = response.content.filter((article) =>
      article.tags.some((tag) => tag.toLowerCase() === category.toLowerCase()),
    )

    const result = {
      ...response,
      content: filteredContent,
      totalElements: filteredContent.length,
      numberOfElements: filteredContent.length,
    }

    setCachedData(cacheKey, result)
    return result
  } catch (error) {
    console.error("Error fetching articles by category:", error)
    throw error
  }
}

// Search articles
export async function searchArticles(query: string): Promise<ApiArticle[]> {
  const cacheKey = `search-${query}`
  const cached = getCachedData(cacheKey)
  if (cached) return cached

  try {
    const response = await fetchArticles(0, 100) // Get more articles for search
    const filteredArticles = response.content.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    )

    setCachedData(cacheKey, filteredArticles)
    return filteredArticles
  } catch (error) {
    console.error("Error searching articles:", error)
    return []
  }
}
