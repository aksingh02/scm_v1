import { NextRequest, NextResponse } from "next/server"
import { searchArticlesData } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query || query.trim() === "") {
      return NextResponse.json({ articles: [] })
    }

    const articles = await searchArticlesData(query.trim())
    
    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      { error: "Failed to search articles" },
      { status: 500 }
    )
  }
}