import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { getAllCategories, getArticleBySlug, getRelatedArticles, formatDate, getTimeAgo } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import ArticleLoading from "./loading"

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

async function ArticlePageContent({ params }: ArticlePageProps) {
  const { slug } = await params

  const [categories, article] = await Promise.all([getAllCategories(), getArticleBySlug(slug)])

  if (!article) {
    notFound()
  }

  const [relatedArticles] = await Promise.all([getRelatedArticles(article, 3)])

  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{article.category}</Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">{getTimeAgo(article.publishedAt)}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{article.summary}</p>

            <div className="flex items-center gap-4 mb-8">
              <Avatar className="h-12 w-12">
                <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-black dark:text-white">{article.author.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            {article.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {article.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-12">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">{article.author.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{article.author.bio}</p>
              </div>
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <Image
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {relatedArticle.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        <Link
                          href={`/article/${relatedArticle.slug}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {relatedArticle.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{relatedArticle.summary}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </div>
  )
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <ArticlePageContent params={params} />
    </Suspense>
  )
}
