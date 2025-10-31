"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  Menu,
  Search,
  Home,
  Globe,
  Building,
  TrendingUp,
  Gamepad2,
  Film,
  Smartphone,
  Heart,
  Microscope,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useTheme } from "next-themes"

interface MobileNavProps {
  navigationItems?: string[]
}

const categoryIcons = {
  Home: Home,
  World: Globe,
  Politics: Building,
  Business: Building,
  Economics: TrendingUp,
  Sports: Gamepad2,
  Entertainment: Film,
  Tech: Smartphone,
  Health: Heart,
  Science: Microscope,
}

export function MobileNav({ navigationItems = [] }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user)
      })
      .catch(() => {})
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
      setIsOpen(false)
    }
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setIsOpen(false)
      router.push(`/register?email=${encodeURIComponent(newsletterEmail)}&newsletter=true`)
    }
  }

  const logoSrc =
    mounted && theme === "dark"
      ? "/images/logo/The-SylphCorps-Media-light.png"
      : "/images/logo/The-SylphCorps-Media-dark.png"

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-white dark:bg-gray-900">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex items-center justify-between">
              <div>
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt="SylphCorps Media newsroom"
                  width={400}
                  height={60}
                  priority
                  loading="eager"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-1">Innovating Tomorrow's News Today</p>
              </div>
              <ThemeToggle />
            </div>
          </SheetHeader>

          {/* Search Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = categoryIcons[item as keyof typeof categoryIcons] || Home
                  const href = item === "Home" ? "/" : `/${item.toLowerCase()}`

                  return (
                    <Link
                      key={item}
                      href={href}
                      onClick={handleLinkClick}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{item}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/subscribe"
                  onClick={handleLinkClick}
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors"
                >
                  Subscribe
                </Link>
                <Link
                  href="/about"
                  onClick={handleLinkClick}
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={handleLinkClick}
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            {user && user.newsletterSubscribed ? (
              <div className="space-y-3">
                <p className="text-sm text-center text-gray-700 dark:text-gray-300 mb-3">
                  ✓ You're subscribed to our newsletter
                </p>
                <Link href="/account/settings" onClick={handleLinkClick}>
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
                  >
                    Manage Preferences
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
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
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">© 2025 SylphCorps Media</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
