import React from 'react';
import type { ProductsPageContent } from '@/types';

interface ProductSolutionProps {
  data: ProductsPageContent | null;
}

export default function ProductSolution({ data }: ProductSolutionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {data?.solution?.heading || "เปลี่ยนความสับสน เป็นความชัดเจน"}
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed mb-12 whitespace-pre-line">
          {data?.solution?.description || `"ทางลัดสู่การเป็นผู้บริหารที่ตัดสินใจเฉียบขาด" เราย่อยประสบการณ์จากการเป็นที่ปรึกษาให้บริษัทชั้นนำกว่า 150 แห่ง มาเป็น Framework ที่คุณสามารถเรียนรู้และทำตามได้ทันที โดยไม่ต้องเสียเวลาลองผิดลองถูกเอง`}
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
