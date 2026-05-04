import React from 'react';
import { Target } from 'lucide-react';
import type { AboutPageContent } from '@/types';

interface AboutSectionProps {
  data?: AboutPageContent | null;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="pt-24 pb-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-sm font-medium mb-6 border border-blue-100">
              {data?.story?.badge || "Our Story & Vision"}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">
              {data?.story?.heading || "เบื้องหลังความสำเร็จ\nคือกลยุทธ์ที่แม่นยำ"}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
              {data?.story?.description || `DAP Strategic ก่อตั้งขึ้นจากความเชื่อที่ว่า SME ไทยมีศักยภาพที่จะเติบโตระดับประเทศได้ หากมี "เข็มทิศ" ที่ถูกต้อง เราผสานประสบการณ์การเป็นที่ปรึกษาให้กับองค์กรชั้นนำ เข้ากับความเข้าใจในบริบทของธุรกิจขนาดกลางและขนาดย่อม`}
            </p>
            <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <Target className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{data?.story?.visionTitle || "Our Vision"}</h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {data?.story?.visionDescription || "เป็นพาร์ทเนอร์อันดับ 1 ที่ช่วยยกระดับมาตรฐานและสร้างการเติบโตอย่างยั่งยืนให้กับ SME ไทย ผ่านกลยุทธ์ที่วัดผลได้จริง"}
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${data?.story?.imageUrl || "https://picsum.photos/seed/meeting/800/800"}')` }}
              ></div>
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
            </div>
            {/* Floating Stat */}
            {data?.story?.stats && data.story.stats.length > 0 && (
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="font-display text-4xl font-bold text-blue-900 mb-1">{data.story.stats[0].value}</div>
                <div className="text-sm font-medium text-gray-600">{data.story.stats[0].label}</div>
              </div>
            )}
            {(!data?.story?.stats || data.story.stats.length === 0) && (
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="font-display text-4xl font-bold text-blue-900 mb-1">10+</div>
                <div className="text-sm font-medium text-gray-600">Years of Experience</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
