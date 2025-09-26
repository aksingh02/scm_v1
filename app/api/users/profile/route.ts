import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/auth"

export async function GET() {
  const res = await backendFetch("/news-users/profile", { method: "GET" }, true)
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}

export async function PUT(req: Request) {
  const body = await req.json()
  const res = await backendFetch("/news-users/profile", { method: "PUT", body: JSON.stringify(body) }, true)
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
