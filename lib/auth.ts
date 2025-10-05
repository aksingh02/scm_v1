import { cookies } from "next/headers"
import { API_BASE_URL } from "@/lib/api"

export const AUTH_COOKIE = "scm_token"

export interface SessionUser {
  id: number
  email: string
  firstName: string
  lastName: string
  fullName: string
  emailVerified: boolean
  profilePictureUrl?: string | null
  lastLogin?: string | null
  token?: string
}

export async function getAuthTokenCookie() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value
  return token || null
}

export async function setAuthTokenCookie(token: string, rememberMe: boolean) {
  const cookieStore = await cookies()
  // 7 days if rememberMe, otherwise session cookie
  const maxAge = rememberMe ? 60 * 60 * 24 * 7 : undefined
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge,
  })
}

export async function clearAuthTokenCookie() {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 })
}

// Backend fetch helper with optional bearer token from cookie
export async function backendFetch(path: string, init: RequestInit = {}, withAuth = false) {
  const url = `${API_BASE_URL}${path}`
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(init.headers || {}),
  }

  if (withAuth) {
    const token = await getAuthTokenCookie()
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }
    ;(headers as Record<string, string>).Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, {
    ...init,
    headers,
  })

  return res
}

export interface NewsUserProfile {
  id: number
  firstName: string
  lastName: string
  fullName: string
  email: string
  bio?: string | null
  profilePictureUrl?: string | null
  phoneNumber?: string | null
  dateOfBirth?: string | null
  location?: string | null
  website?: string | null
  newsletterSubscribed: boolean
  emailVerified: boolean
  createdAt?: string | null
  lastLogin?: string | null
}

export async function getCurrentUser(): Promise<NewsUserProfile | null> {
  const token = await getAuthTokenCookie()
  if (!token) return null

  const res = await backendFetch("/news-users/profile", { method: "GET" }, true)
  if (!res.ok) return null
  return (await res.json()) as NewsUserProfile
}
