import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "SylphCorps Media - Breaking News & Analysis",
  description:
    "Stay informed with the latest breaking news, in-depth analysis, and expert commentary from SylphCorps Media. Your trusted source for global news coverage.",
  keywords: "news, breaking news, analysis, global news, current events, journalism",
  authors: [{ name: "SylphCorps Media" }],
  creator: "SylphCorps Media",
  publisher: "SylphCorps Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://media.sylphcorps.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SylphCorps Media - Breaking News & Analysis",
    description:
      "Stay informed with the latest breaking news, in-depth analysis, and expert commentary from SylphCorps Media.",
    url: "https://media.sylphcorps.com",
    siteName: "SylphCorps Media",
    images: [
      {
        url: "/images/logo/scm.webp",
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
    title: "SylphCorps Media - Breaking News & Analysis",
    description:
      "Stay informed with the latest breaking news, in-depth analysis, and expert commentary from SylphCorps Media.",
    images: ["/images/logo/scm.webp"],
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
        <link rel="preconnect" href="https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://media-api.sylphcorps.com" />
        <link rel="preload" href="/images/logo/scm.webp" as="image" type="image/webp" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .line-clamp-3 {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
