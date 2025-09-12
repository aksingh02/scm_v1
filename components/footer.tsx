import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = {
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about#team" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Advertise", href: "/advertise" },
      ],
    },
    content: {
      title: "Content",
      links: [
        { name: "World News", href: "/world" },
        { name: "Technology", href: "/technology" },
        { name: "Business", href: "/business" },
        { name: "Health", href: "/health" },
        { name: "Science", href: "/science" },
        { name: "Sports", href: "/sports" },
      ],
    },
    support: {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Accessibility", href: "/accessibility" },
      ],
    },
    connect: {
      title: "Stay Connected",
      links: [
        { name: "Newsletter", href: "/subscribe" },
        { name: "RSS Feed", href: "/rss" },
        { name: "Mobile App", href: "/app" },
        { name: "Notifications", href: "/notifications" },
      ],
    },
  }

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/sylphcorps", icon: Facebook },
    { name: "Twitter", href: "https://twitter.com/sylphcorps", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/sylphcorps", icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com/company/sylphcorps", icon: Linkedin },
    { name: "YouTube", href: "https://youtube.com/sylphcorps", icon: Youtube },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image src="/images/logo/scm.png" alt="SylphCorps Media" width={48} height={48} className="rounded-lg" />
              <div>
                <h3 className="text-xl font-bold font-serif">SylphCorps Media</h3>
                <p className="text-sm text-gray-400">Trusted News Source</p>
              </div>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Delivering accurate, timely, and comprehensive news coverage from around the world. Your trusted source
              for breaking news, in-depth analysis, and expert commentary.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>news@sylphcorps.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India (IST)</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md">
            <h4 className="font-semibold text-white mb-2">Subscribe to our Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest news and updates delivered to your inbox.</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>&copy; {currentYear} SylphCorps Media. All rights reserved.</p>
              <p className="mt-1">
                Powered by{" "}
                <Link href="https://sylphcorps.com" className="text-blue-400 hover:text-blue-300">
                  SylphCorps Technologies
                </Link>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-gray-500">
              <Link href="/sitemap" className="hover:text-gray-300">
                Sitemap
              </Link>
              <Link href="/rss" className="hover:text-gray-300">
                RSS
              </Link>
              <Link href="/accessibility" className="hover:text-gray-300">
                Accessibility
              </Link>
              <Link href="/ethics" className="hover:text-gray-300">
                Editorial Ethics
              </Link>
              <Link href="/corrections" className="hover:text-gray-300">
                Corrections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
