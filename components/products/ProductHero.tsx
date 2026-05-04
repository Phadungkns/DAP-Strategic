import React from 'react';
import { XCircle } from 'lucide-react';
import type { ProductsPageContent } from '@/types';

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="M12 17h.01"/>
    </svg>
  );
}

const fallbackPainPoints = [
  { text: "ยอดขายโต แต่เงินสดขาดมือ หมุนเงินไม่ทัน" },
  { text: "อยากขยายสาขา แต่ระบบหลังบ้านพังพินาศ" },
  { text: "จ้างพนักงานมาเยอะ แต่ประสิทธิภาพเท่าเดิม" },
  { text: "ทำงานแบบไม่มีทิศทาง แก้ปัญหาเฉพาะหน้าไปวันๆ" }
];

interface ProductHeroProps {
  data: ProductsPageContent | null;
}

export default function ProductHero({ data }: ProductHeroProps) {
  const painPoints = data?.hero?.painPoints?.length ? data.hero.painPoints : fallbackPainPoints;

  return (
    <section className="relative pt-24 pb-32 bg-gray-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/darkoffice/1920/1080?blur=8')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-8 border border-red-500/20">
          <AlertIcon />
          {data?.hero?.badge || "สำหรับเจ้าของธุรกิจที่กำลังเจอทางตัน"}
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.2]">
          {data?.hero?.heading || "ทำงานหนักแทบตาย..."}
          <br />
          <span className="text-red-400">{data?.hero?.highlight || 'แต่สุดท้าย "กำไร" หายไปไหนหมด?'}</span>
        </h1>
        <div className="grid sm:grid-cols-2 gap-4 text-left max-w-3xl mx-auto mt-12">
          {painPoints.map((pain, i) => (
            <div key={i} className="flex items-start gap-3 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <span className="text-gray-300">{pain.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
