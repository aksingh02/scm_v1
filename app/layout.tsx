import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

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
  metadataBase: new URL("https://sylphcorpsmedia.com"),
  alternates: {
    canonical: "https://sylphcorpsmedia.com",
  },
  openGraph: {
    type: "website",
    url: "https://sylphcorpsmedia.com",
    title: "SylphCorps Media - Latest News & Insights",
    description:
      "Stay informed with global news from SylphCorps Media. Covering technology, business, politics, health, science, and more.",
    images: [
      {
        url: "https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com/scm-about/scm-values-tag-img.png",
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
    images: ["https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com/scm-about/scm-values-tag-img.png"],
  },
  icons: {
    icon: "/images/logo/scm.png",
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
        <link rel="dns-prefetch" href="https://api.sylphcorpsmedia.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "SylphCorps Media",
              url: "https://sylphcorpsmedia.com",
              logo: "https://sylphcorpsmedia.com/images/logo/scm.png",
              sameAs: [
                "https://x.com/sylphcorpsmedia",
                "https://www.linkedin.com/company/sylphcorpsmedia"
              ],
            }),
          }}
        />

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GKP2RH52PT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GKP2RH52PT');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
