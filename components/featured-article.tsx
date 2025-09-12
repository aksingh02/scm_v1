"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Eye, Heart, Clock } from "lucide-react"
import type { Article } from "@/lib/api"

interface FeaturedArticleProps {
  article: Article
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

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  } catch {
    return "Recently"
  }
}

const FeaturedArticle = React.memo<FeaturedArticleProps>(({ article }) => {
  if (!article || !article.id) {
    return null
  }

  const {
    title = "Untitled Article",
    excerpt = "",
    imageUrl = "/placeholder.svg?height=400&width=600",
    category = "News",
    author = "Unknown Author",
    publishedAt = new Date().toISOString(),
    slug = "",
    tags = [],
    viewCount = 0,
    likeCount = 0,
    readTime = 5,
  } = article

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <Link href={`/article/${slug}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
              {category}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="border-white/30 text-white text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-serif mb-3 line-clamp-2">{title}</h1>

            <p className="text-gray-200 text-base mb-4 line-clamp-2">{excerpt}</p>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center space-x-4">
                <span>By {author}</span>
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{formatNumber(viewCount)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{formatNumber(likeCount)}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </Card>
  )
})

FeaturedArticle.displayName = "FeaturedArticle"

export { FeaturedArticle }
