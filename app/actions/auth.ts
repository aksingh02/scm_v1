"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import {
  forgotPasswordRequest,
  resetPasswordRequest,
  resendVerificationEmail,
  signInUser,
  signUpUser,
  type SignInPayload,
  type SignUpPayload,
} from "@/lib/news-auth"
import { type ActionResult, initialActionState } from "@/lib/action-state"

const AUTH_COOKIE_NAME = "scm_session"
const ONE_DAY_SECONDS = 60 * 60 * 24
const THIRTY_DAYS_SECONDS = ONE_DAY_SECONDS * 30

function getCookieOptions(rememberMe: boolean) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: rememberMe ? THIRTY_DAYS_SECONDS : ONE_DAY_SECONDS,
  }
}

function extractToken(data: Record<string, unknown> | undefined): string | undefined {
  if (!data) return undefined
  if (typeof data.token === "string") return data.token
  if (typeof data.accessToken === "string") return data.accessToken
  if (typeof data.authToken === "string") return data.authToken
  return undefined
}

export async function signInAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const rememberMe = formData.get("rememberMe") === "on"

  if (!email || !password) {
    return { status: "error", message: "Email and password are required." }
  }

  const payload: SignInPayload = {
    email,
    password,
    rememberMe,
  }

  try {
    const response = await signInUser(payload)
    const token = extractToken(response.data as Record<string, unknown>)
    if (token) {
      cookies().set(AUTH_COOKIE_NAME, token, getCookieOptions(Boolean(rememberMe)))
      revalidatePath("/")
      revalidatePath("/profile")
    }

    return {
      status: "success",
      message: response.message ?? "Signed in successfully.",
      data: response.data,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to sign in."
    return { status: "error", message }
  }
}

export async function signUpAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const firstName = String(formData.get("firstName") ?? "").trim()
  const lastName = String(formData.get("lastName") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")
  const agreeToTerms = formData.get("agreeToTerms") === "on"
  const subscribeToNewsletter = formData.get("subscribeToNewsletter") === "on"

  if (!firstName || !lastName || !email || !password) {
    return { status: "error", message: "Please complete all required fields." }
  }

  if (password !== confirmPassword) {
    return { status: "error", message: "Passwords do not match." }
  }

  if (!agreeToTerms) {
    return { status: "error", message: "You must agree to the terms to create an account." }
  }

  const payload: SignUpPayload = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    agreeToTerms,
    subscribeToNewsletter,
  }

  try {
    const response = await signUpUser(payload)
    return {
      status: "success",
      message: response.message ?? "Account created successfully. Please check your email to verify your account.",
      data: response.data,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create the account."
    return { status: "error", message }
  }
}

export async function forgotPasswordAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim()

  if (!email) {
    return { status: "error", message: "Email address is required." }
  }

  try {
    const response = await forgotPasswordRequest({ email })
    return {
      status: "success",
      message: response.message ?? "If the email exists, a reset link has been sent.",
      data: response.data,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to process password reset."
    return { status: "error", message }
  }
}

export async function resetPasswordAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const token = String(formData.get("token") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  if (!token || !password) {
    return { status: "error", message: "Token and password are required." }
  }

  if (password !== confirmPassword) {
    return { status: "error", message: "Passwords do not match." }
  }

  try {
    const response = await resetPasswordRequest({ token, password, confirmPassword })
    return {
      status: "success",
      message: response.message ?? "Password updated successfully.",
      data: response.data,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to reset the password."
    return { status: "error", message }
  }
}

export async function resendVerificationAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim()

  if (!email) {
    return { status: "error", message: "Email is required to resend the verification message." }
  }

  try {
    const response = await resendVerificationEmail(email)
    return {
      status: "success",
      message: response.message ?? "Verification email sent successfully.",
      data: response.data,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to resend verification email."
    return { status: "error", message }
  }
}

export async function signOutAction(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
  revalidatePath("/")
  revalidatePath("/profile")
}

export { initialActionState }
