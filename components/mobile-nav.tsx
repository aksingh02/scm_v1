"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface MobileNavProps {
  categories: Array<{
    name: string
    href: string
  }>
  onClose: () => void
}

export function MobileNav({ categories, onClose }: MobileNavProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      onClose()
    }
  }

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <div className="md:hidden border-t bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Mobile Navigation Links */}
        <nav className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Additional Mobile Links */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/subscribe"
              onClick={handleLinkClick}
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Subscribe
            </Link>
            <Link
              href="/careers"
              onClick={handleLinkClick}
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
