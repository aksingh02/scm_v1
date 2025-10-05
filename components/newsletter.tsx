import { Suspense } from "react"
import NewsletterClient from "./newsletter-client"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"
import { Button } from "./ui/button"

async function NewsletterContent() {
  const user = await getCurrentUser()

  if (user?.newsletterSubscribed) {
    return (
      <div className="text-center space-y-4">
        <div className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
          ✓ You're subscribed to our newsletter
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          You'll receive the latest news and updates directly in your inbox. Manage your subscription preferences in
          your account settings.
        </p>
        <Link href="/account/settings">
          <Button variant="outline" className="border-gray-300 dark:border-gray-600 bg-transparent">
            Manage Preferences
          </Button>
        </Link>
      </div>
    )
  }

  return <NewsletterClient />
}

export function Newsletter() {
  return (
    <section className="border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold font-serif text-black dark:text-white mb-2">Stay Informed</h3>
          <p className="text-gray-600 dark:text-gray-400">Get the latest news delivered directly to your inbox</p>
        </div>
        <Suspense
          fallback={
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto opacity-50">
              <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-full sm:w-auto h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          }
        >
          <NewsletterContent />
        </Suspense>
      </div>
    </section>
  )
}
