"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { Search, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { debounce } from "lodash"

const categories = [
  { name: "Politics", href: "/politics" },
  { name: "Technology", href: "/technology" },
  { name: "Business", href: "/business" },
  { name: "Sports", href: "/sports" },
  { name: "Entertainment", href: "/entertainment" },
  { name: "Health", href: "/health" },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`)
          setIsSearchOpen(false)
        }
      }, 300),
    [router],
  )

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      debouncedSearch(searchQuery)
    },
    [searchQuery, debouncedSearch],
  )

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="SylphCorps Media Home">
            <Image
              src="/images/logo/scm.webp"
              alt="SylphCorps Media"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="text-xl md:text-2xl font-bold font-serif text-black dark:text-white">
              SylphCorps Media
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="w-64"
                    autoFocus
                    aria-label="Search articles"
                  />
                  <Button type="submit" size="sm" aria-label="Submit search">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery("")
                    }}
                    aria-label="Close search"
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} aria-label="Open search">
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile Search */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => router.push("/search")} aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <MobileNav categories={categories} />
              </SheetContent>
            </Sheet>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/subscribe">Subscribe</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
