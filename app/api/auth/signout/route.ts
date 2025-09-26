import { NextResponse } from "next/server"
import { clearAuthTokenCookie } from "@/lib/auth"

export async function POST() {
  await clearAuthTokenCookie()
  return NextResponse.json({ success: true })
}
