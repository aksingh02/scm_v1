import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/auth"

export async function GET() {
  const res = await backendFetch("/news-users/profile", { method: "GET" }, true)
  if (!res.ok) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  const user = await res.json()
  return NextResponse.json({ authenticated: true, user })
}
