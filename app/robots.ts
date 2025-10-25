import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://sylphcorpsmedia.com/sitemap.xml",
      "https://sylphcorpsmedia.com/server-sitemap.xml",
    ],
  }
}
