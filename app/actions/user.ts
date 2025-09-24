"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import {
  updateNewsUserPreferences,
  updateNewsUserProfile,
  updateNewsUserSecurity,
  type UpdateNewsUserPreferencesPayload,
  type UpdateNewsUserProfilePayload,
  type UpdateNewsUserSecurityPayload,
} from "@/lib/news-user"
import { type ActionResult, initialActionState } from "@/lib/action-state"

const AUTH_COOKIE_NAME = "scm_session"

function getAuthToken(): string | undefined {
  const cookieStore = cookies()
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? cookieStore.get("news_auth_token")?.value
}

export async function updateProfileAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const token = getAuthToken()
  if (!token) {
    return { status: "error", message: "You must be signed in to update your profile." }
  }

  const payload: UpdateNewsUserProfilePayload = {
    username: String(formData.get("username") ?? "").trim() || undefined,
    firstName: String(formData.get("firstName") ?? "").trim() || undefined,
    lastName: String(formData.get("lastName") ?? "").trim() || undefined,
    bio: String(formData.get("bio") ?? "").trim() || null,
    profilePictureUrl: String(formData.get("profilePictureUrl") ?? "").trim() || null,
    phoneNumber: String(formData.get("phoneNumber") ?? "").trim() || null,
    location: String(formData.get("location") ?? "").trim() || null,
    website: String(formData.get("website") ?? "").trim() || null,
    dateOfBirth: String(formData.get("dateOfBirth") ?? "").trim() || null,
  }

  try {
    const updatedUser = await updateNewsUserProfile(payload, token)
    revalidatePath("/profile")
    return {
      status: "success",
      message: "Profile updated successfully.",
      data: updatedUser,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update profile."
    return { status: "error", message }
  }
}

export async function updatePreferencesAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const token = getAuthToken()
  if (!token) {
    return { status: "error", message: "You must be signed in to update preferences." }
  }

  const payload: UpdateNewsUserPreferencesPayload = {
    newsletterSubscribed: formData.get("newsletterSubscribed") === "on",
    isActive: formData.get("isActive") === "on",
  }

  try {
    const updatedUser = await updateNewsUserPreferences(payload, token)
    revalidatePath("/profile")
    return {
      status: "success",
      message: "Preferences updated successfully.",
      data: updatedUser,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update preferences."
    return { status: "error", message }
  }
}

export async function updateSecurityAction(_: ActionResult, formData: FormData): Promise<ActionResult> {
  const token = getAuthToken()
  if (!token) {
    return { status: "error", message: "You must be signed in to update security settings." }
  }

  const newPassword = String(formData.get("newPassword") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  if (!newPassword) {
    return { status: "error", message: "Please provide a new password." }
  }

  if (newPassword !== confirmPassword) {
    return { status: "error", message: "Passwords do not match." }
  }

  const payload: UpdateNewsUserSecurityPayload = {
    currentPassword: String(formData.get("currentPassword") ?? "") || undefined,
    newPassword,
    confirmPassword,
  }

  try {
    const response = await updateNewsUserSecurity(payload, token)
    revalidatePath("/profile")
    return {
      status: "success",
      message: response.message ?? "Password updated successfully.",
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update password."
    return { status: "error", message }
  }
}

export { initialActionState }
