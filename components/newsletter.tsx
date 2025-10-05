import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { NewsletterClient } from "./newsletter-client"

export async function Newsletter() {
  const user = await getCurrentUser()

  if (user && user.newsletterSubscribed) {
    return (
      <section className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 transition-colors">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">You're Subscribed!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for subscribing to our newsletter. You'll receive the latest news and analysis every morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account/settings">
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 bg-transparent">
                Manage Preferences
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Explore News
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return <NewsletterClient />
}
