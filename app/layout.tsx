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
  title: {
    default: "SylphCorps Media - Latest News & Insights",
    template: "%s | SylphCorps Media",
  },
  description:
    "Get the latest global news, insights, and analysis from SylphCorps Media. Covering technology, business, politics, health, and more.",
  generator: "v0.dev",
  metadataBase: new URL("https://media.sylphcorps.com"),
  alternates: {
    canonical: "https://media.sylphcorps.com",
  },
  openGraph: {
    type: "website",
    url: "https://media.sylphcorps.com",
    title: "SylphCorps Media - Latest News & Insights",
    description:
      "Stay informed with global news from SylphCorps Media. Covering technology, business, politics, health, science, and more.",
    images: [
      {
        url: "https://media.sylphcorps.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SylphCorps Media - News and Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sylphcorps",
    title: "SylphCorps Media - Latest News & Insights",
    description:
      "Latest global news & insights from SylphCorps Media. Covering technology, politics, health, and more.",
    images: ["https://media.sylphcorps.com/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "SylphCorps Media",
              url: "https://media.sylphcorps.com",
              logo: "https://media.sylphcorps.com/images/logo/scm.png",
              sameAs: [
                "https://twitter.com/sylphcorps",
                "https://www.linkedin.com/company/sylphcorps"
              ],
            }),
          }}
        />
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
