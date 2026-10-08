import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { submitContactInquiry } from '@/lib/contact';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const MAX_BODY_BYTES = 64 * 1024; // 64 KB maximum payload size

export async function POST(req: NextRequest) {
  // 1. Content-Length check to prevent payload exhaustion
  const contentLengthHeader = req.headers.get('content-length');
  if (contentLengthHeader) {
    const contentLength = parseInt(contentLengthHeader, 10);
    if (!isNaN(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: 'Payload exceeds maximum permitted size.' },
        { status: 413 }
      );
    }
  }

  // 2. Content-Type enforcement
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json(
      { success: false, error: 'Unsupported media type: request must be application/json.' },
      { status: 415 }
    );
  }

  // 3. Origin & CSRF defense for state-changing POST requests
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return NextResponse.json(
          { success: false, error: 'Cross-origin request rejected.' },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid origin header.' },
        { status: 400 }
      );
    }
  }

  // 4. Rate limiting (5 inquiries per 10 minutes per IP)
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(clientIp, {
    windowMs: 10 * 60 * 1000,
    maxRequests: 5,
  });

  const rateLimitHeaders = {
    'X-RateLimit-Limit': String(rateLimit.limit),
    'X-RateLimit-Remaining': String(rateLimit.remaining),
    'X-RateLimit-Reset': String(rateLimit.resetSeconds),
  };

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many inquiries submitted from this network. Please wait a few minutes before submitting again.',
      },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders,
          'Retry-After': String(rateLimit.resetSeconds),
        },
      }
    );
  }

  try {
    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload.' },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    // 5. Schema validation & string sanitization
    const parseResult = contactFormSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          issues: parseResult.error.flatten().fieldErrors,
        },
        { status: 400, headers: rateLimitHeaders }
      );
    }

    const { website_honeypot } = parseResult.data;

    // 6. Anti-bot honeypot check: Silent success without downstream dispatch
    if (website_honeypot && website_honeypot.length > 0) {
      console.warn('[Contact Route] Spam bot trapped by honeypot.');
      return NextResponse.json(
        { success: true, message: 'Inquiry received.' },
        { status: 200, headers: rateLimitHeaders }
      );
    }

    // 7. Dispatch inquiry through pluggable contact adapter
    const result = await submitContactInquiry(parseResult.data);

    return NextResponse.json(result, {
      status: 200,
      headers: rateLimitHeaders,
    });
  } catch (error) {
    // 8. Opaque error response to prevent internal stack trace leakage
    console.error('[Contact Route] Internal processing exception:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred while processing your inquiry.',
      },
      { status: 500, headers: rateLimitHeaders }
    );
  }
}
