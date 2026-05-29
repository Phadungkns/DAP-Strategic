import { NextResponse } from 'next/server';

/**
 * API Route สำหรับรับ Webhook / PostBack จาก Payso
 * URL ที่ต้องเอาไปใส่ในระบบ Payso: https://dap.co.th/api/webhook/payso
 */
export async function POST(request: Request) {
  try {
    // 1. รับข้อมูลจาก Payso (ขึ้นอยู่กับว่า Payso ส่งมาเป็น Form Data หรือ JSON)
    // ตัวอย่างการรับแบบ JSON (หาก Payso ส่งเป็น JSON)
    // const data = await request.json(); 
    
    // ตัวอย่างการรับแบบ Form Data (หาก Payso ส่งเป็น x-www-form-urlencoded)
    // const formData = await request.formData();
    // const data = Object.fromEntries(formData.entries());

    // 2. TODO: ตรวจสอบความถูกต้องของข้อมูล (Signature / Token) ว่ามาจาก Payso จริงๆ
    
    // 3. TODO: นำข้อมูลไปอัปเดตสถานะการชำระเงินใน Database หรือ Sanity CMS
    // console.log('Received Payso PostBack:', data);
    
    // 4. ตอบกลับด้วย HTTP Status 200 เพื่อแจ้งให้ Payso ทราบว่าเรารับข้อมูลสำเร็จแล้ว (ป้องกันการส่งซ้ำและ Error)
    return NextResponse.json({ 
      status: 'success', 
      message: 'Webhook received successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Payso Webhook Error:', error);
    // หากเกิดข้อผิดพลาด ส่ง HTTP 500 กลับไป
    return NextResponse.json({ 
      status: 'error', 
      message: 'Internal Server Error' 
    }, { status: 500 });
  }
}
