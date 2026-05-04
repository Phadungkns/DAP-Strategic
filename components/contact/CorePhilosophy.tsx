import React from 'react';
import { Code, LineChart, Target, Zap } from 'lucide-react';
import type { AboutPageContent } from '@/types';

// fallback icons and fallback content
const ICONS = [Code, LineChart, Target, Zap];

const fallbackItems = [
  {
    title: "Developer Mindset",
    description: "เรามองธุรกิจเหมือนการเขียนโปรแกรม ทุกกระบวนการต้องมี Logic ที่ชัดเจน สามารถทำซ้ำได้ (Scalable) และต้องนำเทคโนโลยีมาใช้เพื่อลดความซ้ำซ้อน (Automation) เปลี่ยนการทำงานที่ใช้แรงงานคน สู่ระบบที่ทำงานแทนคุณ",
    iconIndex: 0,
    colorClasses: "bg-blue-500/20 text-blue-400"
  },
  {
    title: "Financial Thinking",
    description: "ทุกกลยุทธ์และทุกการกระทำ ต้องสะท้อนกลับมาเป็น \"ตัวเลข\" ที่จับต้องได้ เราไม่เชื่อในแผนการตลาดที่สวยหรูแต่ขาดทุน เราโฟกัสที่บรรทัดสุดท้าย (Bottom Line) คือกำไรสุทธิและกระแสเงินสดที่เป็นบวกเสมอ",
    iconIndex: 1,
    colorClasses: "bg-green-500/20 text-green-400"
  }
];

const colors = [
  "bg-blue-500/20 text-blue-400",
  "bg-green-500/20 text-green-400",
  "bg-purple-500/20 text-purple-400",
  "bg-orange-500/20 text-orange-400"
];

interface CorePhilosophyProps {
  data?: AboutPageContent | null;
}

export default function CorePhilosophy({ data }: CorePhilosophyProps) {
  const heading = data?.philosophy?.heading || "Core Philosophy";
  const hasItems = data?.philosophy?.items && data.philosophy.items.length > 0;
  
  const displayItems = hasItems 
    ? data.philosophy!.items!.map((item, index) => ({
        ...item,
        iconIndex: index % ICONS.length,
        colorClasses: colors[index % colors.length]
      }))
    : fallbackItems;

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">{heading}</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {displayItems.map((item, index) => {
            const Icon = ICONS[item.iconIndex];
            const [bgClass, textClass] = item.colorClasses.split(' ');
            
            return (
              <div key={index} className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
                <div className={`w-14 h-14 ${bgClass} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${textClass}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
