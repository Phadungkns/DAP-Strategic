import React from 'react';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
}

export default function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <section className="pt-20 pb-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-sm font-medium mb-6 border border-blue-100">
          {badge}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">{title}</h1>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      </div>
    </section>
  );
}
