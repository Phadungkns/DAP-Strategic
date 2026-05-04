import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import ServiceCard from '@/components/services/ServiceCard';
import ServicesCTA from '@/components/services/ServicesCTA';
import { sanityClient } from '@/lib/sanity';
import { servicesQuery, servicesPageQuery } from '@/lib/queries';
import { services as fallbackServices } from '@/data/services';
import { slugify } from '@/lib/utils';
import type { SanityService, ServicesPageContent } from '@/types';

export const revalidate = 3600; // revalidate ทุก 1 ชั่วโมง

export default async function ServicesPage() {
  // ดึงข้อมูลจาก Sanity
  let sanityServices: SanityService[] = [];
  let pageData: ServicesPageContent | null = null;
  try {
    const [fetchedServices, fetchedPageData] = await Promise.all([
      sanityClient.fetch(servicesQuery),
      sanityClient.fetch(servicesPageQuery)
    ]);
    sanityServices = fetchedServices;
    pageData = fetchedPageData;
  } catch (error) {
    console.error('Failed to fetch services from Sanity:', error);
  }

  // ถ้า Sanity มีข้อมูล → ใช้ Sanity, ถ้าไม่มี → fallback hardcoded
  const hasSanityData = sanityServices && sanityServices.length > 0;

  return (
    <div className="bg-gray-50">
      <PageHeader
        badge={pageData?.hero?.badge || "Our Services"}
        title={pageData?.hero?.heading || "บริการที่ปรึกษาธุรกิจ"}
        description={pageData?.hero?.description || "เราช่วยแก้ปัญหาธุรกิจที่ซับซ้อนด้วยกลยุทธ์ที่เรียบง่ายและวัดผลได้จริง เพื่อให้คุณก้าวข้ามขีดจำกัดและเติบโตได้อย่างมั่นคง"}
      />

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="space-y-16">
            {hasSanityData
              ? sanityServices.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={{
                      id: slugify(service.title),
                      title: service.title,
                      subtitle: service.subtitle ?? '',
                      problem: service.problem ?? '',
                      solution: service.solution ?? '',
                      deliverables: service.deliverables ?? [],
                      pricing: service.pricing ?? '',
                    }}
                  />
                ))
              : fallbackServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
          </div>
        </div>
      </section>

      <ServicesCTA data={pageData} />
    </div>
  );
}
