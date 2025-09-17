import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getAllCategories } from "@/lib/data"
import { Users, Eye, Target, TrendingUp, Globe, Smartphone, Monitor, Newspaper } from "lucide-react"
import { Suspense } from "react"

async function AdvertisePageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  const adFormats = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Display Ads",
      description: "Banner ads, rectangles, and custom formats across our website",
      pricing: "Starting from ₹5,000/month",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Ads",
      description: "Optimized mobile advertising for our growing mobile audience",
      pricing: "Starting from ₹3,000/month",
    },
    {
      icon: <Newspaper className="h-8 w-8" />,
      title: "Newsletter Sponsorship",
      description: "Sponsored content in our daily newsletter reaching 50K+ subscribers",
      pricing: "Starting from ₹8,000/week",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Native Content",
      description: "Sponsored articles and branded content that matches our editorial style",
      pricing: "Starting from ₹15,000/article",
    },
  ]

  const audienceStats = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Monthly Readers",
      value: "2.5M+",
      description: "Unique monthly visitors",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Page Views",
      value: "8M+",
      description: "Monthly page views",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Engagement Rate",
      value: "4.2%",
      description: "Above industry average",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Rate",
      value: "25%",
      description: "Year-over-year growth",
    },
  ]

  const demographics = [
    { category: "Age 25-34", percentage: "35%" },
    { category: "Age 35-44", percentage: "28%" },
    { category: "Age 45-54", percentage: "22%" },
    { category: "College Educated", percentage: "78%" },
    { category: "Urban Areas", percentage: "65%" },
    { category: "Mobile Users", percentage: "72%" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6">
              Advertise With Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Reach millions of engaged readers with targeted advertising solutions. Connect with our premium audience
              through various advertising formats tailored to your business needs.
            </p>
          </header>

          {/* Audience Statistics */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-8 text-center">Our Reach</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {audienceStats.map((stat, index) => (
                <Card key={index} className="border-gray-200 dark:border-gray-700 text-center">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">{stat.icon}</div>
                    <div className="text-3xl font-bold text-black dark:text-white mb-2">{stat.value}</div>
                    <h3 className="font-semibold text-black dark:text-white mb-1">{stat.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Advertising Formats */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-8 text-center">
              Advertising Solutions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {adFormats.map((format, index) => (
                <Card key={index} className="border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="text-blue-600 dark:text-blue-400">{format.icon}</div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-black dark:text-white">
                          {format.title}
                        </CardTitle>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{format.pricing}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{format.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Audience Demographics */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-8">Our Audience</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Our readers are educated professionals, decision-makers, and engaged citizens who value quality
                  journalism and in-depth analysis. They represent a premium demographic with significant purchasing
                  power.
                </p>
                <div className="space-y-4">
                  {demographics.map((demo, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{demo.category}</span>
                      <span className="font-semibold text-black dark:text-white">{demo.percentage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-8">Why Choose Us?</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                      Premium Content Environment
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your ads appear alongside high-quality journalism and trusted content, enhancing brand
                      credibility.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Targeted Reach</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Advanced targeting options by demographics, interests, and reading behavior for maximum ROI.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Detailed Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Comprehensive reporting and analytics to track campaign performance and optimize results.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Custom Solutions</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Tailored advertising packages to meet your specific business objectives and budget requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-6">Get Started Today</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Ready to reach our engaged audience? Fill out the form and our advertising team will get back to you
                  within 24 hours with a customized proposal.
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-400">Email: business@sylphcorpsmedia.com</p>
                    <p className="text-gray-600 dark:text-gray-400">Phone: +91 7042954064</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>

              <div>
                <Card className="border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-black dark:text-white">
                      Request a Proposal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
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
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Company
                        </label>
                        <Input
                          id="company"
                          type="text"
                          required
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
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
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Monthly Budget Range
                        </label>
                        <select
                          id="budget"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-10k">Under ₹10,000</option>
                          <option value="10k-25k">₹10,000 - ₹25,000</option>
                          <option value="25k-50k">₹25,000 - ₹50,000</option>
                          <option value="50k-100k">₹50,000 - ₹1,00,000</option>
                          <option value="over-100k">Over ₹1,00,000</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Campaign Details
                        </label>
                        <Textarea
                          id="message"
                          rows={4}
                          placeholder="Tell us about your advertising goals and target audience..."
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                        Request Proposal
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function AdvertisePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdvertisePageContent />
    </Suspense>
  )
}
