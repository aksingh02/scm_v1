"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agree) {
      toast({ title: "Please accept Terms and Privacy to continue", variant: "destructive" })
      return
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          agreeToTerms: agree,
          subscribeToNewsletter: newsletter,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        toast({ title: "Registration failed", description: data.error || "Please try again.", variant: "destructive" })
        return
      }
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account.",
      })
    } catch {
      toast({ title: "Network error", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="firstName"
              type="text"
              className="pl-10"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="lastName"
              type="text"
              className="pl-10"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            className="pl-10"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type={showPw ? "text" : "password"}
            className="pl-10 pr-10"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPw((s) => !s)}
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Password must be at least 8 characters with uppercase, lowercase, and numbers
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showPw2 ? "text" : "password"}
            className="pl-10 pr-10"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPw2((s) => !s)}
          >
            {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-start space-x-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span className="text-gray-600 dark:text-gray-400">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <label className="flex items-start space-x-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
          />
          <span className="text-gray-600 dark:text-gray-400">
            Subscribe to our newsletter for the latest news updates
          </span>
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>

      <Separator />

      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  )
}
