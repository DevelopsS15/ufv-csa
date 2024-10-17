module.exports = {
  siteUrl: `https://${process.env.SITE_DOMAIN}/`, // Replace with your site's URL
  generateRobotsTxt: true, // Generates a `robots.txt` file
  sitemapSize: 5000, // You can limit the number of URLs per sitemap file
  exclude: ["/studio/*", "/api/*"], // Exclude specific routes
  changefreq: "monthly", // Set how frequently the pages are likely to change
  priority: 0.5, // Set priority of pages for crawling
};