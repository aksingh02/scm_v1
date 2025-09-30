"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { NewsUserProfile } from "@/lib/auth"
import { useRouter } from "next/navigation"

function toISODateTime(dateStr: string | undefined | null) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return null
  return d.toISOString()
}

export default function SettingsForm({ initialUser }: { initialUser: NewsUserProfile }) {
  const router = useRouter()
  const [firstName, setFirstName] = useState(initialUser.firstName || "")
  const [lastName, setLastName] = useState(initialUser.lastName || "")
  const [bio, setBio] = useState(initialUser.bio || "")
  const [phoneNumber, setPhoneNumber] = useState(initialUser.phoneNumber || "")
  const [dateOfBirth, setDateOfBirth] = useState(
    initialUser.dateOfBirth ? new Date(initialUser.dateOfBirth).toISOString().slice(0, 10) : "",
  )
  const [location, setLocation] = useState(initialUser.location || "")
  const [website, setWebsite] = useState(initialUser.website || "")
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(!!initialUser.newsletterSubscribed)
  const [profilePictureUrl, setProfilePictureUrl] = useState(initialUser.profilePictureUrl || "")
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deactivating, setDeactivating] = useState(false)

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    const payload = {
      firstName,
      lastName,
      bio,
      phoneNumber,
      dateOfBirth: toISODateTime(dateOfBirth) ?? null,
      location,
      website,
      newsletterSubscribed,
    }
    const res = await fetch("/api/users/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const ok = res.ok
    const data = await res.json().catch(() => ({}))
    setMsg(
      ok ? { type: "success", text: "Profile updated." } : { type: "error", text: data?.error || "Update failed." },
    )
    setSaving(false)
    if (ok) router.refresh()
  }

  async function onUploadPic(file: File) {
    setUploading(true)
    setMsg(null)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/users/profile/picture", {
      method: "POST",
      body: formData,
    })

    setUploading(false)

    if (res.ok) {
      const data = await res.json();
      setMsg({ type: "success", text: data.message })
    } else {
      let errorMsg = "Failed to upload picture."
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json()
        errorMsg = data?.message || errorMsg
      } else {
        const text = await res.text()
        errorMsg = text || errorMsg
      }
      setMsg({ type: "error", text: errorMsg })
    }

  }


  async function onRemovePic() {
    setUploading(true)
    setMsg(null)
    const res = await fetch("/api/users/profile/picture", { method: "DELETE" })
    setUploading(false)
    if (res.ok) {
      setProfilePictureUrl("")
      setMsg({ type: "success", text: "Profile picture removed." })
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setMsg({ type: "error", text: data?.error || "Failed to remove picture." })
    }
  }

  async function onDeactivate() {
    if (!confirm("Are you sure you want to deactivate your account?")) return
    setDeactivating(true)
    const res = await fetch("/api/users/deactivate", { method: "POST" })
    setDeactivating(false)
    if (res.ok) {
      // Signout happens on server, just navigate home
      window.location.href = "/"
    } else {
      const data = await res.json().catch(() => ({}))
      setMsg({ type: "error", text: data?.error || "Failed to deactivate account." })
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-8">
      {msg && (
        <div
          className={`rounded-md p-3 ${msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {msg.text}
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <Input type="email" value={initialUser.email} readOnly className="bg-gray-50 dark:bg-gray-800" />
          <Textarea placeholder="Bio" value={bio || ""} onChange={(e) => setBio(e.target.value)} rows={4} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Phone number"
              value={phoneNumber || ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              aria-label="Date of birth"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Location" value={location || ""} onChange={(e) => setLocation(e.target.value)} />
            <Input placeholder="Website" value={website || ""} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={newsletterSubscribed}
              onChange={(e) => setNewsletterSubscribed(e.target.checked)}
              className="h-4 w-4"
            />
            Subscribe to newsletter
          </label>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Profile Picture</p>
            <div className="flex items-center gap-4">
              <img
                src={
                  profilePictureUrl ||
                  "/placeholder.svg?height=64&width=64&query=default%20user%20avatar%20placeholder" ||
                  "/placeholder.svg"
                }
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
              <div className="space-x-2">
                <label className="inline-block">
                  <span className="sr-only">Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && e.target.files[0] && onUploadPic(e.target.files[0])}
                    className="hidden"
                    id="upload-avatar-input"
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => document.getElementById("upload-avatar-input")?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                </label>
                <Button variant="ghost" type="button" onClick={onRemovePic} disabled={uploading}>
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Account</p>
            <Button type="button" variant="destructive" onClick={onDeactivate} disabled={deactivating}>
              {deactivating ? "Deactivating..." : "Deactivate account"}
            </Button>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  )
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
