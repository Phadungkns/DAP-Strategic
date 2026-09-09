import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import type { Recommendation } from '@/lib/dongfunda/model';

export function Recommendations({
  product,
  services = [],
  service,
}: {
  product?: Recommendation | null;
  services?: Recommendation[];
  service?: Recommendation;
}) {
  return (
    <section className="df-recommendations" aria-label="เรียนรู้และบริการ">
      <div className="df-promo df-promo-course">
        <GraduationCap className="df-promo-icon" size={38} />
        <div>
          <h2>Learn with DongFunda</h2>
          <p>อยากวิเคราะห์หุ้นด้วยตัวเอง?</p>
          <small>
            {product?.title ||
              'Business Model · Financial Statement · Cash Flow · Valuation'}
          </small>
        </div>
        <Link
          className="df-button df-button-white"
          href={
            product?.slug
              ? `/products/${encodeURIComponent(product.slug)}`
              : '/products'
          }
        >
          ดูรายละเอียดคอร์ส
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className="df-promo df-promo-service">
        <BriefcaseBusiness className="df-promo-icon" size={34} />
        <div>
          <h2>DAP Services</h2>
          <p>ให้ข้อมูล...ต่อยอดสู่การตัดสินใจที่ดีกว่า</p>
          <small>
            {services.length
              ? services.map((s) => s.title).join(' · ')
              : 'Business Plan · Feasibility Study · Financial Model'}
          </small>
        </div>
        <Link
          className="df-button df-button-white"
          href={
            service?.slug
              ? `/services/${encodeURIComponent(service.slug)}`
              : '/services'
          }
        >
          ดู Services
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
