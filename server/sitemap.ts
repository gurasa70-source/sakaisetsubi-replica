/**
 * Sitemap generation for SEO
 */

export function generateSitemap(baseUrl: string): string {
  const today = new Date().toISOString().split('T')[0];
  const pages = [
    {
      url: '/',
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      url: '/about',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      url: '/works',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      url: '/design',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
    },
    {
      url: '/blog',
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      url: '/contact',
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}
