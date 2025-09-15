import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://media.sylphcorps.com/sitemap.xml",
      "https://media.sylphcorps.com/server-sitemap.xml",
    ],
  }
}
