"use client"
import Link from "next/link"
import Image from "next/image"
import { Clock, Eye, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Article {
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

interface RecentArticlesProps {
  articles: Article[]
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
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Recently"
  }
}

function ArticleCard({ article }: { article: Article }) {
  const {
    title = "Untitled",
    excerpt = "",
    imageUrl = "/placeholder.svg?height=200&width=300",
    category = "General",
    publishedAt = new Date().toISOString(),
    slug = "",
    viewCount = 0,
    likeCount = 0,
    readTime = 5,
  } = article

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-black/80 text-white text-xs">
            {category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <Link href={`/article/${slug}`} className="block group">
            <h3 className="font-semibold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>
          </Link>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">{excerpt}</p>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-3">
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
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentArticles({ articles }: RecentArticlesProps) {
  if (!articles || articles.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-serif mb-8">Recent Articles</h2>
          <p className="text-gray-600 dark:text-gray-300">No articles available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-serif">Recent Articles</h2>
          <Link href="/articles" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            View All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
