import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Users, ShoppingCart, CalendarCheck } from 'lucide-react';
import type { SanityProduct } from '@/types';

function formatPrice(price: number): string {
  return price.toLocaleString('th-TH');
}

interface ProductDetailInfoProps {
  product: SanityProduct;
}

export default function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.salePrice;

  return (
    <section className="py-20 bg-white" id="product-info">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">

        {/* Description */}
        {product.description && (
          <div className="mb-12">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              รายละเอียด
            </h2>
            <p className="text-gray-500 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              สิ่งที่คุณจะได้รับ
            </h3>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* เหมาะสำหรับใคร */}
        {product.suitableFor && product.suitableFor.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              เหมาะสำหรับ
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {product.suitableFor.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 mb-10" />

        {/* Price */}
        <div className="mb-6">
          {hasDiscount && (
            <div className="text-gray-400 line-through text-sm mb-1">
              ราคาปกติ {formatPrice(product.originalPrice!)} บาท
            </div>
          )}
          <div className="font-display text-4xl font-bold text-gray-900">
            {formatPrice(product.salePrice)}{' '}
            <span className="text-lg font-normal text-gray-400">บาท</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {product.ctaLink && (
            <Link
              href={product.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors active:scale-[0.98] flex-1"
            >
              <ShoppingCart className="w-5 h-5" />
              สั่งซื้อเลย
            </Link>
          )}
          {product.bookingPrice && product.bookingLink && (
            <Link
              href={product.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors active:scale-[0.98] flex-1"
            >
              <CalendarCheck className="w-5 h-5" />
              จองราคาพิเศษ {formatPrice(product.bookingPrice)} บาท
            </Link>
          )}
        </div>

        {/* Payso badge */}
        <div>
          <p className="text-xs text-gray-400 mb-3">ชำระเงินผ่านช่องทางที่ปลอดภัย</p>
          <Image
            src="https://s3-payso-images.s3.ap-southeast-1.amazonaws.com/image-logocode/all-1.png"
            alt="Payment methods"
            width={800}
            height={100}
            className="w-full h-auto object-contain opacity-80"
            unoptimized
          />
        </div>

      </div>
    </section>
  );
}
