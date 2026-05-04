import { TrendingUp, CheckCircle2, BarChart, LineChart, Target, Zap } from 'lucide-react';
import type { PortfolioProject } from '@/types';

export const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "พลิกฟื้นวิกฤตกระแสเงินสด ธุรกิจผลิตชิ้นส่วนยานยนต์",
    category: "Financial Restructuring",
    description: "วิเคราะห์และปรับโครงสร้างหนี้ พร้อมวางระบบบริหารจัดการกระแสเงินสดใหม่ทั้งหมด เพื่อให้ธุรกิจสามารถดำเนินต่อไปได้ในช่วงวิกฤตเศรษฐกิจ",
    result: "เพิ่มสภาพคล่อง 50 ล้านบาทภายใน 3 เดือน",
    image: "https://picsum.photos/seed/finance1/800/600",
    icon: TrendingUp
  },
  {
    id: 2,
    title: "วางกลยุทธ์ขยายสาขา แฟรนไชส์ร้านอาหาร",
    category: "Business Strategy & Scaling",
    description: "ศึกษาความเป็นไปได้ (Feasibility Study) และวาง Standard Operating Procedure (SOP) เพื่อเตรียมความพร้อมในการขยายสาขาทั่วประเทศ",
    result: "ขยาย 20 สาขาใหม่ ยอดขายโต 150%",
    image: "https://picsum.photos/seed/restaurant/800/600",
    icon: BarChart
  },
  {
    id: 3,
    title: "Digital Transformation ระบบ ERP บริษัทโลจิสติกส์",
    category: "Digital Transformation",
    description: "ประเมินและคัดเลือกระบบ ERP ที่เหมาะสม พร้อมวางแผนการ Implement เพื่อเชื่อมโยงข้อมูลทุกแผนกเข้าด้วยกันแบบ Real-time",
    result: "ลดต้นทุนการดำเนินงาน 30%",
    image: "https://picsum.photos/seed/logistics/800/600",
    icon: Zap
  },
  {
    id: 4,
    title: "Feasibility Study โครงการอสังหาริมทรัพย์ Mixed-use",
    category: "Feasibility Study",
    description: "วิเคราะห์ความเป็นไปได้ทางการเงิน (Financial Model) และการตลาด เพื่อนำเสนอขอสินเชื่อโครงการจากสถาบันการเงิน",
    result: "อนุมัติสินเชื่อโครงการ 1,200 ล้านบาท",
    image: "https://picsum.photos/seed/building/800/600",
    icon: CheckCircle2
  },
  {
    id: 5,
    title: "วางระบบ OKRs และ KPI บริษัท Tech Startup",
    category: "Organization Management",
    description: "ปรับโครงสร้างองค์กรและวางระบบประเมินผลงานที่สอดคล้องกับเป้าหมายหลักของบริษัท เพื่อขับเคลื่อนทีมงานไปในทิศทางเดียวกัน",
    result: "ประสิทธิภาพการทำงานทีมเพิ่มขึ้น 40%",
    image: "https://picsum.photos/seed/startup/800/600",
    icon: Target
  },
  {
    id: 6,
    title: "M&A Strategy ควบรวมกิจการธุรกิจ Healthcare",
    category: "Mergers & Acquisitions",
    description: "ประเมินมูลค่ากิจการ (Business Valuation) และเป็นที่ปรึกษาในการเจรจาต่อรองเงื่อนไขการควบรวมกิจการ",
    result: "ปิดดีลมูลค่า 500 ล้านบาทได้สำเร็จ",
    image: "https://picsum.photos/seed/healthcare/800/600",
    icon: LineChart
  }
];
