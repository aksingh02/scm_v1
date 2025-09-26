"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ResetPasswordForm({ token = "" }: { token?: string }) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string>("")
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword }),
    })
    const ok = res.ok
    const data = await res.json().catch(() => ({}))
    setMessage(ok ? "Password reset successful. You can now log in." : data?.error || "Failed to reset password.")
    setLoading(false)
    if (ok) {
      setTimeout(() => router.push("/login"), 1000)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {message && (
        <div
          className={`rounded p-3 ${message.includes("successful") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
        >
          {message}
        </div>
      )}
      <Input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading || !token}>
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  )
}
