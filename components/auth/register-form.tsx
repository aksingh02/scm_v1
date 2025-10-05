"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const newsletterParam = searchParams.get("newsletter")

    if (emailParam) {
      setEmail(emailParam)
    }
    if (newsletterParam === "true") {
      setSubscribeToNewsletter(true)
    }
  }, [searchParams])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive",
      })
      return
    }

    if (!agreeToTerms) {
      toast({
        title: "Terms required",
        description: "You must agree to the terms and conditions.",
        variant: "destructive",
      })
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
          agreeToTerms,
          subscribeToNewsletter,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({ title: "Registration failed", description: data.error || "An error occurred", variant: "destructive" })
        return
      }

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      })

      // Redirect to login page with registered flag
      router.push("/login?registered=true")
    } catch (err) {
      toast({ title: "Network error", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            required
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            required
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          required
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          placeholder="john.doe@example.com"
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          required
          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-start">
          <Checkbox
            id="agreeToTerms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            I agree to the{" "}
            <a href="/terms" className="text-black dark:text-white hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-black dark:text-white hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        <div className="flex items-start">
          <Checkbox
            id="subscribeToNewsletter"
            checked={subscribeToNewsletter}
            onCheckedChange={(checked) => setSubscribeToNewsletter(checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="subscribeToNewsletter" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Subscribe to our newsletter for the latest news and updates
          </label>
        </div>
      </div>

      <Button
        className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  )
}
