import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/api"
import { setAuthTokenCookie } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${API_BASE_URL}/news-auth/signin`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))

  if (res.ok) {
    const { token, emailVerified } = data as { token?: string; emailVerified?: boolean }
    if (!emailVerified) {
      return NextResponse.json(
        { error: "Email not verified. Please verify your email before signing in." },
        { status: 403 },
      )
    }
    if (token) {
      await setAuthTokenCookie(token, !!body.rememberMe)
    }
  }

  return NextResponse.json(data, { status: res.status })
}
