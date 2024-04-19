export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/profile/',
    },
    sitemap: 'https://acme.com/sitemap.xml',
  }
}