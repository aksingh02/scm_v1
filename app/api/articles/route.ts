import { getAllArticles } from "@/lib/data"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "0")
    const size = Number.parseInt(searchParams.get("size") || "10")

    const result = await getAllArticles(page, size)

    return NextResponse.json({
      articles: result.articles,
      totalPages: result.totalPages,
      totalElements: result.totalElements,
      currentPage: result.currentPage,
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}
