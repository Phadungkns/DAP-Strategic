import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, BookOpen, ShoppingCart, ArrowRight, Download, Sparkles } from 'lucide-react';
import type { SanityProduct } from '@/types';

/* ── CTA button text ตามประเภทสินค้า ── */
const ctaMap: Record<string, string> = {
  ebook: "สั่งซื้อ E-Book เลย",
  course: "สมัครเรียนทันที",
  template: "รับ Template ทันที",
};

/* ── CTA button icon ตามประเภทสินค้า ── */
function CtaIcon({ productType }: { productType: string }) {
  switch (productType) {
    case 'ebook':
      return <ShoppingCart className="w-5 h-5 mr-2" />;
    case 'course':
      return <ArrowRight className="w-5 h-5 mr-2" />;
    case 'template':
      return <Download className="w-5 h-5 mr-2" />;
    default:
      return <ShoppingCart className="w-5 h-5 mr-2" />;
  }
}

/* ── Badge display config ── */
const badgeConfig: Record<string, { label: string; bg: string; text: string }> = {
  bestseller: { label: 'Best Seller', bg: 'bg-yellow-400', text: 'text-yellow-900' },
  recommended: { label: 'Recommended', bg: 'bg-blue-500', text: 'text-white' },
  new: { label: 'New', bg: 'bg-green-500', text: 'text-white' },
};

/* ── Format ราคา ── */
function formatPrice(price: number): string {
  return price.toLocaleString('th-TH');
}

interface ProductCardProps {
  product: SanityProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const buttonText = ctaMap[product.productType] || "สั่งซื้อเลย";
  const badge = product.badge && product.badge !== 'none' ? badgeConfig[product.badge] : null;
  const isRecommended = product.badge === 'recommended';

  return (
    <div
      className={`flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden transition-shadow ${
        isRecommended
          ? 'border-2 border-blue-500 shadow-xl relative'
          : 'border border-gray-200 shadow-lg hover:shadow-xl'
      }`}
    >
      {/* Recommended banner (mobile top) */}
      {isRecommended && (
        <div className="absolute top-0 left-0 right-0 md:right-auto md:bottom-0 md:top-0 md:w-2/5 pointer-events-none z-20">
          <div className="bg-blue-500 text-white text-center text-xs font-bold py-1.5 uppercase tracking-wider md:hidden">
            Recommended
          </div>
        </div>
      )}

      {/* Visual Panel */}
      <div className={`relative md:w-2/5 h-56 md:h-auto flex items-center justify-center p-8 shrink-0 ${
        product.productType === 'course' ? 'bg-gray-900' : 'bg-blue-900'
      }`}>
        {/* Recommended banner (desktop) */}
        {isRecommended && (
          <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center text-xs font-bold py-1.5 uppercase tracking-wider hidden md:block z-20">
            Recommended
          </div>
        )}

        {/* Cover image หรือ placeholder */}
        {product.imageUrl ? (
          <div className="relative z-10 w-32 h-44 rounded-xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 128px, 128px"
            />
          </div>
        ) : (
          <div className="relative z-10 w-28 h-40 bg-white rounded-r-xl shadow-2xl flex flex-col items-center justify-center p-4 text-center border-l-4 border-blue-500 transform -rotate-3 hover:rotate-0 transition-transform">
            {product.productType === 'course' ? (
              <>
                <Sparkles className="w-7 h-7 text-blue-600 mb-2" />
                <div className="font-display font-bold text-gray-900 text-xs leading-tight">{product.title}</div>
              </>
            ) : product.productType === 'template' ? (
              <>
                <Download className="w-7 h-7 text-blue-900 mb-2" />
                <div className="font-display font-bold text-blue-900 text-xs leading-tight">{product.title}</div>
              </>
            ) : (
              <>
                <BookOpen className="w-7 h-7 text-blue-900 mb-2" />
                <div className="font-display font-bold text-blue-900 text-xs leading-tight">{product.title}</div>
              </>
            )}
          </div>
        )}

        {/* Badge ที่มุมขวาบน */}
        {badge && !isRecommended && (
          <div className={`absolute top-4 right-4 ${badge.bg} ${badge.text} text-xs font-bold px-3 py-1 rounded-full z-10`}>
            {badge.label}
          </div>
        )}
      </div>

      {/* Content Panel */}
      <div className="p-8 flex flex-col flex-1">
        {/* Title & Subtitle */}
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">{product.title}</h3>
        {product.subtitle && (
          <p className="text-blue-600 font-medium mb-4">{product.subtitle}</p>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-gray-600 mb-5 text-sm leading-relaxed">{product.description}</p>
        )}

        {/* Features / สิ่งที่ได้รับ */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* เหมาะสำหรับใคร */}
        {product.suitableFor && product.suitableFor.length > 0 && (
          <div className="bg-blue-50 rounded-xl px-4 py-3 mb-5 border border-blue-100">
            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mb-1.5">เหมาะกับ</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
              {product.suitableFor.map((item, i) => (
                <span key={i}>· {item}</span>
              ))}
            </div>
          </div>
        )}

        {/* Price & CTA */}
        <div className="flex items-center gap-6 mt-auto">
          <div>
            {product.originalPrice && product.originalPrice > product.salePrice && (
              <div className="text-gray-400 line-through text-xs">
                ปกติ {formatPrice(product.originalPrice)} บาท
              </div>
            )}
            <div className={`font-display text-3xl font-bold ${isRecommended ? 'text-blue-600' : 'text-gray-900'}`}>
              {formatPrice(product.salePrice)}{' '}
              <span className="text-base font-normal text-gray-500">บาท</span>
            </div>
          </div>
          {product.ctaLink ? (
            <Link
              href={product.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white rounded-xl transition-colors ${
                isRecommended
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                  : 'bg-blue-900 hover:bg-blue-800'
              }`}
            >
              <CtaIcon productType={product.productType} />
              {buttonText}
            </Link>
          ) : (
            <button
              className={`flex-1 inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white rounded-xl transition-colors ${
                isRecommended
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                  : 'bg-blue-900 hover:bg-blue-800'
              }`}
            >
              <CtaIcon productType={product.productType} />
              {buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
