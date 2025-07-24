import {
  type ApiArticle,
  fetchArticles,
  fetchCategories,
  fetchArticleBySlug,
  fetchArticlesByCategory,
  searchArticles,
} from "./api"

export interface Article {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  image: string
  category: string
  author: {
    name: string
    bio: string
    avatar: string
  }
  publishedAt: string
  readTime: string
  tags: string[]
  featured: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
}

// Transform API article to our Article interface
function transformApiArticle(apiArticle: ApiArticle): Article {
  return {
    id: apiArticle.id.toString(),
    title: apiArticle.title,
    slug: apiArticle.slug,
    summary: apiArticle.excerpt || apiArticle.description,
    content: apiArticle.content,
    image: apiArticle.imageUrl,
    category: apiArticle.tags[0] || "General", // Use first tag as category
    author: {
      name: "Staff Writer", // Default author since API doesn't provide this
      bio: "Professional journalist",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    publishedAt: apiArticle.publishedAt,
    readTime: calculateReadTime(apiArticle.content),
    tags: apiArticle.tags,
    featured: apiArticle.featured,
  }
}

// Calculate read time based on content length
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(" ").length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Transform categories array to Category objects
function transformCategories(categories: string[]): Category[] {
  return categories.map((category, index) => ({
    id: (index + 1).toString(),
    name: category,
    description: `Latest ${category.toLowerCase()} news and updates`,
    slug: category.toLowerCase(),
  }))
}

// Get all articles with pagination
export async function getAllArticles(
  page = 0,
  size = 20,
): Promise<{
  articles: Article[]
  totalPages: number
  totalElements: number
  currentPage: number
}> {
  try {
    const response = await fetchArticles(page, size)
    const articles = response.content.map(transformApiArticle)

    return {
      articles,
      totalPages: response.totalPages,
      totalElements: response.totalElements,
      currentPage: response.number,
    }
  } catch (error) {
    console.error("Error getting all articles:", error)
    return {
      articles: [],
      totalPages: 0,
      totalElements: 0,
      currentPage: 0,
    }
  }
}

// Get featured article
export async function getFeaturedArticle(): Promise<Article | null> {
  try {
    const response = await fetchArticles(0, 50) // Get first 50 articles to find featured
    const featuredApiArticle = response.content.find((article) => article.featured)

    if (featuredApiArticle) {
      return transformApiArticle(featuredApiArticle)
    }

    // If no featured article, return the first one
    if (response.content.length > 0) {
      return transformApiArticle(response.content[0])
    }

    return null
  } catch (error) {
    console.error("Error getting featured article:", error)
    return null
  }
}

// Get recent articles (excluding featured)
export async function getRecentArticles(limit = 6): Promise<Article[]> {
  try {
    const response = await fetchArticles(0, limit + 10) // Get extra to filter out featured
    const articles = response.content
      .filter((article) => !article.featured)
      .slice(0, limit)
      .map(transformApiArticle)

    return articles
  } catch (error) {
    console.error("Error getting recent articles:", error)
    return []
  }
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const apiArticle = await fetchArticleBySlug(slug)
    return apiArticle ? transformApiArticle(apiArticle) : null
  } catch (error) {
    console.error("Error getting article by slug:", error)
    return null
  }
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string, limit?: number): Promise<Article[]> {
  try {
    const response = await fetchArticlesByCategory(categorySlug, 0, limit || 50)
    return response.content.map(transformApiArticle)
  } catch (error) {
    console.error("Error getting articles by category:", error)
    return []
  }
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categories = await fetchCategories()
    return transformCategories(categories)
  } catch (error) {
    console.error("Error getting categories:", error)
    return []
  }
}

// Get category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await getAllCategories()
    return categories.find((category) => category.slug === slug) || null
  } catch (error) {
    console.error("Error getting category by slug:", error)
    return null
  }
}

// Search articles
export async function searchArticlesData(query: string): Promise<Article[]> {
  try {
    const apiArticles = await searchArticles(query)
    return apiArticles.map(transformApiArticle)
  } catch (error) {
    console.error("Error searching articles:", error)
    return []
  }
}

// Get related articles
export async function getRelatedArticles(currentArticle: Article, limit = 3): Promise<Article[]> {
  try {
    const response = await fetchArticles(0, 50)
    const relatedArticles = response.content
      .filter(
        (article) =>
          article.id.toString() !== currentArticle.id &&
          (article.tags.some((tag) => currentArticle.tags.includes(tag)) ||
            article.tags.includes(currentArticle.category)),
      )
      .slice(0, limit)
      .map(transformApiArticle)

    return relatedArticles
  } catch (error) {
    console.error("Error getting related articles:", error)
    return []
  }
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Calculate time ago
export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours} hours ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} days ago`

  return formatDate(dateString)
}
