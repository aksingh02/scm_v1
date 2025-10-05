"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Menu, X } from "lucide-react"

interface MobileNavProps {
  navigationItems: string[]
}

export function MobileNav({ navigationItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsOpen(false)
      router.push(`/register?email=${encodeURIComponent(email)}&newsletter=true`)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="text-2xl font-bold font-serif" onClick={() => setIsOpen(false)}>
              SCM News
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <nav className="flex-1 space-y-4">
            <Link
              href="/"
              className="block py-2 text-lg hover:text-gray-600 dark:hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {navigationItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="block py-2 text-lg hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">
              {user?.newsletterSubscribed ? "Newsletter" : "Stay Updated"}
            </h3>
            {user?.newsletterSubscribed ? (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">✓ You're subscribed to our newsletter</p>
                <Link
                  href="/account/settings"
                  className="text-black dark:text-white hover:underline font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Manage preferences →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
                <Button
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                >
                  Subscribe to Newsletter
                </Button>
              </form>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
