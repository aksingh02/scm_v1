import { NextResponse } from "next/server"
import { backendFetch } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  // Backend expects { file: "<base64>" }
  const res = await backendFetch("/news-users/profile/picture", { method: "POST", body: JSON.stringify(body) }, true)
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}

export async function DELETE() {
  const res = await backendFetch("/news-users/profile/picture", { method: "DELETE" }, true)
  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
