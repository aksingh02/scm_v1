import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories, searchArticlesData } from "@/lib/data"
import { SearchResults } from "./SearchResults"
import { Suspense } from "react"
import SearchLoading from "./loading"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

async function SearchPageContent({ searchParams }: SearchPageProps) {
  try {
    const resolvedParams = await searchParams
    const query = resolvedParams?.q || ""

    const [categories, articles] = await Promise.all([
      getAllCategories(),
      query ? searchArticlesData(query) : Promise.resolve([]),
    ])

    const navigationItems = categories.map((category) => category.name)

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header navigationItems={navigationItems} />
        <SearchResults initialQuery={query} initialResults={articles} />
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error in SearchPageContent:", error)
    
    // Fallback to empty state if there's an error
    const categories = await getAllCategories().catch(() => [])
    const navigationItems = categories.map((category) => category.name)
    
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Header navigationItems={navigationItems} />
        <SearchResults initialQuery="" initialResults={[]} />
        <Footer />
      </div>
    )
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent searchParams={searchParams} />
    </Suspense>
  )
}
