"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Eye, Heart } from "lucide-react"
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

interface FeaturedArticleProps {
  article: Article
}

const FeaturedArticle = memo(function FeaturedArticle({ article }: FeaturedArticleProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
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
  const safeLikeCount = article.likeCount ?? 0
  const safeTags = Array.isArray(article.tags) ? article.tags : []

  return (
    <section className="container mx-auto px-4 py-8" aria-labelledby="featured-article">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {safeTags.slice(0, 2).map((tag, index) => (
              <Badge key={`${tag}-${index}`} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1
            id="featured-article"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white"
          >
            {article.title || "Untitled Article"}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {article.description || article.excerpt || "No description available."}
          </p>

          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>{formatNumber(safeViewCount)} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" aria-hidden="true" />
              <span>{formatNumber(safeLikeCount)} likes</span>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            <Link href={`/article/${article.slug || article.id}`}>Read Full Article</Link>
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <Image
                src={article.imageUrl || "/svg/placeholder.svg"}
                alt={article.title || "Article image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={85}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
})

export { FeaturedArticle }
