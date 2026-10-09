import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { getQikinkToken } from '@/lib/qikink';

async function authenticateQikink(req: NextRequest) {
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`qikink-auth:${clientIp}`, {
    windowMs: 60 * 1000,
    maxRequests: 10,
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
        authenticated: false,
        error: 'Too many authentication attempts. Please wait before retrying.',
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

  const result = await getQikinkToken();

  // Strip the internal token before returning to client
  const safeResponse = { ...result };
  if ('token' in safeResponse) {
    delete safeResponse.token;
  }

  const status = result.success ? 200 : result.error?.includes('credentials') ? 401 : 502;

  return NextResponse.json(safeResponse, {
    status,
    headers: rateLimitHeaders,
  });
}

export async function POST(req: NextRequest) {
  return authenticateQikink(req);
}

export async function GET(req: NextRequest) {
  return authenticateQikink(req);
}
