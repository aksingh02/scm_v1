import { getAllArticles } from "@/lib/data"

export async function GET() {
  const { articles } = await getAllArticles(0, 1000) // Fetch up to 1000 articles

  const urls = articles
    .map(
      (article) => `
      <url>
        <loc>https://media.sylphcorps.com/article/${article.slug}</loc>
        <lastmod>${new Date(article.publishedAt).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`
    )
    .join("")

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
