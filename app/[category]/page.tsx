import { getAllCategories } from "@/lib/data"
import CategoryPageClient from "./CategoryPageClient"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params

  if (!resolvedParams.category) {
    notFound()
  }

  // Check if category exists
  const categories = await getAllCategories()
  const categoryExists = categories.some((cat) => cat.slug === resolvedParams.category.toLowerCase())

  if (!categoryExists) {
    notFound()
  }

  return <CategoryPageClient category={resolvedParams.category} />
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}
