"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Heart, Clock } from "lucide-react"
import type { Article } from "@/lib/api"

interface RecentArticlesProps {
  articles: Article[]
}

function formatNumber(num: number | undefined | null): string {
  if (num == null || num === undefined) return "0"

  try {
    const number = typeof num === "string" ? Number.parseInt(num, 10) : num
    if (isNaN(number)) return "0"

    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M"
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K"
    }
    return number.toString()
  } catch {
    return "0"
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return "Recently"

    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  } catch {
    return "Recently"
  }
}

const ArticleCard = React.memo<{ article: Article }>(({ article }) => {
  const {
    title = "Untitled Article",
    excerpt = "",
    imageUrl = "/placeholder.svg?height=80&width=120",
    category = "News",
    author = "Unknown Author",
    publishedAt = new Date().toISOString(),
    slug = "",
    viewCount = 0,
    likeCount = 0,
    readTime = 5,
  } = article

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border-0 shadow-sm">
      <CardContent className="p-4">
        <Link href={`/article/${slug}`} className="block">
          <div className="flex gap-4">
            <div className="relative w-30 h-20 flex-shrink-0 overflow-hidden rounded">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover transition-transform duration-200 hover:scale-105"
                sizes="120px"
                loading="lazy"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
                <span className="text-xs text-muted-foreground">{formatDate(publishedAt)}</span>
              </div>

              <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">{title}</h3>

              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{excerpt}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="truncate">By {author}</span>
                <div className="flex items-center space-x-3 flex-shrink-0">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{readTime}m</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{formatNumber(viewCount)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{formatNumber(likeCount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
})

ArticleCard.displayName = "ArticleCard"

const RecentArticles = React.memo<RecentArticlesProps>(({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No recent articles available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold font-serif mb-6">Recent Articles</h2>
      <div className="grid gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
})

RecentArticles.displayName = "RecentArticles"

export { RecentArticles }
