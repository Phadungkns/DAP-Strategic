'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';

/**
 * Client component ตัวเล็ก — วางใน root layout เพื่อ
 * track scroll depth (75% / 90%) บนทุกหน้าอัตโนมัติ
 */
export default function ScrollTracker() {
  useScrollDepth();
  return null;
}
