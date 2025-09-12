import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

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
  metadataBase: new URL("https://media.sylphcorps.com"),
  openGraph: {
    title: "SylphCorps Media - Innovating Tomorrow's News Today",
    description: "Delivering tomorrow's news today through innovative journalism and cutting-edge technology.",
    url: "https://media.sylphcorps.com",
    siteName: "SylphCorps Media",
    images: [
      {
        url: "/images/logo/scm.png",
        width: 1200,
        height: 630,
        alt: "SylphCorps Media",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SylphCorps Media - Innovating Tomorrow's News Today",
    description: "Delivering tomorrow's news today through innovative journalism and cutting-edge technology.",
    images: ["/images/logo/scm.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://media-api.sylphcorps.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
