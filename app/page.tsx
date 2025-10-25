import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { getAllCategories, getFeaturedArticle, getRecentArticles } from "@/lib/data"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Script from "next/script"

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="aspect-video w-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="w-30 h-20 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

async function HomePageContent() {
  const [categories, featuredArticle, recentArticles] = await Promise.all([
    getAllCategories(),
    getFeaturedArticle(),
    getRecentArticles(6),
  ])

  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <PullToRefresh>
        <main className="container mx-auto px-4 py-8">
          {/* SEO Hero Section */}
          <section className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-4">
              Latest Global News from SylphCorps Media
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl">
              Stay informed with breaking news, in-depth analysis, and exclusive insights from SylphCorps on technology,
              business, politics, health, science, and world events. Your trusted source for comprehensive news
              coverage.
            </p>
          </section>

          {featuredArticle && <FeaturedArticle article={featuredArticle} />}
          <RecentArticles articles={recentArticles} />
          <Newsletter />
        </main>
      </PullToRefresh>

      <Footer />

      {/* NewsArticle Schema for Featured Article */}
      {featuredArticle && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: featuredArticle.title,
              description: featuredArticle.summary,
              image: featuredArticle.image,
              datePublished: featuredArticle.publishedAt,
              author: {
                "@type": "Person",
                name: featuredArticle.author.name,
              },
              publisher: {
                "@type": "Organization",
                name: "SylphCorps Media",
                logo: {
                  "@type": "ImageObject",
                  url: "https://sylphcorpsmedia.com/images/logo/scm.png",
                },
              },
            }),
          }}
        />
      )}
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  )
}
