"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefilledEmail = searchParams.get("email") || ""
  const prefilledNewsletter = searchParams.get("newsletter") === "true"

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState(prefilledEmail)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(prefilledNewsletter)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (prefilledEmail) setEmail(prefilledEmail)
    if (prefilledNewsletter) setSubscribeToNewsletter(true)
  }, [prefilledEmail, prefilledNewsletter])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

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
          agreeToTerms,
          subscribeToNewsletter,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // Redirect to login page after successful registration
        router.push("/login?registered=true")
      } else {
        setError(data.error || data.message || "Registration failed")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(checked === true)} />
        <label
          htmlFor="terms"
          className="text-sm text-gray-700 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <Link href="/terms" className="underline hover:text-gray-900 dark:hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-gray-900 dark:hover:text-white">
            Privacy Policy
          </Link>
        </label>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="newsletter"
          checked={subscribeToNewsletter}
          onCheckedChange={(checked) => setSubscribeToNewsletter(checked === true)}
        />
        <label
          htmlFor="newsletter"
          className="text-sm text-gray-700 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Subscribe to our newsletter for the latest updates
        </label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-black dark:text-white hover:underline">
          Log in
        </Link>
      </p>
    </form>
  )
}
