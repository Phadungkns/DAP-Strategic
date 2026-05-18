'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaymentSettings } from '@/types';

interface PaymentStepsSectionProps {
  paymentSetting: PaymentSettings;
}

export default function PaymentStepsSection({ paymentSetting }: PaymentStepsSectionProps) {
  const { steps } = paymentSetting;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const isSlider = steps && steps.length > 3;

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    setShowArrows(el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [steps]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.step-card')?.getBoundingClientRect().width || 450;
    const gap = 32; // gap-8 = 32px
    const scrollAmount = cardWidth + gap;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-gray-100 w-full">

      {/* Header & Arrows — กลางหน้าตัวใหญ่สะดุดตาเป็นพิเศษ พร้อมปุ่มเลื่อน */}
      <div className="flex flex-col items-center justify-center mb-16 relative w-full">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 flex items-center justify-center gap-4 text-center">
          วิธีการสั่งซื้อสินค้ากับเรา
          <CreditCard className="w-10 h-10 lg:w-12 lg:h-12 text-blue-900 flex-shrink-0" />
        </h2>

        {/* ปุ่มเลื่อน (แสดงเฉพาะเมื่อเป็น slider และเลื่อนได้) — ขนาดใหญ่คลิกง่ายขึ้น */}
        {isSlider && showArrows && (
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className="p-3.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-900 hover:border-blue-800 shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="เลื่อนไปทางซ้าย"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className="p-3.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-900 hover:border-blue-800 shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="เลื่อนไปทางขวา"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Steps Container */}
      <div className="relative w-full">

        {/* Connector line (desktop only) — ปรับกึ่งกลางพอดีกับ Badge ขนาดใหม่ (top-[32px] ตามครึ่งนึงของ w-16 h-16) */}
        {!isSlider && (
          <div
            className="hidden lg:block absolute top-[32px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-blue-900/30 to-transparent z-0"
            aria-hidden="true"
          />
        )}

        {isSlider ? (
          /* ── Slider Layout (> 3 steps) — ปรับให้แสดง 3 ขั้นตอน (1, 2, 3) ได้เต็มๆ พอดีจอ ── */
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-8 lg:gap-10 overflow-x-auto scroll-smooth scrollbar-hide pb-4 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card min-w-[calc(33.333%-1.375rem)] max-w-[calc(33.333%-1.375rem)] flex-shrink-0 flex flex-col items-center text-center group max-md:min-w-[85%] max-md:max-w-[85%] max-lg:min-w-[calc(50%-1rem)] max-lg:max-w-[calc(50%-1rem)]"
              >
                {/* Step number badge — ขยายใหญ่ขึ้น */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-blue-900/30 text-blue-900 font-bold text-base lg:text-xl mb-6 group-hover:border-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                  {index + 1}
                </div>

                {/* Image — ขยายความกว้างเต็มการ์ดสัดส่วนพรีเมียม 16/10 เอาเงาออกทั้งหมด */}
                {step.imageUrl ? (
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-gray-100 bg-white">
                    <Image
                      src={step.imageUrl}
                      alt={`ขั้นตอนที่ ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] rounded-2xl mb-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-900/10 flex items-center justify-center">
                    <span className="text-6xl font-bold text-blue-900/20 font-display">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}

                {/* Description — ขยายตัวหนังสือใหญ่พิเศษ */}
                {step.description && (
                  <p className="text-lg lg:text-xl font-bold text-gray-800 leading-relaxed px-3 whitespace-pre-line max-w-md">
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* ── Static Grid Layout (<= 3 steps) — ขยายขนาดใหญ่พิเศษเต็มจอ ── */
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              steps.length === 1 ? 'lg:grid-cols-1' : steps.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            } gap-8 lg:gap-12 w-full`}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center group w-full"
              >
                {/* Step number badge — ขยายใหญ่ขึ้น */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border-2 border-blue-900/30 text-blue-900 font-bold text-base lg:text-xl mb-6 group-hover:border-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300">
                  {index + 1}
                </div>

                {/* Image — ขยายความกว้างเต็มการ์ดสัดส่วนพรีเมียม 16/10 เอาเงาออกทั้งหมด */}
                {step.imageUrl ? (
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-gray-100 bg-white">
                    <Image
                      src={step.imageUrl}
                      alt={`ขั้นตอนที่ ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[16/10] rounded-2xl mb-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border border-blue-900/10 flex items-center justify-center">
                    <span className="text-6xl font-bold text-blue-900/20 font-display">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}

                {/* Description — ขยายตัวหนังสือใหญ่พิเศษ */}
                {step.description && (
                  <p className="text-lg lg:text-xl font-bold text-gray-800 leading-relaxed px-3 whitespace-pre-line max-w-md">
                    {step.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
