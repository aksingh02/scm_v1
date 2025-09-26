import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/api"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get("token")
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 })
  }

  const res = await fetch(`${API_BASE_URL}/news-auth/verify-email?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  })

  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
