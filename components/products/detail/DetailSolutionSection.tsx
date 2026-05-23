import React from 'react';
import type { ProductSolutionSection } from '@/types';

interface DetailSolutionSectionProps {
  section: ProductSolutionSection;
}

export default function DetailSolutionSection({ section }: DetailSolutionSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <div className="flex flex-col items-center gap-8">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            {section.heading || (
              <>
                เปลี่ยน<span className="text-blue-600">ความสับสน</span>
                {" "}เป็น<span className="text-blue-600">ความชัดเจน</span>
              </>
            )}
          </h2>
          {section.description && (
            <p className="text-xl text-gray-500 leading-relaxed whitespace-pre-line max-w-3xl">
              {section.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}