import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories, getCategoryBySlug, getArticlesByCategory } from "@/lib/data"
import { CategoryPageClient } from "./CategoryPageClient"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import CategoryLoading from "./loading"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />
      <CategoryPageClient category={categoryData} initialArticles={articles} categorySlug={categorySlug} />
      <Footer />
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
