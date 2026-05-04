import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We send this data to the Make.com Webhook URL
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error('MAKE_WEBHOOK_URL is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Forward the payload to Make.com Webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'Website Contact Form',
        timestamp: new Date().toISOString(),
        ...body
      }),
    });

    if (!response.ok) {
      throw new Error(`Make.com responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message', details: error.message },
      { status: 500 }
    );
  }
}
