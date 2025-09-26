import { NextResponse } from "next/server"
import { backendFetch, clearAuthTokenCookie } from "@/lib/auth"

export async function POST() {
  const res = await backendFetch("/news-users/deactivate", { method: "POST" }, true)
  // After deactivation, clear local auth cookie regardless of response
  clearAuthTokenCookie()
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
