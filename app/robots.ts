import type { MetadataRoute } from 'next';

// ──────────────────────────────────────────────
// Robots.txt — บอก search engine ว่า crawl อะไรได้บ้าง
// Next.js จะ serve ที่ /robots.txt อัตโนมัติ
// ──────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dapstrategic.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
