"use client"

import { useActionState } from "react"
import { forgotPasswordAction, initialActionState } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ForgotPasswordForm({ email }: { email?: string }) {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialActionState)

  return (
    <>
      {state.status !== "idle" && (
        <Alert variant={state.status === "error" ? "destructive" : "default"} className="mb-4">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={email}
            placeholder="Enter your email address"
            required
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Sending Reset Link..." : "Send Reset Link"}
        </Button>
      </form>
    </>
  )
}
