import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getAllCategories } from "@/lib/data"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Suspense } from "react"

async function ContactPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Get in touch with our newsroom and editorial team
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={6}
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-6">Get in touch</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">business@sylphcorpsmedia.com</p>
                    <p className="text-gray-600 dark:text-gray-400">newsletter@sylphcorpsmedia.com</p>
                    <p className="text-gray-600 dark:text-gray-400">support@sylphcorpsmedia.com</p>
                    <p className="text-gray-600 dark:text-gray-400">admin@sylphcorpsmedia.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-gray-600 dark:text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">Newsroom: +91 7042954064</p>
                    <p className="text-gray-600 dark:text-gray-400">Subscriptions: +91 7042954064</p>
                    <p className="text-gray-600 dark:text-gray-400">Advertising: +91 7042954064</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      SylphCorps Media
                      <br />
                      Block A, Krishna Nagar
                      <br />
                      New Delhi, Delhi 110051
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-gray-600 dark:text-gray-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-gray-600 dark:text-gray-400">Saturday: 10:00 AM - 4:00 PM IST</p>
                    <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      *Newsroom operates 24/7 for breaking news
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-black dark:text-white mb-3">News Tips</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Have a story tip or breaking news? Contact our newsroom directly at newsletter@sylphcorpsmedia.com or call our
                  24/7 tip line at +91 7042954064. We protect the confidentiality of our sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  )
}
