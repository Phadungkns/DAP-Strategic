import type { MetadataRoute } from 'next';
import { sanityClient } from '@/lib/sanity';
import { productSlugsQuery } from '@/lib/queries';

// ──────────────────────────────────────────────
// Sitemap — ช่วยให้ Google ค้นหาทุกหน้าได้ครบ
// Next.js จะ serve ที่ /sitemap.xml อัตโนมัติ
// ──────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dapstrategic.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Dynamic product detail pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const slugs = await sanityClient.fetch<Array<{ slug: string }>>(productSlugsQuery);
    productPages = slugs
      .filter((s) => s.slug)
      .map((s) => ({
        url: `${SITE_URL}/products/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  } catch {
    // silently fail — static pages still generated
  }

  return [...staticPages, ...productPages];
}
