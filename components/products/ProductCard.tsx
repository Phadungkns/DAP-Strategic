import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { SanityProduct } from '@/types';

const badgeConfig: Record<string, { label: string; color: string }> = {
  bestseller: { label: 'Best Seller', color: 'bg-yellow-400 text-yellow-900' },
  recommended: { label: 'Recommended', color: 'bg-blue-500 text-white' },
  new: { label: 'New', color: 'bg-green-500 text-white' },
};

interface ProductCardProps {
  product: SanityProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const slug = product.slug?.current;
  const href = slug ? `/products/${slug}` : '#';
  const badge = product.badge && product.badge !== 'none' ? badgeConfig[product.badge] : null;

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-blue-950 to-gray-900 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-white/20" />
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 ${badge.color} text-xs font-bold px-2.5 py-1 rounded-full`}>
            {badge.label}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-base font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors line-clamp-2">
          {product.title}
        </h3>

        {product.subtitle && (
          <p className="text-sm text-blue-600 font-medium mb-2 line-clamp-1">
            {product.subtitle}
          </p>
        )}

        {product.description && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 flex-1">
            {product.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-50">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-900 text-white hover:bg-blue-800 transition-colors">
            ดูรายละเอียด
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
