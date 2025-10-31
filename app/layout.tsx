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
    default: "SylphCorps Media - Latest News & Insights | Sylphcorp News",
    template: "%s | SylphCorps Media - News & Insights",
  },
  description:
    "Global news platform delivering latest insights on technology, business, politics, health, and science from SylphCorps Media.",
  keywords: [
    "sylphcorps",
    "sylphcorp",
    "media",
    "news",
    "corp",
    "corps",
    "sylph",
    "global news",
    "latest news",
    "news analysis",
  ],
  metadataBase: new URL("https://sylphcorpsmedia.com"),
  alternates: {
    canonical: "https://sylphcorpsmedia.com",
  },
  openGraph: {
    type: "website",
    url: "https://sylphcorpsmedia.com",
    title: "SylphCorps Media - Global News, Insights & Analysis",
    description:
      "Stay informed with latest global news from SylphCorps Media. Breaking news coverage of technology, business, politics, health, science, and world events.",
    siteName: "SylphCorps Media",
    images: [
      {
        url: "https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com/scm-about/scm-values-tag-img.png",
        width: 1200,
        height: 630,
        alt: "SylphCorps Media - Global News Platform",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sylphcorpsmedia",
    creator: "@sylphcorpsmedia",
    title: "SylphCorps Media - Global News & Insights",
    description:
      "Latest global news and insights on technology, business, politics, health, and science from SylphCorps Media.",
    images: ["https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com/scm-about/scm-values-tag-img.png"],
  },
  icons: {
    icon: "/images/logo/SCM-favicon.png",
    apple: "/images/logo/SCM-favicon.png",
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
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://scm-s3-image-bucket.s3.ap-south-1.amazonaws.com" />
        <link rel="dns-prefetch" href="https://media-api.sylphcorps.com" />
        <link rel="alternate" hrefLang="en-US" href="https://sylphcorpsmedia.com" />

        {/* Schema Markup for News Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "SylphCorps Media",
              alternateName: ["Sylphcorp", "Sylph Corps", "SCM News", "Sylph", "Sylphs", "Corp", "Corps"],
              url: "https://sylphcorpsmedia.com",
              logo: {
                "@type": "ImageObject",
                url: "https://sylphcorpsmedia.com/images/logo/SCM-favicon.png",
                width: 70,
                height: 70,
              },
              description:
                "Global news platform delivering latest insights on technology, business, politics, health, and science.",
              sameAs: [
                "https://x.com/sylphcorpsmedia",
                "https://www.linkedin.com/company/sylphcorpsmedia",
                "https://www.instagram.com/sylphcorpsmedia",
                "https://www.youtube.com/@sylphcorpsmedia",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Editorial",
                email: "contact@sylphcorpsmedia.com",
              },
              founders: [
                {
                  "@type": "Person",
                  name: "A. K. Singh",
                  url: "https://sylphcorpsmedia.com",
                },
              ],
              knowsAbout: ["Technology", "Business", "Politics", "Health", "Science", "World News", "Global Events"],
            }),
          }}
        />

        {/* Schema Markup for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SylphCorps Media",
              url: "https://sylphcorpsmedia.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://sylphcorpsmedia.com/search?q={search_term_string}",
                },
                query_input: "required name=search_term_string",
              },
            }),
          }}
        />

        {/* ✅ Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-GKP2RH52PT" strategy="afterInteractive" />
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
