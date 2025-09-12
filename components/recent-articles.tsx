"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"

interface Article {
  id: number
  title: string
  description: string
  excerpt: string
  imageUrl: string
  slug: string
  tags: string[]
  publishedAt: string
  viewCount?: number
  likeCount?: number
}

interface RecentArticlesProps {
  articles: Article[]
}

const ArticleCard = memo(function ArticleCard({ article }: { article: Article }) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    } catch {
      return "Recent"
    }
  }

  const formatNumber = (num?: number) => {
    if (typeof num !== "number" || isNaN(num)) {
      return "0"
    }

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const safeViewCount = article.viewCount ?? 0
  const safeTags = Array.isArray(article.tags) ? article.tags : []

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <Link href={`/article/${article.slug || article.id}`} className="block">
          <div className="flex space-x-4 p-4">
            <div className="relative w-30 h-20 flex-shrink-0">
              <Image
                src={article.imageUrl || "/svg/placeholder.svg"}
                alt={article.title || "Article image"}
                fill
                className="object-cover rounded"
                sizes="120px"
                loading="lazy"
                quality={75}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                {safeTags.slice(0, 1).map((tag, index) => (
                  <Badge key={`${tag}-${index}`} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </div>
              </div>
              <h3 className="font-semibold text-sm md:text-base leading-tight mb-2 text-gray-900 dark:text-white line-clamp-2">
                {article.title || "Untitled Article"}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                {article.excerpt || article.description || "No excerpt available."}
              </p>
              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" aria-hidden="true" />
                  <span>{formatNumber(safeViewCount)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
})

const RecentArticles = memo(function RecentArticles({ articles }: RecentArticlesProps) {
  const safeArticles = Array.isArray(articles) ? articles : []

  if (safeArticles.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Recent Articles</h2>
        <p className="text-gray-600 dark:text-gray-400">No recent articles available.</p>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8" aria-labelledby="recent-articles">
      <h2 id="recent-articles" className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Recent Articles
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {safeArticles.map((article) => (
          <ArticleCard key={article.id || article.slug} article={article} />
        ))}
      </div>
    </section>
  )
})

export { RecentArticles }
