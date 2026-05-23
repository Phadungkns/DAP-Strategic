import React from 'react';
import { BookOpen } from 'lucide-react';
import type { ProductBenefitSection } from '@/types';

const BenefitIcon = BookOpen;

interface DetailBenefitSectionProps {
  section: ProductBenefitSection;
}

export default function DetailBenefitSection({ section }: DetailBenefitSectionProps) {
  const benefits = section.benefits || [];

  if (benefits.length === 0) return null;

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex flex-col gap-5 p-8 border-l-2 border-blue-500">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <BenefitIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}