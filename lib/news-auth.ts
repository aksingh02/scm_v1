import { env } from "./env"

const API_BASE_URL = env.baseUrl
const API_TIMEOUT = env.apiTimeOut
const API_KEY = env.apiKey

const AUTH_BASE_URL = `${API_BASE_URL}/news-auth`

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface RequestConfig {
  method?: HttpMethod
  body?: unknown
  headers?: HeadersInit
  token?: string
  searchParams?: Record<string, string | number | boolean | undefined>
}

export interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
  subscribeToNewsletter?: boolean
}

export interface SignInPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
  confirmPassword: string
}

export interface AuthApiResponse<T = unknown> {
  message?: string
  status?: string
  success?: boolean
  token?: string
  accessToken?: string
  data?: T
  [key: string]: unknown
}

class ApiRequestError extends Error {
  public status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = "ApiRequestError"
    this.status = status
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

function buildUrl(path: string, searchParams?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(`${AUTH_BASE_URL}${path}`)
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }
  return url.toString()
}

async function authRequest<T>(path: string, config: RequestConfig = {}): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(buildUrl(path, config.searchParams), {
      method: config.method ?? "GET",
      body: config.body ? JSON.stringify(config.body) : undefined,
      headers: buildHeaders(config.token, config.headers),
      cache: "no-store",
      signal: controller.signal,
    })

    const contentType = response.headers.get("content-type")
    const isJson = contentType?.includes("application/json")
    const payload = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      const errorMessage =
        (isJson && typeof payload === "object" && payload && "message" in payload && payload.message) ||
        response.statusText ||
        "Request failed"
      throw new ApiRequestError(String(errorMessage), response.status)
    }

    return payload as T
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error
    }
    const message = error instanceof Error ? error.message : "Unexpected error"
    throw new ApiRequestError(message)
  } finally {
    clearTimeout(timeoutId)
  }
}

function normalizeResponse<T = unknown>(data: AuthApiResponse<T> | undefined): AuthApiResponse<T> {
  if (!data) {
    return { success: true }
  }

  const message =
    data.message ??
    (typeof data.status === "string" && data.status.length > 0 ? data.status : undefined) ??
    (typeof data === "object" && "detail" in data ? String((data as { detail?: unknown }).detail) : undefined)

  return {
    ...data,
    message,
    success: data.success ?? true,
  }
}

export async function signUpUser(payload: SignUpPayload): Promise<AuthApiResponse> {
  const response = await authRequest<AuthApiResponse>("/signup", {
    method: "POST",
    body: payload,
  })
  return normalizeResponse(response)
}

export async function signInUser(payload: SignInPayload): Promise<AuthApiResponse> {
  const response = await authRequest<AuthApiResponse>("/signin", {
    method: "POST",
    body: payload,
  })
  return normalizeResponse(response)
}

export async function verifyEmailToken(token: string): Promise<AuthApiResponse> {
  const response = await authRequest<AuthApiResponse>("/verify-email", {
    method: "GET",
    searchParams: { token },
  })
  return normalizeResponse(response)
}

export async function resendVerificationEmail(email: string): Promise<AuthApiResponse> {
  const response = await authRequest<AuthApiResponse>("/resend-verification", {
    method: "POST",
    searchParams: { email },
  })
  return normalizeResponse(response)
}

export async function forgotPasswordRequest(payload: ForgotPasswordPayload): Promise<AuthApiResponse> {
  const response = await authRequest<AuthApiResponse>("/forgot-password", {
    method: "POST",
    body: payload,
  })
  return normalizeResponse(response)
}

export async function resetPasswordRequest(payload: ResetPasswordPayload): Promise<AuthApiResponse> {
  const response = await authRequest<AuthApiResponse>("/reset-password", {
    method: "POST",
    body: payload,
  })
  return normalizeResponse(response)
}
