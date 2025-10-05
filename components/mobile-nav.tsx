"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface MobileNavProps {
  navigationItems: string[]
}

interface User {
  newsletterSubscribed?: boolean
}

export function MobileNav({ navigationItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsOpen(false)
      router.push(`/register?email=${encodeURIComponent(email)}&newsletter=true`)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-96 overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-serif">Menu</h2>
            <ThemeToggle />
          </div>

          <nav className="flex-1 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {navigationItems.map((item) => (
              <div key={item}>
                <button
                  className="w-full flex items-center justify-between px-4 py-2 text-lg hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                  onClick={() => setExpandedCategory(expandedCategory === item ? null : item)}
                >
                  {item}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${expandedCategory === item ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedCategory === item && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      All {item}
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            {user?.newsletterSubscribed ? (
              <div className="space-y-3">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-sm text-center">
                  ✓ Subscribed
                </div>
                <Link href="/account/settings" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Manage Preferences
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
