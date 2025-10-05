"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Lock } from "lucide-react"

interface SettingsFormProps {
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    bio?: string
    profilePictureUrl?: string
    phoneNumber?: string
    dateOfBirth?: string
    location?: string
    website?: string
    newsletterSubscribed: boolean
  }
}

export default function SettingsForm({ user }: SettingsFormProps) {
  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [bio, setBio] = useState(user.bio || "")
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "")
  const [dateOfBirth, setDateOfBirth] = useState(
    user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split("T")[0] : "",
  )
  const [location, setLocation] = useState(user.location || "")
  const [website, setWebsite] = useState(user.website || "")
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(user.newsletterSubscribed)
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState(user.profilePictureUrl || "")
  const [loading, setLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfilePicture(file)
      setProfilePicturePreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveProfilePicture = async () => {
    try {
      const res = await fetch("/api/users/profile/picture", { method: "DELETE" })
      if (res.ok) {
        setProfilePicturePreview("")
        setProfilePicture(null)
        toast({ title: "Profile picture removed", description: "Your profile picture has been removed successfully." })
        router.refresh()
      } else {
        toast({ title: "Failed to remove picture", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Network error", variant: "destructive" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Upload profile picture if changed
      if (profilePicture) {
        const formData = new FormData()
        formData.append("file", profilePicture)

        const uploadRes = await fetch("/api/users/profile/picture", {
          method: "POST",
          body: formData,
        })

        if (!uploadRes.ok) {
          toast({ title: "Failed to upload profile picture", variant: "destructive" })
          setLoading(false)
          return
        }
      }

      // Update profile
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          bio,
          phoneNumber,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
          location,
          website,
          newsletterSubscribed,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        toast({ title: "Failed to update profile", description: data.error, variant: "destructive" })
        return
      }

      toast({ title: "Profile updated", description: "Your profile has been updated successfully." })
      router.refresh()
    } catch (error) {
      toast({ title: "Network error", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleRequestPasswordReset = async () => {
    setPasswordLoading(true)
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      })

      if (res.ok) {
        toast({
          title: "Password reset email sent",
          description: "Check your email for a link to reset your password.",
        })
      } else {
        toast({ title: "Failed to send reset email", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Network error", variant: "destructive" })
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleDeactivateAccount = async () => {
    if (
      !confirm("Are you sure you want to deactivate your account? This action can be reversed by contacting support.")
    ) {
      return
    }

    try {
      const res = await fetch("/api/users/deactivate", { method: "POST" })
      if (res.ok) {
        toast({ title: "Account deactivated", description: "Your account has been deactivated." })
        router.push("/")
      } else {
        toast({ title: "Failed to deactivate account", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Network error", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal information and profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profilePicturePreview || "/placeholder.svg"} alt={`${firstName} ${lastName}`} />
                <AvatarFallback className="text-2xl">
                  {firstName[0]}
                  {lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Input type="file" accept="image/*" onChange={handleProfilePictureChange} className="max-w-xs" />
                {profilePicturePreview && (
                  <Button type="button" variant="outline" size="sm" onClick={handleRemoveProfilePicture}>
                    Remove Picture
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth</label>
                <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Website</label>
                <Input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={newsletterSubscribed}
                onCheckedChange={(checked) => setNewsletterSubscribed(checked as boolean)}
              />
              <label htmlFor="newsletter" className="text-sm">
                Subscribe to newsletter for latest news and updates
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Address
          </CardTitle>
          <CardDescription>Your email address cannot be changed</CardDescription>
        </CardHeader>
        <CardContent>
          <Input value={user.email} disabled className="max-w-md" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Request a password reset link via email</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            For security reasons, we'll send you an email with a link to reset your password.
          </p>
          <Button type="button" variant="outline" onClick={handleRequestPasswordReset} disabled={passwordLoading}>
            {passwordLoading ? "Sending..." : "Send Password Reset Email"}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleDeactivateAccount}>
            Deactivate Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
