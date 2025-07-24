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

const API_BASE_URL = "http://localhost:8085/api"

// Fetch articles with pagination
export async function fetchArticles(
  page = 0,
  size = 20,
  sortBy = "publishedAt",
  sortDir = "desc",
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/articles/public?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
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
    const response = await fetch(`${API_BASE_URL}/articles/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Fetch article by slug
export async function fetchArticleBySlug(slug: string): Promise<ApiArticle | null> {
  try {
    const response = await fetchArticles(0, 100) // Get more articles to find by slug
    const article = response.content.find((article) => article.slug === slug)
    return article || null
  } catch (error) {
    console.error("Error fetching article by slug:", error)
    return null
  }
}

// Fetch articles by category
export async function fetchArticlesByCategory(category: string, page = 0, size = 20): Promise<ApiResponse> {
  try {
    // For now, fetch all articles and filter by category
    // In a real implementation, the API should support category filtering
    const response = await fetchArticles(page, size)
    const filteredContent = response.content.filter((article) =>
      article.tags.some((tag) => tag.toLowerCase() === category.toLowerCase()),
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
    const response = await fetchArticles(0, 100) // Get more articles for search
    const filteredArticles = response.content.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    )

    return filteredArticles
  } catch (error) {
    console.error("Error searching articles:", error)
    return []
  }
}
