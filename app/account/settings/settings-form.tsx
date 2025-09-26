"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { NewsUserProfile } from "@/lib/auth"
import Image from "next/image"
import { Loader2, Trash2 } from "lucide-react"

export default function SettingsForm({ initialUser }: { initialUser: NewsUserProfile }) {
  const [user, setUser] = useState(initialUser)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
          phoneNumber: user.phoneNumber,
          dateOfBirth: user.dateOfBirth, // ISO string
          location: user.location,
          website: user.website,
          newsletterSubscribed: user.newsletterSubscribed,
        }),
      })
      if (res.ok) {
        toast({ title: "Profile updated" })
      } else {
        const data = await res.json().catch(() => ({}))
        toast({ title: "Update failed", description: data.error || "Please try again", variant: "destructive" })
      }
    } catch {
      toast({ title: "Network error", description: "Please try again", variant: "destructive" })
    } finally {
      setSaving(false)
    }
  }

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(",")[1] || "")
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const uploadPicture = async (file: File) => {
    setUploading(true)
    try {
      const base64 = await toBase64(file)
      const res = await fetch("/api/users/profile/picture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64 }),
      })
      if (res.ok) {
        toast({ title: "Profile picture updated" })
        // Optimistic update (in a real app you might re-fetch)
        setUser((u) => ({ ...u, profilePictureUrl: u.profilePictureUrl || "/diverse-avatars.png" }))
      } else {
        toast({ title: "Upload failed", variant: "destructive" })
      }
    } catch {
      toast({ title: "Upload error", variant: "destructive" })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  const deletePicture = async () => {
    setUploading(true)
    try {
      const res = await fetch("/api/users/profile/picture", { method: "DELETE" })
      if (res.ok) {
        toast({ title: "Profile picture removed" })
        setUser((u) => ({ ...u, profilePictureUrl: null as any }))
      } else {
        toast({ title: "Remove failed", variant: "destructive" })
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  const deactivateAccount = async () => {
    if (!confirm("Are you sure you want to deactivate your account?")) return
    try {
      const res = await fetch("/api/users/deactivate", { method: "POST" })
      if (res.ok) {
        toast({ title: "Account deactivated" })
        window.location.href = "/"
      } else {
        toast({ title: "Deactivation failed", variant: "destructive" })
      }
    } catch {
      toast({ title: "Network error", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-8">
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-black dark:text-white">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSave}>
            <div className="flex items-center gap-6">
              <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={user.profilePictureUrl || "/placeholder.svg?height=80&width=80&query=user-avatar"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && uploadPicture(e.target.files[0])}
                  className="hidden"
                  id="avatar"
                />
                <label htmlFor="avatar">
                  <Button type="button" variant="outline" disabled={uploading}>
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Upload Picture"}
                  </Button>
                </label>
                <Button type="button" variant="outline" onClick={deletePicture} disabled={uploading}>
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                <Input value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                <Input value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
              <Textarea value={user.bio || ""} onChange={(e) => setUser({ ...user, bio: e.target.value })} rows={4} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                <Input
                  value={user.phoneNumber || ""}
                  onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                <Input
                  type="date"
                  value={user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().slice(0, 10) : ""}
                  onChange={(e) => {
                    const v = e.target.value ? new Date(e.target.value).toISOString() : ""
                    setUser({ ...user, dateOfBirth: v })
                  }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                <Input value={user.location || ""} onChange={(e) => setUser({ ...user, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                <Input value={user.website || ""} onChange={(e) => setUser({ ...user, website: e.target.value })} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="newsletter"
                type="checkbox"
                checked={!!user.newsletterSubscribed}
                onChange={(e) => setUser({ ...user, newsletterSubscribed: e.target.checked })}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300">
                Subscribe to newsletter
              </label>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  const r = await fetch(`/api/auth/resend-verification?email=${encodeURIComponent(user.email)}`, {
                    method: "POST",
                  })
                  if (r.ok) toast({ title: "Verification email sent" })
                  else toast({ title: "Unable to send verification", variant: "destructive" })
                }}
                disabled={user.emailVerified}
              >
                {user.emailVerified ? "Email Verified" : "Resend Verification"}
              </Button>
              <Button type="button" variant="outline" onClick={deactivateAccount}>
                Deactivate Account
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  await fetch("/api/auth/signout", { method: "POST" })
                  window.location.href = "/"
                }}
              >
                Sign Out
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
