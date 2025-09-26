"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 403) {
          toast({
            title: "Email not verified",
            description: "Please verify your email. You can resend the verification email below.",
          })
        } else {
          toast({ title: "Sign in failed", description: data.error || "Invalid credentials", variant: "destructive" })
        }
        return
      }

      toast({ title: "Welcome back!", description: "You have signed in successfully." })
      router.push("/")
    } catch (err) {
      toast({ title: "Network error", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          required
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <Input
          id="password"
          type="password"
          required
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="rounded border-gray-300 dark:border-gray-600 text-black focus:ring-black dark:focus:ring-white"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
        <Link href="/forgot-password" className="text-sm text-black dark:text-white hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button
        className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={async () => {
            if (!email) {
              return toast({ title: "Enter your email", description: "Provide email to resend verification." })
            }
            const r = await fetch(`/api/auth/resend-verification?email=${encodeURIComponent(email)}`, {
              method: "POST",
            })
            if (r.ok) {
              toast({ title: "Verification sent", description: "Check your email for the verification link." })
            } else {
              toast({
                title: "Unable to resend",
                description: "Please try again or contact support.",
                variant: "destructive",
              })
            }
          }}
        >
          Resend verification email
        </button>
      </div>
    </form>
  )
}
