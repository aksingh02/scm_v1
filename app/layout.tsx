import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SylphCorps Media - Innovating Tomorrow's News Today",
  description:
    "Delivering tomorrow's news today through innovative journalism and cutting-edge technology. Your trusted source for comprehensive coverage of global events.",
  generator: "v0.dev",
  icons: {
    icon: "/images/logo/scm.png",
    shortcut: "/images/logo/scm.png",
    apple: "/images/logo/scm.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
