import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { HomePage } from '@/types';

interface HeroSectionProps {
  hero?: HomePage['hero'];
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const badge = hero?.badge || 'Strategic Consulting for SMEs';
  const heading = hero?.heading || 'ยกระดับธุรกิจของคุณด้วย';
  const highlight = hero?.highlight || 'กลยุทธ์ที่วัดผลได้จริง';
  const description = hero?.description || 'DAP Strategic Consulting พาร์ทเนอร์ที่ผู้บริหารและเจ้าของธุรกิจ SME ไว้วางใจ เพื่อการเติบโตอย่างยั่งยืนและผลกำไรที่ชัดเจน';

  return (
    <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/workspace/1920/1080?blur=4')] bg-cover bg-center opacity-5 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/90"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 rounded-3xl md:rounded-full bg-blue-100/50 text-blue-900 text-sm font-medium mb-8 border border-blue-200 max-w-full">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
          <span className="text-center">
            {badge.split('/').map((part, index) => (
              <span key={index} className="block md:inline">
                {index > 0 ? ` / ${part.trim()}` : part.trim()}
              </span>
            ))}
          </span>
        </div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
          {heading}<br />
          <span className="inline-block mt-3 md:mt-0 text-blue-900">{highlight}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/services" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-900 rounded-full hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30">
            ดูบริการของเรา
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link href="/products" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-900 rounded-full hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30">
            ดูสินค้าของเรา
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

