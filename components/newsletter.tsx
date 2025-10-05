import { getCurrentUser } from "@/lib/auth"
import NewsletterClient from "./newsletter-client"

export async function Newsletter() {
  const user = await getCurrentUser()

  return (
    <section className="bg-gray-100 dark:bg-gray-700 py-12 m-12 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4 text-black dark:text-white">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get the latest news and updates delivered directly to your inbox.
          </p>
          <NewsletterClient isSubscribed={user?.newsletterSubscribed || false} userEmail={user?.email} />
        </div>
      </div>
    </section>
  )
}
