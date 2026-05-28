// lib/analytics.ts
// ──────────────────────────────────────────────────────────
// Centralized GA4 event tracking utilities.
// Uses `window.gtag()` injected by @next/third-parties/google.
// ──────────────────────────────────────────────────────────

/**
 * ส่ง custom event ไป GA4 ผ่าน gtag
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | undefined>,
) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// พจนานุกรมแปลชื่อตัวแปรให้เป็นภาษาไทย เพื่อให้ลูกค้าดู Dashboard ง่ายขึ้น
const SECTION_LABELS: Record<string, string> = {
  header: 'แถบเมนูด้านบน (Header Desktop)',
  header_mobile: 'เมนูด้านบน (Header Mobile)',
  product_hero: 'ส่วนhero section products',
  products_cta: 'ส่วนชักชวนหน้าสินค้า (CTA)',
  home_cta: 'ส่วนชักชวนหน้าแรก (CTA)',
  services_cta: 'ส่วนชักชวนหน้า services (CTA)',
  footer: 'ส่วนล่างสุดของเว็บ (Footer)',
  contact: 'ส่วนข้อมูลหน้าติดต่อเรา',
  thank_you: 'หน้าชำระเงินสำเร็จ (Thank You)',
};

const PAYMENT_LABELS: Record<string, string> = {
  purchase: 'สั่งซื้อสินค้า',
  booking: 'จองบริการ',
};

/**
 * Predefined GA4 event helpers — เรียกใช้ง่ายจากทุก component
 */
export const GA = {
  /** คนกดปุ่ม LINE (Add Line) */
  clickLine: (section: string) => {
    const readableSection = SECTION_LABELS[section] || section;
    trackEvent('click_line', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      section_id: section,          // เผื่อโปรแกรมเมอร์ดู
      section_name: readableSection, // ชื่อไทยสำหรับลูกค้า
      event_label: `แอดไลน์จาก: ${readableSection}`, // ให้แสดงชัดๆ ในรายงาน
    });
  },

  /** คนกดปุ่มสมัคร / register */
  clickRegister: (section: string) => {
    const readableSection = SECTION_LABELS[section] || section;
    trackEvent('click_register', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      section_id: section,
      section_name: readableSection,
      event_label: `กดสมัครจาก: ${readableSection}`,
    });
  },

  /** คนกดปุ่มชำระเงิน (สั่งซื้อ / จอง) */
  clickPayment: (productName: string, paymentType: 'purchase' | 'booking') => {
    const readableType = PAYMENT_LABELS[paymentType] || paymentType;
    trackEvent('click_payment', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      product_name: productName,
      payment_type: readableType,
      event_label: `กด${readableType}: ${productName}`,
    });
  },

  /** คนซื้อสำเร็จ — fire เมื่อเข้าหน้า Thank You */
  purchase: (source: string, productSlug: string) => {
    const readableSource = PAYMENT_LABELS[source] || source;
    trackEvent('purchase', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      source_type: readableSource,
      product_id: productSlug,
      event_label: `${readableSource} สำเร็จ: ${productSlug}`,
      value: 1, // สามารถใส่ราคาสินค้าได้ถ้าต้องการในอนาคต
      currency: 'THB'
    });
  },

  /** คนเลื่อนอ่านถึง 75% ของหน้า */
  scroll75: () => {
    trackEvent('scroll_75', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      event_label: `อ่านถึง 75% หน้า: ${typeof window !== 'undefined' ? window.location.pathname : ''}`,
    });
  },

  /** คนเลื่อนอ่านเกือบจบหน้า (90%) */
  scroll90: () => {
    trackEvent('scroll_90', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      event_label: `อ่านถึง 90% หน้า: ${typeof window !== 'undefined' ? window.location.pathname : ''}`,
    });
  },
};
