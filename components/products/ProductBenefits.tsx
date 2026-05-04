import React from 'react';
import { BookOpen, Download, Clock } from 'lucide-react';
import type { ProductsPageContent } from '@/types';

const defaultIcons = [BookOpen, Download, Clock];

const fallbackBenefits = [
  { title: "เรียนรู้จาก Case Study จริง", description: "เนื้อหาอ้างอิงจากปัญหาจริงที่เกิดขึ้นกับธุรกิจ SME ไทย ไม่ใช่แค่ทฤษฎีในตำรา" },
  { title: "มี Template ให้ใช้ได้เลย", description: "ประหยัดเวลาด้วย Excel Template และ Framework ที่พร้อมนำไปปรับใช้กับธุรกิจคุณทันที" },
  { title: "ประหยัดเวลาและค่าใช้จ่าย", description: "ได้ความรู้ระดับที่ปรึกษาองค์กร ในราคาที่เข้าถึงได้ เรียนซ้ำได้ตลอดชีพ" }
];

interface ProductBenefitsProps {
  data: ProductsPageContent | null;
}

export default function ProductBenefits({ data }: ProductBenefitsProps) {
  const benefits = data?.benefitsSection?.benefits?.length ? data.benefitsSection.benefits : fallbackBenefits;

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = defaultIcons[i % defaultIcons.length];
            return (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
