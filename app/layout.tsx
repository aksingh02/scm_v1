import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "SylphCorps Media - Innovating Tomorrow's News Today",
    template: "%s | SylphCorps Media",
  },
  description:
    "Your trusted source for breaking news, analysis, and insights. Delivering tomorrow's news today through innovative journalism and cutting-edge technology.",
  keywords: ["news", "breaking news", "journalism", "technology", "business", "health", "science"],
  authors: [{ name: "SylphCorps Media" }],
  creator: "SylphCorps Media",
  publisher: "SylphCorps Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://sylphcorps.media"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sylphcorps.media",
    siteName: "SylphCorps Media",
    title: "SylphCorps Media - Innovating Tomorrow's News Today",
    description: "Your trusted source for breaking news, analysis, and insights.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "SylphCorps Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SylphCorps Media - Innovating Tomorrow's News Today",
    description: "Your trusted source for breaking news, analysis, and insights.",
    images: ["/images/twitter-image.png"],
    creator: "@sylphcorpsmedia",
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
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://media-api.sylphcorps.com" />
        <link rel="dns-prefetch" href="https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
