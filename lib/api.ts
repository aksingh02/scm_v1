// API Response Types
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

export interface ApiResponse<T> {
  content: T[]
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

const API_BASE_URL = "http://localhost:8085/api"

// Fetch articles with pagination and sorting
export async function fetchArticles(
  page = 0,
  size = 20,
  sortBy = "publishedAt",
  sortDir = "desc",
): Promise<ApiResponse<ApiArticle>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/articles/public?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching articles:", error)
    throw error
  }
}

// Fetch categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/categories`)

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Fetch single article by slug
export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    // First fetch all articles and find by slug
    // In a real implementation, you'd want a dedicated endpoint for this
    const response = await fetchArticles(0, 1000) // Get a large number to find the article
    const article = response.content.find((article) => article.slug === slug)
    return article || null
  } catch (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
}

// Fetch articles by category
export async function fetchArticlesByCategory(category: string, page = 0, size = 20): Promise<ApiResponse<ApiArticle>> {
  try {
    // For now, fetch all articles and filter by category
    // In a real implementation, you'd want a dedicated endpoint for this
    const response = await fetchArticles(page, size)

    // Filter articles by category (case-insensitive)
    const filteredContent = response.content.filter(
      (article) =>
        article.tags.some((tag) => tag.toLowerCase() === category.toLowerCase()) ||
        article.title.toLowerCase().includes(category.toLowerCase()) ||
        article.description.toLowerCase().includes(category.toLowerCase()),
    )

    return {
      ...response,
      content: filteredContent,
      totalElements: filteredContent.length,
      numberOfElements: filteredContent.length,
    }
  } catch (error) {
    console.error("Error fetching articles by category:", error)
    throw error
  }
}

// Search articles
export async function searchArticles(query: string): Promise<ApiArticle[]> {
  try {
    const response = await fetchArticles(0, 1000) // Get all articles for search
    const lowercaseQuery = query.toLowerCase()

    return response.content.filter(
      (article) =>
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.description.toLowerCase().includes(lowercaseQuery) ||
        article.content.toLowerCase().includes(lowercaseQuery) ||
        article.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
  } catch (error) {
    console.error("Error searching articles:", error)
    return []
  }
}
