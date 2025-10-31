"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, LogOut, SettingsIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  navigationItems?: string[]
}

interface SessionState {
  loading: boolean
  authenticated: boolean
  user?: {
    firstName?: string
    lastName?: string
    fullName?: string
    email?: string
    profilePictureUrl?: string | null
  } | null
}

export function Header({ navigationItems = [] }: HeaderProps) {
  const [session, setSession] = useState<SessionState>({ loading: true, authenticated: false, user: null })
  const pathname = usePathname()

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" })
        if (!mounted) return
        if (res.ok) {
          const data = await res.json()
          setSession({ loading: false, authenticated: true, user: data.user })
        } else {
          setSession({ loading: false, authenticated: false, user: null })
        }
      } catch {
        setSession({ loading: false, authenticated: false, user: null })
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  async function signOut() {
    await fetch("/api/auth/signout", { method: "POST" })
    window.location.reload()
  }

  const userInitials = session.user?.fullName?.[0] || session.user?.firstName?.[0] || session.user?.email?.[0] || ""

  const getActiveCategorySlug = () => {
    const parts = pathname.split("/")
    if (
      parts.length > 1 &&
      parts[1] !== "" &&
      !["login", "register", "search", "article", "account", "subscribe", "advertise", "about"].includes(parts[1])
    ) {
      return parts[1].toLowerCase()
    }
    return null
  }

  const activeCategorySlug = getActiveCategorySlug()

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

            {/* Auth area */}
            {!session.loading && !session.authenticated && (
              <Link href="/login" className="hover:text-gray-900 dark:hover:text-gray-100">
                Log In
              </Link>
            )}
            {!session.loading && session.authenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button aria-label="User menu" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.profilePictureUrl || undefined} alt="User avatar" />
                      <AvatarFallback>{userInitials || <UserIcon className="h-4 w-4" />}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">
                    {session.user?.fullName || session.user?.email || "Account"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/account/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Account settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MobileNav navigationItems={["Home", ...navigationItems]} />

            <Link href="/" className="flex items-center">
              {/* <Image
                src="/images/logo/scm.png"
                alt="SylphCorps Media newsroom"
                width={70}
                height={70}
                className="rounded-lg shadow-lg"
                sizes="70px"
                priority
                loading="eager"
              /> */}
              <div className="text-center">
                <Image
                  src="/images/logo/The-SylphCorps-Media-dark.png" alt="SylphCorps Media newsroom"
                  width={400}
                  height={60} 
                  priority 
                  loading="eager" />
                {/* <span className="text-2xl md:text-3xl font-bold font-serif text-black dark:text-white block">
                  SylphCorps Media
                </span> */}
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 italic mt-1">
                  Innovating Tomorrow&apos;s News Today
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <form action="/search" method="GET" className="hidden lg:flex items-center space-x-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  name="q"
                  placeholder="Search news..."
                  className="w-64 pl-10 border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 bg-white dark:bg-gray-800"
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
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center space-x-8 py-4 overflow-x-auto">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${pathname === "/"
                ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`}
            >
              Home
            </Link>
            {navigationItems.map((item) => {
              const itemSlug = item.toLowerCase()
              const isActive = activeCategorySlug === itemSlug
              return (
                <Link
                  key={item}
                  href={`/${itemSlug}`}
                  className={`text-sm font-medium transition-colors whitespace-nowrap ${isActive
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {item}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}
