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
import type { Metadata } from "next"

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${article.title} | SylphCorps Media`,
    description: article.summary,
    keywords: [...article.tags, article.category, "news", "sylphcorps"],
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [article.image],
    },
  }
}

async function ArticlePageContent({ params }: ArticlePageProps) {
  const { slug } = await params

  const [categories, article] = await Promise.all([getAllCategories(), getArticleBySlug(slug)])

  if (!article) {
    notFound()
  }

  const [relatedArticles] = await Promise.all([getRelatedArticles(article, 3)])

  const navigationItems = categories.map((category) => category.name)

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sylphcorpsmedia.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category,
        item: `https://sylphcorpsmedia.com/${article.category.toLowerCase()}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://sylphcorpsmedia.com/article/${slug}`,
      },
    ],
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      description: article.author.bio,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "SylphCorps Media",
      logo: {
        "@type": "ImageObject",
        url: "https://sylphcorpsmedia.com/images/logo/scm.png",
        width: 70,
        height: 70,
      },
      url: "https://sylphcorpsmedia.com",
    },
    articleBody: article.content,
    keywords: [...article.tags, article.category, "news", "sylphcorps media"].join(", "),
    articleSection: article.category,
    inLanguage: "en-US",
  }

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
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`}>
                    <Badge
                      variant="outline"
                      className="text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {tag}
                    </Badge>
                  </Link>
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
                  <Link key={relatedArticle.id} href={`/article/${relatedArticle.slug}`} className="block">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
                          <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {relatedArticle.title}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedArticle.summary}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />

      {/* Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Enhanced NewsArticle Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
