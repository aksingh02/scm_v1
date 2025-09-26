"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ResetPasswordForm({ token }: { token?: string }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      toast({ title: "Invalid reset link", variant: "destructive" })
      return
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      })
      if (res.ok) {
        toast({ title: "Password updated", description: "You can now log in." })
        router.push("/login")
      } else {
        const data = await res.json().catch(() => ({}))
        toast({ title: "Reset failed", description: data.error || "Please try again.", variant: "destructive" })
      }
    } catch {
      toast({ title: "Network error", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-serif text-black dark:text-white mb-2">Reset Password</h1>
        <p className="text-gray-600 dark:text-gray-400">Enter your new password below</p>
      </header>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              className="pl-10"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type="password"
              className="pl-10"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  )
}
