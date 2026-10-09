import { NextRequest, NextResponse } from 'next/server';
import { brandWaitlistSchema } from '@/lib/validations';
import { submitBrandWaitlist } from '@/lib/contact';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    // Max 5 waitlist requests per minute
    const rateLimit = checkRateLimit(`waitlist:${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before submitting again.' },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimit.resetSeconds.toString(),
          },
        }
      );
    }

    const body = await req.json();
    const result = brandWaitlistSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0]?.toString() || 'form';
        fieldErrors[fieldName] = issue.message;
      }
      return NextResponse.json({ error: 'Validation failed', fieldErrors }, { status: 400 });
    }

    // Bot honeypot check
    if (result.data.website_honeypot) {
      return NextResponse.json({ success: true, message: 'Registry updated.' });
    }

    const submission = await submitBrandWaitlist(result.data);
    return NextResponse.json(submission);
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'An unexpected system error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
