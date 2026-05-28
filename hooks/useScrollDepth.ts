'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GA } from '@/lib/analytics';

/**
 * Hook สำหรับ track scroll depth ที่ 75% และ 90%
 * ใช้ ref เพื่อ fire แต่ละ threshold เพียงครั้งเดียวต่อหน้า
 * Reset เมื่อ pathname เปลี่ยน (client-side navigation)
 */
export function useScrollDepth() {
  const fired75 = useRef(false);
  const fired90 = useRef(false);
  const pathname = usePathname();

  // Reset เมื่อเปลี่ยนหน้า
  useEffect(() => {
    fired75.current = false;
    fired90.current = false;
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY, innerHeight } = window;
      const docHeight = document.documentElement.scrollHeight;

      // ป้องกัน divide by zero (หน้าสั้นมาก)
      if (docHeight <= innerHeight) return;

      const scrollPercent =
        ((scrollY + innerHeight) / docHeight) * 100;

      if (scrollPercent >= 75 && !fired75.current) {
        fired75.current = true;
        GA.scroll75();
      }

      if (scrollPercent >= 90 && !fired90.current) {
        fired90.current = true;
        GA.scroll90();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);
}
