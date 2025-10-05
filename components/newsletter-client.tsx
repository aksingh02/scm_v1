"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NewsletterClient() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      router.push(`/register?email=${encodeURIComponent(email)}&newsletter=true`)
    }
  }

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email address"
        className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
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
