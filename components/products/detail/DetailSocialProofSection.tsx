import React from 'react';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import type { ProductSocialProofSection } from '@/types';

interface DetailSocialProofSectionProps {
  section: ProductSocialProofSection;
}

export default function DetailSocialProofSection({ section }: DetailSocialProofSectionProps) {
  const hasImages = section.socialImages && section.socialImages.length > 0;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6 border border-green-200">
            <MessageSquare className="w-4 h-4" />
            รีวิวจากผู้ใช้จริง
          </div>
          {section.title && (
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {section.title}
            </h2>
          )}
          {section.description && (
            <p className="text-lg text-gray-500 max-w-xl mx-auto whitespace-pre-line">
              {section.description}
            </p>
          )}
        </div>

        {/* รูปแสดงเต็มเรียงจากบนลงล่าง */}
        {hasImages && (
          <div className="flex flex-col gap-4">
            {section.socialImages!.map((img, idx) => (
              <div
                key={idx}
                className="w-full rounded-2xl overflow-hidden"
              >
                <Image
                  src={img.url}
                  alt={`รีวิว ${idx + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
