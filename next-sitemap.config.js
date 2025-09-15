/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://media.sylphcorps.com", // your live domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/server-sitemap.xml"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://media.sylphcorps.com/sitemap.xml",
      "https://media.sylphcorps.com/server-sitemap.xml",
        ],
  },
}
