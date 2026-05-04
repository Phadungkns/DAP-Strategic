import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { ServicesPageContent } from '@/types';

interface ServicesCTAProps {
  data?: ServicesPageContent | null;
}

export default function ServicesCTA({ data }: ServicesCTAProps) {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {data?.cta?.heading || "ไม่แน่ใจว่าบริการไหนเหมาะกับคุณ?"}
        </h2>
        <p className="text-lg text-gray-600 mb-10 whitespace-pre-line">
          {data?.cta?.description || "ทักมาพูดคุยและเล่าปัญหาธุรกิจของคุณให้เราฟังก่อนได้ เรายินดีให้คำปรึกษาเบื้องต้นเพื่อหาทางออกที่ดีที่สุดสำหรับคุณ"}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="https://line.me" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#00B900] rounded-full hover:bg-[#00A000] transition-all shadow-lg shadow-[#00B900]/20">
            <MessageCircle className="mr-2 w-5 h-5" />
            คุยผ่าน LINE @DAPStrategic
          </Link>
        </div>
      </div>
    </section>
  );
}
