"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function VerifyEmailClient({ token = "" }: { token?: string }) {
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    async function verify() {
      if (!token) return
      setStatus("verifying")
      const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      const ok = res.ok
      let text = "Email verified successfully."
      if (!ok) {
        const data = await res.json().catch(() => ({}))
        text = data?.error || "Invalid or expired verification token."
      }
      setMessage(text)
      setStatus(ok ? "success" : "error")
    }
    verify()
  }, [token])

  async function resend() {
    if (!email) return
    setStatus("verifying")
    const res = await fetch(`/api/auth/resend-verification?email=${encodeURIComponent(email)}`, { method: "POST" })
    const ok = res.ok
    const data = await res.json().catch(() => ({}))
    setMessage(ok ? "Verification email sent successfully." : data?.error || "Failed to send verification email.")
    setStatus(ok ? "success" : "error")
  }

  return (
    <div className="space-y-6">
      {status !== "idle" && (
        <div
          className={`rounded-md p-4 ${status === "success" ? "bg-green-50 text-green-700" : status === "error" ? "bg-red-50 text-red-700" : "bg-gray-50 text-gray-700"}`}
          role="status"
          aria-live="polite"
        >
          {status === "verifying" ? "Verifying..." : message}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          type="email"
          placeholder="Enter your email to resend verification"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button onClick={resend} disabled={!email || status === "verifying"}>
          Resend
        </Button>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.push("/login")}>
          Go to Login
        </Button>
        <Button variant="ghost" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}
