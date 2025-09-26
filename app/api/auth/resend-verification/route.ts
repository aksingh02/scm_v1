import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/api"

export async function POST(req: Request) {
  const url = new URL(req.url)
  let email = url.searchParams.get("email")

  if (!email) {
    try {
      const body = await req.json()
      email = body?.email
    } catch {
      // ignore
    }
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const res = await fetch(`${API_BASE_URL}/news-auth/resend-verification?email=${encodeURIComponent(email)}`, {
    method: "POST",
    headers: { Accept: "application/json" },
  })

  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
