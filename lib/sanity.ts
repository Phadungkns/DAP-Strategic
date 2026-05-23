import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '10r3gve4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // ปิด CDN เพื่อบังคับให้ดึงข้อมูลสดใหม่เสมอ ป้องกันปัญหา Cache ค้างบน Vercel
});
