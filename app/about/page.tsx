import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import Image from "next/image"
import { Suspense } from "react"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function AboutPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-4">
              About SylphCorps Media
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
              Innovating Tomorrow's News Today
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Delivering tomorrow's news today through innovative journalism and cutting-edge technology
            </p>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <Image
                  src="/images/design-mode/scm-mission.jpeg"
                  alt="SylphCorps Media newsroom"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">Our Mission</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  SylphCorps Media is at the forefront of digital journalism, combining traditional reporting excellence
                  with innovative technology to deliver news that matters. We believe in the power of information to
                  shape the future and empower communities worldwide.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Our mission is to provide accurate, timely, and insightful reporting that helps our readers understand
                  today's world and prepare for tomorrow's challenges through cutting-edge journalism and technological
                  innovation.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-6">Our Innovation</h2>
              <div>
                <Image
                  src="/images/design-mode/scm-innovation-tag.jpeg"
                  alt="SylphCorps Media newsroom"
                  width={1100}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-8 mt-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">AI-Powered Reporting</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We leverage artificial intelligence to enhance our reporting capabilities, from data analysis to
                    real-time fact-checking and trend identification.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Digital-First Approach</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our digital-native platform delivers news across multiple channels, ensuring you stay informed
                    wherever you are, whenever you need it.
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Interactive Storytelling</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We use immersive multimedia, data visualization, and interactive elements to make complex stories
                    accessible and engaging.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-6">Our Values</h2>
              <div>
                <Image
                  src="/images/design-mode/scm-values-tag-img.png"
                  alt="SylphCorps Media newsroom"
                  width={1100}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Innovation & Accuracy</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We combine cutting-edge technology with rigorous fact-checking to deliver accurate, verified news
                    faster than ever before.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Transparency & Trust</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We maintain complete transparency in our reporting process, sources, and methodologies to build
                    lasting trust with our audience.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Global Perspective</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our international network of correspondents and digital tools provide comprehensive coverage of
                    global events with local impact.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Future-Ready</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We continuously evolve our platform and reporting methods to stay ahead of industry trends and serve
                    our readers better.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-6">Leadership Team</h2>
              <div>
                <Image
                  src="/images/design-mode/scm-leadership-tag-img.png"
                  alt="SylphCorps Media newsroom"
                  width={1100}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 mt-4">
                SylphCorps Media is led by a diverse team of journalism veterans, technology innovators, and digital
                media pioneers who share a vision for the future of news.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Editorial Excellence</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our editorial team combines decades of journalism experience with expertise in emerging
                    technologies, ensuring both quality and innovation in every story.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Technology Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Our technology team develops proprietary tools and platforms that enhance our reporting capabilities
                    and improve reader experience across all devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-6">Join Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Be part of the future of journalism. Whether you're a reader, contributor, or potential team member,
                we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:newsroom@sylphcorps.media"
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Contact Newsroom
                </a>
                <a
                  href="/careers"
                  className="border border-gray-300 dark:border-gray-600 text-black dark:text-white px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  View Careers
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function AboutPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AboutPageContent />
    </Suspense>
  )
}
