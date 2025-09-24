"use client"

import { useMemo, useState, useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  updatePreferencesAction,
  updateProfileAction,
  updateSecurityAction,
  initialActionState as userInitialActionState,
} from "@/app/actions/user"
import { resendVerificationAction, signOutAction, initialActionState } from "@/app/actions/auth"
import type { NewsUser } from "@/lib/news-user"
import type { ActionResult } from "@/lib/action-state"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProfileSettingsProps {
  user: NewsUser
}

function useActionMessages(
  state: ActionResult,
  successCallback?: (data: unknown) => void,
  resetDeps: unknown[] = [],
): [ActionResult] {
  useEffect(() => {
    if (state.status === "success" && successCallback) {
      successCallback(state.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status, ...resetDeps])
  return [state]
}

function formatDateTime(value?: string | null): string {
  if (!value) return "Not available"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Not available"
  return date.toLocaleString()
}

function formatDate(value?: string | null): string {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const router = useRouter()
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(Boolean(user.newsletterSubscribed))
  const [isActive, setIsActive] = useState(Boolean(user.isActive))

  const [profileState, profileAction, profilePending] = useActionState(updateProfileAction, userInitialActionState)
  const [preferencesState, preferencesAction, preferencesPending] = useActionState(
    updatePreferencesAction,
    userInitialActionState,
  )
  const [securityState, securityAction, securityPending] = useActionState(updateSecurityAction, userInitialActionState)
  const [verificationState, verificationAction, verificationPending] = useActionState(
    resendVerificationAction,
    initialActionState,
  )

  const fullName = useMemo(() => `${user.firstName} ${user.lastName}`.trim(), [user.firstName, user.lastName])
  const favoriteCount = user.favoriteArticles?.length ?? 0
  const subscriptionCount = user.subscriptions?.length ?? 0
  const preferenceCount = user.preferences?.length ?? 0

  useActionMessages(
    preferencesState,
    (data) => {
      if (data && typeof data === "object") {
        const updatedUser = data as Partial<NewsUser>
        if (typeof updatedUser.newsletterSubscribed === "boolean") {
          setNewsletterSubscribed(updatedUser.newsletterSubscribed)
        }
        if (typeof updatedUser.isActive === "boolean") {
          setIsActive(updatedUser.isActive)
        }
      }
    },
    [preferencesState.status],
  )

  const showEmailVerificationBanner = !user.emailVerified

  return (
    <div className="space-y-6">
      {profileState.status === "error" && (
        <Alert variant="destructive">
          <AlertDescription>{profileState.message}</AlertDescription>
        </Alert>
      )}

      {profileState.status === "success" && (
        <Alert>
          <AlertDescription>{profileState.message}</AlertDescription>
        </Alert>
      )}

      {showEmailVerificationBanner && (
        <Alert>
          <AlertDescription className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span>
              Your email address is not verified yet. Verify your account to unlock all features and important
              notifications.
            </span>
            <form action={verificationAction} className="flex items-center gap-2">
              <input type="hidden" name="email" value={user.email} />
              <Button type="submit" size="sm" disabled={verificationPending}>
                {verificationPending ? "Sending..." : "Resend Verification"}
              </Button>
            </form>
          </AlertDescription>
        </Alert>
      )}

      {verificationState.status === "error" && (
        <Alert variant="destructive">
          <AlertDescription>{verificationState.message}</AlertDescription>
        </Alert>
      )}

      {verificationState.status === "success" && (
        <Alert>
          <AlertDescription>{verificationState.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.profilePictureUrl ?? undefined} alt={fullName} />
              <AvatarFallback>{initialsFromName(fullName || user.username)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{fullName || user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={user.emailVerified ? "default" : "secondary"}>
                  {user.emailVerified ? "Email Verified" : "Email Not Verified"}
                </Badge>
                <Badge variant={user.isActive ? "default" : "destructive"}>
                  {user.isActive ? "Active Account" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
          <form
            action={async () => {
              "use server"
              await signOutAction()
            }}
          >
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information to personalize your newsroom experience.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={profileAction} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={user.firstName}
                  placeholder="First name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <Input id="lastName" name="lastName" defaultValue={user.lastName} placeholder="Last name" required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input id="username" name="username" defaultValue={user.username} placeholder="Username" />
              </div>
              <div className="space-y-2">
                <label htmlFor="profilePictureUrl" className="text-sm font-medium">
                  Profile Picture URL
                </label>
                <Input
                  id="profilePictureUrl"
                  name="profilePictureUrl"
                  defaultValue={user.profilePictureUrl ?? ""}
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={user.bio ?? ""}
                placeholder="Tell readers a little about yourself..."
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={user.phoneNumber ?? ""}
                  placeholder="+91 00000 00000"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="dateOfBirth" className="text-sm font-medium">
                  Date of Birth
                </label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" defaultValue={formatDate(user.dateOfBirth)} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input id="location" name="location" defaultValue={user.location ?? ""} placeholder="City, Country" />
              </div>
              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  Website
                </label>
                <Input
                  id="website"
                  name="website"
                  defaultValue={user.website ?? ""}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={profilePending}>
                {profilePending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Manage how we reach out to you and the status of your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {preferencesState.status === "error" && (
              <Alert variant="destructive">
                <AlertDescription>{preferencesState.message}</AlertDescription>
              </Alert>
            )}

            {preferencesState.status === "success" && (
              <Alert>
                <AlertDescription>{preferencesState.message}</AlertDescription>
              </Alert>
            )}

            <form action={preferencesAction} className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div>
                  <p className="font-medium">Newsletter Subscription</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Stay informed with curated stories and daily briefings.
                  </p>
                </div>
                <Switch
                  checked={newsletterSubscribed}
                  onCheckedChange={(checked) => setNewsletterSubscribed(checked)}
                />
                <input type="hidden" name="newsletterSubscribed" value={newsletterSubscribed ? "on" : ""} />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div>
                  <p className="font-medium">Account Status</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Temporarily deactivate your account while keeping data intact.
                  </p>
                </div>
                <Switch checked={isActive} onCheckedChange={(checked) => setIsActive(checked)} />
                <input type="hidden" name="isActive" value={isActive ? "on" : ""} />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={preferencesPending}>
                  {preferencesPending ? "Updating..." : "Update Preferences"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Keep your newsroom account secure with a strong password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityState.status === "error" && (
              <Alert variant="destructive">
                <AlertDescription>{securityState.message}</AlertDescription>
              </Alert>
            )}

            {securityState.status === "success" && (
              <Alert>
                <AlertDescription>{securityState.message}</AlertDescription>
              </Alert>
            )}

            <form action={securityAction} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm font-medium">
                  Current Password (optional)
                </label>
                <Input id="currentPassword" name="currentPassword" type="password" placeholder="Current password" />
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">
                  New Password
                </label>
                <Input id="newPassword" name="newPassword" type="password" placeholder="New password" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={securityPending}>
                  {securityPending ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Activity</CardTitle>
          <CardDescription>Review your account timeline and engagement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-500">Account Created</p>
              <p className="text-base font-semibold">{formatDateTime(user.createdAt)}</p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-base font-semibold">{formatDateTime(user.updatedAt)}</p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="text-base font-semibold">{formatDateTime(user.lastLogin)}</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-500">Favorite Articles</p>
              <p className="text-2xl font-semibold">{favoriteCount}</p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-500">Active Subscriptions</p>
              <p className="text-2xl font-semibold">{subscriptionCount}</p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-500">Custom Preferences</p>
              <p className="text-2xl font-semibold">{preferenceCount}</p>
            </div>
          </div>

          {user.preferences && user.preferences.length > 0 && (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm font-semibold mb-2">Preference Breakdown</p>
              <div className="flex flex-wrap gap-2">
                {user.preferences.map((preference) => (
                  <Badge key={preference.id} variant="secondary">
                    {preference.key}: {preference.value}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
