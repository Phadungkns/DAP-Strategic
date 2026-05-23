import React from 'react';
import Image from 'next/image';
import type { ProductStorySection } from '@/types';

interface DetailStorySectionProps {
  section: ProductStorySection;
}

function renderPortableText(blocks: ProductStorySection['content']) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks.map((block, idx) => {
    if (block._type === 'block') {
      const text = block.children
        ?.map((child: { text?: string; marks?: string[] }) => {
          let content = child.text || '';
          if (child.marks?.includes('strong')) content = `<strong>${content}</strong>`;
          if (child.marks?.includes('em')) content = `<em>${content}</em>`;
          return content;
        })
        .join('');

      switch (block.style) {
        case 'h2':
          return (
            <h2
              key={idx}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display"
              dangerouslySetInnerHTML={{ __html: text || '' }}
            />
          );
        case 'h3':
          return (
            <h3
              key={idx}
              className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-display"
              dangerouslySetInnerHTML={{ __html: text || '' }}
            />
          );
        case 'h4':
          return (
            <h4
              key={idx}
              className="text-lg font-bold text-gray-900 mb-2"
              dangerouslySetInnerHTML={{ __html: text || '' }}
            />
          );
        case 'blockquote':
          return (
            <blockquote
              key={idx}
              className="border-l-2 border-blue-500 pl-6 py-2 my-6 text-lg text-gray-600 italic"
              dangerouslySetInnerHTML={{ __html: text || '' }}
            />
          );
        default:
          return (
            <p
              key={idx}
              className="text-gray-500 text-lg leading-loose mb-5"
              dangerouslySetInnerHTML={{ __html: text || '' }}
            />
          );
      }
    }
    return null;
  });
}

export default function DetailStorySection({ section }: DetailStorySectionProps) {
  const hasImage = !!section.imageUrl;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className={`flex flex-col ${hasImage ? 'lg:flex-row' : ''} gap-16 items-start`}>

          {/* Rich text */}
          <div className={`flex-1 ${!hasImage ? 'max-w-3xl mx-auto' : ''}`}>
            {section.heading && (
              <div className="mb-10 pb-10 border-b border-gray-100">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
                  {section.heading}
                </h2>
              </div>
            )}
            <div>
              {section.content && renderPortableText(section.content)}
            </div>
          </div>

          {/* Image */}
          {hasImage && (
            <div className="flex-shrink-0 w-full lg:w-[45%] lg:sticky lg:top-24">
              <div className="relative overflow-hidden aspect-[3/4] bg-gray-100">
                <Image
                  src={section.imageUrl!}
                  alt={section.heading || 'Story image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}