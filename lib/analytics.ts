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

/**
 * Predefined GA4 event helpers — เรียกใช้ง่ายจากทุก component
 */
export const GA = {
  /** คนกดปุ่ม LINE (Add Line) */
  clickLine: (section: string) =>
    trackEvent('click_line', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      section,
    }),

  /** คนกดปุ่มสมัคร / register */
  clickRegister: (section: string) =>
    trackEvent('click_register', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      section,
    }),

  /** คนกดปุ่มชำระเงิน (สั่งซื้อ / จอง) */
  clickPayment: (productName: string, paymentType: 'purchase' | 'booking') =>
    trackEvent('click_payment', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      product_name: productName,
      payment_type: paymentType,
    }),

  /** คนซื้อสำเร็จ — fire เมื่อเข้าหน้า Thank You */
  purchase: (source: string, productSlug: string) =>
    trackEvent('purchase', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      source,
      product_slug: productSlug,
    }),

  /** คนเลื่อนอ่านถึง 75% ของหน้า */
  scroll75: () =>
    trackEvent('scroll_75', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    }),

  /** คนเลื่อนอ่านเกือบจบหน้า (90%) */
  scroll90: () =>
    trackEvent('scroll_90', {
      page: typeof window !== 'undefined' ? window.location.pathname : '',
    }),
};
