"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NewsletterClientProps {
  isSubscribed: boolean
  userEmail?: string
}

export default function NewsletterClient({ isSubscribed, userEmail }: NewsletterClientProps) {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      router.push(`/register?email=${encodeURIComponent(email)}&newsletter=true`)
    }
  }

  if (isSubscribed) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-black dark:text-white mb-2">You're Subscribed!</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          You're receiving our newsletter at <span className="font-medium">{userEmail}</span>
        </p>
        <Link href="/account/settings" className="text-sm text-black dark:text-white hover:underline font-medium">
          Manage preferences →
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
      <Button
        type="submit"
        className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
      >
        Subscribe to Newsletter
      </Button>
    </form>
  )
}
