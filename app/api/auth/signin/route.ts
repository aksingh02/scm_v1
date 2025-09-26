import { NextResponse } from "next/server"
import { backendFetch, setAuthTokenCookie } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const res = await backendFetch("/news-auth/signin", {
    method: "POST",
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))

  if (res.ok) {
    // Expect structure with token and emailVerified
    const { token, emailVerified } = data as { token?: string; emailVerified?: boolean }
    if (!emailVerified) {
      return NextResponse.json(
        { error: "Email not verified. Please verify your email before signing in." },
        { status: 403 },
      )
    }
    if (token) {
      setAuthTokenCookie(token, !!body.rememberMe)
    }
  }

  return NextResponse.json(data, { status: res.status })
}
