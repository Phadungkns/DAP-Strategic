import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/shared/JsonLd';
import { generatePageMetadata } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

// Default metadata สำหรับทั้งเว็บ — แต่ละหน้าจะ override ผ่าน generateMetadata()
export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'DAP Strategic Consulting | ที่ปรึกษาธุรกิจเชิงกลยุทธ์',
    description:
      'ที่ปรึกษาธุรกิจเชิงกลยุทธ์ ช่วยวิเคราะห์ วางแผน และผลักดันธุรกิจให้เติบโตอย่างยั่งยืนด้วยกลยุทธ์ที่วัดผลได้จริง',
  }),
  // metadataBase ต้องกำหนดที่ root layout เพื่อให้ relative URL ทำงานถูกต้อง
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://dapstrategic.com'
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900" suppressHydrationWarning>
        <JsonLd />
        <div className="min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
