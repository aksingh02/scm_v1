"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { useRouter } from "next/navigation"
import { useDebounce } from "@/hooks/use-debounce"

const categories = [
  { name: "Environment", href: "/environment" },
  { name: "World", href: "/world" },
  { name: "Business", href: "/business" },
  { name: "Technology", href: "/technology" },
  { name: "Science", href: "/science" },
]

const Header = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`)
    }
  }, [debouncedSearchQuery, router])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  const memoizedCategories = useMemo(() => categories, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="SylphCorps Media Home">
            <Image
              src="/images/logo/scm.png"
              alt="SylphCorps Media"
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="text-xl font-bold font-serif hidden sm:block">SylphCorps Media</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            {memoizedCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            <div className="hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search news..."
                  className="pl-8 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search news articles"
                />
              </form>
            </div>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-4 w-4" />
            </Button>

            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <MobileNav categories={memoizedCategories} />
              </SheetContent>
            </Sheet>

            {/* Auth Buttons */}
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

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-2 border-t">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search news..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                aria-label="Search news articles"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
})

Header.displayName = "Header"

export { Header }
