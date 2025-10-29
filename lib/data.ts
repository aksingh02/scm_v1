import {
  fetchArticles,
  fetchFeaturedArticles,
  fetchCategoriesWithDetails,
  fetchCategories,
  fetchArticleBySlug,
  searchArticles,
  fetchArticlesByCategoryDirect,
  type ApiArticle,
  type ApiCategory,
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
  trending: boolean
  viewCount: number
  likeCount: number
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  color?: string
  icon?: string | null
  articleCount?: number
}

// Transform API article to our Article interface
function transformApiArticle(apiArticle: ApiArticle): Article {
  return {
    id: apiArticle.id.toString(),
    title: apiArticle.title,
    slug: apiArticle.slug,
    summary: apiArticle.excerpt,
    content: apiArticle.content,
    image: apiArticle.imageUrl,
    category: apiArticle.categories[0]?.name || "General",
    author: {
      name: apiArticle.author.fullName,
      bio: apiArticle.author.bio,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    publishedAt: apiArticle.publishedAt,
    readTime: calculateReadTime(apiArticle.content),
    tags: apiArticle.tags,
    featured: apiArticle.featured,
    trending: apiArticle.trending,
    viewCount: apiArticle.viewCount,
    likeCount: apiArticle.likeCount,
  }
}

// Transform API category to our Category interface
function transformApiCategory(apiCategory: ApiCategory): Category {
  return {
    id: apiCategory.id.toString(),
    name: apiCategory.name,
    description: apiCategory.description,
    slug: apiCategory.slug,
    color: apiCategory.color,
    icon: apiCategory.icon,
    articleCount: apiCategory.articleCount,
  }
}

// Calculate read time based on content length
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(" ").length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

// Transform simple categories array to Category objects
function transformSimpleCategories(categories: string[]): Category[] {
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

// Get featured article (first from featured articles)
export async function getFeaturedArticle(): Promise<Article | null> {
  try {
    const response = await fetchFeaturedArticles()

    if (response.content.length > 0) {
      return transformApiArticle(response.content[0])
    }

    // Fallback to first article from regular articles
    const regularResponse = await fetchArticles(0, 1)
    if (regularResponse.content.length > 0) {
      return transformApiArticle(regularResponse.content[0])
    }

    return null
  } catch (error) {
    console.error("Error getting featured article:", error)
    return null
  }
}

// Get recent articles (excluding featured ones)
export async function getRecentArticles(limit = 6): Promise<Article[]> {
  try {
    const [articlesResponse, featuredResponse] = await Promise.all([
      fetchArticles(0, limit + 10),
      fetchFeaturedArticles(),
    ])

    const featuredIds = new Set(featuredResponse.content.map((article) => article.id))

    const articles = articlesResponse.content
      .filter((article) => !featuredIds.has(article.id))
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

// Get articles by category using proper category filtering
export async function getArticlesByCategory(categorySlug: string, limit?: number): Promise<Article[]> {
  try {
    const response = await fetchArticlesByCategoryDirect(categorySlug, 0, limit || 50)
    return response.content.map(transformApiArticle)
  } catch (error) {
    console.error("Error getting articles by category:", error)
    return []
  }
}

// Get all categories (try detailed first, fallback to simple)
export async function getAllCategories(): Promise<Category[]> {
  try {
    // Try to get detailed categories first
    const detailedCategories = await fetchCategoriesWithDetails()
    if (detailedCategories.length > 0) {
      return detailedCategories.map(transformApiCategory)
    }

    // Fallback to simple categories
    const simpleCategories = await fetchCategories()
    return transformSimpleCategories(simpleCategories)
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

// Search articles using the dedicated search API
export async function searchArticlesData(query: string): Promise<Article[]> {
  try {
    const response = await searchArticles(query, 0, 50)
    return response.content.map(transformApiArticle)
  } catch (error) {
    console.error("Error searching articles:", error)
    return []
  }
}

// Get related articles based on categories and tags
export async function getRelatedArticles(currentArticle: Article, limit = 3): Promise<Article[]> {
  try {
    const response = await fetchArticles(0, 50)
    const relatedArticles = response.content
      .filter((article) => {
        if (article.id.toString() === currentArticle.id) return false

        // Check if articles share categories or tags
        const hasSharedCategory = article.categories.some((cat) => cat.name === currentArticle.category)
        const hasSharedTags = article.tags.some((tag) => currentArticle.tags.includes(tag))

        return hasSharedCategory || hasSharedTags
      })
      .slice(0, limit)
      .map(transformApiArticle)

    return relatedArticles
  } catch (error) {
    console.error("Error getting related articles:", error)
    return []
  }
}

// Get trending articles
export async function getTrendingArticles(limit = 5): Promise<Article[]> {
  try {
    const response = await fetchArticles(0, limit * 2)
    const trendingArticles = response.content
      .filter((article) => article.trending)
      .slice(0, limit)
      .map(transformApiArticle)

    // If not enough trending articles, fill with recent ones
    if (trendingArticles.length < limit) {
      const recentArticles = response.content
        .filter((article) => !article.trending)
        .slice(0, limit - trendingArticles.length)
        .map(transformApiArticle)

      return [...trendingArticles, ...recentArticles]
    }

    return trendingArticles
  } catch (error) {
    console.error("Error getting trending articles:", error)
    return []
  }
}

// Format date
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "Recently"
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Recently"
  }
}

// Calculate time ago
export function getTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()

    if (isNaN(date.getTime())) {
      return "Recently"
    }

    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} days ago`

    return formatDate(dateString)
  } catch (error) {
    console.error("Error calculating time ago:", error)
    return "Recently"
  }
}

// Format number for display
export function formatNumber(num: number | undefined | null): string {
  if (num === undefined || num === null || isNaN(num)) {
    return "0"
  }

  try {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  } catch (error) {
    console.error("Error formatting number:", error)
    return "0"
  }
}
