import React from 'react';
import Link from 'next/link';
import { AlertCircle, Lightbulb, Package, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { slugify } from '@/lib/utils';
import type { ServiceItem } from '@/types';

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div id={slugify(service.title)} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-shadow duration-300 scroll-mt-24">
      {/* Service Header */}
      <div className="bg-gray-900 text-white p-8 md:p-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{service.title}</h2>
        <p className="text-blue-300 text-lg">{service.subtitle}</p>
      </div>
      
      <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10">
        {/* Left Column: Problem & Solution */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-red-600 font-medium">
              <AlertCircle className="w-5 h-5" />
              <h3>ปัญหาที่คุณกำลังเจอ (Problem)</h3>
            </div>
            <p className="text-gray-600 leading-relaxed bg-red-50/50 p-5 rounded-2xl border border-red-100">
              {service.problem}
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3 text-blue-700 font-medium">
              <Lightbulb className="w-5 h-5" />
              <h3>สิ่งที่เราช่วยคุณได้ (Solution)</h3>
            </div>
            <p className="text-gray-600 leading-relaxed bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              {service.solution}
            </p>
          </div>
        </div>

        {/* Right Column: Deliverables, Pricing & CTA */}
        <div className="space-y-8 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-medium">
              <Package className="w-5 h-5 text-gray-500" />
              <h3>สิ่งที่คุณจะได้รับ (Deliverables)</h3>
            </div>
            <ul className="space-y-3">
              {service.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-auto">
            <div className="flex items-center gap-2 mb-2 text-gray-500 text-sm font-medium">
              <Tag className="w-4 h-4" />
              <span>ค่าบริการ (Pricing)</span>
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-gray-500">เริ่มต้นที่</span>
              <span className="font-display text-4xl font-bold text-gray-900">{service.pricing}</span>
              <span className="text-gray-500">บาท</span>
            </div>
            
            <Link href="/contact" className="w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-blue-900 rounded-xl hover:bg-blue-800 transition-colors shadow-sm">
              นัดคุยกับผู้เชี่ยวชาญ
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
