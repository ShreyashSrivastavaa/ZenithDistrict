import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { getQikinkToken, sandboxOrderTestSchema } from '@/lib/qikink';

export async function POST(req: NextRequest) {
  // 1. Rate Limiting for test endpoint (stricter: 3 requests per minute)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`qikink-order-test:${clientIp}`, {
    windowMs: 60 * 1000,
    maxRequests: 3,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many test order attempts.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.resetSeconds) } }
    );
  }

  try {
    // 2. Parse and validate incoming payload
    const body = await req.json();
    const result = sandboxOrderTestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { customer } = result.data;

    // 3. Authenticate with Qikink
    const auth = await getQikinkToken();
    if (!auth.success || !auth.token) {
      return NextResponse.json(
        { success: false, error: 'Failed to authenticate with Qikink Sandbox.' },
        { status: 502 }
      );
    }

    const rawBaseUrl = process.env.QIKINK_API_BASE_URL?.trim() || 'https://sandbox.qikink.com';
    const apiBaseUrl = rawBaseUrl.replace(/\/+$/, '');

    // Prevent running this on production API base URLs as a safety measure
    if (!apiBaseUrl.toLowerCase().includes('sandbox')) {
      return NextResponse.json(
        { success: false, error: 'Test route blocked: QIKINK_API_BASE_URL is not a sandbox environment.' },
        { status: 403 }
      );
    }

    // 4. Construct Qikink Order Payload
    // Using the structure identified from documentation
    const orderId = `TST${Date.now().toString().slice(-8)}`;
    const qikinkPayload = {
      order_number: orderId,
      gateway: 'Prepaid', // Pre-verified gateway required by Qikink for prepaid
      total_order_value: '599', // Must be string usually, but '599' is safe
      qikink_shipping: 1, // 1 for Qikink shipping, 0 for self shipping (not allowed)
      shipping_address: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        address1: customer.address1,
        city: customer.city,
        province: customer.state_id || 'Maharashtra',
        zip: customer.zip,
        phone: customer.phone,
        email: customer.email,
        country_code: customer.country_id || 'IN',
      },
      line_items: [
        {
          sku: 'UOsJsRnHs-Wh-XS',
          quantity: "1",
          price: "599",
          search_from_my_products: 1,
        },
      ],
    };

    // 5. Send Order Creation Request to Qikink
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const qikinkRes = await fetch(`${apiBaseUrl}/api/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ClientId: process.env.QIKINK_CLIENT_ID || '',
        Accesstoken: auth.token,
      },
      body: JSON.stringify(qikinkPayload),
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    const responseData = await qikinkRes.json().catch(() => null);

    if (!qikinkRes.ok) {
      console.error('[Qikink Order Test] Failed:', qikinkRes.status, responseData);
      return NextResponse.json(
        {
          success: false,
          error: 'Qikink rejected the order.',
          details: responseData,
          status: qikinkRes.status,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sandbox test order created successfully.',
      orderId,
      qikinkResponse: responseData,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, error: 'Connection to Qikink API timed out.' },
        { status: 504 }
      );
    }

    console.error('[Qikink Order Test] Internal error:', error);
    return NextResponse.json(
      { success: false, error: 'An internal error occurred while processing the test order.' },
      { status: 500 }
    );
  }
}
