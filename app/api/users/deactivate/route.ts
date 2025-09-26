import { NextResponse } from "next/server"
import { backendFetch, clearAuthTokenCookie } from "@/lib/auth"

export async function POST() {
  const res = await backendFetch("/news-users/deactivate", { method: "POST" }, true)
  const data = await res.json().catch(() => ({}))
  if (res.ok) {
    await clearAuthTokenCookie()
  }
  return NextResponse.json(data, { status: res.status })
}
