import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { sanityClient } from '@/lib/sanity';
import { productsQuery, productsPageQuery } from '@/lib/queries';
import type { SanityProduct, ProductsPageContent } from '@/types';
import ProductHero from '@/components/products/ProductHero';
import ProductSolution from '@/components/products/ProductSolution';
import ProductBenefits from '@/components/products/ProductBenefits';
import ProductCard from '@/components/products/ProductCard';
import ProductsCTA from '@/components/products/ProductsCTA';

export const revalidate = 3600; // revalidate ทุก 1 ชั่วโมง

export default async function ProductsPage() {
  // ดึงข้อมูลจาก Sanity
  let products: SanityProduct[] = [];
  let pageData: ProductsPageContent | null = null;
  try {
    const [fetchedProducts, fetchedPageData] = await Promise.all([
      sanityClient.fetch(productsQuery),
      sanityClient.fetch(productsPageQuery)
    ]);
    products = fetchedProducts;
    pageData = fetchedPageData;
  } catch (error) {
    console.error('Failed to fetch products data from Sanity:', error);
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

      {/* 4. Product List — Dynamic from Sanity */}
      <section className="py-24 bg-white" id="products">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {pageData?.productsSection?.heading || "เลือกผลิตภัณฑ์ที่เหมาะกับคุณ"}
            </h2>
            <p className="text-lg text-gray-600">
              {pageData?.productsSection?.subheading || "อัปสกิลการลงทุนและการบริหารธุรกิจให้เหนือกว่าคู่แข่ง"}
            </p>
          </div>

          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {hasProducts ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))
            ) : (
              /* Fallback: แสดงข้อความเมื่อไม่มีข้อมูล */
              <div className="text-center py-16 text-gray-400">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">กำลังเตรียมสินค้า... กรุณากลับมาใหม่ภายหลัง</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <ProductsCTA data={pageData} />
    </div>
  );
}
