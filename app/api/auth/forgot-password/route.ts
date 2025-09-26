import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const res = await backendFetch("/news-auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
