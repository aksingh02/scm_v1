"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signUpAction, initialActionState } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function RegisterForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(signUpAction, initialActionState)
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true)

  useEffect(() => {
    if (state.status === "success") {
      const timeout = setTimeout(() => {
        router.replace("/login")
      }, 1200)
      return () => clearTimeout(timeout)
    }
    return undefined
  }, [state.status, router])

  return (
    <>
      {state.status !== "idle" && (
        <Alert variant={state.status === "error" ? "destructive" : "default"} className="mb-4">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </label>
            <Input id="firstName" name="firstName" type="text" placeholder="John" className="pl-3" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </label>
            <Input id="lastName" name="lastName" type="text" placeholder="Doe" className="pl-3" required />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input id="password" name="password" type="password" placeholder="Create a strong password" required />
          <p className="text-xs text-gray-500">
            Password must be at least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-start space-x-2 text-sm">
            <input
              type="checkbox"
              name="agreeToTerms"
              className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <span className="text-gray-600 dark:text-gray-400">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>

          <label className="flex items-start space-x-2 text-sm">
            <input
              type="checkbox"
              name="subscribeToNewsletter"
              className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={newsletterSubscribed}
              onChange={(event) => setNewsletterSubscribed(event.target.checked)}
            />
            <span className="text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest news updates
            </span>
          </label>
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </>
  )
}
