import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { SettingsForm } from "./settings-form"

async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("scm_token")?.value

  if (!token) {
    return null
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sylphcorpsmedia.com"}/api/news-users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEWS_API_KEY || "",
        },
        cache: "no-store",
      },
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch user:", error)
    return null
  }
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Account Settings</h1>
        <SettingsForm user={user} />
      </div>
    </div>
  )
}
