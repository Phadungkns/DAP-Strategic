import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronLeft, LayoutGrid } from 'lucide-react';
import { sanityClient } from '@/lib/sanity';
import { productBySlugQuery, productSlugsQuery } from '@/lib/queries';
import type {
  SanityProduct,
  ProductHeroSection,
  ProductStorySection,
  ProductSocialProofSection,
} from '@/types';
import { generatePageMetadata } from '@/lib/seo';
import DetailHeroSection from '@/components/products/detail/DetailHeroSection';
import DetailStorySection from '@/components/products/detail/DetailStorySection';
import DetailSocialProofSection from '@/components/products/detail/DetailSocialProofSection';
import ProductDetailInfo from '@/components/products/detail/ProductDetailInfo';

export const revalidate = 3600;

// ── Static Params for SSG ──
export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<Array<{ slug: string }>>(productSlugsQuery);
    return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

// ── SEO metadata ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let product: SanityProduct | null = null;
  try {
    product = await sanityClient.fetch<SanityProduct>(productBySlugQuery, { slug });
  } catch {
    // fallback
  }

  if (!product) {
    return generatePageMetadata({
      title: 'ไม่พบสินค้า | DAP Strategic Consulting',
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: product.seo?.title || `${product.title} | DAP Strategic Consulting`,
    description:
      product.seo?.description ||
      product.subtitle ||
      product.description?.slice(0, 160),
    ogImage: product.imageUrl,
    path: `/products/${slug}`,
  });
}

// ── Page ──
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: SanityProduct | null = null;
  try {
    product = await sanityClient.fetch<SanityProduct>(productBySlugQuery, { slug });
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }

  if (!product) notFound();

  const heroSections = (
    product.sections?.filter((s) => s._type === 'heroSection') || []
  ) as ProductHeroSection[];
  const storySections = (
    product.sections?.filter((s) => s._type === 'storySection') || []
  ) as ProductStorySection[];
  const socialProofSections = (
    product.sections?.filter((s) => s._type === 'socialProofSection') || []
  ) as ProductSocialProofSection[];

  const primaryHero = heroSections[0] || null;

  return (
    // พื้นหลังหลักเป็น white ตลอด — แต่ละ section จัดการ bg เองตาม rhythm
    <div className="bg-white">

      {/* ── Breadcrumb strip (ต่อจาก Header ซึ่งเป็น dark) ── */}
      <div className="bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-20">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 py-3 text-sm text-white/40 hover:text-white/90 transition-colors duration-200"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full border border-white/15 group-hover:border-white/40 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
            <LayoutGrid className="w-3.5 h-3.5 text-blue-400/70 group-hover:text-blue-300 transition-colors" />
            <span className="tracking-wide">All Products</span>
          </Link>
        </div>
      </div>

      {/* 1. Hero — dark gradient (ต่อจาก breadcrumb strip เดียวกัน) */}
      {primaryHero ? (
        <DetailHeroSection
          section={primaryHero}
          productTitle={product.title}
          productImageUrl={product.imageUrl}
        />
      ) : (
        /* Fallback hero */
        <section className="relative pb-16 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-10 text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.15]">
              {product.title}
            </h1>
            {product.subtitle && (
              <p className="text-lg md:text-xl text-blue-200/80 max-w-2xl mx-auto">
                {product.subtitle}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 2. Story Sections — สีขาว */}
      {storySections.map((section, idx) => (
        <DetailStorySection key={`story-${idx}`} section={section} />
      ))}

      {/* 3. Social Proof — สีเทาอ่อน สลับกับขาว */}
      {socialProofSections.map((section, idx) => (
        <DetailSocialProofSection key={`social-${idx}`} section={section} />
      ))}

      {/* 4. Product Detail Info + Pricing Card */}
      <ProductDetailInfo product={product} />

      {/* 5. Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100 z-50 px-4 py-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-shrink-0 text-right">
            <div className="font-display text-xl font-bold text-gray-900 leading-tight">
              {product.salePrice.toLocaleString('th-TH')}
              <span className="text-sm font-normal text-gray-400 ml-0.5">฿</span>
            </div>
            {product.bookingPrice && (
              <div className="text-xs text-gray-400">จอง {product.bookingPrice.toLocaleString('th-TH')}฿</div>
            )}
          </div>
          <div className="flex-1 flex gap-2">
            {product.bookingLink && product.bookingPrice && (
              <Link
                href={product.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-3 text-sm font-semibold text-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-50 transition-colors"
              >
                จอง
              </Link>
            )}
            {product.ctaLink && (
              <Link
                href={product.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-3 py-3 text-sm font-bold text-white bg-blue-900 rounded-full hover:bg-blue-800 transition-colors"
              >
                สั่งซื้อเลย
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Spacer มือถือ */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
