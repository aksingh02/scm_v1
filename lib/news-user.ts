import { env } from "./env"

const API_BASE_URL = env.baseUrl
const API_TIMEOUT = env.apiTimeOut
const API_KEY = env.apiKey

const NEWS_USERS_BASE_URL = `${API_BASE_URL}/news-users`

export interface FavoriteArticleSummary {
  id: number
  articleId: number
  title: string
  slug: string
  createdAt?: string
}

export interface SubscriptionSummary {
  id: number
  planName: string
  status: string
  startedAt?: string
  expiresAt?: string
}

export interface NewsUserPreference {
  id: number
  key: string
  value: string
}

export interface NewsUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  bio?: string | null
  profilePictureUrl?: string | null
  phoneNumber?: string | null
  dateOfBirth?: string | null
  location?: string | null
  website?: string | null
  newsletterSubscribed: boolean
  emailVerified: boolean
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  lastLogin?: string | null
  resetToken?: string | null
  resetTokenExpiry?: string | null
  verificationToken?: string | null
  verificationTokenExpiry?: string | null
  favoriteArticles?: FavoriteArticleSummary[]
  subscriptions?: SubscriptionSummary[]
  preferences?: NewsUserPreference[]
}

export interface UpdateNewsUserProfilePayload {
  username?: string
  firstName?: string
  lastName?: string
  bio?: string | null
  profilePictureUrl?: string | null
  phoneNumber?: string | null
  dateOfBirth?: string | null
  location?: string | null
  website?: string | null
}

export interface UpdateNewsUserSecurityPayload {
  currentPassword?: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateNewsUserPreferencesPayload {
  newsletterSubscribed?: boolean
  isActive?: boolean
}

class NewsUserApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "NewsUserApiError"
  }
}

function buildHeaders(token?: string, additional?: HeadersInit): HeadersInit {
  const headers = new Headers(additional)
  headers.set("Content-Type", "application/json")
  headers.set("Accept", "application/json")
  headers.set("X-API-Key", API_KEY)

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  return headers
}

function buildUrl(path: string): string {
  return `${NEWS_USERS_BASE_URL}${path}`
}

async function userRequest<T>(
  path: string,
  {
    method = "GET",
    body,
    token,
    cache = "no-store",
  }: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: unknown
    token?: string
    cache?: RequestCache
  } = {},
): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(buildUrl(path), {
      method,
      headers: buildHeaders(token),
      body: body ? JSON.stringify(body) : undefined,
      cache,
      signal: controller.signal,
    })

    const contentType = response.headers.get("content-type")
    const isJson = contentType?.includes("application/json")
    const payload = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      const message =
        (isJson &&
          payload &&
          typeof payload === "object" &&
          "message" in payload &&
          payload.message &&
          String(payload.message)) ||
        response.statusText ||
        "Request failed"
      throw new NewsUserApiError(message, response.status)
    }

    return payload as T
  } catch (error) {
    if (error instanceof NewsUserApiError) {
      throw error
    }
    const message = error instanceof Error ? error.message : "Unexpected error"
    throw new NewsUserApiError(message)
  } finally {
    clearTimeout(timeoutId)
  }
}

function toIsoDate(date?: string | null): string | null {
  if (!date) return null
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }
  return parsed.toISOString()
}

