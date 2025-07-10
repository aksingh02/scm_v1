import articlesData from "@/data/articles.json"

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

// Get all articles
export function getAllArticles(): Article[] {
  return articlesData.articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// Get featured article
export function getFeaturedArticle(): Article | null {
  return articlesData.articles.find((article) => article.featured) || null
}

// Get recent articles (excluding featured)
export function getRecentArticles(limit = 6): Article[] {
  return articlesData.articles
    .filter((article) => !article.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

// Get article by slug
export function getArticleBySlug(slug: string): Article | null {
  return articlesData.articles.find((article) => article.slug === slug) || null
}

// Get articles by category
export function getArticlesByCategory(categorySlug: string, limit?: number): Article[] {
  const articles = articlesData.articles
    .filter((article) => article.category.toLowerCase() === categorySlug.toLowerCase())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return limit ? articles.slice(0, limit) : articles
}

// Get all categories
export function getAllCategories(): Category[] {
  return articlesData.categories
}

// Get category by slug
export function getCategoryBySlug(slug: string): Category | null {
  return articlesData.categories.find((category) => category.slug === slug) || null
}

// Search articles
export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase()
  return articlesData.articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.summary.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

// Get related articles
export function getRelatedArticles(currentArticle: Article, limit = 3): Article[] {
  return articlesData.articles
    .filter(
      (article) =>
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category || article.tags.some((tag) => currentArticle.tags.includes(tag))),
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
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
