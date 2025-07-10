"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  navigationItems?: string[]
}

export function Header({ navigationItems = [] }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Top Bar */}
      <div className="border-b border-gray-100 dark:border-gray-800 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="sm:hidden">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/subscribe" className="hover:text-gray-900 dark:hover:text-gray-100 hidden sm:block">
              Subscribe
            </Link>
            <Link href="/login" className="hover:text-gray-900 dark:hover:text-gray-100">
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MobileNav navigationItems={["Home", ...navigationItems]} />
            <div className="text-center">
              <Link href="/" className="text-2xl md:text-3xl font-bold font-serif text-black dark:text-white block">
                SylphCorps Media
              </Link>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 italic">
                Innovating Tomorrow's News Today
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <form action="/search" method="GET" className="hidden lg:flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                name="q"
                placeholder="Search news..."
                className="w-64 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 bg-white dark:bg-gray-800"
              />
            </form>
            <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 text-sm px-3 py-2 md:px-4">
              <span className="hidden sm:block">Subscribe</span>
              <span className="sm:hidden">Sub</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center space-x-8 py-3 overflow-x-auto">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            {navigationItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
