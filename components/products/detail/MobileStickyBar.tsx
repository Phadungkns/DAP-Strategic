'use client';

import React, { useState } from 'react';
import type { SanityProduct } from '@/types';
import PaymentModal from './PaymentModal';
import { GA } from '@/lib/analytics';

interface MobileStickyBarProps {
  product: SanityProduct;
}

export default function MobileStickyBar({ product }: MobileStickyBarProps) {
  const [modalMode, setModalMode] = useState<'purchase' | 'booking' | null>(null);

  const purchasePayment = product.paymentOptions?.purchase;
  const bookingPayment = product.paymentOptions?.booking;

  const handleOpenPurchase = () => {
    if (purchasePayment && product.ctaLink) {
      setModalMode('purchase');
    } else if (product.ctaLink) {
      GA.clickPayment(product.title, 'purchase', product.salePrice);
      window.open(product.ctaLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenBooking = () => {
    if (bookingPayment && product.bookingLink) {
      setModalMode('booking');
    } else if (product.bookingLink) {
      GA.clickPayment(product.title, 'booking', product.bookingPrice);
      window.open(product.bookingLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
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
              <button
                onClick={handleOpenBooking}
                className="flex-1 text-center px-3 py-3 text-sm font-semibold text-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-50 transition-colors cursor-pointer"
              >
                จอง
              </button>
            )}
            {product.ctaLink && (
              <button
                onClick={handleOpenPurchase}
                className="flex-1 text-center px-3 py-3 text-sm font-bold text-white bg-blue-900 rounded-full hover:bg-blue-800 transition-colors cursor-pointer"
              >
                สั่งซื้อเลย
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modals */}
      {purchasePayment && product.ctaLink && (
        <PaymentModal
          isOpen={modalMode === 'purchase'}
          onClose={() => setModalMode(null)}
          paymentSetting={purchasePayment}
          paymentLink={product.ctaLink}
          paymentLabel="ดำเนินการชำระเงิน"
          productName={product.title}
          productSlug={product.slug?.current}
          paymentType="purchase"
          paymentValue={product.salePrice}
        />
      )}
      {bookingPayment && product.bookingLink && (
        <PaymentModal
          isOpen={modalMode === 'booking'}
          onClose={() => setModalMode(null)}
          paymentSetting={bookingPayment}
          paymentLink={product.bookingLink}
          paymentLabel="ดำเนินการชำระเงิน"
          productName={product.title}
          productSlug={product.slug?.current}
          paymentType="booking"
          paymentValue={product.bookingPrice}
        />
      )}
    </>
  );
}
