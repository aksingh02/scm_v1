import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import ForgotPasswordForm from "@/components/auth/forgot-password-form"

async function ForgotPasswordPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
            <CardDescription>
              No worries! Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ForgotPasswordForm />

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">What happens next?</p>
                  <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• We'll send a password reset link to your email</li>
                    <li>• Click the link to create a new password</li>
                    <li>• The link expires in 24 hours for security</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-600 hover:underline font-medium">
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 mb-2">Still having trouble? Contact our support team</p>
          <Link href="/contact" className="text-xs text-blue-600 hover:underline">
            support@sylphcorpsmedia.com
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordPageContent />
    </Suspense>
  )
}
