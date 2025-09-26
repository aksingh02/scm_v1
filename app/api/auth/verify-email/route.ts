import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/auth"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 })
  }

  const res = await backendFetch(`/news-auth/verify-email?token=${encodeURIComponent(token)}`, { method: "GET" })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
