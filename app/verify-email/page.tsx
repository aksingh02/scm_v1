import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

async function VerifyContent({ token }: { token?: string }) {
  const [categories] = await Promise.all([getAllCategories()])
  const navigationItems = categories.map((c) => c.name)

  let status: "idle" | "success" | "error" = "idle"
  let message = "No token provided. Please check your email link or resend verification."

  if (token) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/auth/verify-email?token=${encodeURIComponent(token)}`,
        {
          cache: "no-store",
        },
      )
      if (res.ok) {
        status = "success"
        message = "Email verified successfully. You can now log in."
      } else {
        status = "error"
        const data = await res.json().catch(() => ({}))
        message = data.error || "Invalid or expired verification token."
      }
    } catch {
      status = "error"
      message = "Network error. Please try again."
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />
      <main className="container mx-auto px-4 py-16 max-w-xl">
        <div className="text-center border border-gray-200 dark:border-gray-700 rounded-lg p-8">
          {status === "success" ? (
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          ) : status === "error" ? (
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          ) : (
            <RefreshCw className="h-12 w-12 text-gray-400 animate-spin mx-auto mb-4" />
          )}
          <h1 className="text-2xl font-bold font-serif text-black dark:text-white mb-2">Email Verification</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Go to Login
            </Link>
            <Link
              href="/register"
              className="border border-gray-300 dark:border-gray-600 text-black dark:text-white px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default async function VerifyEmailPage({ searchParams }: { searchParams?: Promise<{ token?: string }> }) {
  const params = (await searchParams) || {}
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16">Verifying...</div>}>
      <VerifyContent token={params.token} />
    </Suspense>
  )
}
