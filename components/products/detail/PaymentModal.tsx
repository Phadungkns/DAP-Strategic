'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ExternalLink, CreditCard } from 'lucide-react';
import type { PaymentSettings } from '@/types';
import { GA } from '@/lib/analytics';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentSetting: PaymentSettings;
  paymentLink: string;
  paymentLabel?: string;
  productName?: string;
  productSlug?: string;
  paymentType?: 'purchase' | 'booking';
}

export default function PaymentModal({
  isOpen,
  onClose,
  paymentSetting,
  paymentLink,
  paymentLabel = 'ดำเนินการชำระเงิน',
  productName,
  productSlug,
  paymentType,
}: PaymentModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // ปิด modal ด้วย Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { steps } = paymentSetting;
  const heading = paymentSetting.heading || 'ขั้นตอนการสั่งซื้อ';
  const showIndex = steps.length > 1;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-center px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-gray-100 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-900" />
            </div>
            <h2 className="font-display text-xl font-bold text-gray-900">
              ขั้นตอนการสั่งซื้อและชำระเงิน
            </h2>
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content — Scrollable */}
        <div className="overflow-y-auto px-6 py-8" style={{ maxHeight: 'calc(90vh - 160px)' }}>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 sm:gap-6"
              >
                {/* Step indicator */}
                {showIndex && (
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-blue-900/30 to-transparent" />
                    )}
                  </div>
                )}

                {/* Step content */}
                <div className="flex-1 pb-2">
                  {/* Description */}
                  {step.description && (
                    <p className="text-base font-semibold text-gray-800 leading-relaxed whitespace-pre-line mb-4">
                      {step.description}
                    </p>
                  )}

                  {/* Image */}
                  {step.imageUrl && (
                    <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                      <Image
                        src={step.imageUrl}
                        alt={`ขั้นตอนที่ ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 z-10 px-6 py-4 bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-900 rounded-full hover:bg-blue-800 transition-colors active:scale-[0.98] shadow-lg shadow-blue-900/20"
              onClick={() => {
                if (productName && paymentType) {
                  GA.clickPayment(productName, paymentType);
                }
                if (productSlug && paymentType) {
                  localStorage.setItem('dap_last_purchase_slug', productSlug);
                  localStorage.setItem('dap_last_purchase_type', paymentType);
                }
              }}
            >
              <ExternalLink className="w-4.5 h-4.5" />
              {paymentLabel}
            </a>
            <button
              onClick={onClose}
              className="sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              ปิด
            </button>
          </div>

          {/* Payso badge */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <p className="text-xs text-gray-400">ชำระเงินผ่านช่องทางที่ปลอดภัย</p>
          </div>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
