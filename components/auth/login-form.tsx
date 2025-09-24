"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signInAction, initialActionState } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function LoginForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(signInAction, initialActionState)

  useEffect(() => {
    if (state.status === "success") {
      const timeout = setTimeout(() => {
        router.replace("/profile")
      }, 800)
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

      <form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              className="rounded border-gray-300 dark:border-gray-600 text-black focus:ring-black dark:focus:ring-white"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-sm text-black dark:text-white hover:underline">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </>
  )
}
