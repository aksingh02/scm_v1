import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/auth"

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get("email")
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 })

  const res = await backendFetch(`/news-auth/resend-verification?email=${encodeURIComponent(email)}`, {
    method: "POST",
  })
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