function parseNewsUser(raw: any): NewsUser {
  return {
    id: Number(raw?.id ?? 0),
    username: String(raw?.username ?? ""),
    email: String(raw?.email ?? ""),
    firstName: String(raw?.firstName ?? ""),
    lastName: String(raw?.lastName ?? ""),
    bio: raw?.bio ?? null,
    profilePictureUrl: raw?.profilePictureUrl ?? null,
    phoneNumber: raw?.phoneNumber ?? null,
    dateOfBirth: raw?.dateOfBirth ?? null,
    location: raw?.location ?? null,
    website: raw?.website ?? null,
    newsletterSubscribed: Boolean(raw?.newsletterSubscribed),
    emailVerified: Boolean(raw?.emailVerified),
    isActive: raw?.isActive ?? true,
    createdAt: raw?.createdAt ?? null,
    updatedAt: raw?.updatedAt ?? null,
    lastLogin: raw?.lastLogin ?? null,
    resetToken: raw?.resetToken ?? null,
    resetTokenExpiry: raw?.resetTokenExpiry ?? null,
    verificationToken: raw?.verificationToken ?? null,
    verificationTokenExpiry: raw?.verificationTokenExpiry ?? null,
    favoriteArticles: Array.isArray(raw?.favoriteArticles)
      ? raw.favoriteArticles.map((item: any) => ({
          id: Number(item?.id ?? 0),
          articleId: Number(item?.articleId ?? item?.article?.id ?? 0),
          title: String(item?.title ?? item?.article?.title ?? ""),
          slug: String(item?.slug ?? item?.article?.slug ?? ""),
          createdAt: item?.createdAt ?? null,
        }))
      : [],
    subscriptions: Array.isArray(raw?.subscriptions)
      ? raw.subscriptions.map((item: any) => ({
          id: Number(item?.id ?? 0),
          planName: String(item?.planName ?? item?.plan?.name ?? ""),
          status: String(item?.status ?? ""),
          startedAt: item?.startedAt ?? null,
          expiresAt: item?.expiresAt ?? null,
        }))
      : [],
    preferences: Array.isArray(raw?.preferences)
      ? raw.preferences.map((item: any) => ({
          id: Number(item?.id ?? 0),
          key: String(item?.key ?? ""),
          value: String(item?.value ?? ""),
        }))
      : [],
  }
}

export async function getNewsUserProfile(token?: string): Promise<NewsUser | null> {
  if (!token) {
    return null
  }

  try {
    const payload = await userRequest<any>("/me", { token, cache: "no-store" })
    return parseNewsUser(payload)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function updateNewsUserProfile(
  payload: UpdateNewsUserProfilePayload,
  token?: string,
): Promise<NewsUser | null> {
  if (!token) {
    throw new NewsUserApiError("Authentication token is required to update profile.")
  }

  const sanitizedPayload: UpdateNewsUserProfilePayload = {
    ...payload,
    dateOfBirth: payload.dateOfBirth ? toIsoDate(payload.dateOfBirth) : null,
  }

  const response = await userRequest<any>("/me", {
    method: "PUT",
    body: sanitizedPayload,
    token,
  })

  return parseNewsUser(response)
}

export async function updateNewsUserSecurity(
  payload: UpdateNewsUserSecurityPayload,
  token?: string,
): Promise<{ message?: string }> {
  if (!token) {
    throw new NewsUserApiError("Authentication token is required to update security information.")
  }

  const response = await userRequest<{ message?: string }>("/me/security", {
    method: "PATCH",
    body: payload,
    token,
  })

  return response
}

export async function updateNewsUserPreferences(
  payload: UpdateNewsUserPreferencesPayload,
  token?: string,
): Promise<NewsUser | null> {
  if (!token) {
    throw new NewsUserApiError("Authentication token is required to update preferences.")
  }

  const response = await userRequest<any>("/me/preferences", {
    method: "PATCH",
    body: payload,
    token,
  })

  return parseNewsUser(response)
}

export async function fetchFavoriteArticles(token?: string): Promise<FavoriteArticleSummary[]> {
  if (!token) {
    return []
  }

  try {
    const response = await userRequest<FavoriteArticleSummary[]>("/me/favorites", {
      token,
      cache: "no-store",
    })
    return Array.isArray(response) ? response : []
  } catch (error) {
    console.error("Error fetching favorite articles:", error)
    return []
  }
}

export async function fetchSubscriptions(token?: string): Promise<SubscriptionSummary[]> {
  if (!token) {
    return []
  }

  try {
    const response = await userRequest<SubscriptionSummary[]>("/me/subscriptions", {
      token,
      cache: "no-store",
    })
    return Array.isArray(response) ? response : []
  } catch (error) {
    console.error("Error fetching subscriptions:", error)
    return []
  }
}

export async function fetchUserPreferences(token?: string): Promise<NewsUserPreference[]> {
  if (!token) {
    return []
  }

  try {
    const response = await userRequest<NewsUserPreference[]>("/me/preferences", {
      token,
      cache: "no-store",
    })
    return Array.isArray(response) ? response : []
  } catch (error) {
    console.error("Error fetching user preferences:", error)
    return []
  }
}
