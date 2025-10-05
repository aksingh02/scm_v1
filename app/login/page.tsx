import { Suspense } from "react"
import LoginForm from "@/components/auth/login-form"

export const metadata = {
  title: "Log In | SylphCorps Media",
  description: "Log in to your SylphCorps Media account",
}

function LoginMessage() {
  return (
    <Suspense fallback={null}>
      <LoginMessageContent />
    </Suspense>
  )
}

function LoginMessageContent() {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.search)
  const registered = params.get("registered")

  if (registered === "true") {
    return (
      <div className="mb-6 rounded-md bg-green-50 dark:bg-green-900/20 p-4 text-sm text-green-700 dark:text-green-400">
        Registration successful! Please check your email to verify your account, then log in.
      </div>
    )
  }
  return null
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-black dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Log in to your account</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <LoginMessage />
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
