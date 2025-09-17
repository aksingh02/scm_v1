import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllCategories } from "@/lib/data"
import { MapPin, Clock, Users, Award, Coffee, Heart } from "lucide-react"
import { Suspense } from "react"

async function CareersPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  const jobOpenings = [
    {
      title: "Senior Journalist",
      department: "Editorial",
      location: "New Delhi",
      type: "Full-time",
      experience: "5+ years",
      description:
        "We're looking for an experienced journalist to join our editorial team and cover national politics and policy.",
    },
    {
      title: "Digital Content Creator",
      department: "Digital Media",
      location: "New Delhi",
      type: "Full-time",
      experience: "2-4 years",
      description: "Create engaging digital content across social media platforms and manage our online presence.",
    },
    {
      title: "Data Journalist",
      department: "Editorial",
      location: "New Delhi / Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Analyze complex datasets and create compelling data-driven stories and visualizations.",
    },
    {
      title: "Video Producer",
      department: "Multimedia",
      location: "New Delhi",
      type: "Full-time",
      experience: "3+ years",
      description: "Produce high-quality video content for our digital platforms and documentaries.",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "New Delhi",
      type: "Full-time",
      experience: "2-3 years",
      description: "Drive subscriber growth and engagement through innovative marketing campaigns.",
    },
    {
      title: "Software Engineer",
      department: "Technology",
      location: "New Delhi / Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Build and maintain our digital platforms and develop new features for our readers.",
    },
  ]

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Work-Life Balance",
      description: "Flexible working hours, remote work options, and generous paid time off",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Professional Growth",
      description: "Learning stipend, conference attendance, and career development opportunities",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Culture",
      description: "Work with award-winning journalists and innovative technologists",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Be part of a dynamic team that's shaping the future of digital journalism. We're looking for passionate
              individuals who want to make a difference through storytelling and innovation.
            </p>
          </header>

          {/* Company Culture */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-8 text-center">
              Why Work at SylphCorps Media?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">{benefit.icon}</div>
                    <h3 className="font-semibold text-black dark:text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Job Openings */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-8 text-center">
              Current Openings
            </h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl font-semibold text-black dark:text-white mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline">{job.experience}</Badge>
                        </div>
                      </div>
                      <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                        Apply Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Application Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold font-serif text-black dark:text-white mb-8 text-center">
              Application Process
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Apply Online</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Submit your application with your resume, cover letter, and portfolio samples.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Initial Review</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our hiring team will review your application and reach out within 1-2 weeks.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Interview Process</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Multiple rounds including technical assessment, team interviews, and culture fit.
                </p>
              </div>
            </div>
          </section>

          {/* Contact for Careers */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">Don't see the right role?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future
              opportunities.
            </p>
            <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
              Send Your Resume
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Email us at careers@sylphcorpsmedia.com</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function CareersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CareersPageContent />
    </Suspense>
  )
}
