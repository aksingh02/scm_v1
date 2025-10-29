import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories, getCategoryBySlug, getArticlesByCategory } from "@/lib/data"
import { CategoryPageClient } from "./CategoryPageClient"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import CategoryLoading from "./loading"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const categoryData = await getCategoryBySlug(categorySlug)

  if (!categoryData) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${categoryData.name} News | SylphCorps Media - Latest ${categoryData.name} Updates`,
    description: `Get the latest ${categoryData.name.toLowerCase()} news, insights, and analysis from SylphCorps Media. Breaking coverage of ${categoryData.name.toLowerCase()} stories and trends.`,
    keywords: [categoryData.name.toLowerCase(), "news", "sylphcorps", "latest", "analysis", "insights"],
    openGraph: {
      title: `${categoryData.name} News | SylphCorps Media`,
      description: `Latest ${categoryData.name.toLowerCase()} news and insights from SylphCorps Media`,
      type: "website",
      url: `https://sylphcorpsmedia.com/${categorySlug}`,
    },
  }
}

async function CategoryPageContent({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params

  const [categories, categoryData, articles] = await Promise.all([
    getAllCategories(),
    getCategoryBySlug(categorySlug),
    getArticlesByCategory(categorySlug, 12),
  ])

  if (!categoryData) {
    notFound()
  }

  const navigationItems = categories.map((category) => category.name)

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryData.name} News`,
    description: `Latest ${categoryData.name.toLowerCase()} news and insights from SylphCorps Media`,
    url: `https://sylphcorpsmedia.com/${categorySlug}`,
    mainEntity: {
      "@type": "NewsMediaOrganization",
      name: "SylphCorps Media",
      url: "https://sylphcorpsmedia.com",
    },
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />
      <CategoryPageClient category={categoryData} initialArticles={articles} categorySlug={categorySlug} />
      <Footer />

      {/* Collection Page Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </div>
  )
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryPageContent params={params} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  try {
    const categories = await getAllCategories()
    return categories.map((category) => ({
      category: category.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}
