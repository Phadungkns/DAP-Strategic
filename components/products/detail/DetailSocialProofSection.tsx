import React from 'react';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import type { ProductSocialProofSection } from '@/types';
import { LinkifyText } from '@/components/shared/LinkifyText';

interface DetailSocialProofSectionProps {
  section: ProductSocialProofSection;
}

export default function DetailSocialProofSection({ section }: DetailSocialProofSectionProps) {
  const hasImages = section.socialImages && section.socialImages.length > 0;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 text-sm font-medium mb-8 border border-green-100">
            <MessageSquare className="w-4 h-4" />
            รีวิวจากผู้ใช้จริง
          </div>
          {section.title && (
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-snug mb-5">
              {section.title}
            </h2>
          )}
          {section.description && (
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              <LinkifyText text={section.description} />
            </p>
          )}
        </div>

        {/* Images */}
        {hasImages && (
          <div className="flex flex-col gap-3">
            {section.socialImages!.map((img, idx) => (
              <div
                key={idx}
                className="w-full overflow-hidden border border-gray-100"
              >
                <Image
                  src={img.url}
                  alt={`รีวิว ${idx + 1}`}
                  width={900}
                  height={600}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}