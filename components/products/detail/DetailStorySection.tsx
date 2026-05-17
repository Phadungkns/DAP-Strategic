import React from 'react';
import Image from 'next/image';
import type { ProductStorySection } from '@/types';

interface DetailStorySectionProps {
  section: ProductStorySection;
}

/* ── Simple Portable Text renderer ── */
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
          return <h2 key={idx} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-display" dangerouslySetInnerHTML={{ __html: text || '' }} />;
        case 'h3':
          return <h3 key={idx} className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-display" dangerouslySetInnerHTML={{ __html: text || '' }} />;
        case 'h4':
          return <h4 key={idx} className="text-lg font-bold text-gray-900 mb-2" dangerouslySetInnerHTML={{ __html: text || '' }} />;
        case 'blockquote':
          return (
            <blockquote key={idx} className="border-l-4 border-blue-400 pl-5 py-1 my-5 italic text-gray-500" dangerouslySetInnerHTML={{ __html: text || '' }} />
          );
        default:
          return <p key={idx} className="text-gray-500 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: text || '' }} />;
      }
    }
    return null;
  });
}

export default function DetailStorySection({ section }: DetailStorySectionProps) {
  const hasImage = !!section.imageUrl;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {section.heading && (
          <div className="mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {section.heading}
            </h2>
            <div className="w-16 h-0.5 bg-blue-400 rounded-full" />
          </div>
        )}

        <div className={`flex flex-col ${hasImage ? 'lg:flex-row' : ''} gap-12 items-start`}>
          {/* Rich text */}
          <div className={`flex-1 ${!hasImage ? 'max-w-3xl' : ''}`}>
            {section.content && renderPortableText(section.content)}
          </div>

          {/* Optional image — no border-radius shadow, just clean */}
          {hasImage && (
            <div className="flex-shrink-0 w-full lg:w-[42%]">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
                <Image
                  src={section.imageUrl!}
                  alt={section.heading || 'Story image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
