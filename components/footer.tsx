import { Separator } from "@/components/ui/separator"
import { X, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black dark:bg-gray-950 text-white mt-16 transition-colors">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold font-serif mb-2">SylphCorps Media</h3>
            <p className="text-sm text-gray-400 italic mb-4">Innovating Tomorrow's News Today</p>
            <p className="text-gray-300 dark:text-gray-400 text-sm">
              Delivering tomorrow's news today through innovative journalism and cutting-edge technology. Your trusted
              source for comprehensive coverage of global events.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Sections</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <Link href="/environment" className="hover:text-white transition-colors">
                  Environment
                </Link>
              </li>
              <li>
                <Link href="/world" className="hover:text-white transition-colors">
                  World
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-white transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-white transition-colors">
                  Science
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-white transition-colors">
                  Advertise
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-white transition-colors">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-4">
              {/* <Link href="#" className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link> */}
              <Link
                href="https://x.com/sylphcorpsmedia"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/sylphcorpsmedia"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@sylphcorpsmedia"
                className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
            <div className="text-sm text-gray-300 dark:text-gray-400">
              <p>Newsletter</p>
              <p className="text-xs mt-1">Get daily updates delivered to your inbox</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700 dark:bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} SylphCorps Media. All rights reserved.</p>
          <p>
            Founder & CEO: <strong>A. K. Singh</strong>{" "}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}