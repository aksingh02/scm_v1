"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function NewsletterClient() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      router.push(`/register?email=${encodeURIComponent(email)}&newsletter=true`)
    }
  }

  return (
    <section className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 transition-colors">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">Stay Informed</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get the latest news and analysis delivered to your inbox every morning.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
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
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          By subscribing, you agree to our{" "}
          <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
