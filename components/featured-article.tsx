"use client"
import Link from "next/link"
import Image from "next/image"
import { Clock, Eye, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface FeaturedArticleProps {
  article: {
    id: string
    title: string
    excerpt: string
    imageUrl: string
    category: string
    publishedAt: string
    slug: string
    viewCount?: number
    likeCount?: number
    readTime?: number
  }
}

// Safe number formatting function
function formatNumber(num: number | undefined | null): string {
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

// Safe date formatting function
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "Recently"
    }
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Recently"
  }
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  if (!article) {
    return null
  }

  const {
    title = "Untitled",
    excerpt = "",
    imageUrl = "/placeholder.svg?height=400&width=600",
    category = "General",
    publishedAt = new Date().toISOString(),
    slug = "",
    viewCount = 0,
    likeCount = 0,
    readTime = 5,
  } = article

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="w-full h-64 md:h-80 object-cover"
          priority
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-black/80 text-white">
            {category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Link href={`/article/${slug}`} className="block group">
            <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
          </Link>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed line-clamp-3">{excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(viewCount)} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{formatNumber(likeCount)} likes</span>
              </div>
            </div>
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          </div>

          <Link
            href={`/article/${slug}`}
            className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            Read Full Article
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
