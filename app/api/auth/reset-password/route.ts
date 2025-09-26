import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/api"

export async function POST(req: Request) {
  const body = await req.json()
  const res = await fetch(`${API_BASE_URL}/news-auth/reset-password`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
