import React from 'react';
import type { Metadata } from 'next';
import { ShoppingCart } from 'lucide-react';
import { sanityClient } from '@/lib/sanity';
import { productsQuery, productsPageQuery } from '@/lib/queries';
import type { SanityProduct, ProductsPageContent } from '@/types';
import ProductHero from '@/components/products/ProductHero';
import ProductSolution from '@/components/products/ProductSolution';
import ProductBenefits from '@/components/products/ProductBenefits';
import ProductGrid from '@/components/products/ProductGrid';
import ProductsCTA from '@/components/products/ProductsCTA';
import { generatePageMetadata } from '@/lib/seo';

export const revalidate = 3600;

// ── SEO ──
export async function generateMetadata(): Promise<Metadata> {
  let pageData: ProductsPageContent | null = null;
  try {
    pageData = await sanityClient.fetch<ProductsPageContent>(productsPageQuery);
  } catch {
    // fallback
  }
  return generatePageMetadata({
    title: pageData?.seo?.title || 'ผลิตภัณฑ์และคอร์สเรียน | DAP Strategic Consulting',
    description:
      pageData?.seo?.description ||
      'E-book และคอร์สเรียนด้านการลงทุนและบริหารธุรกิจ เพื่ออัปสกิลให้เหนือกว่าคู่แข่ง',
    path: '/products',
  });
}

export default async function ProductsPage() {
  let products: SanityProduct[] = [];
  let pageData: ProductsPageContent | null = null;
  try {
    [products, pageData] = await Promise.all([
      sanityClient.fetch(productsQuery),
      sanityClient.fetch(productsPageQuery),
    ]);
  } catch (error) {
    console.error('Failed to fetch products data:', error);
  }

  const hasProducts = products && products.length > 0;

  return (
    <div className="bg-gray-50">
      {/* 1. Pain Point Hero */}
      <ProductHero data={pageData} />

      {/* 2. Solution */}
      <ProductSolution data={pageData} />

      {/* 3. Benefits */}
      <ProductBenefits data={pageData} />

      {/* 4. Product List */}
      <section className="py-20 bg-white" id="products">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-900 mb-3 inline-flex items-center justify-center gap-3">
              {pageData?.productsSection?.heading || 'เลือกผลิตภัณฑ์ที่เหมาะกับคุณ'}
              <ShoppingCart className="w-9 h-9 md:w-11 md:h-11 text-blue-900 flex-shrink-0" />
            </h2>
            <p className="text-gray-500">
              {pageData?.productsSection?.subheading || 'อัปสกิลการลงทุนและการบริหารธุรกิจให้เหนือกว่าคู่แข่ง'}
            </p>
          </div>

          {/* Grid with category filter tabs */}
          {hasProducts ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20 text-gray-300">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg">กำลังเตรียมสินค้า... กรุณากลับมาใหม่ภายหลัง</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. Final CTA */}
      <ProductsCTA data={pageData} />
    </div>
  );
}
