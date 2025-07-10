import { getAllCategories } from "@/lib/data"
import CategoryPageClient from "./CategoryPageClient"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryPageClient params={params} />
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}
