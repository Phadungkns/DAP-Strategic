import type { ServiceItem } from '@/types';

export const services: ServiceItem[] = [
  {
    id: "strategic-planner",
    title: "Strategic Planner / Business Strategy",
    subtitle: "วางกลยุทธ์องค์กรเพื่อการเติบโตอย่างยั่งยืน",
    problem: "ธุรกิจถึงจุดตัน ยอดขายไม่โต คู่แข่งแย่งส่วนแบ่งตลาด ทำงานหนักแต่กำไรลดลง ขาดทิศทางที่ชัดเจนในการดำเนินธุรกิจ ทำให้ทีมงานทำงานไม่สอดคล้องกัน",
    solution: "วิเคราะห์ธุรกิจแบบ 360 องศา หาจุดแข็ง (Competitive Advantage) วางกลยุทธ์การเติบโต (Growth Strategy) และแผนปฏิบัติการที่วัดผลได้จริง เพื่อให้ธุรกิจกลับมาเติบโตและมีกำไร",
    deliverables: [
      "แผนกลยุทธ์องค์กร (Corporate Strategy)",
      "แผนภาพโมเดลธุรกิจ (Business Model Canvas)",
      "แผนปฏิบัติการ (Action Plan) พร้อม OKRs/KPIs"
    ]
  },
  {
    id: "feasibility-study",
    title: "Feasibility Study",
    subtitle: "การศึกษาความเป็นไปได้ของโครงการ",
    problem: "มีไอเดียธุรกิจใหม่หรืออยากขยายสาขา แต่ไม่แน่ใจว่าจะคุ้มทุนไหม กลัวลงทุนแล้วเจ๊ง หรือต้องการข้อมูลตัวเลขที่น่าเชื่อถือเพื่อไปกู้เงินธนาคารหรือหานักลงทุน",
    solution: "ประเมินความเป็นไปได้รอบด้าน ทั้งการตลาด การเงิน และการดำเนินงาน พร้อมสร้าง Financial Model เพื่อจำลองสถานการณ์ (Scenario Analysis) ให้คุณเห็นภาพความเสี่ยงและผลตอบแทนก่อนลงทุนจริง",
    deliverables: [
      "รายงานการศึกษาความเป็นไปได้ (Feasibility Study Report)",
      "โมเดลทางการเงิน (Financial Model - Excel)",
      "บทสรุปผู้บริหาร (Executive Summary)"
    ]
  },
  {
    id: "business-plan",
    title: "Business Plan",
    subtitle: "แผนธุรกิจฉบับสมบูรณ์เพื่อการระดมทุน",
    problem: "ต้องการระดมทุน (Fundraising) แต่ไม่มีแผนธุรกิจที่ดูเป็นมืออาชีพ ขาดความน่าเชื่อถือในสายตานักลงทุน หรือต้องการจัดระเบียบความคิดและโครงสร้างธุรกิจก่อนเริ่มต้นจริง",
    solution: "จัดทำแผนธุรกิจฉบับสมบูรณ์ที่ครอบคลุมทุกมิติ ตั้งแต่การวิเคราะห์ตลาด แผนการตลาด แผนการดำเนินงาน ไปจนถึงแผนการเงินที่รัดกุม พร้อม Pitch Deck ที่ดึงดูดนักลงทุน",
    deliverables: [
      "แผนธุรกิจฉบับสมบูรณ์ (Comprehensive Business Plan)",
      "Pitch Deck สำหรับนำเสนอนักลงทุน",
      "แผนภาพคาดการณ์ทางการเงิน (Financial Projections)"
    ]
  }
];
