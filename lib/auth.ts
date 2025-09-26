import { cookies } from "next/headers"
import { env } from "./env"

const API_BASE_URL = env.baseUrl
const API_KEY = env.apiKey

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
  token: string
}

export function getAuthTokenCookie() {
  const cookieStore = cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value
  return token || null
}

export function setAuthTokenCookie(token: string, rememberMe: boolean) {
  const cookieStore = cookies()
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

export function clearAuthTokenCookie() {
  const cookieStore = cookies()
  cookieStore.set(AUTH_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 })
}

// Backend fetch helper with API key and optional bearer token
export async function backendFetch(path: string, init: RequestInit = {}, withAuth = false) {
  const url = `${API_BASE_URL}${path}`
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
    ...(init.headers || {}),
  }

  if (withAuth) {
    const token = getAuthTokenCookie()
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
  const token = getAuthTokenCookie()
  if (!token) return null

  const res = await backendFetch("/news-users/profile", { method: "GET" }, true)
  if (!res.ok) return null
  return (await res.json()) as NewsUserProfile
}
